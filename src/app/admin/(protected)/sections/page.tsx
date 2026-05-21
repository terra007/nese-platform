import { getPageSections, pagesectionsReady } from "@/lib/sections";
import { addSection } from "../../actions";
import SectionsList from "../../SectionsList";

export default async function SectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ added?: string; error?: string }>;
}) {
  const { added, error } = await searchParams;
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
          Drag to reorder · toggle visibility · add or delete custom blocks.
        </p>
      </div>

      {!tableReady && (
        <div className="mb-6 p-5 bg-amber-900/20 border border-amber-500/40 text-amber-300 text-sm leading-relaxed">
          <p className="font-medium mb-1">Database setup required</p>
          <p className="text-amber-400/80">
            The <code className="font-mono text-amber-300">page_sections</code> table
            does not exist yet. Run the <strong>Section 3</strong> block from{" "}
            <code className="font-mono text-amber-300">supabase-setup.sql</code> in
            the Supabase SQL Editor, then reload this page.
          </p>
        </div>
      )}

      {added === "1" && (
        <div className="mb-6 px-4 py-3 bg-emerald-900/20 border border-emerald-500/30 text-emerald-400 text-sm">
          Section added.
        </div>
      )}
      {error === "missing" && (
        <div className="mb-6 px-4 py-3 bg-red-900/20 border border-red-500/30 text-red-400 text-sm">
          Title and heading are required.
        </div>
      )}
      {error === "notable" && (
        <div className="mb-6 px-4 py-3 bg-red-900/20 border border-red-500/30 text-red-400 text-sm">
          Could not save — run the SQL setup first.
        </div>
      )}

      {/* Drag-and-drop section list */}
      <div className="mb-10">
        <SectionsList initialSections={sections} />
      </div>

      {/* Add custom section form */}
      <div className="border border-white/[0.06] bg-zinc-900/20">
        <div className="px-6 py-4 border-b border-white/[0.06]">
          <h2 className="text-sm text-white uppercase tracking-[0.15em]">
            Add Custom Section
          </h2>
          <p className="text-zinc-600 text-xs mt-1">
            Creates a new text block placed before the Contact section.
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
                Only shown in this panel.
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
                placeholder="e.g. Research &amp; Writing"
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
              placeholder={"Paragraph one.\n\nParagraph two (blank line between them)."}
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
