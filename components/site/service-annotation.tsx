import {
  Factory,
  Warehouse,
  Fence,
  Snowflake,
  DoorOpen,
  Truck,
  Paintbrush,
} from "lucide-react";

const annotations = {
  "metal-mebel": {
    icon: Factory,
    action: "ÖLÇÜYƏ UYĞUN İSTEHSAL",
    title: "Metal mebel istehsalı",
    detail: "Dolab · stellaj · seyf",
  },
  konstruksiyalar: {
    icon: Warehouse,
    action: "HAZIRLANMA VƏ QURAŞDIRILMA",
    title: "Anbar və anqar üçün metal karkas",
    detail: "Daşıyıcı metal konstruksiyalar",
  },
  dekorasiya: {
    icon: Fence,
    action: "SİFARİŞLƏ HAZIRLANIR",
    title: "Metal pilləkən və məhəccər",
    detail: "Qapı, darvaza və dekorativ metal işləri",
  },
  konteynerler: {
    icon: Snowflake,
    action: "KONTEYNER İSTEHSALI",
    title: "Soyuduculu konteynerlər",
    detail: "Quru konteynerlərin istehsalı da mövcuddur",
  },
  "soyuducu-qapilari": {
    icon: DoorOpen,
    action: "ÖLÇÜYƏ UYĞUN HAZIRLANIR",
    title: "Soyuducu kameralar üçün qapılar",
    detail: "Sənaye soyuducularına uyğun",
  },
  kuzovlar: {
    icon: Truck,
    action: "KUZOV İSTEHSALI",
    title: "Yük avtomobiliniz üçün kuzov",
    detail: "Avtomobilə və yükün növünə uyğun",
  },
  "toz-boyama": {
    icon: Paintbrush,
    action: "BOYAMA XİDMƏTİ",
    title: "Metal səthlərə toz boya",
    detail: "Elektrostatik boyama",
  },
};

export function ServiceAnnotation({
  category,
  compact = false,
}: {
  category: string;
  compact?: boolean;
}) {
  const entry = annotations[category as keyof typeof annotations];
  if (!entry) return null;
  const Icon = entry.icon;
  return (
    <span className={`service-annotation${compact ? " compact" : ""}`}>
      <span className="service-action">
        <Icon size={16} aria-hidden="true" />
        <span>{entry.action}</span>
      </span>
      <span className="service-image-copy">
        <strong>{entry.title}</strong>
        <span>{entry.detail}</span>
      </span>
    </span>
  );
}
