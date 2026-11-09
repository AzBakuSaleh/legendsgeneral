"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { localeFromPath } from "@/lib/i18n";

/** Keep the document language and reading tools accurate during client navigation.
 * Static-exported Next.js pages share one root <html> markup. A production
 * multilingual launch should generate per-locale HTML lang at build time.
 */
export function DocumentLanguage() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.lang = localeFromPath(pathname);
  }, [pathname]);
  return null;
}
