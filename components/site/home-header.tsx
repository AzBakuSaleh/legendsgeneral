"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, MessageCircle, Search, X } from "lucide-react";
import { whatsappNumber } from "@/lib/content";
import { Logo } from "./header";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { localeFromPath, localizedHref, label } from "@/lib/i18n";
import styles from "./home.module.css";

const navigation = [
  { href: "/", key: "home" },
  { href: "/kataloq/", key: "products" },
  { href: "/gorulen-isler/", key: "projects" },
  { href: "/haqqimizda/", key: "about" },
  { href: "/#emekdasliqlar", key: "partners" },
  { href: "/elaqe/", key: "contact" },
] as const;

export function HomeHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const whatsapp = `https://wa.me/${whatsappNumber}`;

  return (
    <header
      className={`${styles.home} ${styles.header} ${styles.showcaseHeader}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          document.getElementById("showcase-menu-toggle")?.focus();
        }
      }}
    >
      <a className="skip-link" href="#main">Əsas məzmuna keç</a>
      <div className={`${styles.wrap} ${styles.masthead} ${styles.showcaseMasthead}`}>
        <div className={styles.showcaseBrand}>
          <Link className={styles.logo} href="/" aria-label="Legends General — ana səhifə">
            <Logo />
          </Link>
          <span className={styles.brandDescriptor} aria-label="Metal konstruksiya istehsalatı">
            {locale === "ru" ? <>ПРОИЗВОДСТВО<br />МЕТАЛЛО-<br />КОНСТРУКЦИЙ</> : locale === "en" ? <>METAL<br />FABRICATION<br />AND WORKS</> : <>METAL<br />KONSTRUKSİYA<br />İSTEHSALATI</>}
          </span>
        </div>

        <nav className={styles.showcaseNav} aria-label="Əsas menyu">
          {navigation.map(({ href, key }) => (
            <Link
              key={href}
              href={localizedHref(locale, href)}
              aria-current={(pathname.replace(/\/$/, "") || "/") === (localizedHref(locale, href).replace(/\/$/, "") || "/") ? "page" : undefined}
            >
              {label(locale, key)}
            </Link>
          ))}
        </nav>

        <div className={styles.showcaseActions}>
          <Link href={localizedHref(locale, "/kataloq/#axtaris")} className={styles.showcaseSearch} aria-label="Məhsul axtarışı">
            <Search size={22} strokeWidth={1.8} aria-hidden="true" />
          </Link>
          <a href={whatsapp} className={styles.whatsappLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={20} aria-hidden="true" />
            <span>{label(locale, "whatsapp")}</span>
          </a>
          <ThemeToggle />
          <LanguageToggle />
          <button
            type="button"
            className={styles.showcaseMenuToggle}
            id="showcase-menu-toggle"
            aria-label={open ? "Menyunu bağla" : "Menyunu aç"}
            aria-expanded={open}
            aria-controls="showcase-mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav
        className={`${styles.wrap} ${styles.showcaseMobileNav}`}
        id="showcase-mobile-navigation"
        aria-label="Mobil menyu"
        hidden={!open}
      >
        {navigation.map(({ href, key }) => (
          <Link href={localizedHref(locale, href)} key={href} onClick={() => setOpen(false)}>
            {label(locale, key)}<ArrowRight size={17} aria-hidden="true" />
          </Link>
        ))}
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
          {label(locale, "whatsapp")} <MessageCircle size={17} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
