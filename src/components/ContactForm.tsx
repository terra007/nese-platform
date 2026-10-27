"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { contactSchema, type ContactInput } from "@/lib/contact/schema";
import { getFormToken, submitContact } from "@/app/actions/contact";

type FormData = ContactInput;
type FieldErrors = Partial<Record<keyof FormData, string>>;
type Status = "idle" | "loading" | "success" | "error";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const ERROR_TEXT: Record<string, string> = {
  expired: "This form has expired. Please try again.",
  rate_limited: "Too many requests. Please wait a few minutes and try again.",
  captcha: "Security check failed. Please try again.",
  server: "Something went wrong. Please try again or email us directly.",
};

const A = "var(--color-accent, #c9a84c)";
const AH = "var(--color-accent-hover, #d4b96a)";
const BT = "var(--color-button-text, #09090b)";

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: "", organisation: "", email: "", enquiry: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState<string>(ERROR_TEXT.server);
  const [formToken, setFormToken] = useState<string>("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  const refreshToken = useCallback(() => {
    getFormToken().then(setFormToken).catch(() => setFormToken(""));
  }, []);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  const renderTurnstile = useCallback(() => {
    if (!TURNSTILE_SITE_KEY || !window.turnstile || !turnstileRef.current || widgetId.current) return;
    widgetId.current = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      action: "contact",
      theme: "dark",
      appearance: "interaction-only",
    });
  }, []);

  useEffect(() => {
    renderTurnstile();
    return () => {
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [renderTurnstile, status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof FormData]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const errors: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormData;
        if (!errors[key]) errors[key] = issue.message;
      });
      setFieldErrors(errors);
      return;
    }
    setStatus("loading");
    const payload = new window.FormData(e.currentTarget);
    try {
      const res = await submitContact(payload);
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", organisation: "", email: "", enquiry: "" });
      } else if (res.error === "validation") {
        setFieldErrors(res.fieldErrors);
        setStatus("idle");
      } else {
        setErrorText(ERROR_TEXT[res.error] ?? ERROR_TEXT.server);
        setStatus("error");
      }
    } catch {
      setErrorText(ERROR_TEXT.server);
      setStatus("error");
    } finally {
      refreshToken();
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
    }
  };

  const inputBase = "w-full bg-zinc-900 border px-4 py-3 text-sm text-white placeholder-zinc-700 focus-accent transition-colors";
  const inputClass = (field: keyof FormData) =>
    `${inputBase} ${fieldErrors[field] ? "border-red-500/50" : "border-white/[0.08]"}`;

  if (status === "success") {
    return (
      <div className="h-full flex flex-col justify-center py-12">
        <div
          className="w-10 h-10 border flex items-center justify-center mb-6"
          style={{ borderColor: `color-mix(in srgb, ${A} 40%, transparent)` }}
        >
          <svg className="w-4 h-4" style={{ color: A }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-white text-xl mb-3" style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}>
          Enquiry Received
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-xs">
          Thank you. A member of our team will be in touch within two business days.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm transition-colors tracking-wide text-left"
          style={{ color: A }}
        >
          Submit another enquiry →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={renderTurnstile}
        />
      )}
      <input type="hidden" name="form_token" value={formToken} />
      {/* Honeypot: hidden from people and assistive tech, attractive to bots */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">
            Name <span style={{ color: A }}>*</span>
          </label>
          <input type="text" name="name" maxLength={120} autoComplete="name" value={form.name} onChange={handleChange}
            className={inputClass("name")} placeholder="Full name" />
          {fieldErrors.name && <p className="mt-1.5 text-[11px] text-red-400">{fieldErrors.name}</p>}
        </div>
        <div>
          <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">Organisation</label>
          <input type="text" name="organisation" maxLength={160} autoComplete="organization" value={form.organisation} onChange={handleChange}
            className={inputClass("organisation")} placeholder="Your organisation" />
        </div>
      </div>

      <div>
        <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">
          Email <span style={{ color: A }}>*</span>
        </label>
        <input type="email" name="email" maxLength={254} autoComplete="email" value={form.email} onChange={handleChange}
          className={inputClass("email")} placeholder="your@email.com" />
        {fieldErrors.email && <p className="mt-1.5 text-[11px] text-red-400">{fieldErrors.email}</p>}
      </div>

      <div>
        <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">
          Enquiry <span style={{ color: A }}>*</span>
        </label>
        <textarea name="enquiry" rows={5} maxLength={5000} value={form.enquiry} onChange={handleChange}
          className={`${inputClass("enquiry")} resize-none`} placeholder="Describe your requirements..." />
        {fieldErrors.enquiry && <p className="mt-1.5 text-[11px] text-red-400">{fieldErrors.enquiry}</p>}
      </div>

      {TURNSTILE_SITE_KEY && <div ref={turnstileRef} />}

      {status === "error" && (
        <p className="text-red-400 text-xs tracking-wide" role="alert">
          {errorText}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3.5 font-medium text-sm tracking-wide transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: A, color: BT }}
        onMouseEnter={(e) => { if (status !== "loading") e.currentTarget.style.backgroundColor = AH; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = A; }}
      >
        {status === "loading" ? "Sending…" : "Send Enquiry"}
      </button>

      <p className="text-zinc-700 text-[11px] leading-relaxed">
        Your details are used only to respond to your enquiry and are transmitted encrypted.
      </p>
    </form>
  );
}
