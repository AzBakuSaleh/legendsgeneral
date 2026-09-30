import Link from "next/link";
import { shelfClasses } from "@/lib/content";

export function ShelfNavigation({ activeSlug }: { activeSlug?: string }) {
  return (
    <nav className="shelf-navigation" aria-label="Stellajın rəf yükünə görə seçimi">
      <p>Bir rəfin yük həddi</p>
      {shelfClasses.map((item) => (
        <Link
          key={item.slug}
          href={`/mehsullar/${item.slug}/`}
          aria-current={item.slug === activeSlug ? "page" : undefined}
        >
          <strong>{item.perShelf} <small>kq/rəf</small></strong>
          <span>Ümumi: {item.total} kq</span>
        </Link>
      ))}
    </nav>
  );
}
