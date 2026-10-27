import { z } from "zod";

// Control characters except tab (\t) and newline (\n / \r) are never valid in form input.
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;
// Single-line fields must not contain line breaks either (prevents header injection).
const LINE_BREAKS = /[\r\n\u2028\u2029]/;

const singleLine = (min: number, max: number, minMsg: string) =>
  z
    .string()
    .trim()
    .min(min, minMsg)
    .max(max, `Please use at most ${max} characters`)
    .refine((v) => !CONTROL_CHARS.test(v) && !LINE_BREAKS.test(v), "Contains invalid characters");

export const contactSchema = z.object({
  name: singleLine(2, 120, "Name must be at least 2 characters"),
  organisation: z
    .string()
    .trim()
    .max(160, "Please use at most 160 characters")
    .refine((v) => !CONTROL_CHARS.test(v) && !LINE_BREAKS.test(v), "Contains invalid characters")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .trim()
    .max(254, "Please enter a valid email address")
    .email("Please enter a valid email address")
    .refine((v) => !LINE_BREAKS.test(v), "Please enter a valid email address"),
  enquiry: z
    .string()
    .trim()
    .min(10, "Please provide at least 10 characters")
    .max(5000, "Please keep your enquiry under 5,000 characters")
    .refine((v) => !CONTROL_CHARS.test(v), "Contains invalid characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResult =
  | { ok: true }
  | { ok: false; error: "validation"; fieldErrors: Partial<Record<keyof ContactInput, string>> }
  | { ok: false; error: "expired" | "rate_limited" | "captcha" | "server" };
