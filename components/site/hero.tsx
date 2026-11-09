"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { projects } from "@/lib/content";
import { withSiteBasePath } from "@/lib/site-path";
import styles from "./home.module.css";

const shelfProject = projects[2];
const slides = [
  {
    title: "Metal stellajlar və saxlama sistemləri",
    description: "Anbar, arxiv və iş məkanları üçün 120, 200, 500 və 1500 kq/rəf yük siniflərində stellajlar.",
    href: "/kataloq/?kateqoriya=refler",
    action: "Kataloqa bax",
    image: withSiteBasePath("/images/shelving-close.webp"),
    caption: "Nümunə görüntü",
  },
  {
    title: "İş məkanları üçün metal dolablar",
    description: "Geyim, sənəd və şəxsi əşyalar üçün metal dolablar. Ölçüləri, bölmələri və kilidi ehtiyacınıza uyğun seçin.",
    href: "/kataloq/?kateqoriya=dolablar",
    action: "Dolablara bax",
    image: withSiteBasePath("/images/steel-lockers.webp"),
    caption: "Nümunə görüntü",
  },
  {
    title: "Sifarişlə metal mebel",
    description: "Rəflər, metal karkaslar və məkanınıza uyğun hazırlanan digər mebel nümunələri ilə tanış olun.",
    href: "/gorulen-isler/",
    action: "İşlərə bax",
    image: shelfProject.image,
    caption: "Legends General işi · " + shelfProject.title,
  },
];

export function Hero() {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const select = () => setIndex(api.selectedScrollSnap());
    api.on("select", select).on("reInit", select);
    return () => {
      api.off("select", select).off("reInit", select);
    };
  }, [api]);

  return (
    <Carousel
      className={styles.hero}
      aria-label="Məhsul slaydları"
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
                <div className={styles.heroCopy}>
                  <Title>{slide.title}</Title>
                  <p>{slide.description}</p>
                  <div className={styles.heroActions}>
                    <Link className={`${styles.button} ${styles.lightButton}`} href={slide.href}>
                      {slide.action} <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                    <a className={`${styles.button} ${styles.lightOutline}`} href="#muraciet">
                      Qiymət təklifi al <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                  </div>
                </div>
                <figure className={styles.heroMedia} data-slide={i}>
                  <img src={slide.image} alt="" loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} />
                  <figcaption>{slide.caption}</figcaption>
                </figure>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className={styles.heroControls}>
        <button type="button" aria-label="Əvvəlki slayd" onClick={() => api?.scrollPrev()}>
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <span aria-live="polite" aria-atomic="true">
          <span className="sr-only">Slayd </span>
          {String(index + 1).padStart(2, "0")} <span>/ {String(slides.length).padStart(2, "0")}</span>
        </span>
        <button type="button" aria-label="Növbəti slayd" onClick={() => api?.scrollNext()}>
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    </Carousel>
  );
}
