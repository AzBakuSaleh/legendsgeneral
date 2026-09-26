"use client";
import Link from "next/link";
import { ServiceAnnotation } from "./service-annotation";
import { useSearchParams } from "next/navigation";
import { Search, ArrowUpRight, ArrowRight, X } from "lucide-react";
import {
  categories,
  divisions,
  products,
  categoryMatches,
} from "@/lib/content";
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
  const category = [...divisions, ...categories].some((c) => c.id === requested)
    ? requested!
    : "all";
  const query = params.get("q") ?? "";
  const furnitureSelected =
    category === "metal-mebel" ||
    categories.some(
      (c) => c.id === category && categoryMatches(c.id, "metal-mebel"),
    );
  const selectedArea = [...divisions, ...categories].find(
    (c) => c.id === category,
  );
  const results = products.filter(
    (p) =>
      categoryMatches(p.category, category) &&
      normalize(
        p.name + " " + p.description + " " + (p.offerings ?? []).join(" "),
      ).includes(normalize(query.trim())),
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
        <h2>İstiqamətlər</h2>
        <ToggleGroup
          type="single"
          orientation="vertical"
          value={furnitureSelected ? "metal-mebel" : category}
          onValueChange={select}
          aria-label="Məhsul və xidmət istiqamətləri"
          className="category-filter"
        >
          <ToggleGroupItem value="all">
            Hamısı <span>{products.length}</span>
          </ToggleGroupItem>
          {divisions.map((c) => (
            <ToggleGroupItem value={c.id} key={c.id}>
              {c.name}
              <ArrowRight size={16} />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div className="catalog-help">
          <h3>Seçimdə kömək lazımdır?</h3>
          <p>Məhsul və ya xidmətlə bağlı ehtiyacınızı bizə bildirin.</p>
          <Link href="/elaqe/" className="text-link">
            Məlumat al <ArrowUpRight />
          </Link>
        </div>
      </aside>
      <div className="catalog-main">
        {selectedArea && (
          <div className="catalog-intro">
            <h2>{selectedArea.name}</h2>
            <p>{selectedArea.description}</p>
          </div>
        )}
        {furnitureSelected && (
          <ToggleGroup
            type="single"
            value={category}
            onValueChange={select}
            className="furniture-filters"
            aria-label="Metal mebel növləri"
          >
            <ToggleGroupItem value="metal-mebel">
              Bütün metal mebel
            </ToggleGroupItem>
            {categories
              .filter((c) => categoryMatches(c.id, "metal-mebel"))
              .map((c) => (
                <ToggleGroupItem key={c.id} value={c.id}>
                  {c.name}
                </ToggleGroupItem>
              ))}
          </ToggleGroup>
        )}
        <div className="catalog-toolbar">
          <label className="search-input" htmlFor="axtaris">
            <Search size={19} />
            <Input
              id="axtaris"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Məhsul və ya xidmət axtar..."
              aria-label="Məhsul və ya xidmət axtar"
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
          <span aria-live="polite">{results.length} nəticə</span>
        </div>
        {results.length ? (
          <div className="product-grid">
            {results.map((p) => (
              <article className="product-card" key={p.slug}>
                <Link
                  href={`/mehsullar/${p.slug}/`}
                  className={`product-image${p.kind === "service" ? " service-photo" : ""}`}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    width="512"
                    height="512"
                    loading="lazy"
                  />
                  {p.kind === "service" && (
                    <ServiceAnnotation category={p.category} />
                  )}
                </Link>
                <div className="product-card-content">
                  <span className="product-category">
                    {categories.find((c) => c.id === p.category)?.name}
                  </span>
                  <h2>
                    <Link href={`/mehsullar/${p.slug}/`}>{p.name}</Link>
                  </h2>
                  <p>
                    {p.kind === "service"
                      ? "İş həcmi və tələblər barədə məlumat alın."
                      : "Ölçü və komplektasiya barədə məlumat alın."}
                  </p>
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
              <EmptyTitle>Nəticə tapılmadı</EmptyTitle>
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
                Bütün nəticələri göstər
              </button>
            </EmptyContent>
          </Empty>
        )}
        <p className="image-note">
          Kataloqda nümunə görüntülər və real işlərimizdən şəkillər yer alır.
          Dəqiq görünüş və texniki xüsusiyyətlər sifariş zamanı təsdiqlənir.
        </p>
      </div>
    </section>
  );
}
