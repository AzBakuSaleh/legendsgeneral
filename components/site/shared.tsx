import Link from "next/link";
import { ArrowUpRight, Phone, MapPin, Camera as Instagram } from "lucide-react";
import {
  phones,
  address,
  mapUrl,
  instagram,
  nav,
  categories,
} from "@/lib/content";
export function PageHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="page-heading">
      <div className="container">
        <nav aria-label="Səhifə yolu" className="breadcrumbs">
          <Link href="/">Ana səhifə</Link>
          <span>/</span>
          <span>{title}</span>
        </nav>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}
export function ContactDetails() {
  return (
    <div className="contact-details">
      <div className="phone-list">
        {phones.map((p) => (
          <div key={p.number} className="phone-row">
            <Phone size={20} />
            <a href={`tel:+${p.number}`}>{p.label}</a>
            <a
              className="wa-link"
              href={`https://wa.me/${p.number}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.label} nömrəsinə WhatsApp yaz`}
            >
              WhatsApp <ArrowUpRight size={14} />
            </a>
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
            Xəritədə aç <ArrowUpRight size={14} />
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
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="footer-brand">
            LEGENDS<span>GENERAL</span>
          </Link>
          <p>
            Metal mebel və saxlama sistemləri.
            <br />
            Azərbaycanda istehsal.
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
          <h2>Sayt xəritəsi</h2>
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </div>
        <div>
          <h2>Məhsullar</h2>
          {categories.map((c) => (
            <Link key={c.id} href={`/kataloq/?kateqoriya=${c.id}`}>
              {c.name}
            </Link>
          ))}
        </div>
        <div>
          <h2>Bizimlə əlaqə</h2>
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
          © {new Date().getFullYear()} Legends General. Bütün hüquqlar qorunur.
        </span>
        <span>Azərbaycan dili</span>
      </div>
    </footer>
  );
}
export function AboutBand() {
  return (
    <section className="about-band">
      <div className="container">
        <h2>
          İş məkanınıza uyğun
          <br />
          metal həllər.
        </h2>
        <div>
          <p>
            Legends General Azərbaycanda metal mebel və saxlama sistemləri
            istehsal edir. Məhsul çeşidləri ilə tanış olun, ehtiyacınıza uyğun
            həlli birlikdə müəyyənləşdirək.
          </p>
          <Link href="/haqqimizda/" className="button white-outline">
            Haqqımızda <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
