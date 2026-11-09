import Link from "next/link";
import { ArrowUpRight, FileText, ShieldAlert } from "lucide-react";
import { publicCertificates } from "@/lib/certifications";
import styles from "./certificates.module.css";

function renderDate(iso: string) {
  return iso.split("-").reverse().join(".");
}

export function Certificates() {
  return (
    <section id="uygunluq" className={styles.section} aria-labelledby="certificates-title">
      <div className={styles.wrap}>
        <div className={styles.heading}>
          <div>
            <span className={styles.eyebrow}>Sənədlər · məhsul uyğunluğu</span>
            <h2 id="certificates-title">Uyğunluq sertifikatları</h2>
            <p>
              Legends General MMC adına təqdim edilən üç uyğunluq sənədi üzrə
              məlumatlar. Yalnız sənədlərdə göstərilmiş məhsul qruplarına aiddir.
            </p>
          </div>
          <FileText size={35} strokeWidth={1.4} aria-hidden="true" />
        </div>
        <div className={styles.cards}>
          {publicCertificates.map((cert) => (
            <article className={styles.card} key={cert.id}>
              <FileText className={styles.icon} size={26} strokeWidth={1.5} aria-hidden="true" />
              <h3>{cert.label}</h3>
              <dl>
                <div><dt>Sənəddə qeyd edilən məhsul</dt><dd>{cert.certificateScope}</dd></div>
                <div><dt>İstinad edilən standart</dt><dd>{cert.standard}</dd></div>
                <div><dt>Sertifikatı verən qurum</dt><dd>{cert.issuer}</dd></div>
                <div><dt>Verilmə tarixi</dt><dd>{renderDate(cert.issueDate)}</dd></div>
                <div><dt>Sənəddə göstərilən son tarix</dt><dd>{renderDate(cert.expiryDate)}</dd></div>
              </dl>
            </article>
          ))}
        </div>
        <div className={styles.notice}>
          <ShieldAlert size={21} aria-hidden="true" />
          <p>
            Məlumatlar təqdim olunmuş sənədlərdən götürülüb; sertifikatların
            cari reyestr statusu və hər bir konkret modelə tətbiqi müstəqil
            təsdiqlənməyib. İşıqlandırma sənədi CCTV və yol nişanı
            dirəklərinə, dolab sənədi isə bütün dolab növlərinə avtomatik
            şamil edilmir. Orijinal surətlər imza və möhürlərdən sui-istifadə
            riskinə görə açıq yayımlanmır. Təklifin həqiqiliyini rəsmi əlaqə
            kanallarımızdan yoxlayın.
          </p>
          <Link href="/elaqe/">
            Rəsmi əlaqə <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
