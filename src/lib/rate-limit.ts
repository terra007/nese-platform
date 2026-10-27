import "server-only";
import { createHash } from "crypto";

/**
 * Sliding-window rate limiter, kept in memory per server instance.
 * Keys are hashed so raw IPs / emails are never held in memory.
 */
const buckets = new Map<string, number[]>();

function hashKey(bucket: string, key: string) {
  return `${bucket}:${createHash("sha256").update(`nese:${bucket}:${key.toLowerCase()}`).digest("base64url").slice(0, 22)}`;
}

/** Returns true if the action is allowed (and records it). */
export function rateLimit(bucket: string, key: string, limit: number, windowMs: number, now = Date.now()): boolean {
  const k = hashKey(bucket, key);
  const recent = (buckets.get(k) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    buckets.set(k, recent);
    return false;
  }
  recent.push(now);
  buckets.set(k, recent);

  if (buckets.size > 10_000) {
    for (const [key2, v] of buckets) if (v.every((t) => now - t >= windowMs)) buckets.delete(key2);
  }
  return true;
}

/** Clears a key after a successful login so the legitimate user isn't penalised. */
export function resetRateLimit(bucket: string, key: string) {
  buckets.delete(hashKey(bucket, key));
}

/** Small fixed delay to blunt timing differences and slow down guessing. */
export const settle = (ms = 400) => new Promise((r) => setTimeout(r, ms));
