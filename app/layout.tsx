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
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://legends-general-actual-preview.onrender.com";
const socialImageUrl = new URL(withSiteBasePath("/images/logo.jpg"), siteUrl).toString();
const socialTitle = "Legends General | Metal istehsalı və xidmətlər";
const socialDescription =
  "Azərbaycanda metal mebel və konstruksiyalar, dekorativ metal işləri, konteynerlər, sənaye soyuducu qapıları, kuzovlar və elektrostatik toz boyama.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: socialTitle,
    template: "%s | Legends General",
  },
  description: socialDescription,
  icons: { icon: withSiteBasePath("/favicon.svg") },
  openGraph: {
    title: socialTitle,
    description: socialDescription,
    url: siteUrl,
    locale: "az_AZ",
    type: "website",
    siteName: "Legends General",
    images: [
      {
        url: socialImageUrl,
        width: 897,
        height: 954,
        alt: "Legends General — Professional Metal Works logo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
    images: [socialImageUrl],
  },
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
