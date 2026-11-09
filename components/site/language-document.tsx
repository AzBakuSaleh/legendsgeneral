"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { localeFromPath } from "@/lib/i18n";

/** Set document language after localized client navigation.
 * The preview stays noindex until multilingual SEO is fully verified. */
export function LanguageDocument() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
