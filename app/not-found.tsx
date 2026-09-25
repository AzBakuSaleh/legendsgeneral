import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <main id="main" className="container not-found">
      <span className="eyebrow">404</span>
      <h1>Səhifə tapılmadı</h1>
      <p>
        Bu ünvan mövcud deyil. Məhsullarımızla kataloqda tanış ola bilərsiniz.
      </p>
      <Link href="/kataloq/" className="button">
        Kataloqa keç <ArrowUpRight size={18} />
      </Link>
      <Link href="/" className="text-link">
        Ana səhifəyə qayıt
      </Link>
    </main>
  );
}
