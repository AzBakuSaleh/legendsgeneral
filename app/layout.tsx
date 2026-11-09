import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/shared";
import { withSiteBasePath } from "@/lib/site-path";
import "./globals.css";
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
    <html lang="az" data-scroll-behavior="smooth">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
