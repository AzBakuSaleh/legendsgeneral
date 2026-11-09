"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Factory, Layers3, Pause, Play, Ruler, ShieldCheck } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { projects } from "@/lib/content";
import { withSiteBasePath } from "@/lib/site-path";
import styles from "./home.module.css";

const AUTO_ADVANCE_MS = 5000;
const slides = [
  {
    title: "Anbar və istehsalat üçün etibarlı həllər",
    description: "Stellaj, metal dolab, konteyner və digər metal konstruksiyaların layihələndirilməsi və istehsalı.",
    href: "/kataloq/",
    action: "Məhsul kataloqu",
    secondaryHref: "/gorulen-isler/",
    secondaryAction: "Layihələrimiz",
    image: withSiteBasePath("/images/catalog-preview/rack-empty.jpg"),
    caption: "Nümunə görüntü",
  },
  {
    title: "Metal dolablar və saxlama sistemləri",
    description: "İşçilər, ofislər və istehsalat sahələri üçün müxtəlif ölçülü və bölməli metal dolablar.",
    href: "/kataloq/?kateqoriya=dolablar",
    action: "Dolabları kəşf et",
    secondaryHref: "/elaqe/",
    secondaryAction: "Sorğu göndər",
    image: withSiteBasePath("/images/catalog-preview/locker-closed.jpg"),
    caption: "Nümunə görüntü",
  },
  {
    title: "Sifarişlə metal mebel və konstruksiyalar",
    description: "İstehsalat imkanlarımızı və həyata keçirilmiş metal konstruksiya işlərini yaxından tanıyın.",
    href: "/gorulen-isler/",
    action: "Görülən işlər",
    secondaryHref: "/elaqe/",
    secondaryAction: "Bizimlə əlaqə",
    image: projects[2].image,
    caption: "Legends General işi · " + projects[2].title,
  },
];

const highlights = [
  { icon: Factory, label: "Öz istehsalımız" },
  { icon: ShieldCheck, label: "Möhkəm konstruksiya" },
  { icon: Layers3, label: "Fərdi həllər" },
  { icon: Ruler, label: "Ölçüyə uyğun sifariş" },
];

export function Hero() {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!api) return;
    const select = () => setIndex(api.selectedScrollSnap());
    select();
    api.on("select", select).on("reInit", select);
    return () => {
      api.off("select", select).off("reInit", select);
    };
  }, [api]);

  useEffect(() => {
    if (!api || !autoplay) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval: ReturnType<typeof setInterval> | undefined;

    const syncAutoplay = () => {
      if (interval) clearInterval(interval);
      interval = undefined;
      if (!reducedMotion.matches) {
        interval = setInterval(() => api.scrollNext(), AUTO_ADVANCE_MS);
      }
    };

    syncAutoplay();
    reducedMotion.addEventListener("change", syncAutoplay);
    return () => {
      if (interval) clearInterval(interval);
      reducedMotion.removeEventListener("change", syncAutoplay);
    };
  }, [api, autoplay]);

  return (
    <Carousel
      className={`${styles.hero} ${styles.showcaseHero}`}
      aria-label="Legends General — əsas təqdimat slaydları"
      aria-roledescription="slayder"
      setApi={setApi}
      opts={{ loop: true, breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } } }}
    >
      <CarouselContent className="ml-0">
        {slides.map((slide, i) => {
          const Title = i === 0 ? "h1" : "h2";
          return (
            <CarouselItem key={slide.title} className="pl-0" aria-hidden={index !== i} inert={index !== i}>
              <div className={styles.heroSlide}>
                <figure className={styles.heroMedia} data-slide={i}>
                  <img
                    src={slide.image}
                    alt=""
                    fetchPriority={i === 0 ? "high" : "auto"}
                    loading={i === 0 ? "eager" : "lazy"}
                    width={1536}
                    height={1024}
                  />
                  <figcaption>{slide.caption}</figcaption>
                </figure>
                <div className={styles.heroCopy}>
                  <span className={styles.heroIntro}>LEGENDS GENERAL · METAL İSTEHSALATI</span>
                  <Title>{slide.title}</Title>
                  <span className={styles.heroAccent} aria-hidden="true" />
                  <p>{slide.description}</p>
                  <div className={styles.heroActions}>
                    <Link className={`${styles.button} ${styles.showcasePrimary}`} href={slide.href}>
                      {slide.action} <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                    <Link className={`${styles.button} ${styles.showcaseSecondary}`} href={slide.secondaryHref}>
                      {slide.secondaryAction}
                    </Link>
                  </div>
                  <ul className={styles.showcaseHeroBenefits} aria-label="Legends General üstünlükləri">
                    {highlights.map(({ icon: Icon, label }) => (
                      <li key={label}>
                        <Icon size={23} strokeWidth={1.75} aria-hidden="true" />
                        <span>{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <button
        type="button"
        className={`${styles.showcaseHeroArrow} ${styles.showcaseHeroArrowPrev}`}
        aria-label="Əvvəlki slayd"
        onClick={() => api?.scrollPrev()}
      >
        <ArrowLeft size={23} aria-hidden="true" />
      </button>
      <button
        type="button"
        className={`${styles.showcaseHeroArrow} ${styles.showcaseHeroArrowNext}`}
        aria-label="Növbəti slayd"
        onClick={() => api?.scrollNext()}
      >
        <ArrowRight size={23} aria-hidden="true" />
      </button>

      <div className={`${styles.heroControls} ${styles.showcaseHeroControls}`} aria-label="Slayd idarəetməsi">
        <div className={styles.showcaseHeroDots} aria-label="Slayd seçimi">
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`${i + 1}-ci slayda keç`}
              aria-current={index === i ? "true" : undefined}
              className={index === i ? styles.showcaseActiveDot : undefined}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>
        <span className={styles.showcaseSlideCounter} aria-live="off">
          {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          className={styles.showcasePause}
          aria-label={autoplay ? "Avtomatik keçidi dayandır" : "Avtomatik keçidi başlat"}
          aria-pressed={autoplay}
          onClick={() => setAutoplay((current) => !current)}
        >
          {autoplay ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
        </button>
      </div>
    </Carousel>
  );
}
