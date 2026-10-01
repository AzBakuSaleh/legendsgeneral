"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Expand, Pause, Play } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { ProductMedia } from "@/lib/content";

export function ProductGallery({ images, name, href, detail = false, real = false, overlay }: {
  images: ProductMedia[]; name: string; href?: string; detail?: boolean; real?: boolean; overlay?: ReactNode;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(!detail);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const multiple = images.length > 1;
  const active = images[index] ?? images[0];
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync(); media.addEventListener("change", sync);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 });
    if (root.current) observer.observe(root.current);
    return () => { media.removeEventListener("change", sync); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (!api) return;
    const sync = () => setIndex(api.selectedScrollSnap());
    sync(); api.on("select", sync); api.on("reInit", sync);
    return () => { api.off("select", sync); api.off("reInit", sync); };
  }, [api]);
  useEffect(() => {
    if (!api || !multiple || !playing || hover || !visible || reduced || expanded) return;
    const timer = setInterval(() => { if (!document.hidden) api.scrollNext(); }, 5500);
    return () => clearInterval(timer);
  }, [api, multiple, playing, hover, visible, reduced, expanded]);
  function move(direction: number) { setPlaying(false); if (direction < 0) api?.scrollPrev(); else api?.scrollNext(); }
  return (
    <div ref={root} className={`product-gallery ${detail ? "gallery-detail" : "gallery-card"}`}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onFocusCapture={(event) => { if (!(event.target as HTMLElement).closest("[data-gallery-play]")) setPlaying(false); }}>
      <Carousel setApi={setApi} opts={{ loop: multiple, duration: reduced ? 0 : 25 }} aria-label={`${name} — şəkillər`}>
        <CarouselContent className="ml-0">
          {images.map((item, i) => {
            const visual = <><img src={item.src} alt={item.title} width="900" height="700" loading="lazy" style={{ objectFit: item.fit ?? "contain" }} />{overlay}</>;
            return <CarouselItem key={item.src + i} className="pl-0" aria-hidden={index !== i}>
              {href ? <Link href={href} className="gallery-stage" tabIndex={index === i ? 0 : -1}>{visual}</Link>
                : <button type="button" className="gallery-stage" tabIndex={index === i ? 0 : -1} onClick={() => { setExpanded(true); setPlaying(false); }} aria-label={`${item.title} — şəkli böyüt`}>{visual}<span className="photo-zoom"><Expand size={19} /></span></button>}
            </CarouselItem>;
          })}
        </CarouselContent>
        {multiple && <div className="gallery-arrows"><button type="button" onClick={() => move(-1)} aria-label="Əvvəlki şəkil"><ChevronLeft size={20} /></button><button type="button" onClick={() => move(1)} aria-label="Növbəti şəkil"><ChevronRight size={20} /></button></div>}
      </Carousel>
      {multiple && <div className="gallery-caption"><span>{active.title}</span><span className="gallery-count">{index + 1}/{images.length}</span>
        {!detail && !reduced && <button type="button" data-gallery-play onClick={() => setPlaying(!playing)} aria-label={playing ? "Şəkil keçidini dayandır" : "Şəkil keçidini başlat"}>{playing ? <Pause size={15} /> : <Play size={15} />}</button>}
      </div>}
      {detail && multiple && <div className="gallery-thumbnails" aria-label="Şəkil seçimi">{images.map((item, i) => <button type="button" key={item.src + i} aria-label={item.title} aria-pressed={index === i} onClick={() => { setPlaying(false); api?.scrollTo(i); }}><img src={item.src} alt="" width="100" height="80" loading="lazy" /></button>)}</div>}
      {detail && <Dialog open={expanded} onOpenChange={setExpanded}><DialogContent className="product-photo-dialog"><DialogTitle>{active.title}</DialogTitle><DialogDescription>{real ? "Legends General-ın görülən işlərindən" : "İstiqaməti göstərən nümunə görüntü"}</DialogDescription><img className="gallery-expanded" src={active.src} alt={active.title} width="1200" height="900" />{multiple && <div className="gallery-dialog-controls"><button type="button" onClick={() => move(-1)} aria-label="Əvvəlki şəkil"><ChevronLeft /></button><span>{index + 1} / {images.length}</span><button type="button" onClick={() => move(1)} aria-label="Növbəti şəkil"><ChevronRight /></button></div>}</DialogContent></Dialog>}
    </div>
  );
}
