"use client";

import { usePathname } from "next/navigation";
import { ChevronDown, Globe2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { localeFromPath, localeNames, switchLocaleHref, type Locale } from "@/lib/i18n";
import styles from "./language-toggle.module.css";

const languages = [
  { locale: "az", code: "AZ" },
  { locale: "ru", code: "RU" },
  { locale: "en", code: "EN" },
] as const;

const heading: Record<Locale, string> = {
  az: "Saytın dili",
  ru: "Язык сайта",
  en: "Website language",
};

export function LanguageToggle() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);

  function selectLanguage(target: string) {
    if ((target !== "az" && target !== "ru" && target !== "en") || target === locale) return;

    // Preserve selected catalog filters, product path and current section.
    window.location.assign(
      switchLocaleHref(window.location.pathname, target) +
        window.location.search +
        window.location.hash,
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={styles.trigger}
          aria-label={`${heading[locale]}: ${localeNames[locale]}`}
          title={heading[locale]}
        >
          <Globe2 size={18} strokeWidth={1.8} aria-hidden="true" />
          <span className={styles.currentCode}>{locale.toUpperCase()}</span>
          <ChevronDown size={15} strokeWidth={1.9} aria-hidden="true" className={styles.chevron} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={9}
        collisionPadding={12}
        className={styles.menu}
        aria-label={heading[locale]}
      >
        <div className={styles.menuHeading}>{heading[locale]}</div>
        <DropdownMenuRadioGroup value={locale} onValueChange={selectLanguage}>
          {languages.map((option) => (
            <DropdownMenuRadioItem
              key={option.locale}
              value={option.locale}
              className={styles.item}
              lang={option.locale}
            >
              <span className={styles.languageCode}>{option.code}</span>
              <span className={styles.languageName}>{localeNames[option.locale]}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
