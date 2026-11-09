import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { addedLocales } from "@/lib/i18n";
export const dynamicParams = false;
export function generateStaticParams() { return addedLocales.map(locale => ({locale})); }
export default async function LocalizedLayout({
  children,
  params,
}: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "ru" && locale !== "en") notFound();
  return children;
}
