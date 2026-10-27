"use client";

import { useActionState, useEffect, useState } from "react";
import { startEnrollment, verifyMfaCode, type EnrollResult } from "./actions";
import { logoutAction } from "../actions";

const heading = { fontFamily: "var(--font-dm-serif), Georgia, serif" };

export default function MfaForm({ mode }: { mode: "enroll" | "verify" }) {
  const [state, action, pending] = useActionState(verifyMfaCode, null);
  const [enroll, setEnroll] = useState<EnrollResult | null>(null);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    if (mode === "enroll") startEnrollment().then(setEnroll).catch(() =>
      setEnroll({ ok: false, error: "Could not start setup. Please reload the page." })
    );
  }, [mode]);

  return (
    <div>
      <h1 className="text-xl text-white mb-1" style={heading}>
        {mode === "enroll" ? "Set Up Two-Factor Login" : "Two-Factor Verification"}
      </h1>
      <p className="text-zinc-500 text-sm mb-6">
        {mode === "enroll"
          ? "Scan the QR code with an authenticator app (e.g. Google Authenticator, Microsoft Authenticator, 1Password), then enter the 6-digit code."
          : "Enter the 6-digit code from your authenticator app."}
      </p>

      {mode === "enroll" && (
        <div className="mb-6">
          {!enroll && <p className="text-zinc-600 text-sm">Preparing…</p>}
          {enroll && !enroll.ok && <p className="text-red-400 text-xs">{enroll.error}</p>}
          {enroll?.ok && (
            <div className="space-y-3">
              <div className="bg-white p-3 inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={enroll.qrCode} alt="QR code for your authenticator app" width={180} height={180} />
              </div>
              <button
                type="button"
                onClick={() => setShowSecret((v) => !v)}
                className="block text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showSecret ? "Hide setup key" : "Can’t scan? Show setup key"}
              </button>
              {showSecret && (
                <code className="block break-all text-xs text-zinc-300 bg-zinc-950 border border-white/[0.08] p-2 select-all">
                  {enroll.secret}
                </code>
              )}
            </div>
          )}
        </div>
      )}

      <form action={action} className="space-y-5">
        {enroll?.ok && <input type="hidden" name="factorId" value={enroll.factorId} />}
        <div>
          <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">Code</label>
          <input
            type="text"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="\d{6}"
            maxLength={6}
            required
            autoFocus
            className="w-full bg-zinc-950 border border-white/[0.08] px-4 py-3 text-lg tracking-[0.5em] text-white text-center placeholder-zinc-800 focus-accent transition-colors"
            placeholder="000000"
          />
        </div>
        {state?.error && <p className="text-red-400 text-xs tracking-wide" role="alert">{state.error}</p>}
        <button
          type="submit"
          disabled={pending || (mode === "enroll" && !enroll?.ok)}
          className="w-full py-3 btn-filled font-medium text-sm tracking-wide transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {pending ? "Verifying…" : "Verify"}
        </button>
      </form>

      <form action={logoutAction} className="mt-6 text-center">
        <button type="submit" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
          Cancel and sign out
        </button>
      </form>
    </div>
  );
}
