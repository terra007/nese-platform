"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const ADMIN_EMAIL = "REDACTED";

export async function loginAction(
  _prevState: { error?: string } | null,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  if (email !== ADMIN_EMAIL) {
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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const updates: { key: string; value: string }[] = [];
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("_")) continue;
    updates.push({ key, value: value as string });
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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const accentColor = formData.get("global.accent_color") as string;
  const accentHover = formData.get("global.accent_hover") as string;

  const updates = [
    { key: "global.accent_color", value: accentColor },
    { key: "global.accent_hover", value: accentHover },
  ].filter((u) => u.value);

  if (updates.length > 0) {
    await supabase
      .from("site_settings")
      .upsert(updates, { onConflict: "key" });
  }

  revalidatePath("/");
  redirect("/admin/theme?saved=1");
}
