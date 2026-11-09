"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import styles from "./theme-toggle.module.css";
import { usePathname } from "next/navigation";
import { localeFromPath } from "@/lib/i18n";

type ThemeChoice = "system" | "light" | "dark";
const labels: Record<ThemeChoice, string> = {
  system: "Sistem",
  light: "Açıq",
  dark: "Tünd",
};

// React-safe mounted snapshot prevents hydration mismatch without effect-driven state.
const subscribe = () => () => {};
const getBrowserSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const locale = localeFromPath(usePathname());
  const mounted = useSyncExternalStore(subscribe, getBrowserSnapshot, getServerSnapshot);
  const choice: ThemeChoice =
    mounted && (theme === "dark" || theme === "light") ? theme : "system";
  const Icon = choice === "dark" ? Moon : choice === "light" ? Sun : Monitor;
  const modes = locale === "ru" ? { system:"Система", light:"Светлая",dark:"Тёмная" } : locale === "en" ? {system:"System",light:"Light",dark:"Dark"} : labels;
  return (
    <label className={styles.control} title={`${locale === "ru" ? "Оформление" : locale === "en" ? "Appearance" : "Görünüş"}: ${modes[choice]}`}>
      <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
      <span className={styles.text}>{locale === "ru" ? "Оформление" : locale === "en" ? "Appearance" : "Görünüş"}</span>
      <select
        aria-label={locale === "ru" ? "Тема оформления сайта" : locale === "en" ? "Site appearance mode" : "Saytın görünüş rejimi"}
        value={choice}
        onChange={(event) => setTheme(event.currentTarget.value)}
      >
        <option value="system">{locale === "ru" ? "Как в системе" : locale === "en" ? "System" : "Sistemə uyğun"}</option>
        <option value="light">{locale === "ru" ? "Светлая" : locale === "en" ? "Light" : "Açıq rejim"}</option>
        <option value="dark">{locale === "ru" ? "Тёмная" : locale === "en" ? "Dark" : "Tünd rejim"}</option>
      </select>
    </label>
  );
}
