import type { Metadata } from "next";
import { PageHeading } from "@/components/site/shared";
import { ContactSection } from "@/components/site/contact";
import type { Locale } from "@/lib/i18n";
export const metadata: Metadata = {
  title: "Əlaqə",
  description:
    "Legends General ilə telefon və ya WhatsApp vasitəsilə əlaqə saxlayın. Məhsullar, xidmətlər və sifariş haqqında məlumat alın.",
};
export default function ContactPage() { return <ContactPageContent locale="az" />; }
export function ContactPageContent({locale}:{locale:Locale}) {
  return (
    <main id="main">
      <PageHeading locale={locale}
        title={locale === "ru" ? "Связаться с нами" : locale === "en" ? "Contact us" : "Bizimlə əlaqə"}
        description={locale === "ru" ? "Свяжитесь с нами по вопросам продукции, услуг и заказов." : locale === "en" ? "Get in touch about products, services and orders." : "Məhsul və xidmətlərimiz haqqında məlumat almaq üçün bizə müraciət edin."}
      />
      <ContactSection locale={locale} />
    </main>
  );
}
