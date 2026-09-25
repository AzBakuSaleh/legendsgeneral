import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeading } from "@/components/site/shared";
import { Catalog } from "@/components/site/catalog";
export const metadata: Metadata = {
  title: "Məhsul kataloqu",
  description:
    "Metal dolablar, rəflər, seyflər, tibbi və istehsalat mebeli, arxiv sistemləri. Legends General məhsul kataloqu.",
};
export default function CatalogPage() {
  return (
    <main id="main">
      <PageHeading
        title="Məhsul kataloqu"
        description="Ehtiyacınıza uyğun məhsulu tapın. Detalları birlikdə dəqiqləşdirək."
      />
      <Suspense
        fallback={
          <div className="container section" role="status">
            Kataloq yüklənir...
          </div>
        }
      >
        <Catalog />
      </Suspense>
    </main>
  );
}
