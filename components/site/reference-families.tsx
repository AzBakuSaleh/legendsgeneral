"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Layers3 } from "lucide-react";
import { plannedProductFamilies } from "@/lib/product-families";
import { withSiteBasePath } from "@/lib/site-path";
import styles from "./reference-families.module.css";
import { tr, localizedHref, label, type Locale } from "@/lib/i18n";

const presentation: Record<string, { image: string; position?: string }> = {
  "metal-stellajlar": { image: "/images/catalog-preview/rack-loaded.jpg" },
  "mobil-arxiv": { image: "/images/mobile-archive.webp" },
  "istehsalat-mebeli": { image: "/images/metal-workbench.webp" },
  "ofis-mebeli": { image: "/images/catalog-preview/locker-closed.jpg" },
  seyfler: { image: "/images/catalog-preview/safe-open.jpg" },
  "diger-metal-mehsullar": { image: "/images/hero-showroom.webp", position: "65% center" },
};

export function ReferenceFamilies({ compact = false, locale = "az" }: { compact?: boolean; locale?: Locale }) {
  const t = (value: string) => tr(locale, value);
  const url = (p: string) => localizedHref(locale,p);
  const [selected, setSelected] = useState(0);
  const group = plannedProductFamilies[selected] ?? plannedProductFamilies[0];
  const media = presentation[group.id];
  const visibleCount = compact ? 4 : 6;
  const remaining = group.subfamilies.slice(visibleCount);

  function moveTab(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % plannedProductFamilies.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + plannedProductFamilies.length - 1) % plannedProductFamilies.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = plannedProductFamilies.length - 1;
    else return;

    event.preventDefault();
    setSelected(next);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]
      ?.focus();
  }

  return (
    <section className={styles.section} id="mehsul-aileleri" aria-labelledby="product-groups-heading">
      <div className={styles.heading}>
        <div>
          <span className={styles.eyebrow}>LEGENDS GENERAL / {label(locale,"catalog").toLocaleUpperCase(locale)}</span>
          <h2 id="product-groups-heading">{label(locale,"productGroups")}</h2>
          <p>{locale === "ru" ? "Выберите подходящее направление продукции для производства и хранения." : locale === "en" ? "Explore products for your manufacturing and storage needs." : "İstehsalat və saxlama ehtiyaclarınıza uyğun məhsul istiqamətini seçin."}</p>
        </div>
        <span className={styles.headingCount}>
          <Layers3 size={17} aria-hidden="true" />
          06 {locale === "ru" ? "направлений" : locale === "en" ? "categories" : "istiqamət"}
        </span>
      </div>

      <div className={styles.navigation} role="tablist" aria-label={label(locale,"productGroups")}>
        {plannedProductFamilies.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`group-tab-${item.id}`}
            aria-selected={index === selected}
            aria-controls="group-active-panel"
            tabIndex={index === selected ? 0 : -1}
            className={`${styles.tab} ${index === selected ? styles.active : ""}`}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => moveTab(event, index)}
          >
            <span className={styles.tabNumber}>{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.tabText}>
              <strong>{t(item.title)}</strong>
              <small>{item.subfamilies.length} {locale === "ru" ? "подкатегорий" : locale === "en" ? "subcategories" : "alt kateqoriya"}</small>
            </span>
            <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div
        className={styles.feature}
        id="group-active-panel"
        role="tabpanel"
        aria-labelledby={`group-tab-${group.id}`}
        tabIndex={0}
        key={group.id}
      >
        <figure className={styles.photo}>
          <img
            src={withSiteBasePath(media.image)}
            alt={locale === "ru" ? `Иллюстрация: ${t(group.title)}` : locale === "en" ? `Illustration: ${t(group.title)}` : `${group.title} məhsul qrupunu təsvir edən nümunə foto`}
            width={900}
            height={760}
            loading="lazy"
            style={media.position ? { objectPosition: media.position } : undefined}
          />
          <figcaption>{label(locale,"imageSample")}</figcaption>
          <span className={styles.photoIndex} aria-hidden="true">
            {String(selected + 1).padStart(2, "0")}<small>/06</small>
          </span>
        </figure>

        <div className={styles.content}>
          <span className={styles.contentEyebrow}>{locale === "ru" ? "ВЫБРАННАЯ КАТЕГОРИЯ" : locale === "en" ? "SELECTED CATEGORY" : "SEÇİLMİŞ İSTİQAMƏT"}</span>
          <h3>{t(group.title)}</h3>
          <p className={styles.summary}>{t(group.description)}</p>
          <div className={styles.listHeading}>
            <span>{label(locale,"subcategories")}</span>
            <span>{group.subfamilies.length} {locale === "ru" ? "направлений" : locale === "en" ? "subcategories" : "istiqamət"}</span>
          </div>
          <ul className={styles.subcategories}>
            {group.subfamilies.slice(0, visibleCount).map((name) => (
              <li key={name}><span aria-hidden="true" />{t(name)}</li>
            ))}
          </ul>
          {remaining.length > 0 && (
            <details className={styles.more}>
              <summary>{locale === "ru" ? `Показать ещё ${remaining.length}` : locale === "en" ? `View ${remaining.length} more` : `Daha ${remaining.length} alt kateqoriyaya bax`} <ChevronDown size={15} aria-hidden="true" /></summary>
              <ul className={styles.subcategories}>
                {remaining.map((name) => <li key={name}><span aria-hidden="true" />{t(name)}</li>)}
              </ul>
            </details>
          )}
          <div className={styles.actions}>
            <Link className={styles.primaryLink} href={url(`/kataloq/?kateqoriya=${group.existingCategory}`)}>
              {locale === "ru" ? "Смотреть товары" : locale === "en" ? "Browse products" : "Mövcud məhsullara bax"} <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link className={styles.secondaryLink} href={url("/elaqe/")}>
              {locale === "ru" ? "Отправить запрос" : locale === "en" ? "Send enquiry" : "Sorğu göndər"} <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <p className={styles.footnote}>
        {locale === "ru" ? "Примечание: Подкатегории обозначают направления развития каталога. Конкретные модели, фотографии и характеристики будут добавляться после подтверждения компанией." : locale === "en" ? "Note: These subcategories describe planned catalog expansion. Specific models, photographs and technical specifications will be added once approved by the company." : "Qeyd: Buradakı alt kateqoriyalar kataloqun genişləndirilmə istiqamətləridir. Konkret model, foto və texniki göstəricilər şirkət tərəfindən təsdiqləndikcə məhsul səhifələrinə əlavə olunur."}
      </p>
    </section>
  );
}
