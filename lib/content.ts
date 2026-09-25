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
export const categories = [
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
export type Product = {
  slug: string;
  category: string;
  name: string;
  image: string;
  description: string;
  uses: string[];
  details: string[];
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
