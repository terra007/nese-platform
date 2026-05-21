"use client";

import { useState } from "react";
import AdminNav from "./AdminNav";
import { logoutAction } from "./actions";

interface Props {
  email: string;
  children: React.ReactNode;
}

export default function AdminShell({ email, children }: Props) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* ── Mobile top bar ─────────────────────────────────── */}
      <header className="md:hidden fixed top-0 inset-x-0 z-40 h-14 bg-zinc-900/95 backdrop-blur-md border-b border-white/[0.06] flex items-center justify-between px-4">
        <div>
          <span className="text-white font-bold tracking-[0.2em] text-sm">
            NESE
          </span>
          <span className="text-[9px] text-zinc-600 tracking-[0.12em] uppercase ml-2">
            Admin
          </span>
        </div>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </header>

      {/* ── Backdrop (mobile only) ──────────────────────────── */}
      <div
        onClick={close}
        className={`md:hidden fixed inset-0 z-40 bg-black/60 transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 w-64 md:w-56
          bg-zinc-900 md:bg-zinc-900/50
          border-r border-white/[0.06]
          flex flex-col
          transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Sidebar header */}
        <div className="px-5 py-5 border-b border-white/[0.06] flex items-center justify-between">
          <div>
            <span className="text-white font-bold tracking-[0.2em] text-sm">
              NESE
            </span>
            <span className="text-[9px] text-zinc-600 tracking-[0.15em] uppercase block mt-0.5">
              Admin Panel
            </span>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={close}
            aria-label="Close menu"
            className="md:hidden w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links — close drawer on tap */}
        <AdminNav onNavigate={close} />

        {/* Footer: email + logout */}
        <div className="p-3 border-t border-white/[0.06]">
          <p className="px-3 text-[10px] text-zinc-700 mb-2 truncate">{email}</p>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.04] rounded transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────── */}
      <main className="md:ml-56 pt-14 md:pt-0 min-h-screen">
        <div className="max-w-4xl mx-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
