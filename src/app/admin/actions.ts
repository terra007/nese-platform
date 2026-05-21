"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { CONTENT_SCHEMA } from "@/lib/content";

const ALLOWED_CONTENT_KEYS = new Set(
  CONTENT_SCHEMA.flatMap((section) => section.fields.map((f) => f.key))
);

const MAX_VALUE_LENGTH = 5_000;
const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/;
const BUILTIN_SLUGS = new Set([
  "hero", "services", "mission", "approach", "founder", "contact",
]);

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminId = process.env.ADMIN_USER_ID;
  if (!user || !adminId || user.id !== adminId) {
    redirect("/admin/login");
  }

  return { supabase, user };
}

// ─── Auth ───────────────────────────────────────────────────────────────────

export async function loginAction(
  _prevState: { error?: string } | null,
  formData: FormData
) {
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const password = (formData.get("password") as string | null) ?? "";

  if (!email || !password) return { error: "Email and password are required." };

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || email !== adminEmail) {
    return { error: "Invalid credentials. Please try again." };
  }

  const supabase = await createClient();
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error: "Invalid credentials. Please try again." };

  const adminId = process.env.ADMIN_USER_ID;
  if (!adminId || data.user?.id !== adminId) {
    await supabase.auth.signOut();
    return { error: "Invalid credentials. Please try again." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ─── Content / Theme ────────────────────────────────────────────────────────

export async function saveContent(formData: FormData) {
  const { supabase } = await requireAdmin();

  const updates: { key: string; value: string }[] = [];
  for (const [key, rawValue] of formData.entries()) {
    if (key.startsWith("_")) continue;
    if (!ALLOWED_CONTENT_KEYS.has(key)) continue;
    const value = typeof rawValue === "string" ? rawValue : "";
    if (value.length > MAX_VALUE_LENGTH) continue;
    updates.push({ key, value });
  }

  if (updates.length > 0) {
    const { error } = await supabase
      .from("site_settings")
      .upsert(updates, { onConflict: "key" });
    if (error) return redirect("/admin/content?error=1");
  }

  revalidatePath("/");
  redirect("/admin/content?saved=1");
}

export async function saveTheme(formData: FormData) {
  const { supabase } = await requireAdmin();

  const rawAccent = (formData.get("global.accent_color") as string | null) ?? "";
  const rawHover  = (formData.get("global.accent_hover")  as string | null) ?? "";

  const updates: { key: string; value: string }[] = [];
  if (HEX_COLOR_RE.test(rawAccent))
    updates.push({ key: "global.accent_color", value: rawAccent });
  if (HEX_COLOR_RE.test(rawHover))
    updates.push({ key: "global.accent_hover", value: rawHover });

  if (updates.length > 0)
    await supabase.from("site_settings").upsert(updates, { onConflict: "key" });

  revalidatePath("/");
  redirect("/admin/theme?saved=1");
}

// ─── Sections ────────────────────────────────────────────────────────────────

export async function toggleSectionVisibility(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id      = (formData.get("id")      as string | null) ?? "";
  const visible = (formData.get("visible") as string | null) === "true";

  if (!id) return redirect("/admin/sections");

  await supabase
    .from("page_sections")
    .update({ visible })
    .eq("id", id);

  revalidatePath("/");
  redirect("/admin/sections");
}

export async function moveSectionUp(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id    = (formData.get("id")    as string | null) ?? "";
  const order = Number(formData.get("sort_order") ?? 0);

  if (!id) return redirect("/admin/sections");

  // Find the section directly above this one
  const { data: above } = await supabase
    .from("page_sections")
    .select("id, sort_order")
    .lt("sort_order", order)
    .order("sort_order", { ascending: false })
    .limit(1)
    .single();

  if (!above) return redirect("/admin/sections");

  // Swap the two sort_order values
  await supabase.from("page_sections").update({ sort_order: above.sort_order }).eq("id", id);
  await supabase.from("page_sections").update({ sort_order: order }).eq("id", above.id);

  revalidatePath("/");
  redirect("/admin/sections");
}

export async function moveSectionDown(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id    = (formData.get("id")    as string | null) ?? "";
  const order = Number(formData.get("sort_order") ?? 0);

  if (!id) return redirect("/admin/sections");

  const { data: below } = await supabase
    .from("page_sections")
    .select("id, sort_order")
    .gt("sort_order", order)
    .order("sort_order", { ascending: true })
    .limit(1)
    .single();

  if (!below) return redirect("/admin/sections");

  await supabase.from("page_sections").update({ sort_order: below.sort_order }).eq("id", id);
  await supabase.from("page_sections").update({ sort_order: order }).eq("id", below.id);

  revalidatePath("/");
  redirect("/admin/sections");
}

export async function addSection(formData: FormData) {
  const { supabase } = await requireAdmin();

  const title    = ((formData.get("title")    as string | null) ?? "").trim().slice(0, 200);
  const eyebrow  = ((formData.get("eyebrow")  as string | null) ?? "").trim().slice(0, 200);
  const heading  = ((formData.get("heading")  as string | null) ?? "").trim().slice(0, 500);
  const body     = ((formData.get("body")     as string | null) ?? "").trim().slice(0, MAX_VALUE_LENGTH);
  const cta_text = ((formData.get("cta_text") as string | null) ?? "").trim().slice(0, 200);
  const cta_url  = ((formData.get("cta_url")  as string | null) ?? "").trim().slice(0, 500);

  if (!title || !heading) return redirect("/admin/sections?error=missing");

  // Generate a unique slug from the title
  const slug = `custom-${Date.now()}`;

  // Place it just before the contact section (last builtin), or at end
  const { data: last } = await supabase
    .from("page_sections")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .single();

  const maxOrder = last?.sort_order ?? 10;

  // Insert before contact (shift contact down)
  await supabase
    .from("page_sections")
    .update({ sort_order: maxOrder + 2 })
    .eq("slug", "contact");

  await supabase.from("page_sections").insert({
    slug,
    type: "custom",
    title,
    visible: true,
    sort_order: maxOrder + 1,
    content: { eyebrow, heading, body, cta_text, cta_url },
  });

  revalidatePath("/");
  redirect("/admin/sections?added=1");
}

export async function deleteSection(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id   = (formData.get("id")   as string | null) ?? "";
  const slug = (formData.get("slug") as string | null) ?? "";

  // Never allow deleting built-in sections — only hide them
  if (!id || BUILTIN_SLUGS.has(slug)) return redirect("/admin/sections");

  await supabase.from("page_sections").delete().eq("id", id);

  revalidatePath("/");
  redirect("/admin/sections?deleted=1");
}
