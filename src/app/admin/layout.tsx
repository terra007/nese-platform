import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "./AdminNav";
import { logoutAction } from "./actions";

const ADMIN_EMAIL = "REDACTED";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-zinc-900/50 border-r border-white/[0.06] flex flex-col">
        <div className="px-5 py-5 border-b border-white/[0.06]">
          <span className="text-white font-bold tracking-[0.2em] text-sm">
            NESE
          </span>
          <span className="text-[9px] text-zinc-600 tracking-[0.15em] uppercase block mt-0.5">
            Admin Panel
          </span>
        </div>

        <AdminNav />

        <div className="p-3 border-t border-white/[0.06]">
          <p className="px-3 text-[10px] text-zinc-700 mb-2 truncate">
            {user.email}
          </p>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.04] rounded transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-8">{children}</div>
      </main>
    </div>
  );
}
