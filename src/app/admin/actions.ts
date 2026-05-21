"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { CONTENT_SCHEMA } from "@/lib/content";

// Compiled once at module load — all keys the admin is allowed to write.
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

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!user || !adminEmail || user.email !== adminEmail) {
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

  // Reject non-admin emails before hitting Supabase — avoids leaking
  // timing information about which accounts exist.
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || email !== adminEmail) {
    return { error: "Invalid credentials. Please try again." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
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
    // Skip internal fields
    if (key.startsWith("_")) continue;

    // Reject keys not in the schema — prevents arbitrary DB writes
    if (!ALLOWED_CONTENT_KEYS.has(key)) continue;

    const value = typeof rawValue === "string" ? rawValue : "";

    // Enforce max length per field
    if (value.length > MAX_VALUE_LENGTH) continue;

    updates.push({ key, value });
  }

  if (updates.length > 0) {
    const { error } = await supabase
      .from("site_settings")
      .upsert(updates, { onConflict: "key" });
    if (error) {
      return redirect("/admin/content?error=1");
    }
  }

  revalidatePath("/");
  redirect("/admin/content?saved=1");
}

export async function saveTheme(formData: FormData) {
  const { supabase } = await requireAdmin();

  const rawAccent = (formData.get("global.accent_color") as string | null) ?? "";
  const rawHover = (formData.get("global.accent_hover") as string | null) ?? "";

  // Validate both values are proper hex colors before writing.
  // This prevents CSS injection via the <style> tag in layout.tsx.
  const updates: { key: string; value: string }[] = [];

  if (HEX_COLOR_RE.test(rawAccent)) {
    updates.push({ key: "global.accent_color", value: rawAccent });
  }
  if (HEX_COLOR_RE.test(rawHover)) {
    updates.push({ key: "global.accent_hover", value: rawHover });
  }

  if (updates.length > 0) {
    await supabase
      .from("site_settings")
      .upsert(updates, { onConflict: "key" });
  }

  revalidatePath("/");
  redirect("/admin/theme?saved=1");
}
