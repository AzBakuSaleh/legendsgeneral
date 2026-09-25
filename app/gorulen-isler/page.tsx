import type { Metadata } from "next";
import { PageHeading, AboutBand } from "@/components/site/shared";
import { Gallery } from "@/components/site/gallery";
export const metadata: Metadata = {
  title: "Görülən işlər",
  description: "Legends General-ın metal mebel və rəf işlərindən nümunələr.",
};
export default function ProjectsPage() {
  return (
    <main id="main">
      <PageHeading
        title="Görülən işlər"
        description="Fikirdən hazır məhsula. Gördüyümüz işlərlə yaxından tanış olun."
      />
      <Gallery />
      <AboutBand />
    </main>
  );
}
