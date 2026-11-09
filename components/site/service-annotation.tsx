import type { Locale } from "@/lib/i18n";
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
  Archive,
} from "lucide-react";

const annotations = {
  arxiv: { icon: Archive, action: "MOBİL ARXİV SİSTEMİ", title: "Əl çarxı ilə idarə olunur", detail: "Rels üzərində hərəkət edən arxiv stellajları" },
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

const translation: Record<string, Record<"ru" | "en", readonly [string, string, string]>> = {
  "arxiv": {
    "ru": [
      "ПЕРЕДВИЖНОЙ АРХИВ",
      "Ручной привод",
      "Архивные стеллажи на рельсах"
    ],
    "en": [
      "MOBILE ARCHIVE",
      "Manually operated",
      "Rail-mounted archive shelving"
    ]
  },
  "refler": {
    "ru": [
      "ВЫБОР ПО НАГРУЗКЕ",
      "Металлические стеллажи",
      "120 · 200 · 500 · 1500 кг/полка"
    ],
    "en": [
      "SHELF LOAD CLASSES",
      "Metal shelving",
      "120 · 200 · 500 · 1500 kg/shelf"
    ]
  },
  "dolablar": {
    "ru": [
      "НА ЗАКАЗ",
      "Металлические шкафы",
      "Одежда · документы · ключи"
    ],
    "en": [
      "MADE TO ORDER",
      "Metal cabinets",
      "Clothing · documents · keys"
    ]
  },
  "direkler": {
    "ru": [
      "ПРОИЗВОДСТВО ОПОР",
      "Опоры освещения и оборудования",
      "Электричество · солнечные панели · CCTV"
    ],
    "en": [
      "POLE FABRICATION",
      "Lighting and equipment poles",
      "Mains · solar · CCTV"
    ]
  },
  "bag-mehsullari": {
    "ru": [
      "НА ЗАКАЗ",
      "Садовые металлоизделия",
      "Мангал · очаг · качели"
    ],
    "en": [
      "MADE TO ORDER",
      "Garden metalwork",
      "Barbecues · fire pits · swings"
    ]
  },
  "diger-xidmetler": {
    "ru": [
      "МЕТАЛЛООБРАБОТКА",
      "Резка, гибка и сварка",
      "Лазерная резка · Punch"
    ],
    "en": [
      "METALWORKING",
      "Cutting, bending and welding",
      "CNC laser · punching"
    ]
  },
  "metal-mebel": {
    "ru": [
      "ПО ВАШИМ РАЗМЕРАМ",
      "Металлическая мебель",
      "Шкафы · стеллажи · сейфы"
    ],
    "en": [
      "MADE TO MEASURE",
      "Metal furniture",
      "Cabinets · racks · safes"
    ]
  },
  "konstruksiyalar": {
    "ru": [
      "ИЗГОТОВЛЕНИЕ И МОНТАЖ",
      "Каркасы складов и ангаров",
      "Несущие металлоконструкции"
    ],
    "en": [
      "FABRICATION & INSTALLATION",
      "Warehouse and hangar frames",
      "Structural steelwork"
    ]
  },
  "dekorasiya": {
    "ru": [
      "НА ЗАКАЗ",
      "Металлические лестницы и перила",
      "Декоративные металлоизделия"
    ],
    "en": [
      "CUSTOM MADE",
      "Metal stairs and railings",
      "Decorative architectural metalwork"
    ]
  },
  "konteynerler": {
    "ru": [
      "ПРОИЗВОДСТВО КОНТЕЙНЕРОВ",
      "Рефрижераторные контейнеры",
      "Также производим сухогрузные контейнеры"
    ],
    "en": [
      "CONTAINER MANUFACTURING",
      "Refrigerated containers",
      "Dry containers also available"
    ]
  },
  "soyuducu-qapilari": {
    "ru": [
      "ПО РАЗМЕРАМ",
      "Двери для холодильных камер",
      "Промышленное охлаждение"
    ],
    "en": [
      "MADE TO MEASURE",
      "Sliding cold-room doors",
      "For industrial cold storage"
    ]
  },
  "kuzovlar": {
    "ru": [
      "ИЗГОТОВЛЕНИЕ КУЗОВОВ",
      "Кузов для вашего грузовика",
      "По модели автомобиля и типу груза"
    ],
    "en": [
      "TRUCK BODY FABRICATION",
      "Bodies for your truck",
      "Matched to chassis and cargo"
    ]
  },
  "toz-boyama": {
    "ru": [
      "УСЛУГИ ОКРАСКИ",
      "Порошковое покрытие металла",
      "Электростатическая окраска"
    ],
    "en": [
      "COATING SERVICE",
      "Powder coating for metal",
      "Electrostatic application"
    ]
  }
};

export function ServiceAnnotation({
  category,
  compact = false,
  locale = "az",
}: {
  category: string;
  compact?: boolean;
  locale?: Locale;
}) {
  const entry = annotations[category as keyof typeof annotations];
  if (!entry) return null;
  const Icon = entry.icon;
  const translated = locale === "az" ? null : translation[category]?.[locale];
  return (
    <span className={`service-annotation${compact ? " compact" : ""}`}>
      <span className="service-action">
        <Icon size={16} aria-hidden="true" />
        <span>{translated?.[0] ?? entry.action}</span>
      </span>
      <span className="service-image-copy">
        <strong>{translated?.[1] ?? entry.title}</strong>
        <span>{translated?.[2] ?? entry.detail}</span>
      </span>
    </span>
  );
}
