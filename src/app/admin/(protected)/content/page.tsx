import { getContent, CONTENT_SCHEMA } from "@/lib/content";
import { saveContent } from "../../actions";

export default async function ContentPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const content = await getContent();

  const inputClass =
    "w-full bg-zinc-950 border border-white/[0.08] px-3 py-2.5 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-[#c9a84c]/40 transition-colors";

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-2xl text-white mb-1"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          Content Editor
        </h1>
        <p className="text-zinc-500 text-sm">
          Edit the text content for each section of the website.
        </p>
      </div>

      {saved === "1" && (
        <div className="mb-6 px-4 py-3 bg-emerald-900/20 border border-emerald-500/30 text-emerald-400 text-sm">
          Content saved successfully. Changes will appear on the site immediately.
        </div>
      )}
      {error === "1" && (
        <div className="mb-6 px-4 py-3 bg-red-900/20 border border-red-500/30 text-red-400 text-sm">
          Failed to save. Please try again.
        </div>
      )}

      <div className="space-y-10">
        {CONTENT_SCHEMA.map((section) => (
          <form key={section.section} action={saveContent}>
            <div className="border border-white/[0.06] bg-zinc-900/20">
              <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
                <h2 className="text-sm text-white uppercase tracking-[0.15em]">
                  {section.label}
                </h2>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#c9a84c] text-zinc-950 text-xs font-medium tracking-wide hover:bg-[#d4b96a] transition-colors"
                >
                  Save Section
                </button>
              </div>

              <div className="p-6 space-y-5">
                {section.fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        name={field.key}
                        rows={3}
                        defaultValue={content[field.key] ?? ""}
                        className={`${inputClass} resize-y`}
                      />
                    ) : (
                      <input
                        type="text"
                        name={field.key}
                        defaultValue={content[field.key] ?? ""}
                        className={inputClass}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}
