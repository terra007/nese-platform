"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-10 text-center">
          <span className="text-2xl font-bold tracking-[0.25em] text-white">
            NESE
          </span>
          <p className="mt-1 text-[10px] text-zinc-600 tracking-[0.2em] uppercase">
            Admin Panel
          </p>
        </div>

        <div className="border border-white/[0.08] bg-zinc-900/40 p-8">
          <h1
            className="text-xl text-white mb-1"
            style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
          >
            Sign In
          </h1>
          <p className="text-zinc-500 text-sm mb-8">
            Access is restricted to authorised administrators.
          </p>

          <form action={action} className="space-y-5">
            <div>
              <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                className="w-full bg-zinc-950 border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-[#c9a84c]/40 transition-colors"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                className="w-full bg-zinc-950 border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-[#c9a84c]/40 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {state?.error && (
              <p className="text-red-400 text-xs tracking-wide">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full py-3 bg-[#c9a84c] text-zinc-950 font-medium text-sm tracking-wide hover:bg-[#d4b96a] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {pending ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-zinc-700 text-xs tracking-wide">
          New East Strategic Edge &mdash; Internal Use Only
        </p>
      </div>
    </div>
  );
}
