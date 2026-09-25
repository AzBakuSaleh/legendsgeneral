import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/site/hero";
import { AboutBand } from "@/components/site/shared";
import { Gallery } from "@/components/site/gallery";
import { ContactSection } from "@/components/site/contact";
import { categories } from "@/lib/content";
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <section className="section container" aria-labelledby="catalog-title">
        <div className="section-heading">
          <div>
            <h2 id="catalog-title">Məhsul kataloqu</h2>
            <p>Hər məkan üçün düşünülmüş metal həllər.</p>
          </div>
          <Link className="text-link" href="/kataloq/">
            Bütün məhsullar <ArrowUpRight />
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((c, i) => (
            <Link
              className="category-card"
              key={c.id}
              href={`/kataloq/?kateqoriya=${c.id}`}
            >
              <div className="category-image">
                <span className="category-number">0{i + 1}</span>
                <img
                  src={c.image}
                  alt={c.name}
                  width="512"
                  height="512"
                  loading="lazy"
                />
              </div>
              <div className="category-label">
                <div>
                  <h3>{c.name}</h3>
                  <p>{c.short}</p>
                </div>
                <span className="round-arrow">
                  <ArrowUpRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <p className="image-note">
          Şəkillər məhsul tipini göstərən nümunə görüntülərdir.
        </p>
      </section>
      <AboutBand />
      <Gallery compact />
      <ContactSection />
    </main>
  );
}
