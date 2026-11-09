import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactPageContent } from "@/app/elaqe/page";
import { addedLocales, type Locale } from "@/lib/i18n";
export const dynamicParams = false;
export function generateStaticParams() { return addedLocales.map(locale => ({locale})); }
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const {locale}=await params;
  return {title: locale==="ru" ? "Контакты" : "Contact",description:locale==="ru" ? "Напишите Legends General по вопросам продукции и заказов." : "Contact Legends General about products, services and orders."};
}
export default async function LocalizedContact({params}:{params:Promise<{locale:string}>}){
  const {locale}=await params;
  if(locale!=="ru"&&locale!=="en")notFound();
  return <ContactPageContent locale={locale as Locale}/>;
}
