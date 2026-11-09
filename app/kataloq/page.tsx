import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Suspense } from "react";
import { Catalog } from "@/components/site/catalog";
import styles from "./v2-catalog.module.css";

export const metadata: Metadata = {
  title: "Məhsul kataloqu",
  description:
    "Legends General MMC: metal stellajlar, dolablar, yol nişanları, işıq dirəkləri, seyflər, konteynerlər, metal konstruksiyalar və sənaye xidmətləri.",
};

export default function CatalogPage() {
  return (
    <main id="main" className={styles.catalogPage}>
      <section className={styles.hero} aria-labelledby="catalog-heading">
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumbs} aria-label="Səhifə yolu">
            <Link href="/">Ana səhifə</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Kataloq</span>
          </nav>
          <span className={styles.kicker}>Legends General MMC · İstehsal istiqamətləri</span>
          <div className={styles.heroLayout}>
            <h1 id="catalog-heading">İstehsal həlləri. <span>Bir kataloqda.</span></h1>
            <div className={styles.heroSide}>
              <p>Metal məhsulları kateqoriyaya görə araşdırın, uyğun variantı seçin və ehtiyacınıza görə birbaşa istehsalçıdan təklif alın.</p>
              <a className={styles.heroLink} href="#catalog-browse">
                Məhsullara bax <ArrowDown size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <Suspense fallback={<div className={styles.fallback} role="status">Kataloq yüklənir...</div>}>
        <Catalog />
      </Suspense>
    </main>
  );
}
