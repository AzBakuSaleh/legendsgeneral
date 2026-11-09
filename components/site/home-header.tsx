"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, LayoutGrid, MapPin, Menu, Phone, Search, X } from "lucide-react";
import { mapUrl, nav, phones } from "@/lib/content";
import { withSiteBasePath } from "@/lib/site-path";
import { Logo } from "./header";
import styles from "./home.module.css";

const homeNav = [
  ...nav.slice(0, 2),
  { href: "#istehsalat", label: "İstehsalat" },
  ...nav.slice(2),
];

export function HomeHeader() {
  const [open, setOpen] = useState(false);
  const phone = phones[0];

  return (
    <header
      className={`${styles.home} ${styles.header}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          document.getElementById("home-menu-toggle")?.focus();
        }
      }}
    >
      <a className="skip-link" href="#main">Əsas məzmuna keç</a>
      <div className={styles.utility}>
        <div className={styles.wrap}>
          <a href={mapUrl} target="_blank" rel="noopener noreferrer">
            <MapPin size={14} aria-hidden="true" /> Bakı, Azərbaycan
          </a>
          <span>Metal istehsalı və xidmətlər</span>
        </div>
      </div>
      <div className={`${styles.wrap} ${styles.masthead}`}>
        <Link className={styles.logo} href="/" aria-label="Legends General — ana səhifə">
          <Logo />
        </Link>
        <Link className={`${styles.button} ${styles.catalogButton}`} href="/kataloq/">
          <LayoutGrid size={17} aria-hidden="true" /> Kataloq
        </Link>
        <form
          className={styles.search}
          action={withSiteBasePath("/kataloq/")}
          method="get"
          role="search"
          aria-label="Kataloqda axtarış"
        >
          <Search size={19} aria-hidden="true" />
          <input name="q" type="search" aria-label="Məhsul axtarışı" placeholder="Məhsul axtarın" />
          <button type="submit">Axtar</button>
        </form>
        <a className={styles.headerPhone} href={`tel:+${phone.number}`} aria-label={`Zəng edin, ${phone.label}`}>
          <Phone size={17} aria-hidden="true" /> <span>{phone.label}</span>
        </a>
        <a className={`${styles.button} ${styles.outline} ${styles.headerQuote}`} href="#muraciet">
          Qiymət təklifi al <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <button
          className={styles.menuToggle}
          type="button"
          id="home-menu-toggle"
          aria-expanded={open}
          aria-controls="home-mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />} Menyu
        </button>
      </div>
      <nav className={styles.desktopNav} aria-label="Əsas menyu">
        <div className={styles.wrap}>
          {homeNav.map(({ href, label }) => (
            <Link key={href} href={href} aria-current={href === "/" ? "page" : undefined}>{label}</Link>
          ))}
        </div>
      </nav>
      <nav className={`${styles.wrap} ${styles.mobileNav}`} id="home-mobile-nav" aria-label="Mobil menyu" hidden={!open}>
        {homeNav.map(({ href, label }) => (
          <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={href === "/" ? "page" : undefined}>
            {label} <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        ))}
        <a href="#muraciet" onClick={() => setOpen(false)}>Qiymət təklifi al <ArrowUpRight size={16} aria-hidden="true" /></a>
      </nav>
    </header>
  );
}
