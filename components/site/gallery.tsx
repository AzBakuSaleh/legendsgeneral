"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { projects } from "@/lib/content";
export function Gallery({ compact = false }: { compact?: boolean }) {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<number | null>(null);
  const [swipe, setSwipe] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const visible = compact
    ? [projects[2], projects[0], projects[5]]
    : projects.filter((p) => filter === "all" || p.tag === filter);
  const current = selected === null ? null : visible[selected];
  function move(delta: number) {
    setSelected((i) =>
      i === null ? null : (i + delta + visible.length) % visible.length,
    );
  }
  return (
    <section className="gallery-section container section">
      <div className="section-heading">
        <div>
          <h2>{compact ? "Görülən işlər" : "İş nümunələrimiz"}</h2>
          <p>Legends General-ın Instagram səhifəsindən seçilmiş işlər.</p>
        </div>
        {compact ? (
          <Link href="/gorulen-isler/" className="text-link">
            Bütün işlər <ArrowUpRight />
          </Link>
        ) : (
          <ToggleGroup
            type="single"
            value={filter}
            onValueChange={(v) => {
              if (v) setFilter(v);
            }}
            className="filter-tabs"
            aria-label="İşlərin kateqoriyası"
          >
            <ToggleGroupItem value="all">Hamısı</ToggleGroupItem>
            <ToggleGroupItem value="Rəflər">Rəflər</ToggleGroupItem>
            <ToggleGroupItem value="Metal mebel">Metal mebel</ToggleGroupItem>
          </ToggleGroup>
        )}
      </div>
      <div className="gallery-grid">
        {visible.map((p, i) => (
          <article key={p.image} className="project-card">
            <button
              type="button"
              onClick={(event) => {
                lastTrigger.current = event.currentTarget;
                setSelected(i);
              }}
              className="project-photo"
              aria-label={`${p.title} — şəkli böyüt`}
            >
              <img
                src={p.image}
                alt={p.title}
                width="720"
                height="960"
                loading="lazy"
              />
              <span>
                <Expand size={19} />
              </span>
            </button>
            <div className="project-label">
              <h3>{p.title}</h3>
              <span>{p.tag}</span>
            </div>
          </article>
        ))}
      </div>
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="gallery-dialog"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            lastTrigger.current?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              move(-1);
            }
            if (e.key === "ArrowRight") {
              e.preventDefault();
              move(1);
            }
          }}
        >
          {current && (
            <>
              <div className="lightbox-heading">
                <div>
                  <DialogTitle>{current.title}</DialogTitle>
                  <DialogDescription>
                    Legends General • {current.tag}
                  </DialogDescription>
                </div>
                <DialogClose
                  className="icon-button"
                  aria-label="Qalereyanı bağla"
                >
                  <X />
                </DialogClose>
              </div>
              <div
                className="lightbox-image"
                onTouchStart={(e) => setSwipe(e.touches[0].clientX)}
                onTouchEnd={(e) => {
                  if (
                    swipe !== null &&
                    Math.abs(e.changedTouches[0].clientX - swipe) > 50
                  )
                    move(e.changedTouches[0].clientX < swipe ? 1 : -1);
                  setSwipe(null);
                }}
              >
                <img src={current.image} alt={current.title} />
              </div>
              <div className="lightbox-controls">
                <button
                  className="icon-button"
                  aria-label="Əvvəlki şəkil"
                  onClick={() => move(-1)}
                >
                  <ArrowLeft />
                </button>
                <span aria-live="polite">
                  {(selected ?? 0) + 1} / {visible.length}
                </span>
                <button
                  className="icon-button"
                  aria-label="Növbəti şəkil"
                  onClick={() => move(1)}
                >
                  <ArrowRight />
                </button>
                <a
                  className="text-link"
                  href={current.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagramda bax <ArrowUpRight size={17} />
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
