"use server";

import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin/auth";
import { rateLimit, resetRateLimit, settle } from "@/lib/rate-limit";

export type EnrollResult =
  | { ok: true; factorId: string; qrCode: string; secret: string }
  | { ok: false; error: string };

/** Creates a fresh TOTP factor for first-time setup. Only allowed while no verified factor exists. */
export async function startEnrollment(): Promise<EnrollResult> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  if (session.hasVerifiedFactor) return { ok: false, error: "Two-factor authentication is already set up." };

  if (!rateLimit("mfa-enroll", session.user.id, 10, 60 * 60 * 1000)) {
    return { ok: false, error: "Too many attempts. Please wait and try again later." };
  }

  const { supabase } = session;

  // Remove abandoned, never-verified setups so a new QR code can be issued.
  const { data: factors } = await supabase.auth.mfa.listFactors();
  for (const f of factors?.all ?? []) {
    if (f.factor_type === "totp" && f.status !== "verified") {
      await supabase.auth.mfa.unenroll({ factorId: f.id });
    }
  }

  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: "totp",
    friendlyName: `NESE Admin ${new Date().toISOString().slice(0, 10)}`,
    issuer: "NESE Admin",
  });
  if (error || !data) {
    return { ok: false, error: "Could not start setup. Make sure MFA (TOTP) is enabled in Supabase." };
  }

  return { ok: true, factorId: data.id, qrCode: data.totp.qr_code, secret: data.totp.secret };
}

export async function verifyMfaCode(
  _prev: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string } | null> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const code = String(formData.get("code") ?? "").replace(/\s+/g, "");
  const requestedFactor = String(formData.get("factorId") ?? "");

  if (!/^\d{6}$/.test(code)) return { error: "Enter the 6-digit code from your authenticator app." };

  // 5 attempts per 15 minutes per account; brute-forcing a 6-digit code becomes infeasible.
  if (!rateLimit("mfa-verify", session.user.id, 5, 15 * 60 * 1000)) {
    await settle();
    return { error: "Too many attempts. Please wait 15 minutes and try again." };
  }

  const { supabase } = session;
  const { data: factors } = await supabase.auth.mfa.listFactors();
  const all = factors?.all ?? [];
  // Only accept a factor that belongs to this user; prefer a verified one if set up.
  const factor =
    all.find((f) => f.factor_type === "totp" && f.status === "verified") ??
    all.find((f) => f.factor_type === "totp" && f.id === requestedFactor);

  if (!factor) return { error: "No authenticator found. Please reload the page." };

  const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId: factor.id, code });
  if (error) {
    await settle();
    return { error: "Invalid code. Please try again." };
  }

  resetRateLimit("mfa-verify", session.user.id);
  redirect("/admin");
}
