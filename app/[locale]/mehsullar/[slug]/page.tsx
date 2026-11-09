import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/lib/content";
import { tr, addedLocales, type Locale } from "@/lib/i18n";
import { localizedProductDescription } from "@/lib/product-copy";
import { ProductContent } from "@/app/mehsullar/[slug]/page";

export const dynamicParams = false;
export function generateStaticParams() {
  return addedLocales.flatMap((locale) => products.map(product => ({ locale, slug: product.slug })));
}
export async function generateMetadata({params}:{params:Promise<{locale:string;slug:string}>}): Promise<Metadata> {
  const {locale,slug}=await params;
  if(locale!=="ru" && locale!=="en") notFound();
  const product=products.find(p=>p.slug===slug);
  if(!product) notFound();
  return {title:tr(locale,product.name),description:localizedProductDescription(locale,product)};
}
export default async function LocalizedProduct({params}:{params:Promise<{locale:string;slug:string}>}) {
  const {locale,slug}=await params;
  if(locale!=="ru" && locale!=="en") notFound();
  return <ProductContent locale={locale as Locale} slug={slug}/>;
}
