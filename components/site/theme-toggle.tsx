"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { ChevronDown, Monitor, Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { localeFromPath } from "@/lib/i18n";
import styles from "./theme-toggle.module.css";

type ThemeChoice = "system" | "light" | "dark";

const subscribe = () => () => {};
const getBrowserSnapshot = () => true;
const getServerSnapshot = () => false;

const options = [
  { value: "system", Icon: Monitor, text: { az: "Sistemə uyğun", ru: "Как в системе", en: "System" } },
  { value: "light", Icon: Sun, text: { az: "Açıq rejim", ru: "Светлая тема", en: "Light mode" } },
  { value: "dark", Icon: Moon, text: { az: "Tünd rejim", ru: "Тёмная тема", en: "Dark mode" } },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const locale = localeFromPath(usePathname());
  const mounted = useSyncExternalStore(subscribe, getBrowserSnapshot, getServerSnapshot);
  const choice: ThemeChoice =
    mounted && (theme === "dark" || theme === "light") ? theme : "system";
  const selected = options.find((option) => option.value === choice) ?? options[0];
  const title = locale === "ru" ? "Оформление сайта" : locale === "en" ? "Site appearance" : "Saytın görünüşü";
  const ActiveIcon = selected.Icon;

  function updateTheme(value: string) {
    if (value === "system" || value === "light" || value === "dark") {
      setTheme(value);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={styles.trigger}
          aria-label={`${title}: ${selected.text[locale]}`}
          title={title}
        >
          <ActiveIcon size={18} strokeWidth={1.9} aria-hidden="true" />
          <span className={styles.currentLabel}>{selected.text[locale]}</span>
          <ChevronDown size={15} strokeWidth={1.9} className={styles.chevron} aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={9}
        collisionPadding={12}
        className={styles.menu}
        aria-label={title}
      >
        <div className={styles.menuHeading}>{title}</div>
        <DropdownMenuRadioGroup value={choice} onValueChange={updateTheme}>
          {options.map(({ value, Icon, text }) => (
            <DropdownMenuRadioItem
              key={value}
              value={value}
              className={styles.item}
            >
              <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
              <span>{text[locale]}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
