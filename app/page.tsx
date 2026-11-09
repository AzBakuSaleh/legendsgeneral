import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/site/hero";
import { AboutBand } from "@/components/site/shared";
import { Gallery } from "@/components/site/gallery";
import { ContactSection } from "@/components/site/contact";
import { divisions, categoryMedia } from "@/lib/content";
import { ProductGallery } from "@/components/site/product-gallery";
import { Partners } from "@/components/site/partners";
import { ServiceAnnotation } from "@/components/site/service-annotation";
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Partners />
      <section className="section home-catalog" aria-labelledby="catalog-title">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2 id="catalog-title">Məhsullar və xidmətlər</h2>
              <p>
                Metal mebeldən konstruksiyalara, sifarişinizə uyğun istehsal.
              </p>
            </div>
            <Link className="text-link" href="/kataloq/">
              Kataloqa bax <ArrowUpRight />
            </Link>
          </div>
          <div className="category-grid services-grid">
            {divisions.map((c) => (
              <article
                className="category-card"
                key={c.id}
              >
                <ProductGallery images={categoryMedia[c.id] ?? [{ src: c.image, title: c.name, fit: c.id === "arxiv" ? "contain" : "cover" }]} name={c.name} href={`/kataloq/?kateqoriya=${c.id}`} overlay={!categoryMedia[c.id] ? <ServiceAnnotation category={c.id} /> : undefined} />
                <Link href={`/kataloq/?kateqoriya=${c.id}`} className="category-label">
                  <div>
                    <h3>{c.name}</h3>
                    <p>{c.short}</p>
                  </div>
                  <span className="round-arrow">
                    <ArrowUpRight />
                  </span>
                </Link>
              </article>
            ))}
          </div>
          <p className="image-note">
            Şəkillər məhsul və xidmət istiqamətlərini göstərən nümunə
            görüntülərdir.
          </p>
        </div>
      </section>
      <AboutBand />
      <Gallery compact />
      <ContactSection />
    </main>
  );
}
