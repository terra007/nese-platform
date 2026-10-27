import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Supabase = Awaited<ReturnType<typeof createClient>>;

export type AdminSession = {
  supabase: Supabase;
  user: NonNullable<Awaited<ReturnType<Supabase["auth"]["getUser"]>>["data"]["user"]>;
  /** "aal2" once the second factor has been verified in this session. */
  level: "aal1" | "aal2" | null;
  hasVerifiedFactor: boolean;
};

/**
 * Identifies the signed-in admin (password step done), or null.
 * getUser() validates the session against Supabase Auth on every call.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminId = process.env.ADMIN_USER_ID;
  if (!user || !adminId || user.id !== adminId) return null;

  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  const hasVerifiedFactor = (user.factors ?? []).some(
    (f) => f.factor_type === "totp" && f.status === "verified"
  );

  return {
    supabase,
    user,
    level: (aal?.currentLevel as "aal1" | "aal2" | null) ?? null,
    hasVerifiedFactor,
  };
}

/** Full admin access: correct account AND second factor verified (AAL2). */
export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  if (session.level !== "aal2" || !session.hasVerifiedFactor) redirect("/admin/mfa");
  return { supabase: session.supabase, user: session.user };
}
