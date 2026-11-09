"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, MessageCircle, Search, X } from "lucide-react";
import { phones } from "@/lib/content";
import { Logo } from "./header";
import styles from "./home.module.css";

const navigation = [
  { href: "/", label: "Ana səhifə" },
  { href: "/kataloq/", label: "Məhsullar" },
  { href: "/gorulen-isler/", label: "Layihələr" },
  { href: "/haqqimizda/", label: "Haqqımızda" },
  { href: "/#emekdasliqlar", label: "Əməkdaşlıqlar" },
  { href: "/elaqe/", label: "Əlaqə" },
];

export function HomeHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const whatsapp = `https://wa.me/${phones[0].number}`;

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
            METAL<br />KONSTRUKSİYA<br />İSTEHSALATI
          </span>
        </div>

        <nav className={styles.showcaseNav} aria-label="Əsas menyu">
          {navigation.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={(pathname.replace(/\/$/, "") || "/") === (href.replace(/\/$/, "") || "/") ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className={styles.showcaseActions}>
          <Link href="/kataloq/#axtaris" className={styles.showcaseSearch} aria-label="Məhsul axtarışı">
            <Search size={22} strokeWidth={1.8} aria-hidden="true" />
          </Link>
          <a href={whatsapp} className={styles.whatsappLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={20} aria-hidden="true" />
            <span>WhatsApp ilə əlaqə</span>
          </a>
          <span className={styles.languageLabel} aria-label="Saytın dili Azərbaycan dilidir">AZ</span>
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
        {navigation.map(({ href, label }) => (
          <Link href={href} key={href} onClick={() => setOpen(false)}>
            {label}<ArrowRight size={17} aria-hidden="true" />
          </Link>
        ))}
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
          WhatsApp ilə əlaqə <MessageCircle size={17} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
