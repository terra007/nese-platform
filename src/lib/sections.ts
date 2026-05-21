import { createClient } from "@/lib/supabase/server";

export interface PageSection {
  id: string;
  slug: string;
  type: "builtin" | "custom";
  title: string;
  visible: boolean;
  sort_order: number;
  content: {
    eyebrow?: string;
    heading?: string;
    body?: string;
    cta_text?: string;
    cta_url?: string;
  };
}

export const DEFAULT_SECTIONS: PageSection[] = [
  { id: "hero",     slug: "hero",     type: "builtin", title: "Hero",           visible: true, sort_order: 0, content: {} },
  { id: "services", slug: "services", type: "builtin", title: "Services",       visible: true, sort_order: 1, content: {} },
  { id: "mission",  slug: "mission",  type: "builtin", title: "Mission",        visible: true, sort_order: 2, content: {} },
  { id: "approach", slug: "approach", type: "builtin", title: "Approach",       visible: true, sort_order: 3, content: {} },
  { id: "founder",  slug: "founder",  type: "builtin", title: "Team / Founder", visible: true, sort_order: 4, content: {} },
  { id: "contact",  slug: "contact",  type: "builtin", title: "Contact",        visible: true, sort_order: 5, content: {} },
];

export async function getPageSections(): Promise<PageSection[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("page_sections")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return DEFAULT_SECTIONS;
    return data as PageSection[];
  } catch {
    return DEFAULT_SECTIONS;
  }
}

/** Returns true only if the page_sections table exists AND has rows. */
export async function pagesectionsReady(): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("page_sections")
      .select("id", { head: true, count: "exact" });
    return !error;
  } catch {
    return false;
  }
}
