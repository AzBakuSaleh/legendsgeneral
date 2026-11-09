import Link from "next/link";
import { ArrowRight, ArrowUpRight, Factory, Headset, Layers3, Ruler } from "lucide-react";
import { ContactSection } from "@/components/site/contact";
import { Hero } from "@/components/site/hero";
import { HomeHeader } from "@/components/site/home-header";
import { Partners } from "@/components/site/partners";
import { categories, categoryMedia, divisions, projects, shelfClasses } from "@/lib/content";
import { withSiteBasePath } from "@/lib/site-path";
import styles from "@/components/site/home.module.css";

const featuredCategories = categories.filter(({ id }) =>
  ["refler", "dolablar", "arxiv", "seyfler", "istehsalat", "tibbi"].includes(id),
);
const services = divisions.filter(({ id }) =>
  ["konstruksiyalar", "diger-xidmetler", "toz-boyama"].includes(id),
);
const featuredProjects = [projects[2], projects[1], projects[0]];
const benefits = [
  { icon: Factory, title: "Yerli istehsal", detail: "Azərbaycanda hazırlanır" },
  { icon: Layers3, title: "Geniş məhsul çeşidi", detail: "Saxlama və iş məkanları üçün" },
  { icon: Ruler, title: "Ölçüyə uyğun sifariş", detail: "Məkanınıza uyğun komplektasiya" },
  { icon: Headset, title: "Seçimdə dəstək", detail: "Məhsul və xidmət üzrə məsləhət" },
];

export default function Home() {
  return (
    <>
      <HomeHeader />
      <main className={styles.home} id="main">
        <div className={styles.wrap}>
          <Hero />
          <ul className={styles.benefits} aria-label="Legends General üstünlükləri">
            {benefits.map(({ icon: Icon, title, detail }) => (
              <li key={title}>
                <Icon size={29} strokeWidth={1.6} aria-hidden="true" />
                <div><strong>{title}</strong><p>{detail}</p></div>
              </li>
            ))}
          </ul>

          <section className={styles.section} aria-labelledby="home-categories">
            <div className={styles.sectionHeading}>
              <h2 id="home-categories">Məhsul kateqoriyaları</h2>
              <Link className={styles.textLink} href="/kataloq/">
                Bütün kateqoriyalar <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.categories}>
              {featuredCategories.map(({ id, name, image }) => (
                <Link className={styles.category} href={`/kataloq/?kateqoriya=${id}`} key={id}>
                  <img src={image} alt="" width="640" height="480" loading="lazy" />
                  <span>{name} <ArrowUpRight size={17} aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
            <p className={styles.imageNote}>Kateqoriya şəkilləri nümunə görüntüləridir.</p>
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
        <Partners />
        <ContactSection />
      </main>
    </>
  );
}
