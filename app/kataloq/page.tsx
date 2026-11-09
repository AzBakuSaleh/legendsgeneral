import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowDownRight, ArrowRight, Layers3 } from "lucide-react";
import { Catalog } from "@/components/site/catalog";
import { withSiteBasePath } from "@/lib/site-path";

export const metadata: Metadata = {
  title: "Məhsullar və xidmətlər",
  description:
    "Legends General: metal stellajlar, dolablar, sənaye mebelləri, metal konstruksiyalar, konteynerlər və istehsalat xidmətləri.",
};

export default function CatalogPage() {
  return (
    <main id="main" className="showcase-catalog-page">
      <section className="showcase-catalog-intro" aria-labelledby="showcase-catalog-title">
        <img
          src={withSiteBasePath("/images/catalog-preview/rack-loaded.jpg")}
          alt=""
          width="1350"
          height="900"
          className="showcase-catalog-cover"
          fetchPriority="high"
        />
        <div className="container showcase-catalog-intro-content">
          <nav aria-label="Səhifə yolu" className="showcase-catalog-breadcrumb">
            <Link href="/">Ana səhifə</Link>
            <ArrowRight size={13} aria-hidden="true" />
            <span>Kataloq</span>
          </nav>
          <span className="showcase-catalog-eyebrow"><Layers3 size={15} aria-hidden="true" /> LEGENDS GENERAL / MƏHSULLAR</span>
          <h1 id="showcase-catalog-title">Məhsul kataloqu</h1>
          <p>Metal konstruksiya və sənaye saxlama sistemləri — məqsədinizə uyğun məhsul qrupunu seçin.</p>
          <a href="#mehsul-siyahisi" className="showcase-catalog-hero-link">
            Məhsulları kəşf et <ArrowDownRight size={18} aria-hidden="true" />
          </a>
          <span className="showcase-catalog-visual-note">Nümunə görüntü</span>
        </div>
      </section>
      <Suspense fallback={<div className="container section" role="status">Kataloq yüklənir...</div>}>
        <Catalog />
      </Suspense>
    </main>
  );
}
