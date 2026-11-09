import Link from "next/link";
import { ArrowRight, ArrowUpRight, Layers3, LockKeyhole, Shirt, Lightbulb, Trees, Package } from "lucide-react";
import { ContactSection } from "@/components/site/contact";
import { Hero } from "@/components/site/hero";
import { HomeHeader } from "@/components/site/home-header";
import { Partners } from "@/components/site/partners";
import { Certificates } from "@/components/site/certificates";
import { categoryMedia, divisions, projects, shelfClasses } from "@/lib/content";
import { withSiteBasePath } from "@/lib/site-path";
import styles from "@/components/site/home.module.css";

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

export default function Home() {
  return (
    <>
      <HomeHeader />
      <main className={styles.home} id="main">
        <Hero />
        <div className={styles.wrap}>
          <section className={`${styles.section} ${styles.showcaseCategoriesSection}`} id="mehsul-qruplari" aria-labelledby="home-categories">
            <div className={styles.showcaseCategoryTop}>
              <div className={styles.showcaseTitleBlock}>
                <span>MƏHSULLARIMIZ</span>
                <h2 id="home-categories">Məhsul qrupları</h2>
              </div>
              <p>Anbar, ofis, istehsalat, ictimai məkan və xüsusi layihələr üçün metal konstruksiya həlləri.</p>
              <Link className={styles.showcaseAllProducts} href="/kataloq/">
                Bütün məhsullar <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.showcaseCategoryGrid}>
              {featuredCategories.map(({ id, name, detail, image, icon: Icon }) => (
                <Link className={styles.showcaseCategoryCard} href={`/kataloq/?kateqoriya=${id}`} key={name}>
                  <img src={withSiteBasePath(image)} alt="" width={600} height={720} loading="lazy" />
                  <span className={styles.showcaseCategoryContent}>
                    <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
                    <span className={styles.showcaseCategoryDescription}>
                      <strong>{name}</strong>
                      <small>{detail}</small>
                    </span>
                    <ArrowRight size={20} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
            <p className={styles.imageNote}>Məhsul şəkilləri təqdimat məqsədli nümunə görüntülərdir; real modelin görünüşü sifariş zamanı dəqiqləşdirilir.</p>
          </section>

          <section className={styles.section} aria-labelledby="home-popular">
            <div className={styles.sectionHeading}>
              <div>
                <h2 id="home-popular">Populyar məhsullar</h2>
                <p>Stellajları bir rəfin və bütöv sistemin yük həddinə görə seçin.</p>
              </div>
              <Link className={styles.textLink} href="/kataloq/?kateqoriya=refler">
                Bütün stellajlar <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.products}>
              {shelfClasses.map(({ slug, perShelf, total }) => (
                <article key={slug} className={styles.product}>
                  <div className={styles.productImage}>
                    <img src={categoryMedia.refler[0].src} alt="" width="640" height="480" loading="lazy" />
                    <span>Nümunə görüntü</span>
                  </div>
                  <div className={styles.productCopy}>
                    <h3>
                      <Link href={`/mehsullar/${slug}/`}>
                        Metal stellaj{" "}
                        <strong>{perShelf} <span>kq/rəf</span></strong>
                      </Link>
                    </h3>
                    <p>Bütöv stellaj üzrə {total} kq</p>
                    <Link className={`${styles.button} ${styles.outline}`} href={`/elaqe/?mehsul=${slug}#muraciet`}>
                      Qiymət təklifi al <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={`${styles.section} ${styles.production}`} id="istehsalat" aria-labelledby="home-production">
            <figure className={styles.productionMedia}>
              <img src={withSiteBasePath("/images/services/metal-processing.webp")} alt="Metal lövhənin lazerlə kəsilməsi" width="1200" height="900" loading="lazy" />
              <figcaption>Nümunə görüntü</figcaption>
            </figure>
            <div className={styles.productionCopy}>
              <h2 id="home-production">İstehsalat və xidmətlər</h2>
              <p>Metalın emalından hazır konstruksiyaya qədər layihənizin ölçü və texniki tələblərinə uyğun istehsal.</p>
              <a className={`${styles.button} ${styles.lightButton}`} href="#muraciet">
                Qiymət təklifi al <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <ul className={styles.services}>
              {services.map(({ id, name }) => (
                <li key={id}>
                  <Link href={`/kataloq/?kateqoriya=${id}`}>
                    {name} <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </li>
              ))}
              <li><Link href="/kataloq/">Bütün xidmətlər <ArrowRight size={17} aria-hidden="true" /></Link></li>
            </ul>
          </section>

          <section className={styles.section} aria-labelledby="home-projects">
            <div className={styles.sectionHeading}>
              <div>
                <h2 id="home-projects">Görülən işlər</h2>
                <p>Legends General-ın Instagram paylaşımlarından real iş nümunələri.</p>
              </div>
              <Link className={styles.textLink} href="/gorulen-isler/">
                Bütün işlərə bax <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.projects}>
              {featuredProjects.map(({ title, image, url }) => (
                <a className={styles.project} key={url} href={url} target="_blank" rel="noopener noreferrer">
                  <img src={image} alt="" width="480" height="280" loading="lazy" />
                  <span>{title} <ArrowUpRight size={17} aria-hidden="true" /></span>
                </a>
              ))}
            </div>
          </section>
        </div>
        <Certificates />
        <div id="emekdasliqlar"><Partners /></div>
        <ContactSection />
      </main>
    </>
  );
}
