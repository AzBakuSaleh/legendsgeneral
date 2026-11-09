"use client";
import Link from "next/link";
import { useState } from "react";
import { ServiceAnnotation } from "./service-annotation";
import { ShelfNavigation } from "./shelf-navigation";
import { ProductGallery } from "./product-gallery";
import { ReferenceFamilies } from "./reference-families";
import { plannedProductFamilies } from "@/lib/product-families";
import { useSearchParams } from "next/navigation";
import { Search, ArrowUpRight, X } from "lucide-react";
import {
  categories,
  divisions,
  products,
  categoryMatches,
  getProductMedia,
} from "@/lib/content";
import { Input } from "@/components/ui/input";
import { tr, label, localizedHref, type Locale } from "@/lib/i18n";
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
export function Catalog({ locale = "az" }: { locale?: Locale }) {
  const t = (value: string) => tr(locale,value);
  const url = (path: string) => localizedHref(locale,path);
  const [menuOpen, setMenuOpen] = useState(false);
  const params = useSearchParams();
  const requested = params.get("kateqoriya");
  const category = [...divisions, ...categories].some((c) => c.id === requested)
    ? requested!
    : "all";
  const query = params.get("q") ?? "";
  const furnitureSelected =
    category === "metal-mebel" ||
    (!["refler", "dolablar", "arxiv"].includes(category) && categories.some(
      (c) => c.id === category && categoryMatches(c.id, "metal-mebel"),
    ));
  const selectedArea = [...divisions, ...categories].find(
    (c) => c.id === category,
  );
  const results = products.filter(
    (p) =>
      !p.catalogHidden &&
      categoryMatches(p.category, category) &&
      normalize(
        p.name + " " + t(p.name) + " " + p.description + " " + t(p.description) + " " + (p.offerings ?? []).map(v=>v+" "+t(v)).join(" "),
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
    <section className="container section catalog-layout" id="mehsul-siyahisi">
      <aside className="catalog-sidebar">
        <h2>{label(locale,"directions")}</h2>
        <button type="button" className="mobile-category-toggle" aria-expanded={menuOpen} aria-controls="catalog-categories" onClick={() => setMenuOpen(!menuOpen)}>
          <span>{selectedArea ? t(selectedArea.name) : label(locale,"selectCategory")}</span><span aria-hidden="true">{menuOpen ? "−" : "+"}</span>
        </button>
        <nav id="catalog-categories" className={`catalog-category-nav${menuOpen ? " is-open" : ""}`} aria-label={locale === "ru" ? "Категории товаров и услуг" : locale === "en" ? "Products and services categories" : "Məhsul və xidmət istiqamətləri"}>
          <Link href={url("/kataloq/")} aria-current={category === "all" ? "page" : undefined}>
            {label(locale,"all")} <span>{products.filter((p) => !p.catalogHidden).length}</span>
          </Link>
          <details className="shelf-menu" open>
            <summary>{label(locale,"metalRack")}</summary>
            <Link href={url("/kataloq/?kateqoriya=refler")} className="shelf-overview">{label(locale,"allShelves")}</Link>
            <ShelfNavigation locale={locale} />
          </details>
          {divisions.filter((c) => c.id !== "refler").map((c) => (
            <Link href={url(`/kataloq/?kateqoriya=${c.id}`)} key={c.id}
              aria-current={(furnitureSelected ? "metal-mebel" : category) === c.id ? "page" : undefined}>
              {t(c.name)}
            </Link>
          ))}
        </nav>
        <div className="catalog-help">
          <h3>{label(locale,"askHelp")}</h3>
          <p>{locale === "ru" ? "Расскажите, какой товар или услуга вам нужны." : locale === "en" ? "Tell us what product or service you need." : "Məhsul və ya xidmətlə bağlı ehtiyacınızı bizə bildirin."}</p>
          <Link href={url("/elaqe/")} className="text-link">
            {label(locale,"getInfo")} <ArrowUpRight />
          </Link>
        </div>
      </aside>
      <div className="catalog-main">
        {selectedArea && (
          <div className="catalog-intro">
            <h2>{t(selectedArea.name)}</h2>
            <p>{t(selectedArea.description)}</p>
          </div>
        )}
        {category === "all" && !query.trim() && <ReferenceFamilies locale={locale} />}
        {plannedProductFamilies
          .filter((group) => group.existingCategory === category)
          .map((group) => (
            <section key={group.id} className="showcase-catalog-subgroups" aria-labelledby={`subgroups-${group.id}`}>
              <div className="showcase-catalog-subgroups-title">
                <div>
                  <span>{label(locale,"subcategories").toLocaleUpperCase(locale)}</span>
                  <h3 id={`subgroups-${group.id}`}>{t(group.title)}</h3>
                </div>
                <span className="showcase-catalog-subgroup-count">{group.subfamilies.length} {locale === "ru" ? "направлений" : locale === "en" ? "subcategories" : "istiqamət"}</span>
              </div>
              <ol className="showcase-catalog-subgroup-grid">
                {group.subfamilies.map((label, i) => (
                  <li key={label}>
                    <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <strong>{t(label)}</strong>
                  </li>
                ))}
              </ol>
              <p>{locale === "ru" ? "Проверенные модели и фотографии будут добавляться по мере подтверждения. Доступная продукция представлена ниже." : locale === "en" ? "Verified models and photos will be added as they are approved. Current products are shown below." : "Bu alt kateqoriyalar üzrə ayrıca model və fotolar təsdiqləndikcə kataloqa əlavə olunur. Mövcud məhsullar aşağıda göstərilir."}</p>
            </section>
          ))}
        {category === "refler" && <div className="mobile-shelf-shortcuts"><ShelfNavigation locale={locale} /></div>}
        {furnitureSelected && (
          <ToggleGroup
            type="single"
            value={category}
            onValueChange={select}
            className="furniture-filters"
            aria-label={locale === "ru" ? "Виды металлической мебели" : locale === "en" ? "Types of metal furniture" : "Metal mebel növləri"}
          >
            <ToggleGroupItem value="metal-mebel">
              {locale === "ru" ? "Вся металлическая мебель" : locale === "en" ? "All metal furniture" : "Bütün metal mebel"}
            </ToggleGroupItem>
            {categories
              .filter((c) => categoryMatches(c.id, "metal-mebel"))
              .map((c) => (
                <ToggleGroupItem key={c.id} value={c.id}>
                  {t(c.name)}
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
              placeholder={label(locale,"search")}
              aria-label={label(locale,"search")}
            />
            {query && (
              <button
                className="icon-button"
                aria-label={locale === "ru" ? "Очистить поиск" : locale === "en" ? "Clear search" : "Axtarışı təmizlə"}
                onClick={() => setQuery("")}
              >
                <X size={17} />
              </button>
            )}
          </label>
          <span aria-live="polite">{results.length} {locale === "ru" ? "результатов" : locale === "en" ? "results" : "nəticə"}</span>
        </div>
        {results.length ? (
          <div className="product-grid">
            {results.map((p) => (
              <article className="product-card" key={p.slug}>
                <ProductGallery images={getProductMedia(p).map(m=>({...m,title:t(m.title)}))} name={t(p.name)} href={url(`/mehsullar/${p.slug}/`)} overlay={<>{p.kind === "service" && p.category !== "direkler" && <ServiceAnnotation category={p.category} locale={locale} />}{p.capacity && <span className="shelf-card-load">{p.capacity.perShelf} <small>{locale === "ru" ? "кг / полка" : locale === "en" ? "kg / shelf" : "kq / rəf"}</small></span>}</>} />
                <div className="product-card-content">
                  <span className="product-category">
                    {t(categories.find((c) => c.id === p.category)?.name ?? "")}
                  </span>
                  <h2>
                    <Link href={url(`/mehsullar/${p.slug}/`)}>{t(p.name)}</Link>
                  </h2>
                  <p>
                    {p.capacity
                      ? locale === "ru" ? `Стеллаж целиком: до ${p.capacity.total} кг.` : locale === "en" ? `Full shelving unit: up to ${p.capacity.total} kg.` : `Bütöv stellaj: ${p.capacity.total} kq-a qədər.`
                      : p.kind === "service"
                      ? t("İş həcmi və tələblər barədə məlumat alın.")
                      : t("Ölçü və komplektasiya barədə məlumat alın.")}
                  </p>
                  <Link href={url(`/mehsullar/${p.slug}/`)} className="text-link">
                    {label(locale,"viewDetails")} <ArrowUpRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <Empty className="catalog-empty">
            <EmptyHeader>
              <EmptyTitle>{label(locale,"noResults")}</EmptyTitle>
              <EmptyDescription>
                {locale === "ru" ? "Попробуйте другой запрос или смените категорию." : locale === "en" ? "Try another term or change the category." : "Başqa sözlə axtarın və ya kateqoriya seçimini dəyişin."}
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
                {locale === "ru" ? "Показать все результаты" : locale === "en" ? "Show all results" : "Bütün nəticələri göstər"}
              </button>
            </EmptyContent>
          </Empty>
        )}
        <p className="image-note">
          {locale === "ru" ? "В каталоге есть иллюстрации и фотографии выполненных работ. Точный внешний вид и технические характеристики подтверждаются при заказе." : locale === "en" ? "The catalog contains illustrations and photos of completed work. Exact appearance and technical specifications are confirmed when ordering." : "Kataloqda nümunə görüntülər və real işlərimizdən şəkillər yer alır. Dəqiq görünüş və texniki xüsusiyyətlər sifariş zamanı təsdiqlənir."}
        </p>
      </div>
    </section>
  );
}
