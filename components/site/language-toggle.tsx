"use client";
import { usePathname } from "next/navigation";
import { Globe2 } from "lucide-react";
import { localeFromPath, switchLocaleHref, type Locale } from "@/lib/i18n";
import styles from "./language-toggle.module.css";

export function LanguageToggle() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  return (
    <label className={styles.wrap} title="Azərbaycan / Русский / English">
      <Globe2 size={17} strokeWidth={1.8} aria-hidden="true" />
      <span className={styles.srOnly}>Saytın dili / Язык / Language</span>
      <select
        aria-label="Saytın dili / Язык / Language"
        value={locale}
        onChange={(event) => {
          const target = event.currentTarget.value as Locale;
          if (target === locale) return;
          // Keep the exact product, filter, query and anchor on language switch.
          window.location.assign(
            switchLocaleHref(window.location.pathname, target) +
            window.location.search + window.location.hash
          );
        }}
      >
        <option value="az">AZ</option>
        <option value="ru">RU</option>
        <option value="en">EN</option>
      </select>
    </label>
  );
}
