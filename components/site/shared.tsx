"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPath, localizedHref, localeNames, tr, label, type Locale } from "@/lib/i18n";
import { ArrowUpRight, Phone, MapPin, Camera as Instagram } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import {
  phones,
  whatsappNumber,
  address,
  mapUrl,
  instagram,
  nav,
  divisions,
} from "@/lib/content";
export function PageHeading({
  title,
  description,
  locale = "az",
}: {
  title: string;
  description?: string;
  locale?: Locale;
}) {
  return (
    <div className="page-heading">
      <div className="container">
        <nav aria-label="Səhifə yolu" className="breadcrumbs">
          <Link href={localizedHref(locale, "/")}>{label(locale, "home")}</Link>
          <span>/</span>
          <span>{title}</span>
        </nav>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}
export function ContactDetails({ locale = "az" }: { locale?: Locale }) {
  return (
    <div className="contact-details">
      <div className="phone-list">
        {phones.map((p) => (
          <div key={p.number} className="phone-row">
            <Phone size={20} />
            <a href={`tel:+${p.number}`}>{p.label}</a>
            {p.number === whatsappNumber && (
              <a
                className="wa-link"
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locale === "ru" ? "Написать в WhatsApp: +994 50 299 10 22" : locale === "en" ? "WhatsApp +994 50 299 10 22" : "+994 50 299 10 22 nömrəsinə WhatsApp yaz"}
              >
                <WhatsAppIcon size={16} /> WhatsApp
              </a>
            )}
          </div>
        ))}
      </div>
      <a
        className="address"
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MapPin size={20} />
        <span>
          {address}
          <small>
            {locale === "ru" ? "Открыть на карте" : locale === "en" ? "Open map" : "Xəritədə aç"} <ArrowUpRight size={14} />
          </small>
        </span>
      </a>
      <a
        className="text-link"
        href={instagram}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Instagram size={18} />
        @legendsgeneral.mmc <ArrowUpRight size={16} />
      </a>
    </div>
  );
}
export function Footer() {
  const locale = localeFromPath(usePathname());
  const url = (path: string) => localizedHref(locale, path);
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link href={url("/")} className="footer-brand">
            LEGENDS<span>GENERAL</span>
          </Link>
          <p>
            {locale === "ru" ? <>Металлическая мебель, конструкции и изделия на заказ.<br />Производство в Азербайджане.</> : locale === "en" ? <>Metal furniture, structures and bespoke metalwork.<br />Manufactured in Azerbaijan.</> : <>Metal mebel, konstruksiyalar və sifarişlə metal işləri.<br />Azərbaycanda istehsal.</>}
          </p>
          <a
            className="text-link"
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={18} />
            Instagram <ArrowUpRight size={16} />
          </a>
        </div>
        <div>
          <h2>{locale === "ru" ? "Карта сайта" : locale === "en" ? "Site map" : "Sayt xəritəsi"}</h2>
          {nav.map((n) => (
            <Link key={n.href} href={url(n.href)}>
              {tr(locale, n.label)}
            </Link>
          ))}
        </div>
        <div>
          <h2>{locale === "ru" ? "Товары и услуги" : locale === "en" ? "Products and services" : "Məhsullar və xidmətlər"}</h2>
          {divisions.map((c) => (
            <Link key={c.id} href={url(`/kataloq/?kateqoriya=${c.id}`)}>
              {tr(locale, c.name)}
            </Link>
          ))}
        </div>
        <div>
          <h2>{label(locale, "contactUs")}</h2>
          {phones.map((p) => (
            <a key={p.number} href={`tel:+${p.number}`}>
              {p.label}
            </a>
          ))}
          <a
            className="footer-address"
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {address}
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Legends General. {locale === "ru" ? "Все права защищены." : locale === "en" ? "All rights reserved." : "Bütün hüquqlar qorunur."}
        </span>
        <span>{localeNames[locale]}</span>
      </div>
    </footer>
  );
}
export function AboutBand({ locale = "az" }: { locale?: Locale }) {
  return (
    <section className="about-band">
      <div className="container">
        <h2>
          {locale === "ru" ? <>Металлические решения<br />для вашего бизнеса.</> : locale === "en" ? <>Metal solutions<br />for your workspace.</> : <>İş məkanınıza uyğun<br />metal həllər.</>}
        </h2>
        <div>
          <p>
            {locale === "ru" ? "Legends General MMC производит металлическую мебель, конструкции и декоративные изделия в Азербайджане. Мы также изготавливаем контейнеры, двери для холодильных камер, кузова грузовиков и предоставляем услуги порошковой окраски." : locale === "en" ? "Legends General MMC manufactures metal furniture, structures and decorative metalwork in Azerbaijan. We also produce containers, industrial cold-room doors and truck bodies, and provide powder coating services." : "Legends General MMC Azərbaycanda metal mebel, konstruksiyalar və dekorativ metal məmulatlar hazırlayır. Konteynerlər, sənaye soyuducu qapıları, yük avtomobili kuzovları və toz boyama xidmətləri ilə də tanış olun."}
          </p>
          <Link href={localizedHref(locale, "/haqqimizda/")} className="button white-outline">
            {label(locale, "about")} <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
