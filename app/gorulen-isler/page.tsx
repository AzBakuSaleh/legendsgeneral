import type { Metadata } from "next";
import { PageHeading, AboutBand } from "@/components/site/shared";
import { Gallery } from "@/components/site/gallery";
import { label, type Locale } from "@/lib/i18n";
export const metadata: Metadata = {
  title: "Görülən işlər",
  description: "Legends General-ın metal mebel və rəf işlərindən nümunələr.",
};
export default function ProjectsPage() { return <ProjectsPageContent locale="az"/>; }
export function ProjectsPageContent({locale}:{locale:Locale}) {
  return (
    <main id="main">
      <PageHeading locale={locale}
        title={label(locale,"ourWork")}
        description={locale === "ru" ? "От идеи до готового изделия. Познакомьтесь с нашими проектами." : locale === "en" ? "From concept to finished product. Explore our completed work." : "Fikirdən hazır məhsula. Gördüyümüz işlərlə yaxından tanış olun."}
      />
      <Gallery locale={locale} />
      <AboutBand locale={locale} />
    </main>
  );
}
