import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Factory,
  ShieldCheck,
} from "lucide-react";
import { divisions, shelfClasses } from "@/lib/content";
import { withSiteBasePath } from "@/lib/site-path";
import { publicCertifications } from "@/lib/certifications";
import { AboutBand } from "@/components/site/shared";
import { Partners } from "@/components/site/partners";
import { ContactSection } from "@/components/site/contact";
import styles from "./v2-home.module.css";

export default function Home() {
  return (
    <main id="main" className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-heading">
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Legends General MMC · Bakı</span>
          <h1 id="home-heading">Metal istehsalında dəqiq həllər.</h1>
          <p className={styles.heroLead}>
            Metal stellajlar, dolablar, dirəklər və layihəyə uyğun metal
            konstruksiyalar. Məhsulu seçin, texniki tələblərinizi bildirin,
            istehsalçıdan birbaşa təklif alın.
          </p>
          <div className={styles.heroActions}>
            <Link href="/kataloq/" className={styles.primaryAction}>
              Məhsul kataloqu <ArrowUpRight size={19} aria-hidden="true" />
            </Link>
            <Link href="/elaqe/" className={styles.ghostAction}>
              Qiymət təklifi al <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <p className={styles.heroFootnote}>
            <Factory size={19} aria-hidden="true" />
            Azərbaycanda metal məmulatların istehsalı
          </p>
        </div>
        <div className={styles.heroMedia}>
          <img
            src={withSiteBasePath("/images/warehouse-shelving.webp")}
            alt="Metal stellaj konstruksiyasının vizual nümunəsi"
            width={900}
            height={1000}
            fetchPriority="high"
          />
          <span className={styles.heroMediaLabel}>
            Məhsul istiqaməti · nümunə görüntü
          </span>
        </div>
      </section>

      <section className={styles.intro} id="mehsullar" aria-labelledby="product-groups">
        <div className={styles.content}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>İstehsal istiqamətləri</span>
              <h2 id="product-groups">Ehtiyacınıza uyğun məhsulu tapın.</h2>
              <p className={styles.sectionText}>
                Anbar avadanlıqlarından küçə infrastrukturuna qədər —
                istehsal sahələrimiz üzrə kataloqu araşdırın.
              </p>
            </div>
            <Link className={styles.sectionAction} href="/kataloq/">
              Bütün kataloq <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.categoryGrid}>
            {divisions.map((item) => (
              <Link
                key={item.id}
                className={styles.categoryCard}
                href={`/kataloq/?kateqoriya=${item.id}`}
              >
                <div className={styles.categoryImage}>
                  <img src={item.image} alt="" width={600} height={440} loading="lazy" />
                </div>
                <div className={styles.categoryInfo}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.short}</p>
                  </div>
                  <ArrowUpRight className={styles.categoryIcon} size={20} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.browseStrip}>
            <span>Hər məhsulun dəqiq ölçü və komplektasiyası sorğu əsasında razılaşdırılır.</span>
            <Link href="/kataloq/">Bütün məhsullar və xidmətlər →</Link>
          </div>
        </div>
      </section>

      <section className={styles.rackSection} aria-labelledby="rack-heading">
        <div className={`${styles.content} ${styles.rackLayout}`}>
          <div className={styles.rackPhoto}>
            <img
              src={withSiteBasePath("/images/shelving-close.webp")}
              alt="Metal stellajın konstruksiya detalına aid nümunə görüntü"
              width={800}
              height={880}
              loading="lazy"
            />
            <span>Nümunə görüntü</span>
          </div>
          <div className={styles.rackContent}>
            <span className={styles.kicker}>Məhsul seçimi</span>
            <h2 id="rack-heading">Yükə uyğun stellaj seçimi.</h2>
            <p className={styles.rackDesc}>
              Dörd yük sinfi üzrə modellərə keçid. Bir rəfin və bütöv
              stellajın yük hədləri ayrıca göstərilir.
            </p>
            <div className={styles.rackList}>
              {shelfClasses.map((item) => (
                <Link
                  className={styles.rackLink}
                  key={item.slug}
                  href={`/mehsullar/${item.slug}/`}
                >
                  <span className={styles.rackLoad}>
                    {item.perShelf} <small>kq / rəf</small>
                  </span>
                  <span className={styles.rackTotal}>
                    Bütöv stellaj: {item.total} kq
                  </span>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </Link>
              ))}
            </div>
            <p className={styles.rackNote}>
              Göstəricilər məhsul siniflərini təsvir edir. Konkret ölçü,
              rəf sayı və komplektasiya üzrə yük uyğunluğu sifariş zamanı
              təsdiqlənməlidir.
            </p>
            <Link href="/kataloq/?kateqoriya=refler" className={styles.primaryAction}>
              Stellaj kataloqu <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <AboutBand />

      <section className={styles.certSection} id="keyfiyyet" aria-labelledby="certificate-heading">
        <div className={styles.content}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Sənədləşdirilmiş uyğunluq</span>
              <h2 id="certificate-heading">Keyfiyyətə sənədli yanaşma.</h2>
              <p className={styles.sectionText}>
                Legends General MMC-yə verilmiş məhsul uyğunluq
                sertifikatlarında aşağıdakı üç istehsal istiqaməti qeyd olunub.
              </p>
            </div>
            <ShieldCheck size={42} color="#286B9B" strokeWidth={1.4} aria-hidden="true" />
          </div>
          <div className={styles.certGrid}>
            {publicCertifications.map((certificate) => (
              <article className={styles.certCard} key={certificate.id}>
                <span className={styles.certIcon}>
                  <BadgeCheck size={24} aria-hidden="true" />
                </span>
                <div>
                  <h3>{certificate.name}</h3>
                  <p>{certificate.issuer} tərəfindən verilmiş uyğunluq sənədi</p>
                </div>
                <div>
                  <span className={styles.certMeta}>İstinad edilən standart</span>
                  <p>{certificate.standard}</p>
                  <p>Sənəddə qeyd edilən son tarix: 01.10.2027</p>
                </div>
                <Link className={styles.sectionAction} href={certificate.categoryHref}>
                  Məhsullara bax <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
          <div className={styles.certBottom}>
            <p className={styles.certNotice}>
              <ShieldCheck size={19} aria-hidden="true" />
              Sertifikatların orijinal surətləri sui-istifadə riskinə görə
              açıq yayımlanmır. Bu məlumatlar yalnız göstərilən məhsul
              qruplarına aiddir; konkret modelin texniki uyğunluğu ayrıca
              təsdiqlənir. Legends adından gələn kommersiya təklifinin
              həqiqiliyini rəsmi əlaqə kanallarımızdan yoxlayın.
            </p>
            <Link href="/elaqe/" className={styles.certAction}>
              Rəsmi əlaqə <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <Partners />

      <div className={styles.footerBridge}>
        <div className={`${styles.content} ${styles.footerBridgeInner}`}>
          <div>
            <h2>İstehsal üçün doğru tərəfdaş.</h2>
            <p>Layihənizin ölçü və texniki tələblərini bizə bildirin.</p>
          </div>
          <Link href="/elaqe/" className={styles.primaryAction}>
            Təklif istəyin <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <ContactSection />
    </main>
  );
}
