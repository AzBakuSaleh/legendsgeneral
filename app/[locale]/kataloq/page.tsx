import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogPageContent } from "@/app/kataloq/page";
import { addedLocales, type Locale } from "@/lib/i18n";
export const dynamicParams = false;
export function generateStaticParams() { return addedLocales.map(locale => ({locale})); }
export async function generateMetadata({params}:{params:Promise<{locale:string}>}): Promise<Metadata> {
  const {locale}=await params;
  return {
    title: locale === "ru" ? "Каталог продукции" : "Product catalog",
    description: locale === "ru"
      ? "Каталог металлических стеллажей, шкафов, металлоконструкций и промышленного оборудования Legends General."
      : "Explore Legends General shelving, cabinets, steel structures and industrial products.",
  };
}
export default async function LocalizedCatalog({params}:{params:Promise<{locale:string}>}) {
  const {locale}=await params;
  if (locale!=="ru" && locale!=="en") notFound();
  return <CatalogPageContent locale={locale as Locale}/>;
}
