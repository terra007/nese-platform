import { getContent } from "@/lib/content";
import { saveTheme } from "../actions";

export default async function ThemePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const content = await getContent();

  const accentColor = content["global.accent_color"] ?? "#c9a84c";
  const accentHover = content["global.accent_hover"] ?? "#d4b96a";

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-2xl text-white mb-1"
          style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
        >
          Theme &amp; Colors
        </h1>
        <p className="text-zinc-500 text-sm">
          Customise the accent color used throughout the site.
        </p>
      </div>

      {saved === "1" && (
        <div className="mb-6 px-4 py-3 bg-emerald-900/20 border border-emerald-500/30 text-emerald-400 text-sm">
          Theme saved. Reload the main site to see the changes.
        </div>
      )}

      <form action={saveTheme}>
        <div className="border border-white/[0.06] bg-zinc-900/20">
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h2 className="text-sm text-white uppercase tracking-[0.15em]">
              Colour Palette
            </h2>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#c9a84c] text-zinc-950 text-xs font-medium tracking-wide hover:bg-[#d4b96a] transition-colors"
            >
              Save Theme
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Accent color */}
            <div>
              <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-3">
                Accent Color
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  name="global.accent_color"
                  defaultValue={accentColor}
                  className="w-12 h-10 cursor-pointer bg-transparent border border-white/[0.08] rounded-none p-0.5"
                />
                <div>
                  <p className="text-white text-sm font-mono">{accentColor}</p>
                  <p className="text-zinc-600 text-xs mt-0.5">
                    Used for badges, buttons, highlights, and icons
                  </p>
                </div>
              </div>
            </div>

            {/* Accent hover */}
            <div>
              <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-3">
                Accent Hover Color
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  name="global.accent_hover"
                  defaultValue={accentHover}
                  className="w-12 h-10 cursor-pointer bg-transparent border border-white/[0.08] rounded-none p-0.5"
                />
                <div>
                  <p className="text-white text-sm font-mono">{accentHover}</p>
                  <p className="text-zinc-600 text-xs mt-0.5">
                    Used when hovering over accent-colored elements
                  </p>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="border-t border-white/[0.06] pt-6">
              <p className="text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-4">
                Current Preview
              </p>
              <div className="flex flex-wrap gap-3">
                <span
                  className="px-4 py-2 text-zinc-950 text-sm font-medium"
                  style={{ backgroundColor: accentColor }}
                >
                  Primary Button
                </span>
                <span
                  className="px-4 py-2 text-sm font-medium border"
                  style={{ color: accentColor, borderColor: accentColor + "50" }}
                >
                  Outline Button
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: accentColor }}
                >
                  Accent Text
                </span>
                <span
                  className="w-4 h-4 rounded-full animate-pulse mt-1"
                  style={{ backgroundColor: accentColor }}
                />
              </div>
            </div>

            <div className="bg-zinc-950/50 border border-white/[0.04] p-4 rounded">
              <p className="text-zinc-500 text-xs leading-relaxed">
                <strong className="text-zinc-400">Note:</strong> Color changes
                take effect immediately for visitors who reload the page. The
                accent color is applied via a CSS custom property (
                <code className="text-zinc-400 font-mono text-[11px]">
                  --color-accent
                </code>
                ) that overrides the site-wide theme.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
