import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MessageSquare, Ruler, Factory } from "lucide-react";
import { PageHeading } from "@/components/site/shared";
import { ContactSection } from "@/components/site/contact";
import { divisions, projects } from "@/lib/content";
export const metadata: Metadata = {
  title: "Haqqımızda",
  description:
    "Legends General MMC — Azərbaycanda metal mebel, konstruksiyalar, dekorativ metal işləri və istehsal xidmətləri.",
};
export default function AboutPage() {
  return (
    <main id="main">
      <PageHeading
        title="Haqqımızda"
        description="Legends General — Professional Metal Works"
      />
      <section className="container section about-story">
        <div className="about-photo">
          <img
            src={projects[5].image}
            alt="Legends General tərəfindən hazırlanmış rəf və dolab sistemi"
            width="720"
            height="960"
          />
          <span>Görülən işlərimizdən</span>
        </div>
        <div className="about-copy">
          <span className="eyebrow">AZƏRBAYCANDA METAL İSTEHSALI</span>
          <h2>
            Metal mebeldən
            <br />
            konstruksiyalara.
          </h2>
          <p>
            Legends General MMC Azərbaycanda metal mebel, tikinti
            konstruksiyaları və dekorativ metal məmulatlar hazırlayır. Stellaj,
            dolab, seyf və çarpayılardan metal dirəklərə, anbar və anqar
            konstruksiyalarına qədər müxtəlif istiqamətlər üzrə sifarişlər
            qəbul edilir.
          </p>
          <p>
            Fəaliyyətimizə quru və soyuducu konteynerlərin, sənaye soyuducu
            qapılarının və yük avtomobili kuzovlarının hazırlanması, həmçinin
            CNC lazer və Punch kəsmə, bükmə, qaynaq və elektrostatik toz boyama
            daxildir. Ölçü, material, komplektasiya və iş həcmi sifarişin
            tələblərinə uyğun dəqiqləşdirilir.
          </p>
          <Link href="/gorulen-isler/" className="text-link">
            İşlərimizə baxın <ArrowUpRight />
          </Link>
        </div>
      </section>
      <section className="process-section">
        <div className="container section">
          <div className="section-heading">
            <div>
              <h2>Haradan başlayaq?</h2>
              <p>Sifarişinizi müzakirə etmək üçün üç sadə addım.</p>
            </div>
          </div>
          <div className="process-grid">
            {[
              {
                icon: MessageSquare,
                title: "Ehtiyacınızı bildirin",
                text: "Maraqlandığınız məhsul və ya xidməti, istifadə məqsədini bizimlə paylaşın.",
              },
              {
                icon: Ruler,
                title: "Detalları dəqiqləşdirək",
                text: "Ölçü, say, komplektasiya və digər tələbləri birlikdə müzakirə edək.",
              },
              {
                icon: Factory,
                title: "Təklifinizi alın",
                text: "Qiymət və hazırlanma müddəti barədə fərdi təklif üçün əlaqə saxlayın.",
              },
            ].map((item, i) => (
              <article key={item.title}>
                <div>
                  <item.icon size={27} />
                  <span>0{i + 1}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <h2>Fəaliyyət istiqamətlərimiz</h2>
          <Link href="/kataloq/" className="text-link">
            Kataloqa keç <ArrowUpRight />
          </Link>
        </div>
        <div className="about-categories">
          {divisions.map((c) => (
            <Link key={c.id} href={`/kataloq/?kateqoriya=${c.id}`}>
              <h3>{c.name}</h3>
              <p>{c.description}</p>
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </div>
      </section>
      <ContactSection />
    </main>
  );
}
