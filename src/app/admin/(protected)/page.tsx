import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: contacts } = await supabase
    .from("contacts")
    .select("id, name, organisation, email, enquiry, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  const { count: totalContacts } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true });

  const { count: totalSettings } = await supabase
    .from("site_settings")
    .select("*", { count: "exact", head: true });

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-2xl text-white mb-1"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          Dashboard
        </h1>
        <p className="text-zinc-500 text-sm">
          Overview of your site and recent activity.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-900/50 border border-white/[0.06] p-5">
          <div className="text-2xl text-[#c9a84c] font-mono mb-1">
            {totalContacts ?? 0}
          </div>
          <div className="text-zinc-500 text-xs uppercase tracking-[0.15em]">
            Total Enquiries
          </div>
        </div>
        <div className="bg-zinc-900/50 border border-white/[0.06] p-5">
          <div className="text-2xl text-[#c9a84c] font-mono mb-1">
            {totalSettings ?? 0}
          </div>
          <div className="text-zinc-500 text-xs uppercase tracking-[0.15em]">
            Custom Content Fields
          </div>
        </div>
        <div className="bg-zinc-900/50 border border-white/[0.06] p-5">
          <Link
            href="/admin/content"
            className="flex flex-col h-full justify-between group"
          >
            <div className="text-2xl text-[#c9a84c] font-mono mb-1">→</div>
            <div className="text-zinc-500 text-xs uppercase tracking-[0.15em] group-hover:text-zinc-300 transition-colors">
              Edit Content
            </div>
          </Link>
        </div>
      </div>

      {/* Recent enquiries */}
      <div>
        <h2 className="text-sm text-white uppercase tracking-[0.15em] mb-4">
          Recent Enquiries
        </h2>

        {!contacts || contacts.length === 0 ? (
          <div className="border border-white/[0.06] p-8 text-center text-zinc-600 text-sm">
            No enquiries received yet.
          </div>
        ) : (
          <div className="border border-white/[0.06] divide-y divide-white/[0.04]">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-5 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <span className="text-white text-sm font-medium">
                      {contact.name}
                    </span>
                    {contact.organisation && (
                      <span className="text-zinc-500 text-sm ml-2">
                        · {contact.organisation}
                      </span>
                    )}
                  </div>
                  <time className="text-zinc-600 text-xs shrink-0">
                    {new Date(contact.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-[#c9a84c] text-xs hover:text-[#d4b96a] transition-colors"
                >
                  {contact.email}
                </a>
                <p className="text-zinc-500 text-xs mt-2 line-clamp-2">
                  {contact.enquiry}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
