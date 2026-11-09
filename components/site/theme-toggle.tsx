"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import styles from "./theme-toggle.module.css";

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
  const mounted = useSyncExternalStore(subscribe, getBrowserSnapshot, getServerSnapshot);
  const choice: ThemeChoice =
    mounted && (theme === "dark" || theme === "light") ? theme : "system";
  const Icon = choice === "dark" ? Moon : choice === "light" ? Sun : Monitor;
  return (
    <label className={styles.control} title={`Görünüş: ${labels[choice]}`}>
      <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
      <span className={styles.text}>Görünüş</span>
      <select
        aria-label="Saytın görünüş rejimi"
        value={choice}
        onChange={(event) => setTheme(event.currentTarget.value)}
      >
        <option value="system">Sistemə uyğun</option>
        <option value="light">Açıq rejim</option>
        <option value="dark">Tünd rejim</option>
      </select>
    </label>
  );
}
