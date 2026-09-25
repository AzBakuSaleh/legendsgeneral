"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
const slides = [
  {
    title: (
      <>
        Metalda güc.
        <br />
        İşinizdə nizam.
      </>
    ),
    description: "Dolablar, rəflər, seyflər və iş məkanınız üçün metal mebel.",
    href: "/kataloq/",
    cta: "Kataloqa bax",
    image: "/images/hero-showroom.webp",
    alt: "Metal dolablar, rəflər və iş masasının nümunə görüntüsü",
    kind: "scene",
  },
  {
    title: (
      <>
        Hər əşyanın
        <br />
        öz yeri var.
      </>
    ),
    description: "Anbar və arxivlər üçün məkanınıza uyğun saxlama sistemləri.",
    href: "/kataloq/?kateqoriya=refler",
    cta: "Rəflərə bax",
    image: "/images/warehouse-shelving.webp",
    alt: "Metal anbar rəfinin nümunə görüntüsü",
    kind: "product",
  },
  {
    title: (
      <>
        İş yerinizə
        <br />
        uyğun həllər.
      </>
    ),
    description: "Emalatxana və istehsal sahələri üçün funksional metal mebel.",
    href: "/kataloq/?kateqoriya=istehsalat",
    cta: "Məhsullara bax",
    image: "/images/metal-workbench.webp",
    alt: "Metal iş masasının nümunə görüntüsü",
    kind: "product",
  },
];
export function Hero() {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (!api) return;
    const select = () => setIndex(api.selectedScrollSnap());
    api.on("select", select);
    return () => {
      api.off("select", select);
    };
  }, [api]);
  useEffect(() => {
    if (!api || !playing || hover || reduce) return;
    const timer = setInterval(() => {
      if (!document.hidden) api.scrollNext();
    }, 6500);
    return () => clearInterval(timer);
  }, [api, playing, hover, reduce]);
  return (
    <section
      className="hero"
      aria-label="Məhsul slaydları"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocusCapture={(e) => {
        if (
          !(e.target instanceof Element) ||
          !e.target.closest("[data-autoplay]")
        )
          setPlaying(false);
      }}
    >
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent className="ml-0">
          {slides.map((s, i) => (
            <CarouselItem key={i} className="pl-0" aria-hidden={index !== i}>
              <div className={`hero-slide ${s.kind}`}>
                <div className="hero-media">
                  <img
                    src={s.image}
                    alt={s.alt}
                    width="1672"
                    height="941"
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                  />
                </div>
                <div className="container hero-content">
                  {i === 0 ? <h1>{s.title}</h1> : <h2>{s.title}</h2>}
                  <p>{s.description}</p>
                  <div className="hero-ctas">
                    <Link
                      tabIndex={index === i ? 0 : -1}
                      className="button"
                      href={s.href}
                    >
                      {s.cta}
                      <ArrowUpRight size={19} />
                    </Link>
                    <Link
                      tabIndex={index === i ? 0 : -1}
                      className="button outline"
                      href="/elaqe/"
                    >
                      Bizimlə əlaqə
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="container hero-control-wrap">
        <div className="hero-controls">
          <span className="slide-index">
            0{index + 1}
            <span> / 03</span>
          </span>
          <div className="slide-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${i + 1}-${i === 2 ? "cü" : "ci"} slayda keç`}
                aria-current={index === i ? "true" : undefined}
                onClick={() => {
                  api?.scrollTo(i);
                  setPlaying(false);
                }}
              />
            ))}
          </div>
          <button
            data-autoplay
            hidden={reduce}
            className="icon-button"
            aria-label={
              playing && !reduce
                ? "Avtomatik keçidi dayandır"
                : "Avtomatik keçidi başlat"
            }
            onClick={() => setPlaying(!playing)}
          >
            {playing && !reduce ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <div className="hero-arrows">
            <button
              className="icon-button"
              aria-label="Əvvəlki slayd"
              onClick={() => {
                api?.scrollPrev();
                setPlaying(false);
              }}
            >
              <ArrowLeft size={19} />
            </button>
            <button
              className="icon-button"
              aria-label="Növbəti slayd"
              onClick={() => {
                api?.scrollNext();
                setPlaying(false);
              }}
            >
              <ArrowRight size={19} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
