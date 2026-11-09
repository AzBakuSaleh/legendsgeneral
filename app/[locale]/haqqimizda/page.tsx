import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPageContent } from "@/app/haqqimizda/page";
import { addedLocales, type Locale } from "@/lib/i18n";
export const dynamicParams=false;
export function generateStaticParams(){return addedLocales.map(locale=>({locale}));}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;
 return {title:locale==="ru"?"О компании":"About us",description:locale==="ru"?"Legends General MMC — производство металлической мебели, конструкций и металлообработка в Азербайджане.":"Legends General MMC — metal furniture, steel structures and fabrication in Azerbaijan."};
}
export default async function LocalizedAbout({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;
 if(locale!=="ru"&&locale!=="en")notFound();
 return <AboutPageContent locale={locale as Locale}/>;
}
