import "server-only";
import { createHash, createHmac, randomBytes, timingSafeEqual } from "crypto";

/* ------------------------------------------------------------------ */
/* Signed form token                                                   */
/* Proves the form was loaded from this site and blocks bots that      */
/* submit instantly or replay an old token.                            */
/* ------------------------------------------------------------------ */

const MIN_FILL_MS = 3_000; // humans need at least a few seconds
const MAX_AGE_MS = 2 * 60 * 60 * 1000; // token valid for 2 hours

function formSecret(): string | null {
  return process.env.FORM_SECRET || process.env.SMTP_PASS || process.env.SUPABASE_SERVICE_ROLE_KEY || null;
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(`nese-contact:${payload}`).digest("base64url");
}

export function createFormToken(now = Date.now()): string {
  const secret = formSecret();
  const nonce = randomBytes(9).toString("base64url");
  const payload = `${now}.${nonce}`;
  if (!secret) return `${payload}.unsigned`;
  return `${payload}.${sign(payload, secret)}`;
}

export type TokenCheck = "ok" | "too_fast" | "expired" | "invalid";

export function verifyFormToken(token: unknown, now = Date.now()): TokenCheck {
  if (typeof token !== "string" || token.length > 200) return "invalid";
  const parts = token.split(".");
  if (parts.length !== 3) return "invalid";
  const [ts, nonce, sig] = parts;
  const issuedAt = Number(ts);
  if (!Number.isSafeInteger(issuedAt) || !nonce) return "invalid";

  const secret = formSecret();
  if (secret) {
    const expected = Buffer.from(sign(`${ts}.${nonce}`, secret));
    const actual = Buffer.from(sig);
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return "invalid";
  }

  const age = now - issuedAt;
  if (age < MIN_FILL_MS) return "too_fast";
  if (age > MAX_AGE_MS || age < -60_000) return "expired";
  return "ok";
}

/* ------------------------------------------------------------------ */
/* Rate limiting (per IP + global)                                     */
/* Best-effort per server instance; pair with Turnstile and, if        */
/* needed, a Vercel Firewall rate-limit rule for hard guarantees.      */
/* ------------------------------------------------------------------ */

const WINDOW_MS = 15 * 60 * 1000;
const PER_IP_LIMIT = 5;
const GLOBAL_WINDOW_MS = 60 * 60 * 1000;
const GLOBAL_LIMIT = 60;

const hits = new Map<string, number[]>();
let globalHits: number[] = [];

export function hashIp(ip: string): string {
  // Never keep raw IP addresses in memory longer than needed (GDPR data minimisation).
  return createHash("sha256").update(`nese:${ip}`).digest("base64url").slice(0, 22);
}

export function checkRateLimit(ip: string, now = Date.now()): boolean {
  globalHits = globalHits.filter((t) => now - t < GLOBAL_WINDOW_MS);
  if (globalHits.length >= GLOBAL_LIMIT) return false;

  const key = hashIp(ip);
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= PER_IP_LIMIT) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  globalHits.push(now);

  // Opportunistic cleanup so the map can't grow without bound.
  if (hits.size > 5_000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return true;
}

export function clientIp(h: Headers): string {
  // On Vercel, x-real-ip / x-forwarded-for are set by the platform and cannot be spoofed by the client.
  return (
    h.get("x-real-ip") ||
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

/* ------------------------------------------------------------------ */
/* Cloudflare Turnstile (privacy-friendly CAPTCHA replacement)         */
/* Active only when TURNSTILE_SECRET_KEY is configured.                */
/* ------------------------------------------------------------------ */

export function turnstileEnabled(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstile(token: unknown, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== "string" || !token || token.length > 2048) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip !== "unknown") body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8_000),
      cache: "no-store",
    });
    const data = (await res.json()) as { success?: boolean; action?: string };
    return data.success === true && (data.action === undefined || data.action === "contact");
  } catch {
    return false;
  }
}
