import Link from "next/link";
import { ArrowRight, ArrowUpRight, Layers3, LockKeyhole, Shirt, Lightbulb, Trees, Package } from "lucide-react";
import { ContactSection } from "@/components/site/contact";
import { Hero } from "@/components/site/hero";
import { Partners } from "@/components/site/partners";
import { Certificates } from "@/components/site/certificates";
import { categoryMedia, divisions, projects, shelfClasses } from "@/lib/content";
import { withSiteBasePath } from "@/lib/site-path";
import styles from "@/components/site/home.module.css";
import { tr, label, localizedHref, type Locale } from "@/lib/i18n";

const featuredCategories = [
  { id: "refler", name: "Stellajlar", detail: "Anbar və saxlama sistemləri", image: "/images/catalog-preview/rack-loaded.jpg", icon: Layers3 },
  { id: "dolablar", name: "Metal dolablar", detail: "Ofis, anbar və istehsalat üçün", image: "/images/hero-showroom.webp", icon: LockKeyhole },
  { id: "dolablar", name: "Geyim dolabları", detail: "İdman zalları və müəssisələr üçün", image: "/images/catalog-preview/locker-closed.jpg", icon: Shirt },
  { id: "direkler", name: "İşıq dirəkləri", detail: "Küçə və açıq məkanlar üçün", image: "/images/services/lighting-poles.webp", icon: Lightbulb },
  { id: "bag-mehsullari", name: "Bağ məhsulları", detail: "Həyət, park və istirahət sahələri", image: "/images/services/garden-products.webp", icon: Trees },
  { id: "konteynerler", name: "Konteynerlər", detail: "Quru və soyuducu həllər", image: "/images/services/containers.webp", icon: Package },
] as const;
const services = divisions.filter(({ id }) =>
  ["konstruksiyalar", "diger-xidmetler", "toz-boyama"].includes(id),
);
const featuredProjects = [projects[2], projects[1], projects[0]];

export default function Home() { return <HomeContent locale="az" />; }

export function HomeContent({ locale }: { locale: Locale }) {
  const t = (s: string) => tr(locale, s);
  const url = (s: string) => localizedHref(locale, s);
  return (
    <>
      <main className={styles.home} id="main">
        <Hero locale={locale} />
        <div className={styles.wrap}>
          <section className={`${styles.section} ${styles.showcaseCategoriesSection}`} id="mehsul-qruplari" aria-labelledby="home-categories">
            <div className={styles.showcaseCategoryTop}>
              <div className={styles.showcaseTitleBlock}>
                <span>{t("MƏHSULLARIMIZ")}</span>
                <h2 id="home-categories">{label(locale, "productGroups")}</h2>
              </div>
              <p>{t("Anbar, ofis, istehsalat, ictimai məkan və xüsusi layihələr üçün metal konstruksiya həlləri.")}</p>
              <Link className={styles.showcaseAllProducts} href={url("/kataloq/")}>
                {label(locale, "allProducts")} <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.showcaseCategoryGrid}>
              {featuredCategories.map(({ id, name, detail, image, icon: Icon }) => (
                <Link className={styles.showcaseCategoryCard} href={url(`/kataloq/?kateqoriya=${id}${name === "Geyim dolabları" ? "&q=geyim" : ""}`)} key={name}>
                  <img src={withSiteBasePath(image)} alt="" width={600} height={720} loading="lazy" />
                  <span className={styles.showcaseCategoryContent}>
                    <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
                    <span className={styles.showcaseCategoryDescription}>
                      <strong>{t(name)}</strong>
                      <small>{t(detail)}</small>
                    </span>
                    <ArrowRight size={20} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
            <p className={styles.imageNote}>{t("Məhsul şəkilləri təqdimat məqsədli nümunə görüntülərdir; real modelin görünüşü sifariş zamanı dəqiqləşdirilir.")}</p>
          </section>

          <section className={styles.section} aria-labelledby="home-popular">
            <div className={styles.sectionHeading}>
              <div>
                <h2 id="home-popular">{t("Populyar məhsullar")}</h2>
                <p>{t("Stellajları bir rəfin və bütöv sistemin yük həddinə görə seçin.")}</p>
              </div>
              <Link className={styles.textLink} href={url("/kataloq/?kateqoriya=refler")}>
                {label(locale,"allShelves")} <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.products}>
              {shelfClasses.map(({ slug, perShelf, total }) => (
                <article key={slug} className={styles.product}>
                  <div className={styles.productImage}>
                    <img src={categoryMedia.refler[0].src} alt="" width="640" height="480" loading="lazy" />
                    <span>{label(locale,"imageSample")}</span>
                  </div>
                  <div className={styles.productCopy}>
                    <h3>
                      <Link href={url(`/mehsullar/${slug}/`)}>
                        {t("Metal stellaj")}{" "}
                        <strong>{perShelf} <span>{locale === "ru" ? "кг/полка" : locale === "en" ? "kg/shelf" : "kq/rəf"}</span></strong>
                      </Link>
                    </h3>
                    <p>{locale === "ru" ? `Весь стеллаж: до ${total} кг` : locale === "en" ? `Full unit: up to ${total} kg` : `Bütöv stellaj üzrə ${total} kq`}</p>
                    <Link className={`${styles.button} ${styles.outline}`} href={url(`/elaqe/?mehsul=${slug}#muraciet`)}>
                      {label(locale, "requestQuote")} <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={`${styles.section} ${styles.production}`} id="istehsalat" aria-labelledby="home-production">
            <figure className={styles.productionMedia}>
              <img src={withSiteBasePath("/images/services/metal-processing.webp")} alt={t("Metal lövhənin lazerlə kəsilməsi")} width="1200" height="900" loading="lazy" />
              <figcaption>{label(locale, "imageSample")}</figcaption>
            </figure>
            <div className={styles.productionCopy}>
              <h2 id="home-production">{label(locale,"services")}</h2>
              <p>{t("Metalın emalından hazır konstruksiyaya qədər layihənizin ölçü və texniki tələblərinə uyğun istehsal.")}</p>
              <a className={`${styles.button} ${styles.lightButton}`} href="#muraciet">
                {label(locale, "requestQuote")} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <ul className={styles.services}>
              {services.map(({ id, name }) => (
                <li key={id}>
                  <Link href={url(`/kataloq/?kateqoriya=${id}`)}>
                    {t(name)} <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </li>
              ))}
              <li><Link href={url("/kataloq/")}>{t("Bütün xidmətlər")} <ArrowRight size={17} aria-hidden="true" /></Link></li>
            </ul>
          </section>

          <section className={styles.section} aria-labelledby="home-projects">
            <div className={styles.sectionHeading}>
              <div>
                <h2 id="home-projects">{label(locale,"ourWork")}</h2>
                <p>{t("Legends General-ın Instagram paylaşımlarından real iş nümunələri.")}</p>
              </div>
              <Link className={styles.textLink} href={url("/gorulen-isler/")}>
                {label(locale,"seeAllWorks")} <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.projects}>
              {featuredProjects.map(({ title, image, url }) => (
                <a className={styles.project} key={url} href={url} target="_blank" rel="noopener noreferrer">
                  <img src={image} alt="" width="480" height="280" loading="lazy" />
                  <span>{t(title)} <ArrowUpRight size={17} aria-hidden="true" /></span>
                </a>
              ))}
            </div>
          </section>
        </div>
        <Certificates locale={locale} />
        <div id="emekdasliqlar"><Partners locale={locale} /></div>
        <ContactSection locale={locale} />
      </main>
    </>
  );
}
