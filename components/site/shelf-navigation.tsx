import Link from "next/link";
import { shelfClasses } from "@/lib/content";
import { localizedHref, type Locale } from "@/lib/i18n";

export function ShelfNavigation({ activeSlug, locale = "az" }: { activeSlug?: string; locale?: Locale }) {
  return (
    <nav className="shelf-navigation" aria-label={locale === "ru" ? "Подбор стеллажа по нагрузке на полку" : locale === "en" ? "Choose shelving by load per shelf" : "Stellajın rəf yükünə görə seçimi"}>
      <p>{locale === "ru" ? "Нагрузка на одну полку" : locale === "en" ? "Load per shelf" : "Bir rəfin yük həddi"}</p>
      {shelfClasses.map((item) => (
        <Link
          key={item.slug}
          href={localizedHref(locale, `/mehsullar/${item.slug}/`)}
          aria-current={item.slug === activeSlug ? "page" : undefined}
        >
          <strong>{item.perShelf} <small>{locale === "ru" ? "кг/полка" : locale === "en" ? "kg/shelf" : "kq/rəf"}</small></strong>
          <span>{locale === "ru" ? `Всего: ${item.total} кг` : locale === "en" ? `Total: ${item.total} kg` : `Ümumi: ${item.total} kq`}</span>
        </Link>
      ))}
    </nav>
  );
}
