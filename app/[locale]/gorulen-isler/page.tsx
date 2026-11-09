import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectsPageContent } from "@/app/gorulen-isler/page";
import { addedLocales, type Locale } from "@/lib/i18n";
export const dynamicParams = false;
export function generateStaticParams(){return addedLocales.map(locale=>({locale}));}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const {locale}=await params;
  return {title:locale==="ru"?"Наши работы":"Our projects",description:locale==="ru"?"Примеры выполненных металлоизделий Legends General.":"A selection of completed Legends General metalwork."};
}
export default async function LocalizedProjects({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;
 if(locale!=="ru"&&locale!=="en")notFound();
 return <ProjectsPageContent locale={locale as Locale}/>;
}
