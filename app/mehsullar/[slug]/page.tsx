import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, ArrowLeft } from "lucide-react";
import { products, categories } from "@/lib/content";
import { ProductPhoto } from "@/components/site/product-photo";
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
  const related = products.filter((p) => p.slug !== slug).slice(0, 3);
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
      <section className="container product-detail">
        <ProductPhoto src={product.image} name={product.name} />
        <div className="product-info">
          <Link
            className="eyebrow"
            href={`/kataloq/?kateqoriya=${category.id}`}
          >
            {category.name}
          </Link>
          <h1>{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <h2>İstifadə sahələri</h2>
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
          <h2>Digər məhsullar</h2>
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
