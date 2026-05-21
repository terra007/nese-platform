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

export async function loginAction(
  _prevState: { error?: string } | null,
  formData: FormData
) {
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const password = (formData.get("password") as string | null) ?? "";

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  // Pre-check the email against the env var so we don't hit Supabase
  // with credentials we know will be rejected at the UUID layer anyway.
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || email !== adminEmail) {
    return { error: "Invalid credentials. Please try again." };
  }

  const supabase = await createClient();
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Invalid credentials. Please try again." };
  }

  // Double-check UUID matches even if Supabase auth succeeded.
  // Guards against a scenario where the admin email is reused for a
  // different Supabase account.
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

  const rawAccent =
    (formData.get("global.accent_color") as string | null) ?? "";
  const rawHover =
    (formData.get("global.accent_hover") as string | null) ?? "";

  const updates: { key: string; value: string }[] = [];
  if (HEX_COLOR_RE.test(rawAccent))
    updates.push({ key: "global.accent_color", value: rawAccent });
  if (HEX_COLOR_RE.test(rawHover))
    updates.push({ key: "global.accent_hover", value: rawHover });

  if (updates.length > 0) {
    await supabase.from("site_settings").upsert(updates, { onConflict: "key" });
  }

  revalidatePath("/");
  redirect("/admin/theme?saved=1");
}
