"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, ArrowUpRight, ArrowRight, X } from "lucide-react";
import { categories, products } from "@/lib/content";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
const normalize = (s: string) =>
  s
    .toLocaleLowerCase("az")
    .replace(/ə/g, "e")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
export function Catalog() {
  const params = useSearchParams();
  const requested = params.get("kateqoriya");
  const category = categories.some((c) => c.id === requested)
    ? requested!
    : "all";
  const query = params.get("q") ?? "";
  const results = products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      normalize(p.name + " " + p.description).includes(normalize(query.trim())),
  );
  function setQuery(value: string) {
    const url = new URL(window.location.href);
    if (value) url.searchParams.set("q", value);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  }
  function select(value: string) {
    if (!value) return;
    const url = new URL(window.location.href);
    if (value === "all") url.searchParams.delete("kateqoriya");
    else url.searchParams.set("kateqoriya", value);
    window.history.replaceState(null, "", url);
  }
  return (
    <section className="container section catalog-layout">
      <aside className="catalog-sidebar">
        <h2>Kateqoriyalar</h2>
        <ToggleGroup
          type="single"
          orientation="vertical"
          value={category}
          onValueChange={select}
          aria-label="Məhsul kateqoriyaları"
          className="category-filter"
        >
          <ToggleGroupItem value="all">
            Bütün məhsullar <span>{products.length}</span>
          </ToggleGroupItem>
          {categories.map((c) => (
            <ToggleGroupItem value={c.id} key={c.id}>
              {c.name}
              <ArrowRight size={16} />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div className="catalog-help">
          <h3>Seçimdə kömək lazımdır?</h3>
          <p>Ehtiyacınızı bildirin, uyğun məhsulu birlikdə seçək.</p>
          <Link href="/elaqe/" className="text-link">
            Məlumat al <ArrowUpRight />
          </Link>
        </div>
      </aside>
      <div className="catalog-main">
        <div className="catalog-toolbar">
          <label className="search-input" htmlFor="axtaris">
            <Search size={19} />
            <Input
              id="axtaris"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Məhsul axtar..."
              aria-label="Məhsul axtar"
            />
            {query && (
              <button
                className="icon-button"
                aria-label="Axtarışı təmizlə"
                onClick={() => setQuery("")}
              >
                <X size={17} />
              </button>
            )}
          </label>
          <span aria-live="polite">{results.length} məhsul</span>
        </div>
        {results.length ? (
          <div className="product-grid">
            {results.map((p) => (
              <article className="product-card" key={p.slug}>
                <Link href={`/mehsullar/${p.slug}/`} className="product-image">
                  <img
                    src={p.image}
                    alt={p.name}
                    width="512"
                    height="512"
                    loading="lazy"
                  />
                </Link>
                <div className="product-card-content">
                  <span className="product-category">
                    {categories.find((c) => c.id === p.category)?.name}
                  </span>
                  <h2>
                    <Link href={`/mehsullar/${p.slug}/`}>{p.name}</Link>
                  </h2>
                  <p>Ölçü və komplektasiya barədə məlumat alın.</p>
                  <Link href={`/mehsullar/${p.slug}/`} className="text-link">
                    Ətraflı bax <ArrowUpRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <Empty className="catalog-empty">
            <EmptyHeader>
              <EmptyTitle>Məhsul tapılmadı</EmptyTitle>
              <EmptyDescription>
                Başqa sözlə axtarın və ya kateqoriya seçimini dəyişin.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <button
                className="button outline"
                onClick={() => {
                  setQuery("");
                  select("all");
                }}
              >
                Bütün məhsulları göstər
              </button>
            </EmptyContent>
          </Empty>
        )}
        <p className="image-note">
          Kataloq şəkilləri məhsul tipini göstərən nümunə görüntülərdir. Dəqiq
          görünüş və texniki xüsusiyyətlər sifariş zamanı təsdiqlənir.
        </p>
      </div>
    </section>
  );
}
