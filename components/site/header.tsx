"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Menu, X, ArrowUpRight, MapPin } from "lucide-react";
import { nav } from "@/lib/content";
import { withSiteBasePath } from "@/lib/site-path";
export function Logo() {
  return (
    <span className="brand-image">
      <img
        src={withSiteBasePath("/images/logo.jpg")}
        alt="Legends General — Professional Metal Works"
        width="897"
        height="954"
      />
    </span>
  );
}
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main">
        Əsas məzmuna keç
      </a>
      <div className="utility">
        <div className="container">
          <span>Metal mebel və saxlama sistemləri</span>
          <span>
            <MapPin size={13} /> Bakı, Azərbaycan
          </span>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link
            href="/"
            aria-label="Legends General — ana səhifə"
            onClick={() => setOpen(false)}
          >
            <Logo />
          </Link>
          <nav className="desktop-nav" aria-label="Əsas menyu">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={
                  (pathname.replace(/\/$/, "") || "/") ===
                  (n.href.replace(/\/$/, "") || "/")
                    ? "page"
                    : undefined
                }
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link
              href="/kataloq/#axtaris"
              className="icon-button"
              aria-label="Kataloqda axtarış"
            >
              <Search size={21} />
            </Link>
            <Link className="button small" href="/elaqe/">
              Məlumat al <ArrowUpRight size={17} />
            </Link>
            <button
              type="button"
              className="icon-button mobile-toggle"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Menyunu bağla" : "Menyunu aç"}
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav id="mobile-nav" className="mobile-nav" aria-label="Mobil menyu">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
                {n.label}
                <ArrowUpRight size={17} />
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
