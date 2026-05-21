import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Mission from "@/components/Mission";
import Approach from "@/components/Approach";
import Founder from "@/components/Founder";
import Contact from "@/components/Contact";
import CustomSection from "@/components/CustomSection";
import Footer from "@/components/Footer";
import { getPageSections } from "@/lib/sections";
import type { PageSection } from "@/lib/sections";

type BuiltinKey = "hero" | "services" | "mission" | "approach" | "founder" | "contact";

const BUILTIN: Record<BuiltinKey, React.ComponentType> = {
  hero:     Hero,
  services: Services,
  mission:  Mission,
  approach: Approach,
  founder:  Founder,
  contact:  Contact,
};

function renderSection(section: PageSection) {
  if (section.type === "builtin") {
    const Component = BUILTIN[section.slug as BuiltinKey];
    return Component ? <Component key={section.id} /> : null;
  }
  return <CustomSection key={section.id} section={section} />;
}

export default async function Home() {
  const sections = await getPageSections();
  const visible  = sections.filter((s) => s.visible);

  return (
    <>
      <Navigation />
      <main>{visible.map(renderSection)}</main>
      <Footer />
    </>
  );
}
