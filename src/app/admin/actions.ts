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

const THEME_KEYS = [
  "global.accent_color",
  "global.accent_hover",
  "global.button_text",
  "global.text_primary",
  "global.text_body",
  "global.bg",
] as const;

export async function saveTheme(formData: FormData) {
  const { supabase } = await requireAdmin();

  const updates: { key: string; value: string }[] = [];
  for (const key of THEME_KEYS) {
    const raw = (formData.get(key) as string | null) ?? "";
    if (HEX_COLOR_RE.test(raw)) updates.push({ key, value: raw });
  }

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

  if (!id) return redirect("/admin/sections?error=notable");

  const { error } = await supabase
    .from("page_sections")
    .update({ visible })
    .eq("id", id);

  if (error) return redirect("/admin/sections?error=notable");

  revalidatePath("/");
  redirect("/admin/sections");
}

export async function moveSectionUp(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id    = (formData.get("id")    as string | null) ?? "";
  const order = Number(formData.get("sort_order") ?? 0);

  if (!id) return redirect("/admin/sections?error=notable");

  const { data: above, error } = await supabase
    .from("page_sections")
    .select("id, sort_order")
    .lt("sort_order", order)
    .order("sort_order", { ascending: false })
    .limit(1)
    .single();

  if (error) return redirect("/admin/sections?error=notable");
  if (!above) return redirect("/admin/sections");

  await supabase.from("page_sections").update({ sort_order: above.sort_order }).eq("id", id);
  await supabase.from("page_sections").update({ sort_order: order }).eq("id", above.id);

  revalidatePath("/");
  redirect("/admin/sections");
}

export async function moveSectionDown(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id    = (formData.get("id")    as string | null) ?? "";
  const order = Number(formData.get("sort_order") ?? 0);

  if (!id) return redirect("/admin/sections?error=notable");

  const { data: below, error } = await supabase
    .from("page_sections")
    .select("id, sort_order")
    .gt("sort_order", order)
    .order("sort_order", { ascending: true })
    .limit(1)
    .single();

  if (error) return redirect("/admin/sections?error=notable");
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

  const slug = `custom-${Date.now()}`;

  const { data: last, error: lastErr } = await supabase
    .from("page_sections")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .single();

  if (lastErr) return redirect("/admin/sections?error=notable");

  const maxOrder = last?.sort_order ?? 10;

  await supabase
    .from("page_sections")
    .update({ sort_order: maxOrder + 2 })
    .eq("slug", "contact");

  const { error: insertErr } = await supabase.from("page_sections").insert({
    slug,
    type: "custom",
    title,
    visible: true,
    sort_order: maxOrder + 1,
    content: { eyebrow, heading, body, cta_text, cta_url },
  });

  if (insertErr) return redirect("/admin/sections?error=notable");

  revalidatePath("/");
  redirect("/admin/sections?added=1");
}

export async function deleteSection(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id   = (formData.get("id")   as string | null) ?? "";
  const slug = (formData.get("slug") as string | null) ?? "";

  if (!id || BUILTIN_SLUGS.has(slug)) return redirect("/admin/sections");

  const { error } = await supabase.from("page_sections").delete().eq("id", id);

  if (error) return redirect("/admin/sections?error=notable");

  revalidatePath("/");
  redirect("/admin/sections?deleted=1");
}

// ─── Client-callable (no redirect) ───────────────────────────────────────────

export async function reorderSections(orderedIds: string[]) {
  const { supabase } = await requireAdmin();

  const results = await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("page_sections").update({ sort_order: index }).eq("id", id)
    )
  );

  revalidatePath("/");
  return { success: !results.some((r) => r.error) };
}

export async function toggleVisibility(id: string, visible: boolean) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("page_sections")
    .update({ visible })
    .eq("id", id);
  revalidatePath("/");
  return { success: !error };
}

export async function deleteSectionById(id: string, slug: string) {
  if (BUILTIN_SLUGS.has(slug)) return { success: false, error: "Cannot delete built-in sections" };
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("page_sections").delete().eq("id", id);
  revalidatePath("/");
  return { success: !error };
}
