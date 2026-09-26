import { withSiteBasePath } from "@/lib/site-path";

export const phones = [
  { label: "055 240 81 65", number: "994552408165" },
  { label: "050 299 10 22", number: "994502991022" },
  { label: "050 219 10 95", number: "994502191095" },
];
export const instagram = "https://www.instagram.com/legendsgeneral.mmc/";
export const address = "8 Noyabr pr., Mikayıl Müşfiq küç. 6, Bakı";
export const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(address);
const furnitureCategories = [
  {
    id: "dolablar",
    name: "Metal dolablar",
    short: "Səliqəli və rahat saxlama",
    image: withSiteBasePath("/images/steel-lockers.webp"),
    description:
      "İş geyimləri, şəxsi əşyalar və sənədlərin saxlanması üçün metal dolablar.",
  },
  {
    id: "refler",
    name: "Metal rəflər",
    short: "Məkanınızdan səmərəli istifadə",
    image: withSiteBasePath("/images/warehouse-shelving.webp"),
    description: "Anbar, arxiv və iş məkanları üçün metal rəf sistemləri.",
  },
  {
    id: "seyfler",
    name: "Seyflər",
    short: "Dəyərli əşyalar üçün",
    image: withSiteBasePath("/images/money-safe.webp"),
    description: "Pul, sənədlər və dəyərli əşyaların saxlanması üçün seyflər.",
  },
  {
    id: "tibbi",
    name: "Tibbi mebel",
    short: "Tibb məkanları üçün mebel",
    image: withSiteBasePath("/images/medical-cabinet.webp"),
    description:
      "Tibb müəssisələrinin saxlama və təşkilati ehtiyacları üçün metal mebel.",
  },
  {
    id: "arxiv",
    name: "Arxiv sistemləri",
    short: "Sənədləriniz qaydasında",
    image: withSiteBasePath("/images/mobile-archive.webp"),
    description: "Sənəd və qovluqların sistemli saxlanması üçün arxiv həlləri.",
  },
  {
    id: "istehsalat",
    name: "İstehsalat mebeli",
    short: "İş yeriniz üçün funksionallıq",
    image: withSiteBasePath("/images/metal-workbench.webp"),
    description:
      "Emalatxana və istehsal məkanları üçün iş masaları və metal mebel.",
  },
];
// Main service areas supplied in the client presentation, slides 2–5.
export const divisions = [
  {
    id: "metal-mebel",
    name: "Metal mebel",
    short: "Dolab, stellaj, seyf və digər mebellər",
    image: withSiteBasePath("/images/hero-showroom.webp"),
    description:
      "Dolablar, stellajlar, seyflər, çarpayılar, masa və oturacaqlar, tibbi mebel və arxiv sistemləri.",
  },
  {
    id: "konstruksiyalar",
    name: "Metal konstruksiyalar",
    short: "Hazırlanma və quraşdırılma",
    image: withSiteBasePath("/images/services/metal-construction.webp"),
    description:
      "Anbar, anqar, zavod və digər obyektlər üçün metal konstruksiyalar, çənlər və dirəklər.",
  },
  {
    id: "dekorasiya",
    name: "Dekorasiya və metal işləri",
    short: "Pilləkən, məhəccər, qapı və darvaza",
    image: withSiteBasePath("/images/services/metal-decoration.webp"),
    description:
      "Skamyalar, dekorativ stendlər, məhəccərlər, pilləkənlər, qapı və darvazalar.",
  },
  {
    id: "konteynerler",
    name: "Quru və soyuduculu konteynerlər",
    short: "Sifarişlə hazırlanma",
    image: withSiteBasePath("/images/services/containers.webp"),
    description:
      "Saxlama və daşınma ehtiyacları üçün quru və soyuducu konteynerlərin hazırlanması.",
  },
  {
    id: "soyuducu-qapilari",
    name: "Sənaye soyuducu qapıları",
    short: "Soyuducu məkanlar üçün",
    image: withSiteBasePath("/images/services/cold-room-doors.webp"),
    description:
      "Sənaye soyuducuları üçün istifadə şəraitinə və açılış ölçülərinə uyğun qapılar.",
  },
  {
    id: "kuzovlar",
    name: "Yük avtomobili kuzovları",
    short: "Avtomobiliniz üçün kuzov hazırlayırıq",
    image: withSiteBasePath("/images/services/truck-bodies.webp"),
    description: "Yük avtomobilləri üçün kuzovların hazırlanması.",
  },
  {
    id: "toz-boyama",
    name: "Elektrostatik toz boyama",
    short: "Metal səthlərin rənglənməsi",
    image: withSiteBasePath("/images/services/powder-coating.webp"),
    description: "Metal məmulatlar üçün elektrostatik toz boyama xidməti.",
  },
];
export const categories = [
  ...furnitureCategories,
  ...[
    {
      id: "diger-mebel",
      name: "Çarpayı, masa və oturacaqlar",
      short: "Yaşayış və iş məkanları üçün",
      image: withSiteBasePath("/images/25cd2abe20213f8a.jpg"),
      description: "Metal çarpayılar, masalar və oturacaqlar.",
    },
  ],
  ...divisions.slice(1),
];
export function categoryMatches(productCategory: string, selected: string) {
  return (
    selected === "all" ||
    productCategory === selected ||
    (selected === "metal-mebel" &&
      [...furnitureCategories.map((c) => c.id), "diger-mebel"].includes(
        productCategory,
      ))
  );
}
export type Product = {
  slug: string;
  category: string;
  name: string;
  image: string;
  description: string;
  uses: string[];
  details: string[];
  kind?: "service";
  offerings?: string[];
  imageKind?: "real";
};
export const products: Product[] = [
  {
    slug: "metal-geyim-dolabi",
    category: "dolablar",
    name: "Metal geyim dolabı",
    image: categories[0].image,
    description:
      "Geyim və şəxsi əşyaların ayrıca bölmələrdə saxlanması üçün metal dolab. İş məkanının planına və istifadəçi sayına uyğun həllin seçilməsi üçün bizimlə əlaqə saxlayın.",
    uses: ["İşçi soyunma otaqları", "İdman məkanları", "Ofis və müəssisələr"],
    details: [
      "Ölçülər və bölmə sayı",
      "Qapı və kilid seçimi",
      "Rəng və səth örtüyü",
    ],
  },
  {
    slug: "metal-anbar-refi",
    category: "refler",
    name: "Metal anbar rəfi",
    image: categories[1].image,
    description:
      "Əşyaların və materialların nizamlı yerləşdirilməsi üçün metal rəf sistemi. Rəf planı saxlanacaq yükə və məkanın ölçülərinə əsasən dəqiqləşdirilir.",
    uses: ["Anbarlar", "Mağaza anbarları", "İstehsal sahələri"],
    details: [
      "Hündürlük, en və dərinlik",
      "Rəf səviyyələrinin sayı",
      "Tələb olunan yükdaşıma qabiliyyəti",
    ],
  },
  {
    slug: "pul-seyfi",
    category: "seyfler",
    name: "Pul və sənəd seyfi",
    image: categories[2].image,
    description:
      "Pul və sənədlərin saxlanması üçün metal seyf. Kilid, ölçü və təhlükəsizlik tələblərinizi bildirin, uyğun variant barədə məlumat alın.",
    uses: ["Ofislər", "Ticarət obyektləri", "Şəxsi istifadə"],
    details: [
      "Xarici və daxili ölçülər",
      "Kilid mexanizmi",
      "Bərkidilmə və təhlükəsizlik tələbləri",
    ],
  },
  {
    slug: "tibbi-metal-dolab",
    category: "tibbi",
    name: "Tibbi metal dolab",
    image: categories[3].image,
    description:
      "Tibbi ləvazimatların nizamlı saxlanması üçün dolab. Məhsulun komplektasiyası və istifadə şəraitinə uyğunluğu sifariş zamanı dəqiqləşdirilir.",
    uses: ["Tibb kabinetləri", "Klinikalar", "Laboratoriyalar"],
    details: [
      "Ölçülər və rəf sayı",
      "Şüşəli və ya bağlı bölmələr",
      "Səth örtüyü və istifadə tələbləri",
    ],
  },
  {
    slug: "mobil-arxiv-sistemi",
    category: "arxiv",
    name: "Mobil arxiv sistemi",
    image: categories[4].image,
    description:
      "Qovluq və sənədləri bir məkanda təşkil etmək üçün arxiv sistemi. Sahənin planı və saxlama həcminə uyğun həll barədə məsləhət alın.",
    uses: ["Sənəd arxivləri", "Ofislər", "Müəssisələr"],
    details: [
      "Məkanın planı və ölçüləri",
      "Saxlama həcmi",
      "Bölmə sayı və hərəkət mexanizmi",
    ],
  },
  {
    slug: "metal-is-masasi",
    category: "istehsalat",
    name: "Metal iş masası",
    image: categories[5].image,
    description:
      "Emalatxanada alət və materiallarla işləmək üçün metal iş masası. İş səthinin ölçüləri və saxlama bölmələri ehtiyacınıza əsasən müzakirə olunur.",
    uses: ["Emalatxanalar", "İstehsal sahələri", "Texniki xidmət məkanları"],
    details: [
      "İş səthinin ölçüləri",
      "Siyirmə və dolab bölmələri",
      "İstifadə və yük tələbləri",
    ],
  },
  {
    slug: "metal-carpayi",
    category: "diger-mebel",
    name: "Metal çarpayı",
    image: withSiteBasePath("/images/25cd2abe20213f8a.jpg"),
    imageKind: "real",
    description:
      "Yaşayış və istirahət məkanları üçün metal karkaslı çarpayıların hazırlanması. Ölçü və konstruksiya sifarişin tələblərinə əsasən dəqiqləşdirilir.",
    uses: ["Yaşayış məkanları", "İstirahət otaqları", "Yataqxanalar"],
    details: [
      "Çarpayının ölçüləri",
      "Karkas və dayaq quruluşu",
      "Rəng və səth örtüyü",
    ],
  },
  {
    slug: "metal-masa-oturacaq",
    category: "diger-mebel",
    name: "Metal masa və oturacaqlar",
    image: withSiteBasePath("/images/df7bbb6396722057.jpg"),
    imageKind: "real",
    description:
      "Metal karkaslı masa və oturacaqların hazırlanması. Forma, ölçü və tamamlayıcı materiallar istifadə ediləcək məkana uyğun razılaşdırılır.",
    uses: ["Ofis və iş məkanları", "Ticarət obyektləri", "Yaşayış məkanları"],
    details: [
      "Masa və oturacaqların ölçüləri",
      "Karkasın forması və material seçimi",
      "Say, rəng və səth örtüyü",
    ],
  },
  {
    slug: "metal-konstruksiyalar",
    category: "konstruksiyalar",
    name: "Metal konstruksiyaların hazırlanması və quraşdırılması",
    image: withSiteBasePath("/images/services/metal-construction.webp"),
    kind: "service",
    description:
      "Sənaye və mülki obyektlər üçün metal konstruksiyaların hazırlanması və quraşdırılması. Layihənin ölçüləri, texniki tələbləri və iş həcmi əsasında sifarişin detalları razılaşdırılır.",
    offerings: [
      "Ferma, zavod, anbar və anqar konstruksiyaları",
      "Yaşayış və ofis binaları üçün metal konstruksiyalar",
      "Stadion, ticarət və əyləncə mərkəzlərinin konstruksiyaları",
      "Metal çənlər, sütunlar və dayaqlar",
      "Elektrik xətti və bayraq dirəkləri, ildırımötürücülər",
    ],
    uses: [
      "Sənaye obyektləri",
      "Anbar və anqarlar",
      "Mülki tikinti obyektləri",
    ],
    details: [
      "Layihə, çertyoj və sahənin ölçüləri",
      "Material, birləşmələr və texniki tələblər",
      "Hazırlanma və quraşdırılma işlərinin həcmi",
    ],
  },
  {
    slug: "dekorativ-metal-isleri",
    category: "dekorasiya",
    name: "Sifarişlə dekorativ metal işləri",
    image: withSiteBasePath("/images/services/metal-decoration.webp"),
    kind: "service",
    description:
      "Məkanın ölçülərinə və layihənin görünüşünə uyğun metal məmulatların hazırlanması. Eskizinizi və ya nümunə şəklinizi göndərərək işin detalları barədə məlumat ala bilərsiniz.",
    offerings: [
      "Skamyalar",
      "Dekorativ stendlər",
      "Məhəccərlər",
      "Pilləkənlər",
      "Qapı və darvazalar",
    ],
    uses: [
      "Yaşayış və ofis binaları",
      "Ticarət və ictimai məkanlar",
      "Həyət və açıq sahələr",
    ],
    details: [
      "Eskiz, nümunə və ölçülər",
      "Material, forma və bərkidilmə tələbləri",
      "Rəng, səth örtüyü və quraşdırılma",
    ],
  },
  {
    slug: "quru-soyuducu-konteynerler",
    category: "konteynerler",
    name: "Quru və soyuducu konteynerlər",
    image: withSiteBasePath("/images/services/containers.webp"),
    kind: "service",
    description:
      "Quru və soyuducu konteynerlərin hazırlanması. İstifadə məqsədi, yerləşmə şəraiti və komplektasiya sifariş zamanı dəqiqləşdirilir.",
    offerings: ["Quru konteynerlər", "Soyuducu konteynerlər"],
    uses: [
      "Saxlama sahələri",
      "Logistika və daşınma",
      "Sənaye və ticarət obyektləri",
    ],
    details: [
      "Konteynerin tipi və ölçüləri",
      "İzolyasiya və tələb olunan temperatur rejimi",
      "Qapı, avadanlıq və komplektasiya tələbləri",
    ],
  },
  {
    slug: "senaye-soyuducu-qapilari",
    category: "soyuducu-qapilari",
    name: "Sənaye soyuducuları üçün qapılar",
    image: withSiteBasePath("/images/services/cold-room-doors.webp"),
    kind: "service",
    description:
      "Sənaye soyuducularının açılış ölçülərinə və istifadə şəraitinə uyğun qapıların hazırlanması. Temperatur, izolyasiya və açılma tələbləri layihəyə əsasən müzakirə olunur.",
    uses: [
      "Sənaye soyuducuları",
      "Soyuq saxlama kameraları",
      "Anbar və istehsal məkanları",
    ],
    details: [
      "Qapı açılışının ölçüləri",
      "Temperatur və izolyasiya tələbləri",
      "Açılma mexanizmi və quraşdırılma şəraiti",
    ],
  },
  {
    slug: "yuk-avtomobili-kuzovlari",
    category: "kuzovlar",
    name: "Yük avtomobilləri üçün kuzovlar",
    image: withSiteBasePath("/images/services/truck-bodies.webp"),
    kind: "service",
    description:
      "Yük avtomobilləri üçün kuzovların hazırlanması. Avtomobilin texniki göstəriciləri, daşınacaq yük və istifadə məqsədi əsasında konstruksiya dəqiqləşdirilir.",
    uses: ["Yük daşımaları", "Ticarət və təchizat", "Sənaye müəssisələri"],
    details: [
      "Avtomobilin modeli və şassi ölçüləri",
      "Daşınacaq yük və kuzov tipi",
      "Material, qapılar və komplektasiya",
    ],
  },
  {
    slug: "elektrostatik-toz-boyama",
    category: "toz-boyama",
    name: "Elektrostatik toz boyama",
    image: withSiteBasePath("/images/services/powder-coating.webp"),
    kind: "service",
    description:
      "Metal məmulatların elektrostatik üsulla toz boyanması. Detalın ölçüsü, səthinin vəziyyəti və tələb olunan rəng barədə məlumat verərək xidmət üçün təklif ala bilərsiniz.",
    uses: [
      "Metal mebel və karkaslar",
      "Dekorativ metal məmulatlar",
      "İstehsal üçün metal detallar",
    ],
    details: [
      "Detalların materialı, ölçüsü və sayı",
      "Səthin mövcud vəziyyəti və hazırlıq tələbləri",
      "Rəng və örtüyə dair tələblər",
    ],
  },
];
export const inquiryOptions = [
  ...products.map((p) => ({ id: p.slug, name: p.name, category: p.category })),
  { id: "dekorasiya-skamya", name: "Skamya", category: "dekorasiya" },
  { id: "dekorasiya-stend", name: "Dekorativ stend", category: "dekorasiya" },
  { id: "dekorasiya-meheccer", name: "Məhəccər", category: "dekorasiya" },
  { id: "dekorasiya-pilleken", name: "Pilləkən", category: "dekorasiya" },
  {
    id: "dekorasiya-qapi-darvaza",
    name: "Qapı və darvaza",
    category: "dekorasiya",
  },
];
export const projects = [
  {
    title: "Metal karkaslı yataq",
    tag: "Metal mebel",
    image: withSiteBasePath("/images/25cd2abe20213f8a.jpg"),
    url: instagram + "reel/Ddob8t2iHbE/",
  },
  {
    title: "Loft üslublu mebel",
    tag: "Metal mebel",
    image: withSiteBasePath("/images/b8b3c9b4a7aae343.jpg"),
    url: instagram + "reel/DdblDvjCIUi/",
  },
  {
    title: "Tor detallı metal rəf",
    tag: "Rəflər",
    image: withSiteBasePath("/images/8e4bf7ea494f5784.jpg"),
    url: instagram + "reel/DdWalT9ga50/",
  },
  {
    title: "Metal karkaslı oturacaq",
    tag: "Metal mebel",
    image: withSiteBasePath("/images/df7bbb6396722057.jpg"),
    url: instagram + "reel/DdJjeW1DwpD/",
  },
  {
    title: "Loft üslublu ayaqqabılıq",
    tag: "Metal mebel",
    image: withSiteBasePath("/images/4ef2a85abcc0564a.jpg"),
    url: instagram + "reel/Dc0_cdnD-Yg/",
  },
  {
    title: "Rəf və dolab sistemi",
    tag: "Rəflər",
    image: withSiteBasePath("/images/9248c30c5ce9317e.jpg"),
    url: instagram + "reel/DcdyRe_E0F1/",
  },
];
export const nav = [
  { href: "/", label: "Ana səhifə" },
  { href: "/kataloq/", label: "Kataloq" },
  { href: "/gorulen-isler/", label: "Görülən işlər" },
  { href: "/haqqimizda/", label: "Haqqımızda" },
  { href: "/elaqe/", label: "Əlaqə" },
];

