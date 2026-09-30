import {
  Factory,
  Warehouse,
  Fence,
  Snowflake,
  DoorOpen,
  Truck,
  Paintbrush,
  Layers3,
  LockKeyhole,
  Lightbulb,
  Flame,
  Scissors,
} from "lucide-react";

const annotations = {
  refler: { icon: Layers3, action: "RƏF YÜKÜNƏ GÖRƏ SEÇİM", title: "Metal stellajlar", detail: "120 · 200 · 500 · 1500 kq/rəf" },
  dolablar: { icon: LockKeyhole, action: "SİFARİŞLƏ HAZIRLANIR", title: "Metal dolablar", detail: "Geyim · sənəd · açar" },
  direkler: { icon: Lightbulb, action: "METAL DİRƏK İSTEHSALI", title: "İşıqlandırma və avadanlıq dirəkləri", detail: "Elektrik · günəş paneli · müşahidə" },
  "bag-mehsullari": { icon: Flame, action: "SİFARİŞLƏ HAZIRLANIR", title: "Bağ üçün metal məhsullar", detail: "Manqal · tonqal ocağı · yelləncək" },
  "diger-xidmetler": { icon: Scissors, action: "METAL EMALI XİDMƏTLƏRİ", title: "Kəsmə, bükmə və qaynaq", detail: "CNC lazer · Punch" },
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
    detail: "Layihələr üçün dekorativ metal işləri",
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
    title: "Soyuducu kameralar üçün sürgülü qapılar",
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
