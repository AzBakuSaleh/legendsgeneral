import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/shared";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Legends General | Metal mebel və saxlama sistemləri",
    template: "%s | Legends General",
  },
  description:
    "Azərbaycanda metal dolab, rəf, seyf, tibbi mebel və arxiv sistemləri istehsalı. Məhsullara baxın və Legends General ilə əlaqə saxlayın.",
  icons: { icon: "/favicon.svg" },
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
