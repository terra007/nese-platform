import { getPageSections, pagesectionsReady } from "@/lib/sections";
import {
  toggleSectionVisibility,
  moveSectionUp,
  moveSectionDown,
  addSection,
  deleteSection,
} from "../../actions";

export default async function SectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ added?: string; deleted?: string; error?: string }>;
}) {
  const { added, deleted, error } = await searchParams;
  const [sections, tableReady] = await Promise.all([
    getPageSections(),
    pagesectionsReady(),
  ]);

  const inputClass =
    "w-full bg-zinc-950 border border-white/[0.08] px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#c9a84c]/40 transition-colors";

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-2xl text-white mb-1"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          Sections
        </h1>
        <p className="text-zinc-500 text-sm">
          Show or hide sections, reorder them, and add custom content blocks.
        </p>
      </div>

      {added === "1" && (
        <div className="mb-6 px-4 py-3 bg-emerald-900/20 border border-emerald-500/30 text-emerald-400 text-sm">
          Section added successfully.
        </div>
      )}
      {deleted === "1" && (
        <div className="mb-6 px-4 py-3 bg-emerald-900/20 border border-emerald-500/30 text-emerald-400 text-sm">
          Section deleted.
        </div>
      )}
      {!tableReady && (
        <div className="mb-6 p-5 bg-amber-900/20 border border-amber-500/40 text-amber-300 text-sm leading-relaxed">
          <p className="font-medium mb-1">Database setup required</p>
          <p className="text-amber-400/80">
            The <code className="font-mono text-amber-300">page_sections</code> table does not exist in your
            Supabase project yet. Run the <strong>Section 3</strong> block from{" "}
            <code className="font-mono text-amber-300">supabase-setup.sql</code> in the
            Supabase SQL Editor, then reload this page. Until then, reorder and
            visibility changes will have no effect.
          </p>
        </div>
      )}

      {error === "notable" && (
        <div className="mb-6 px-4 py-3 bg-red-900/20 border border-red-500/30 text-red-400 text-sm">
          Could not save — the database table may not be set up yet. See the yellow notice above.
        </div>
      )}
      {error === "missing" && (
        <div className="mb-6 px-4 py-3 bg-red-900/20 border border-red-500/30 text-red-400 text-sm">
          Title and heading are required.
        </div>
      )}

      {/* ── Section list ─────────────────────────────────── */}
      <div className="border border-white/[0.06] divide-y divide-white/[0.04] mb-10">
        {sections.map((section, i) => (
          <div
            key={section.id}
            className={`flex items-center gap-3 px-5 py-4 ${
              !section.visible ? "opacity-40" : ""
            }`}
          >
            {/* Order buttons */}
            <div className="flex flex-col gap-0.5 shrink-0">
              <form action={moveSectionUp}>
                <input type="hidden" name="id" value={section.id} />
                <input type="hidden" name="sort_order" value={section.sort_order} />
                <button
                  type="submit"
                  disabled={i === 0}
                  className="w-6 h-6 flex items-center justify-center text-zinc-600 hover:text-zinc-300 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                  title="Move up"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </form>
              <form action={moveSectionDown}>
                <input type="hidden" name="id" value={section.id} />
                <input type="hidden" name="sort_order" value={section.sort_order} />
                <button
                  type="submit"
                  disabled={i === sections.length - 1}
                  className="w-6 h-6 flex items-center justify-center text-zinc-600 hover:text-zinc-300 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                  title="Move down"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Name + type */}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm">{section.title}</p>
              <p className="text-zinc-700 text-[10px] uppercase tracking-[0.15em] mt-0.5">
                {section.type === "builtin" ? "Built-in" : "Custom"}
              </p>
            </div>

            {/* Visibility toggle */}
            <form action={toggleSectionVisibility} className="shrink-0">
              <input type="hidden" name="id" value={section.id} />
              <input
                type="hidden"
                name="visible"
                value={section.visible ? "false" : "true"}
              />
              <button
                type="submit"
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border transition-colors ${
                  section.visible
                    ? "border-[#c9a84c]/40 text-[#c9a84c] hover:bg-[#c9a84c]/10"
                    : "border-white/10 text-zinc-600 hover:text-zinc-300 hover:border-white/20"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    section.visible ? "bg-[#c9a84c]" : "bg-zinc-700"
                  }`}
                />
                {section.visible ? "Visible" : "Hidden"}
              </button>
            </form>

            {/* Delete (custom only) */}
            {section.type === "custom" && (
              <form action={deleteSection} className="shrink-0">
                <input type="hidden" name="id" value={section.id} />
                <input type="hidden" name="slug" value={section.slug} />
                <button
                  type="submit"
                  onClick={(e) => {
                    if (!confirm("Delete this section? This cannot be undone.")) {
                      e.preventDefault();
                    }
                  }}
                  className="w-8 h-8 flex items-center justify-center text-zinc-700 hover:text-red-400 transition-colors"
                  title="Delete section"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        ))}
      </div>

      {/* ── Add custom section ───────────────────────────── */}
      <div className="border border-white/[0.06] bg-zinc-900/20">
        <div className="px-6 py-4 border-b border-white/[0.06]">
          <h2 className="text-sm text-white uppercase tracking-[0.15em]">
            Add Custom Section
          </h2>
          <p className="text-zinc-600 text-xs mt-1">
            Creates a new text block inserted before the Contact section.
          </p>
        </div>

        <form action={addSection} className="p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">
                Admin Label <span className="text-[#c9a84c]">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                maxLength={200}
                className={inputClass}
                placeholder="e.g. Publications"
              />
              <p className="text-zinc-700 text-[10px] mt-1">
                Only shown in this admin panel.
              </p>
            </div>
            <div>
              <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">
                Eyebrow Text
              </label>
              <input
                type="text"
                name="eyebrow"
                maxLength={200}
                className={inputClass}
                placeholder="e.g. Research & Writing"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">
              Heading <span className="text-[#c9a84c]">*</span>
            </label>
            <input
              type="text"
              name="heading"
              required
              maxLength={500}
              className={inputClass}
              placeholder="e.g. Selected Publications"
            />
          </div>

          <div>
            <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">
              Body Text
            </label>
            <textarea
              name="body"
              rows={4}
              maxLength={5000}
              className={`${inputClass} resize-y`}
              placeholder={"Paragraph one.\n\nParagraph two (leave a blank line between them)."}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">
                Button Text
              </label>
              <input
                type="text"
                name="cta_text"
                maxLength={200}
                className={inputClass}
                placeholder="e.g. View All Publications"
              />
            </div>
            <div>
              <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">
                Button URL
              </label>
              <input
                type="text"
                name="cta_url"
                maxLength={500}
                className={inputClass}
                placeholder="e.g. #contact or https://…"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#c9a84c] text-zinc-950 text-sm font-medium tracking-wide hover:bg-[#d4b96a] transition-colors"
          >
            Add Section
          </button>
        </form>
      </div>
    </div>
  );
}
