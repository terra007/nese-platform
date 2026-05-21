"use client";

import { useState } from "react";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  organisation: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  enquiry: z.string().min(10, "Please provide at least 10 characters"),
});

type FormData = z.infer<typeof contactSchema>;
type FieldErrors = Partial<Record<keyof FormData, string>>;
type Status = "idle" | "loading" | "success" | "error";

const A = "var(--color-accent, #c9a84c)";
const AH = "var(--color-accent-hover, #d4b96a)";
const BT = "var(--color-button-text, #09090b)";

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: "", organisation: "", email: "", enquiry: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof FormData]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const errors: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        errors[issue.path[0] as keyof FormData] = issue.message;
      });
      setFieldErrors(errors);
      return;
    }
    setStatus("loading");
    const supabase = createClient();
    const { error } = await supabase.from("contacts").insert({
      name: result.data.name,
      organisation: result.data.organisation || null,
      email: result.data.email,
      enquiry: result.data.enquiry,
    });
    if (error) { setStatus("error"); } else {
      setStatus("success");
      setForm({ name: "", organisation: "", email: "", enquiry: "" });
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
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">
            Name <span style={{ color: A }}>*</span>
          </label>
          <input type="text" name="name" value={form.name} onChange={handleChange}
            className={inputClass("name")} placeholder="Full name" />
          {fieldErrors.name && <p className="mt-1.5 text-[11px] text-red-400">{fieldErrors.name}</p>}
        </div>
        <div>
          <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">Organisation</label>
          <input type="text" name="organisation" value={form.organisation} onChange={handleChange}
            className={inputClass("organisation")} placeholder="Your organisation" />
        </div>
      </div>

      <div>
        <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">
          Email <span style={{ color: A }}>*</span>
        </label>
        <input type="email" name="email" value={form.email} onChange={handleChange}
          className={inputClass("email")} placeholder="your@email.com" />
        {fieldErrors.email && <p className="mt-1.5 text-[11px] text-red-400">{fieldErrors.email}</p>}
      </div>

      <div>
        <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">
          Enquiry <span style={{ color: A }}>*</span>
        </label>
        <textarea name="enquiry" rows={5} value={form.enquiry} onChange={handleChange}
          className={`${inputClass("enquiry")} resize-none`} placeholder="Describe your requirements..." />
        {fieldErrors.enquiry && <p className="mt-1.5 text-[11px] text-red-400">{fieldErrors.enquiry}</p>}
      </div>

      {status === "error" && (
        <p className="text-red-400 text-xs tracking-wide">
          Something went wrong. Please try again or email us directly.
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
    </form>
  );
}
