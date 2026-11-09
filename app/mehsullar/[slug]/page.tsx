import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, ArrowLeft } from "lucide-react";
import { products, categories, categoryMatches, getProductMedia } from "@/lib/content";
import { ServiceAnnotation } from "@/components/site/service-annotation";
import { ProductGallery } from "@/components/site/product-gallery";
import { ShelfNavigation } from "@/components/site/shelf-navigation";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return {
    title: product?.name ?? "Məhsul tapılmadı",
    description: product?.description,
  };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  const category = categories.find((c) => c.id === product.category)!;
  const candidates = products.filter((p) => p.slug !== slug && !p.catalogHidden);
  const area = categoryMatches(product.category, "metal-mebel")
    ? "metal-mebel"
    : product.category;
  const related = [
    ...candidates.filter((p) => categoryMatches(p.category, area)),
    ...candidates.filter((p) => !categoryMatches(p.category, area)),
  ].slice(0, 3);
  return (
    <main id="main">
      <div className="container product-breadcrumbs">
        <nav className="breadcrumbs" aria-label="Səhifə yolu">
          <Link href="/">Ana səhifə</Link>
          <span>/</span>
          <Link href="/kataloq/">Kataloq</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>
      </div>
      {product.category === "refler" && (
        <div className="container shelf-detail-navigation"><ShelfNavigation activeSlug={slug} /></div>
      )}
      <section className="container product-detail">
        <div><ProductGallery
          images={getProductMedia(product)}
          name={product.name}
          real={product.imageKind === "real"}
          overlay={product.kind === "service" && product.category !== "direkler" ? <ServiceAnnotation category={product.category} /> : undefined}
          detail
        /><p className="image-note">{product.imageKind === "real" ? "Legends General-ın görülən işlərindən." : "Nümunə görüntülər. Görünüş və texniki tələblər sifarişə uyğun dəqiqləşdirilir."}</p></div>
        <div className="product-info">
          <Link
            className="eyebrow"
            href={`/kataloq/?kateqoriya=${category.id}`}
          >
            {category.name}
          </Link>
          <h1>{product.name}</h1>
          <p className="product-description">{product.description}</p>
          {product.capacity && (
            <div className="capacity-section">
              <h2>Yükdaşıma göstəriciləri</h2>
              <dl className="capacity-grid">
                <div><dt>Bir rəfə maksimum</dt><dd>{product.capacity.perShelf} <span>kq</span></dd></div>
                <div><dt>Bütöv stellaja maksimum</dt><dd>{product.capacity.total} <span>kq</span></dd></div>
              </dl>
              <p className="capacity-note">Rəf sayı artdıqda stellajın ümumi yük həddi artmır. Yük rəflər arasında paylanmalı, həm hər rəfin, həm də bütöv stellajın həddi qorunmalıdır. Seçilən ölçü və komplektasiya üçün göstəricilər sifariş zamanı təsdiqlənir.</p>
            </div>
          )}
          {product.offerings && (
            <div className="service-offerings">
              <h2>{product.offeringHeading ?? "Məhsul növləri"}</h2>
              <ul className="usage-list">
                {product.offerings.map((item) => (
                  <li key={item}>
                    <Check size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <h2>
            {product.kind === "service"
              ? "Uyğun olduğu sahələr"
              : "İstifadə sahələri"}
          </h2>
          <ul className="usage-list">
            {product.uses.map((use) => (
              <li key={use}>
                <Check size={16} />
                {use}
              </li>
            ))}
          </ul>
          <div className="quote-box">
            <h2>Öz ehtiyacınıza uyğun təklif alın</h2>
            <p>Qiymət və hazırlanma müddətini öyrənmək üçün müraciət edin.</p>
            <Link className="button" href={`/elaqe/?mehsul=${product.slug}`}>
              Qiymət təklifi al <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="container specification-section">
        <h2>Sifariş zamanı dəqiqləşdirilir</h2>
        <div className="specification-list">
          {product.details.map((detail, i) => (
            <div key={detail}>
              <span>0{i + 1}</span>
              <p>{detail}</p>
              <Check size={19} />
            </div>
          ))}
        </div>
        <p className="image-note">
          Dəqiq texniki göstəricilər və mövcud variantlar şirkətlə
          razılaşdırılır.
        </p>
      </section>
      <section className="container section">
        <div className="section-heading">
          <h2>Digər məhsul və xidmətlər</h2>
          <Link href="/kataloq/" className="text-link">
            <ArrowLeft />
            Kataloqa qayıt
          </Link>
        </div>
        <div className="related-grid">
          {related.map((p) => (
            <Link
              className="category-card"
              key={p.slug}
              href={`/mehsullar/${p.slug}/`}
            >
              <div className="category-image">
                <img
                  src={p.image}
                  alt={p.name}
                  width="512"
                  height="512"
                  loading="lazy"
                />
                {p.kind === "service" && (
                  <ServiceAnnotation category={p.category} />
                )}
              </div>
              <div className="category-label">
                <h3>{p.name}</h3>
                <span className="round-arrow">
                  <ArrowUpRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
