"use server";

import { headers } from "next/headers";
import { after } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { contactSchema, type ContactInput, type ContactResult } from "@/lib/contact/schema";
import {
  checkRateLimit,
  clientIp,
  createFormToken,
  verifyFormToken,
  verifyTurnstile,
} from "@/lib/contact/security";
import { mailConfigured, sendContactNotification } from "@/lib/contact/mailer";

/** Issued when the form is shown; signed and time-stamped. */
export async function getFormToken(): Promise<string> {
  return createFormToken();
}

async function dbClient() {
  // Prefer the service-role key (server-only) so the public anon key no longer needs INSERT rights.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceKey) {
    return createServiceClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return createClient();
}

export async function submitContact(formData: FormData): Promise<ContactResult> {
  const h = await headers();
  const ip = clientIp(h);

  // 1. Honeypot: real users never see or fill this field. Pretend success so bots learn nothing.
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") return { ok: true };

  // 2. Signed timing token.
  const token = verifyFormToken(formData.get("form_token"));
  if (token === "too_fast") return { ok: true }; // bot-speed submission: silently drop
  if (token !== "ok") return { ok: false, error: "expired" };

  // 3. Rate limit per IP and globally.
  if (!checkRateLimit(ip)) return { ok: false, error: "rate_limited" };

  // 4. Cloudflare Turnstile (only when configured).
  if (!(await verifyTurnstile(formData.get("cf-turnstile-response"), ip))) {
    return { ok: false, error: "captcha" };
  }

  // 5. Strict server-side validation (never trust the browser).
  const raw = {
    name: formData.get("name"),
    organisation: formData.get("organisation") ?? "",
    email: formData.get("email"),
    enquiry: formData.get("enquiry"),
  };
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactInput;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "validation", fieldErrors };
  }
  const data = parsed.data;
  const receivedAt = new Date();

  // 6. Store first, so no enquiry is lost even if email delivery fails.
  try {
    const supabase = await dbClient();
    const { error } = await supabase.from("contacts").insert({
      name: data.name,
      organisation: data.organisation || null,
      email: data.email,
      enquiry: data.enquiry,
    });
    if (error) {
      console.error("[contact] database insert failed:", error.code);
      return { ok: false, error: "server" };
    }
  } catch {
    console.error("[contact] database unavailable");
    return { ok: false, error: "server" };
  }

  // 7. Email notification after the response is sent (visitor doesn't wait for SMTP).
  if (mailConfigured()) {
    after(async () => {
      try {
        await sendContactNotification(data, receivedAt);
      } catch (err) {
        // Log only the error type, never the message content (privacy).
        console.error("[contact] email notification failed:", (err as { code?: string })?.code ?? "unknown");
      }
    });
  } else {
    console.warn("[contact] SMTP not configured — enquiry stored but no email sent");
  }

  return { ok: true };
}
