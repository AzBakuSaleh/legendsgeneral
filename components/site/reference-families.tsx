import Link from "next/link";
import { ArrowUpRight, ChevronDown, Layers3 } from "lucide-react";
import { plannedProductFamilies } from "@/lib/product-families";
import styles from "./reference-families.module.css";

export function ReferenceFamilies({ compact = false }: { compact?: boolean }) {
  return (
    <section className={styles.section} id="mehsul-aileleri" aria-labelledby="families-title">
      <div className={styles.head}>
        <div>
          <span className={styles.eyebrow}>Kataloq strukturu · yeni istiqamətlər</span>
          <h2 id="families-title">Məhsul ailələri</h2>
          <p>
            Alt qruplar Legends General-ın genişləndirilən kataloq strukturuna daxildir.
            Konkret model, istehsal imkanı və texniki göstəricilər şirkət tərəfindən
            təsdiqlənmədən satış məhsulu kimi təqdim edilmir.
          </p>
        </div>
        <Layers3 size={32} strokeWidth={1.4} aria-hidden="true" />
      </div>
      <div className={styles.grid}>
        {plannedProductFamilies.map((group, index) => (
          <article className={styles.card} key={group.id}>
            <div className={styles.top}>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.state}>Model məlumatları hazırlanır</span>
            </div>
            <h3>{group.title}</h3>
            <p className={styles.description}>{group.description}</p>
            <ul className={styles.examples}>
              {group.subfamilies.slice(0, compact ? 3 : 4).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {group.subfamilies.length > (compact ? 3 : 4) && (
              <details className={styles.expand}>
                <summary>
                  Daha {group.subfamilies.length - (compact ? 3 : 4)} alt qrup
                  <ChevronDown size={15} aria-hidden="true" />
                </summary>
                <ul>
                  {group.subfamilies.slice(compact ? 3 : 4).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>
            )}
            <div className={styles.actions}>
              <Link href={`/kataloq/?kateqoriya=${group.existingCategory}`}>
                Mövcud təkliflərə bax <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <p className={styles.note}>
        Qeyd: Bu siyahı hazır anbar qalığı və ya təsdiqlənmiş model kataloqu deyil.
        Rəqib saytların şəkilləri, kodları, markaları və texniki göstəriciləri
        Legends məhsulları kimi təqdim olunmur.
      </p>
    </section>
  );
}
