import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin/auth";
import MfaForm from "./MfaForm";

export const dynamic = "force-dynamic";

export default async function MfaPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  if (session.level === "aal2" && session.hasVerifiedFactor) redirect("/admin");

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <span className="text-2xl font-bold tracking-[0.25em] text-white">NESE</span>
          <p className="mt-1 text-[10px] text-zinc-600 tracking-[0.2em] uppercase">Admin Panel</p>
        </div>
        <div className="border border-white/[0.08] bg-zinc-900/40 p-8">
          <MfaForm mode={session.hasVerifiedFactor ? "verify" : "enroll"} />
        </div>
        <p className="mt-6 text-center text-zinc-700 text-xs tracking-wide">
          New East Strategic Edge &mdash; Internal Use Only
        </p>
      </div>
    </div>
  );
}
