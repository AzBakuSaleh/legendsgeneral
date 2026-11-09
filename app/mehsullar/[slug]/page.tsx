import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, ArrowLeft } from "lucide-react";
import { products, categories, categoryMatches, getProductMedia } from "@/lib/content";
import { ServiceAnnotation } from "@/components/site/service-annotation";
import { ProductGallery } from "@/components/site/product-gallery";
import { ShelfNavigation } from "@/components/site/shelf-navigation";
import { tr, label, localizedHref, type Locale } from "@/lib/i18n";
import { localizedProductDescription } from "@/lib/product-copy";
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
  return <ProductContent locale="az" slug={slug} />;
}
export function ProductContent({ slug, locale }: { slug: string; locale: Locale }) {
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  const t = (s: string) => tr(locale, s);
  const url = (s: string) => localizedHref(locale, s);
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
    <main id="main" className="showcase-product-page" data-product={product.slug}>
      <div className="showcase-product-top"><div className="container product-breadcrumbs">
        <nav className="breadcrumbs" aria-label="Səhifə yolu">
          <Link href={url("/")}>{label(locale,"home")}</Link>
          <span>/</span>
          <Link href={url("/kataloq/")}>{label(locale,"catalog")}</Link>
          <span>/</span>
          <span>{t(product.name)}</span>
        </nav>
      </div>
      </div>
      {product.category === "refler" && (
        <div className="container shelf-detail-navigation"><ShelfNavigation activeSlug={slug} locale={locale} /></div>
      )}
      <section className="container product-detail">
        <div><ProductGallery
          images={getProductMedia(product).map(m=>({...m,title:t(m.title)}))}
          name={t(product.name)}
          real={product.imageKind === "real"}
          overlay={product.kind === "service" && product.category !== "direkler" ? <ServiceAnnotation category={product.category} locale={locale} /> : undefined}
          detail
        /><p className="image-note">{product.imageKind === "real" ? label(locale,"realPhoto") : locale === "ru" ? "Иллюстративные изображения. Внешний вид и технические требования уточняются при заказе." : locale === "en" ? "Illustrative images. Appearance and technical requirements are confirmed when ordering." : "Nümunə görüntülər. Görünüş və texniki tələblər sifarişə uyğun dəqiqləşdirilir."}</p></div>
        <div className="product-info">
          <Link
            className="eyebrow"
            href={url(`/kataloq/?kateqoriya=${category.id}`)}
          >
            {t(category.name)}
          </Link>
          <h1>{t(product.name)}</h1>
          <p className="product-description">{localizedProductDescription(locale,product)}</p>
          {product.capacity && (
            <div className="capacity-section">
              <h2>{label(locale,"capacity")}</h2>
              <dl className="capacity-grid">
                <div><dt>{label(locale,"perShelf")}</dt><dd>{product.capacity.perShelf} <span>{locale === "ru" ? "кг" : locale === "en" ? "kg" : "kq"}</span></dd></div>
                <div><dt>{label(locale,"totalShelf")}</dt><dd>{product.capacity.total} <span>{locale === "ru" ? "кг" : locale === "en" ? "kg" : "kq"}</span></dd></div>
              </dl>
              <p className="capacity-note">{locale === "ru" ? "Увеличение числа полок не увеличивает общую грузоподъёмность стеллажа. Нагрузка должна быть распределена так, чтобы не превышать лимит ни одной полки и всей конструкции. Показатели подтверждаются для согласованной конфигурации при заказе." : locale === "en" ? "Adding shelves does not increase the overall unit load limit. Distribute loads without exceeding either the per-shelf or total-unit capacity. Capacity figures are confirmed for the agreed configuration when ordering." : "Rəf sayı artdıqda stellajın ümumi yük həddi artmır. Yük rəflər arasında paylanmalı, həm hər rəfin, həm də bütöv stellajın həddi qorunmalıdır. Seçilən ölçü və komplektasiya üçün göstəricilər sifariş zamanı təsdiqlənir."}</p>
            </div>
          )}
          {product.offerings && (
            <div className="service-offerings">
              <h2>{t(product.offeringHeading ?? label(locale,"itemTypes"))}</h2>
              <ul className="usage-list">
                {product.offerings.map((item) => (
                  <li key={item}>
                    <Check size={16} />
                    {t(item)}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <h2>
            {product.kind === "service"
              ? locale === "ru" ? "Сферы применения" : locale === "en" ? "Applications" : "Uyğun olduğu sahələr"
              : label(locale,"uses")}
          </h2>
          <ul className="usage-list">
            {product.uses.map((use) => (
              <li key={use}>
                <Check size={16} />
                {t(use)}
              </li>
            ))}
          </ul>
          <div className="quote-box">
            <h2>{label(locale,"requestSpecific")}</h2>
            <p>{locale === "ru" ? "Свяжитесь с нами, чтобы уточнить стоимость и срок изготовления." : locale === "en" ? "Contact us to discuss pricing and production lead time." : "Qiymət və hazırlanma müddətini öyrənmək üçün müraciət edin."}</p>
            <Link className="button" href={url(`/elaqe/?mehsul=${product.slug}`)}>
              {label(locale,"requestQuote")} <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="container specification-section">
        <h2>{label(locale,"specifications")}</h2>
        <div className="specification-list">
          {product.details.map((detail, i) => (
            <div key={detail}>
              <span>0{i + 1}</span>
              <p>{t(detail)}</p>
              <Check size={19} />
            </div>
          ))}
        </div>
        <p className="image-note">
          {locale === "ru" ? "Точные технические параметры и доступные варианты согласовываются с компанией." : locale === "en" ? "Exact technical specifications and available configurations are confirmed with the company." : "Dəqiq texniki göstəricilər və mövcud variantlar şirkətlə razılaşdırılır."}
        </p>
      </section>
      <section className="container section">
        <div className="section-heading">
          <h2>{label(locale,"related")}</h2>
          <Link href={url("/kataloq/")} className="text-link">
            <ArrowLeft />
            {label(locale,"backToCatalog")}
          </Link>
        </div>
        <div className="related-grid">
          {related.map((p) => (
            <Link
              className="category-card"
              key={p.slug}
              href={url(`/mehsullar/${p.slug}/`)}
            >
              <div className="category-image">
                <img
                  src={p.image}
                  alt={t(p.name)}
                  width="512"
                  height="512"
                  loading="lazy"
                />
                {p.kind === "service" && (
                  <ServiceAnnotation category={p.category} locale={locale} />
                )}
              </div>
              <div className="category-label">
                <h3>{t(p.name)}</h3>
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
