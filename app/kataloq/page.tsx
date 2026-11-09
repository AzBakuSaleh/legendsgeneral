import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeading } from "@/components/site/shared";
import { Catalog } from "@/components/site/catalog";
export const metadata: Metadata = {
  title: "Məhsullar və xidmətlər",
  description:
    "Metal mebel, konstruksiyalar, dekorasiya, konteynerlər, soyuducu qapıları, kuzovlar və elektrostatik toz boyama.",
};
export default function CatalogPage() {
  return (
    <main id="main">
      <PageHeading
        title="Məhsullar və xidmətlər"
        description="İstiqaməti seçin, məhsul və xidmətlərlə tanış olun."
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
