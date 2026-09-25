import type { Metadata } from "next";
import { PageHeading } from "@/components/site/shared";
import { ContactSection } from "@/components/site/contact";
export const metadata: Metadata = {
  title: "Əlaqə",
  description:
    "Legends General ilə telefon və ya WhatsApp vasitəsilə əlaqə saxlayın. Məhsullar, ölçülər və sifariş haqqında məlumat alın.",
};
export default function ContactPage() {
  return (
    <main id="main">
      <PageHeading
        title="Bizimlə əlaqə"
        description="Məhsullar və sifariş haqqında məlumat almaq üçün bizə müraciət edin."
      />
      <ContactSection />
    </main>
  );
}
