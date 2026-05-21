import { getContent } from "@/lib/content";
import { saveTheme } from "../../actions";

interface ColorFieldProps {
  name: string;
  label: string;
  description: string;
  defaultValue: string;
}

function ColorField({ name, label, description, defaultValue }: ColorFieldProps) {
  return (
    <div className="flex items-center gap-4">
      <input
        type="color"
        name={name}
        defaultValue={defaultValue}
        className="w-10 h-10 shrink-0 cursor-pointer bg-transparent border border-white/[0.08] rounded-none p-0.5"
      />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-0.5">
          {label}
        </p>
        <p className="text-zinc-500 text-xs">{description}</p>
      </div>
      <code className="text-zinc-600 font-mono text-xs shrink-0">{defaultValue}</code>
    </div>
  );
}

export default async function ThemePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const content = await getContent();

  const c = {
    accent:      content["global.accent_color"] ?? "#c9a84c",
    accentHover: content["global.accent_hover"] ?? "#d4b96a",
    buttonText:  content["global.button_text"]  ?? "#09090b",
    outlineBtn:  content["global.outline_btn"]  ?? "#d4d4d8",
    textPrimary: content["global.text_primary"] ?? "#fafafa",
    textBody:    content["global.text_body"]    ?? "#a1a1aa",
    bg:          content["global.bg"]           ?? "#09090b",
  };

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
          Customise colours across the entire site. Changes take effect on next page load.
        </p>
      </div>

      {saved === "1" && (
        <div className="mb-6 px-4 py-3 bg-emerald-900/20 border border-emerald-500/30 text-emerald-400 text-sm">
          Theme saved successfully.
        </div>
      )}

      <form action={saveTheme} className="space-y-6">

        {/* ── Brand / Accent ─────────────────────────── */}
        <div className="border border-white/[0.06] bg-zinc-900/20">
          <div className="px-6 py-4 border-b border-white/[0.06]">
            <h2 className="text-xs text-white uppercase tracking-[0.2em]">Brand / Accent</h2>
          </div>
          <div className="p-6 space-y-5">
            <ColorField
              name="global.accent_color"
              label="Accent Colour"
              description="Buttons, badges, icons, highlighted text, borders"
              defaultValue={c.accent}
            />
            <ColorField
              name="global.accent_hover"
              label="Accent Hover"
              description="Accent colour when the user hovers over it"
              defaultValue={c.accentHover}
            />
          </div>
        </div>

        {/* ── Buttons ────────────────────────────────── */}
        <div className="border border-white/[0.06] bg-zinc-900/20">
          <div className="px-6 py-4 border-b border-white/[0.06]">
            <h2 className="text-xs text-white uppercase tracking-[0.2em]">Buttons</h2>
          </div>
          <div className="p-6 space-y-5">
            <ColorField
              name="global.button_text"
              label="Filled Button Text"
              description="Text colour inside accent-coloured (filled) buttons — use dark on light accents"
              defaultValue={c.buttonText}
            />
            <ColorField
              name="global.outline_btn"
              label="Outline Button Colour"
              description="Text and border colour for secondary/outline buttons (e.g. &ldquo;Request an Analysis&rdquo;)"
              defaultValue={c.outlineBtn}
            />
          </div>
        </div>

        {/* ── Text ───────────────────────────────────── */}
        <div className="border border-white/[0.06] bg-zinc-900/20">
          <div className="px-6 py-4 border-b border-white/[0.06]">
            <h2 className="text-xs text-white uppercase tracking-[0.2em]">Text</h2>
          </div>
          <div className="p-6 space-y-5">
            <ColorField
              name="global.text_primary"
              label="Primary Text / Headings"
              description="Page headings, navigation, and high-emphasis labels"
              defaultValue={c.textPrimary}
            />
            <ColorField
              name="global.text_body"
              label="Body Text"
              description="Paragraphs, descriptions, and secondary content"
              defaultValue={c.textBody}
            />
          </div>
        </div>

        {/* ── Background ─────────────────────────────── */}
        <div className="border border-white/[0.06] bg-zinc-900/20">
          <div className="px-6 py-4 border-b border-white/[0.06]">
            <h2 className="text-xs text-white uppercase tracking-[0.2em]">Background</h2>
          </div>
          <div className="p-6">
            <ColorField
              name="global.bg"
              label="Page Background"
              description="Main site background — also used for the scrollbar track"
              defaultValue={c.bg}
            />
          </div>
        </div>

        {/* ── Live preview ───────────────────────────── */}
        <div className="border border-white/[0.06] bg-zinc-900/20">
          <div className="px-6 py-4 border-b border-white/[0.06]">
            <h2 className="text-xs text-white uppercase tracking-[0.2em]">Current Preview</h2>
          </div>
          <div className="p-6" style={{ backgroundColor: c.bg }}>
            <p
              className="text-xs uppercase tracking-[0.2em] mb-3"
              style={{ color: c.accent }}
            >
              Eyebrow Label
            </p>
            <h3
              className="text-2xl mb-3"
              style={{ fontFamily: "var(--font-dm-serif), Georgia, serif", color: c.textPrimary }}
            >
              Heading in Primary Text
            </h3>
            <p className="text-sm mb-6 max-w-sm" style={{ color: c.textBody }}>
              Body paragraph text in the secondary colour. Used for descriptions and supporting copy throughout the site.
            </p>
            <div className="flex flex-wrap gap-3">
              <span
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium"
                style={{ backgroundColor: c.accent, color: c.buttonText }}
              >
                Primary Button
              </span>
              <span
                className="inline-flex items-center px-5 py-2.5 text-sm border"
                style={{ color: c.outlineBtn, borderColor: c.outlineBtn + "50" }}
              >
                Outline Button
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-zinc-700 text-xs">
            Only valid 6-digit hex values are accepted. Invalid values are ignored.
          </p>
          <button
            type="submit"
            className="px-6 py-2.5 btn-filled text-sm font-medium tracking-wide transition-colors"
          >
            Save Theme
          </button>
        </div>
      </form>
    </div>
  );
}
