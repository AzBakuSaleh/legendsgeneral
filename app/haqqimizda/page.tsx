import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MessageSquare, Ruler, Factory } from "lucide-react";
import { PageHeading } from "@/components/site/shared";
import { ContactSection } from "@/components/site/contact";
import { divisions, projects } from "@/lib/content";
import { tr, label, localizedHref, type Locale } from "@/lib/i18n";
export const metadata: Metadata = {
  title: "Haqqımızda",
  description:
    "Legends General MMC — Azərbaycanda metal mebel, konstruksiyalar, dekorativ metal işləri və istehsal xidmətləri.",
};
export default function AboutPage() { return <AboutPageContent locale="az"/>; }
export function AboutPageContent({locale}:{locale:Locale}) {
  const t=(s:string)=>tr(locale,s);
  const url=(s:string)=>localizedHref(locale,s);
  return (
    <main id="main">
      <PageHeading locale={locale}
        title={label(locale,"about")}
        description="Legends General — Professional Metal Works"
      />
      <section className="container section about-story">
        <div className="about-photo">
          <img
            src={projects[5].image}
            alt={locale === "ru" ? "Стеллажи и шкафы Legends General" : locale === "en" ? "Legends General shelving and cabinets" : "Legends General tərəfindən hazırlanmış rəf və dolab sistemi"}
            width="720"
            height="960"
          />
          <span>{locale === "ru" ? "НАШИ РАБОТЫ" : locale === "en" ? "OUR PROJECTS" : "Görülən işlərimizdən"}</span>
        </div>
        <div className="about-copy">
          <span className="eyebrow">{locale === "ru" ? "ПРОИЗВОДСТВО В АЗЕРБАЙДЖАНЕ" : locale === "en" ? "METAL FABRICATION IN AZERBAIJAN" : "AZƏRBAYCANDA METAL İSTEHSALI"}</span>
          <h2>
            {locale === "ru" ? <>От металлической мебели<br/>до конструкций.</> : locale === "en" ? <>From metal furniture<br/>to steel structures.</> : <>Metal mebeldən<br/>konstruksiyalara.</>}
          </h2>
          <p>
            {locale === "ru" ? "Legends General MMC производит металлическую мебель, строительные конструкции и декоративные металлоизделия в Азербайджане. Мы принимаем заказы на стеллажи, шкафы, сейфы, кровати, металлические опоры, складские и ангарные конструкции." : locale === "en" ? "Legends General MMC manufactures metal furniture, structural steelwork and decorative metal products in Azerbaijan. We accept orders ranging from shelving, lockers, safes and beds to metal poles, warehouses and hangar structures." : "Legends General MMC Azərbaycanda metal mebel, tikinti konstruksiyaları və dekorativ metal məmulatlar hazırlayır. Stellaj, dolab, seyf və çarpayılardan metal dirəklərə, anbar və anqar konstruksiyalarına qədər müxtəlif istiqamətlər üzrə sifarişlər qəbul edilir."}
          </p>
          <p>
            {locale === "ru" ? "Мы также изготавливаем сухогрузные и рефрижераторные контейнеры, двери для промышленных холодильных камер и кузова грузовых автомобилей. Предоставляем услуги лазерной и координатно-пробивной резки, гибки, сварки и порошковой окраски. Размеры, материалы, комплектация и объём работ уточняются для каждого заказа." : locale === "en" ? "Our services also include dry and refrigerated containers, industrial cold-room doors and truck bodies, as well as CNC laser cutting, punching, bending, welding and electrostatic powder coating. Materials, dimensions, configurations and scope are specified for each order." : "Fəaliyyətimizə quru və soyuducu konteynerlərin, sənaye soyuducu qapılarının və yük avtomobili kuzovlarının hazırlanması, həmçinin CNC lazer və Punch kəsmə, bükmə, qaynaq və elektrostatik toz boyama daxildir. Ölçü, material, komplektasiya və iş həcmi sifarişin tələblərinə uyğun dəqiqləşdirilir."}
          </p>
          <Link href={url("/gorulen-isler/")} className="text-link">
            {locale === "ru" ? "Смотреть работы" : locale === "en" ? "View our work" : "İşlərimizə baxın"} <ArrowUpRight />
          </Link>
        </div>
      </section>
      <section className="process-section">
        <div className="container section">
          <div className="section-heading">
            <div>
              <h2>{locale === "ru" ? "Как начать?" : locale === "en" ? "How it works" : "Haradan başlayaq?"}</h2>
              <p>{locale === "ru" ? "Три простых шага, чтобы обсудить ваш заказ." : locale === "en" ? "Three simple steps to discuss your order." : "Sifarişinizi müzakirə etmək üçün üç sadə addım."}</p>
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
                <h3>{t(item.title)}</h3>
                <p>{t(item.text)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <h2>{locale === "ru" ? "Наши направления" : locale === "en" ? "What we do" : "Fəaliyyət istiqamətlərimiz"}</h2>
          <Link href={url("/kataloq/")} className="text-link">
            {locale === "ru" ? "Перейти в каталог" : locale === "en" ? "Browse catalog" : "Kataloqa keç"} <ArrowUpRight />
          </Link>
        </div>
        <div className="about-categories">
          {divisions.map((c) => (
            <Link key={c.id} href={url(`/kataloq/?kateqoriya=${c.id}`)}>
              <h3>{t(c.name)}</h3>
              <p>{t(c.description)}</p>
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </div>
      </section>
      <ContactSection locale={locale} />
    </main>
  );
}