// Names supplied by Legends General; keep this list limited to confirmed partners.
export const partners = [
  {
    name: "Crescent Mall",
    id: "crescent-mall",
    logo: withSiteBasePath("/images/partners/crescent-mall.svg"),
  },
  {
    name: "Sea Breeze",
    id: "sea-breeze",
    logo: withSiteBasePath("/images/partners/sea-breeze.svg"),
  },
  {
    name: "Ralph Lauren",
    id: "ralph-lauren",
    logo: withSiteBasePath("/images/partners/ralph-lauren.jpg"),
  },
  {
    name: "Emporium",
    id: "emporium",
    logo: withSiteBasePath("/images/partners/emporium.svg"),
  },
  {
    name: "LEGO",
    id: "lego",
    logo: withSiteBasePath("/images/partners/lego.svg"),
  },
  {
    name: "Embawood",
    id: "embawood",
    logo: withSiteBasePath("/images/partners/embawood.png"),
  },
  {
    name: "Gənclik Mall",
    id: "ganjlik-mall-horizontal",
    logo: withSiteBasePath("/images/partners/ganjlik-mall-horizontal.svg"),
  },
  {
    name: "28 Mall",
    id: "mall28",
    logo: withSiteBasePath("/images/partners/mall28.png"),
  },
];
