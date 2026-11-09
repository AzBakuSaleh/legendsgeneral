import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeContent } from "@/app/page";
import { addedLocales, type Locale } from "@/lib/i18n";
export const dynamicParams = false;
export function generateStaticParams() { return addedLocales.map(locale => ({locale})); }
export async function generateMetadata({ params }: { params: Promise<{locale:string}> }): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: locale === "ru" ? "Металлоизделия и производство" : "Metal fabrication and products",
    description: locale === "ru"
      ? "Legends General — металлические стеллажи, шкафы, конструкции и изготовление металлоизделий на заказ в Азербайджане."
      : "Legends General — metal shelving, cabinets, structures and custom metal fabrication in Azerbaijan.",
  };
}
export default async function LocalizedHome({ params }: {params: Promise<{locale:string}>}) {
  const {locale} = await params;
  if (locale !== "ru" && locale !== "en") notFound();
  return <HomeContent locale={locale as Locale} />;
}
