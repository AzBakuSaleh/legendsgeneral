"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Theme choice persists in each browser and follows the OS in "system" mode.
 * Cross-device preference sharing needs an authenticated account/backend.
 */
export function SiteThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      storageKey="legends-general-theme"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
