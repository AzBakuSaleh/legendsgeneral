"use client";
import Link from "next/link";
import { ServiceAnnotation } from "./service-annotation";
import { withSiteBasePath } from "@/lib/site-path";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  Ruler,
  Layers3,
  Factory,
  Sun,
  Lightbulb,
  Camera,
  LockKeyhole,
} from "lucide-react";
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
        Yükünüzə uyğun
        <br />
        metal stellajlar.
      </>
    ),
    description: "120, 200, 500 və 1500 kq/rəf yük sinifləri. Anbar, arxiv və iş məkanları üçün sifarişlə hazırlanır.",
    href: "/kataloq/?kateqoriya=refler",
    cta: "Stellajları seç",
    image: withSiteBasePath("/images/warehouse-shelving.webp"),
    alt: "Metal stellajın nümunə görüntüsü",
    kind: "product",
    category: "refler",
    badge: { icon: Layers3, title: "4", detail: "YÜK SİNFİ" },
    features: [
      { icon: Ruler, label: "Fərdi ölçü" },
      { icon: Layers3, label: "Rəf sayı seçimi" },
      { icon: Factory, label: "Yerli istehsal" },
    ],
  },
  {
    title: (
      <>
        İş yerində
        <br />
        hər şey yerində.
      </>
    ),
    description:
      "Geyim, sənəd və şəxsi əşyalar üçün metal dolablar. Ölçü və bölmələr ehtiyacınıza uyğun seçilir.",
    href: "/kataloq/?kateqoriya=dolablar",
    cta: "Dolablara bax",
    image: withSiteBasePath("/images/steel-lockers.webp"),
    alt: "Metal geyim dolablarının nümunə görüntüsü",
    kind: "product",
    category: "dolablar",
    badge: { icon: LockKeyhole, title: "FƏRDİ", detail: "BÖLMƏLƏR" },
    features: [
      { icon: Ruler, label: "Fərdi ölçü" },
      { icon: LockKeyhole, label: "Kilid seçimi" },
      { icon: Layers3, label: "Bölmə sayı" },
    ],
  },
  {
    title: (
      <>
        Açıq məkanlar üçün
        <br />
        metal dirəklər.
      </>
    ),
    description:
      "İşıqlandırma, müşahidə kameraları və yol nişanları üçün layihəyə uyğun dirək istehsalı.",
    href: "/kataloq/?kateqoriya=direkler",
    cta: "Dirəklərə bax",
    image: withSiteBasePath("/images/services/wired-pole-close.webp"),
    alt: "Naqilli işıqlandırma üçün metal dirək — yaxın nümunə görüntü",
    kind: "pole",
    category: "direkler",
    badge: { icon: Lightbulb, title: "METAL", detail: "DİRƏK İSTEHSALI" },
    features: [
      { icon: Lightbulb, label: "Elektrik" },
      { icon: Sun, label: "Günəş paneli" },
      { icon: Camera, label: "Müşahidə" },
    ],
  },
  {
    title: <>Günəş panelli<br />metal dirəklər.</>,
    description: "Günəş panelləri üçün metal dirəklər və bərkidicilər. Ölçülər layihəyə uyğun seçilir.",
    href: "/mehsullar/metal-direkler/", cta: "Ətraflı bax",
    image: withSiteBasePath("/images/services/solar-pole-close.webp"),
    alt: "Günəş panelli işıqlandırma üçün metal dirək — yaxın nümunə görüntü",
    kind: "pole", category: "direkler",
    badge: { icon: Sun, title: "METAL", detail: "DİRƏK İSTEHSALI" },
    features: [{ icon: Sun, label: "Panel üçün dayaq" }, { icon: Ruler, label: "Fərdi ölçü" }, { icon: Factory, label: "Yerli istehsal" }],
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
      <Carousel setApi={setApi} opts={{ loop: true, duration: reduce ? 0 : 25 }}>
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
                {s.kind === "scene" && (
                  <div className="hero-service-note">
                    <ServiceAnnotation
                      compact
                      category={s.category}
                    />
                  </div>
                )}
                <span className="hero-sample-label">{s.kind === "pole" ? (i === 2 ? "Naqilli işıqlandırma · " : "Günəş panelli işıqlandırma · ") : ""}Nümunə görüntü</span>
                <div
                  className="hero-emblem"
                  aria-label={`${s.badge.title} ${s.badge.detail}`}
                >
                  <s.badge.icon aria-hidden="true" strokeWidth={1.5} />
                  <strong>{s.badge.title}</strong>
                  <span>{s.badge.detail}</span>
                </div>
                <div className="container hero-content">
                  <div className="hero-local"><Factory size={21} aria-hidden="true" /><span>YERLİ İSTEHSAL</span></div>
                  {i === 0 ? <h1>{s.title}</h1> : <h2>{s.title}</h2>}
                  <p>{s.description}</p>
                  <ul
                    className="hero-features"
                    aria-label="Məhsul xüsusiyyətləri"
                  >
                    {s.features.map((feature) => (
                      <li key={feature.label}>
                        <span className="hero-feature-icon">
                          <feature.icon
                            aria-hidden="true"
                            size={23}
                            strokeWidth={1.6}
                          />
                        </span>
                        <span>{feature.label}</span>
                      </li>
                    ))}
                  </ul>
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
            <span> / {String(slides.length).padStart(2, "0")}</span>
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
