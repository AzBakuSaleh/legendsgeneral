import Link from "next/link";
import { ArrowUpRight, FileText, ShieldAlert } from "lucide-react";
import { publicCertificates } from "@/lib/certifications";
import styles from "./certificates.module.css";
import { label, tr, localizedHref, type Locale } from "@/lib/i18n";

function renderDate(iso: string) {
  return iso.split("-").reverse().join(".");
}

export function Certificates({ locale = "az" }: { locale?: Locale }) {
  return (
    <section id="uygunluq" className={styles.section} aria-labelledby="certificates-title">
      <div className={styles.wrap}>
        <div className={styles.heading}>
          <div>
            <span className={styles.eyebrow}>{locale === "ru" ? "Документы · соответствие продукции" : locale === "en" ? "Documents · product conformity" : "Sənədlər · məhsul uyğunluğu"}</span>
            <h2 id="certificates-title">{label(locale, "docs")}</h2>
            <p>
              {locale === "ru"
                ? "Информация о трёх документах соответствия, представленных на имя Legends General MMC. Применимо только к продукции, указанной в документах."
                : locale === "en"
                ? "Information on three conformity documents issued in the name of Legends General MMC. Scope is limited to the product groups specified in the documents."
                : "Legends General MMC adına təqdim edilən üç uyğunluq sənədi üzrə məlumatlar. Yalnız sənədlərdə göstərilmiş məhsul qruplarına aiddir."}
            </p>
          </div>
          <FileText size={35} strokeWidth={1.4} aria-hidden="true" />
        </div>
        <div className={styles.cards}>
          {publicCertificates.map((cert) => (
            <article className={styles.card} key={cert.id}>
              <FileText className={styles.icon} size={26} strokeWidth={1.5} aria-hidden="true" />
              <h3>{tr(locale, cert.label)}</h3>
              <dl>
                <div><dt>{locale === "ru" ? "Продукция в документе" : locale === "en" ? "Product listed" : "Sənəddə qeyd edilən məhsul"}</dt><dd>{tr(locale, cert.certificateScope)}</dd></div>
                <div><dt>{locale === "ru" ? "Указанный стандарт" : locale === "en" ? "Referenced standard" : "İstinad edilən standart"}</dt><dd>{cert.standard}</dd></div>
                <div><dt>{locale === "ru" ? "Орган выдачи" : locale === "en" ? "Issuing body" : "Sertifikatı verən qurum"}</dt><dd>{cert.issuer}</dd></div>
                <div><dt>{locale === "ru" ? "Дата выдачи" : locale === "en" ? "Issue date" : "Verilmə tarixi"}</dt><dd>{renderDate(cert.issueDate)}</dd></div>
                <div><dt>{locale === "ru" ? "Срок действия по документу" : locale === "en" ? "Expiry shown in document" : "Sənəddə göstərilən son tarix"}</dt><dd>{renderDate(cert.expiryDate)}</dd></div>
              </dl>
            </article>
          ))}
        </div>
        <div className={styles.notice}>
          <ShieldAlert size={21} aria-hidden="true" />
          <p>
            {locale === "ru"
              ? "Сведения взяты из предоставленных документов. Текущий статус в реестре и применимость к каждой модели независимо не подтверждены. Документ на опоры освещения не распространяется автоматически на опоры камер CCTV или дорожных знаков; документ на шкафы — на все виды шкафов. Полные сканы с подписями и печатями не публикуются. Подлинность предложения уточняйте через официальные контакты."
              : locale === "en"
              ? "Information is based on the documents supplied. Current registry status and applicability to any specific model have not been independently verified. The lighting-pole document does not automatically cover CCTV or traffic-sign poles, and the cabinet document does not automatically cover all cabinet types. Full scans bearing signatures or stamps are not published. Verify proposals via our official contact channels."
              : "Məlumatlar təqdim olunmuş sənədlərdən götürülüb; sertifikatların cari reyestr statusu və hər bir konkret modelə tətbiqi müstəqil təsdiqlənməyib. İşıqlandırma sənədi CCTV və yol nişanı dirəklərinə, dolab sənədi isə bütün dolab növlərinə avtomatik şamil edilmir. Orijinal surətlər imza və möhürlərdən sui-istifadə riskinə görə açıq yayımlanmır. Təklifin həqiqiliyini rəsmi əlaqə kanallarımızdan yoxlayın."}
          </p>
          <Link href={localizedHref(locale, "/elaqe/")}>
            {locale === "ru" ? "Официальные контакты" : locale === "en" ? "Official contact" : "Rəsmi əlaqə"} <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
