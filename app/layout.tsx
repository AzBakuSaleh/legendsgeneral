import type { Metadata } from "next";
import { HomeHeader } from "@/components/site/home-header";
import { Footer } from "@/components/site/shared";
import { SiteThemeProvider } from "@/components/site/theme-provider";
import { LanguageDocument } from "@/components/site/language-document";
import { PageTransitions } from "@/components/site/page-transitions";
import { withSiteBasePath } from "@/lib/site-path";
import "./globals.css";
import "./showcase-catalog.css";
import "./site-theme.css";
export const metadata: Metadata = {
  title: {
    default: "Legends General | Metal istehsalı və xidmətlər",
    template: "%s | Legends General",
  },
  description:
    "Azərbaycanda metal mebel və konstruksiyalar, dekorativ metal işləri, konteynerlər, sənaye soyuducu qapıları, kuzovlar və elektrostatik toz boyama.",
  icons: { icon: withSiteBasePath("/favicon.svg") },
  openGraph: { locale: "az_AZ", type: "website", siteName: "Legends General" },
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <SiteThemeProvider>
          <LanguageDocument />
          <PageTransitions />
          <HomeHeader />
          {children}
          <Footer />
        </SiteThemeProvider>
      </body>
    </html>
  );
}
