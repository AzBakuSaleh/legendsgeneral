/**
 * Legends General V2 — explicit bilingual editorial translations.
 * AZ is the source of truth. No machine-translation requests are performed.
 * Never translate brand names, verified numeric capacities or identifiers.
 */
import { supplementaryTranslations } from "./i18n-extra";
import { categoryTranslations } from "./i18n-categories";
export type Locale = "az" | "ru" | "en";
export const locales = ["az", "ru", "en"] as const;
export const addedLocales = ["ru", "en"] as const;
export const localeNames: Record<Locale, string> = { az: "Azərbaycan", ru: "Русский", en: "English" };

export function localeFromPath(path: string | null | undefined): Locale {
  if (path?.startsWith("/ru/") || path === "/ru") return "ru";
  if (path?.startsWith("/en/") || path === "/en") return "en";
  return "az";
}
export function localizedHref(locale: Locale, path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const stripped = path.replace(/^\/(ru|en)(?=\/|\?|#|$)/, "") || "/";
  if (locale === "az") return stripped;
  return `/${locale}${stripped === "/" ? "/" : stripped}`;
}
export function switchLocaleHref(pathname: string, locale: Locale): string {
  return localizedHref(locale, pathname);
}
export const ui = {
  home: ["Ana səhifə", "Главная", "Home"],
  catalog: ["Kataloq", "Каталог", "Catalog"],
  products: ["Məhsullar", "Продукция", "Products"],
  projects: ["Layihələr", "Проекты", "Projects"],
  ourWork: ["Görülən işlər", "Наши работы", "Our projects"],
  about: ["Haqqımızda", "О нас", "About us"],
  partners: ["Əməkdaşlıqlar", "Партнёры", "Partners"],
  contact: ["Əlaqə", "Контакты", "Contact"],
  whatsapp: ["WhatsApp ilə əlaqə", "Написать в WhatsApp", "Contact on WhatsApp"],
  appearance: ["Görünüş", "Оформление", "Appearance"],
  allProducts: ["Bütün məhsullar", "Все товары", "All products"],
  productGroups: ["Məhsul qrupları", "Группы продукции", "Product categories"],
  allShelves: ["Bütün stellajlar", "Все стеллажи", "All shelving"],
  requestQuote: ["Qiymət təklifi al", "Запросить цену", "Request a quote"],
  viewDetails: ["Ətraflı bax", "Подробнее", "View details"],
  imageSample: ["Nümunə görüntü", "Иллюстративное изображение", "Illustrative image"],
  itemTypes: ["Məhsul növləri", "Виды продукции", "Product types"],
  uses: ["İstifadə sahələri", "Области применения", "Applications"],
  specifications: ["Sifariş zamanı dəqiqləşdirilir", "Уточняется при заказе", "Confirmed when ordering"],
  related: ["Digər məhsul və xidmətlər", "Другие товары и услуги", "Other products and services"],
  productCatalog: ["Məhsul kataloqu", "Каталог продукции", "Product catalog"],
  loading: ["Kataloq yüklənir...", "Загрузка каталога...", "Loading catalog..."],
  search: ["Məhsul və ya xidmət axtar...", "Поиск товара или услуги...", "Search products or services..."],
  directions: ["İstiqamətlər", "Направления", "Categories"],
  all: ["Hamısı", "Все", "All"],
  noResults: ["Nəticə tapılmadı", "Ничего не найдено", "No results found"],
  selectCategory: ["Kateqoriyaları seç", "Выбрать категорию", "Select category"],
  askHelp: ["Seçimdə kömək lazımdır?", "Нужна помощь с выбором?", "Need help choosing?"],
  getInfo: ["Məlumat al", "Узнать больше", "Get information"],
  subcategories: ["Alt kateqoriyalar", "Подкатегории", "Subcategories"],
  capacity: ["Yükdaşıma göstəriciləri", "Грузоподъёмность", "Load capacity"],
  perShelf: ["Bir rəfə maksimum", "Максимум на полку", "Maximum per shelf"],
  totalShelf: ["Bütöv stellaja maksimum", "Максимум на стеллаж", "Maximum per shelving unit"],
  requestSpecific: ["Öz ehtiyacınıza uyğun təklif alın", "Получите предложение под вашу задачу", "Get a tailored quote"],
  backToCatalog: ["Kataloqa qayıt", "Вернуться в каталог", "Back to catalog"],
  realPhoto: ["Legends General-ın görülən işlərindən.", "Фотография работы Legends General.", "Photo of a Legends General project."],
  docs: ["Uyğunluq sertifikatları", "Сертификаты соответствия", "Certificates of conformity"],
  phone: ["Şirkətin WhatsApp nömrəsi", "WhatsApp компании", "Company WhatsApp number"],
  yourName: ["Adınız", "Ваше имя", "Your name"],
  yourPhone: ["Telefon nömrəniz", "Ваш телефон", "Your phone number"],
  yourMessage: ["Sualınız", "Ваш вопрос", "Your enquiry"],
  submitRequest: ["Müraciəti hazırla", "Подготовить сообщение", "Prepare message"],
  openWhatsApp: ["WhatsApp-ı aç", "Открыть WhatsApp", "Open WhatsApp"],
  editDetails: ["Məlumatları dəyiş", "Изменить данные", "Edit details"],
  messageReady: ["Mesajınız hazırdır", "Сообщение готово", "Your message is ready"],
  generalInfo: ["Ümumi məlumat", "Общая информация", "General enquiry"],
  contactUs: ["Bizimlə əlaqə", "Свяжитесь с нами", "Contact us"],
  seeAllWorks: ["Bütün işlərə bax", "Все работы", "View all projects"],
  services: ["İstehsalat və xidmətlər", "Производство и услуги", "Manufacturing and services"],
  ownProduction: ["Öz istehsalımız", "Собственное производство", "In-house production"],
  customSolutions: ["Fərdi həllər", "Индивидуальные решения", "Custom solutions"],
  robust: ["Möhkəm konstruksiya", "Надёжная конструкция", "Robust construction"],
  bespoke: ["Ölçüyə uyğun sifariş", "Изготовление по размерам", "Made to measure"],
  language: ["Dil", "Язык", "Language"],
  nextSlide: ["Növbəti slayd", "Следующий слайд", "Next slide"],
  previousSlide: ["Əvvəlki slayd", "Предыдущий слайд", "Previous slide"],
  stopAutoplay: ["Avtomatik keçidi dayandır", "Остановить автопрокрутку", "Pause autoplay"],
  startAutoplay: ["Avtomatik keçidi başlat", "Включить автопрокрутку", "Start autoplay"],
  metalRack: ["Metal stellajlar", "Металлические стеллажи", "Metal shelving"],
  metalCabinets: ["Metal dolablar", "Металлические шкафы", "Metal cabinets"],
  lockers: ["Geyim dolabları", "Шкафчики для одежды", "Clothing lockers"],
  poles: ["İşıq dirəkləri", "Опоры освещения", "Lighting poles"],
  garden: ["Bağ məhsulları", "Садовые изделия", "Garden products"],
  containers: ["Konteynerlər", "Контейнеры", "Containers"],
} as const;
export type UiKey = keyof typeof ui;
export function label(locale: Locale, key: UiKey): string {
  const index = locale === "az" ? 0 : locale === "ru" ? 1 : 2;
  return ui[key][index];
}

/** Each row: approved Azerbaijani source, professional Russian, professional English. */
const glossary: readonly [string, string, string][] = [
  ["Metal stellajlar","Металлические стеллажи","Metal shelving"],
  ["Metal dolablar","Металлические шкафы","Metal cabinets"],
  ["Seyflər","Сейфы","Safes"],
  ["Tibbi mebel","Медицинская мебель","Medical furniture"],
  ["Mobil arxiv sistemləri","Передвижные архивные системы","Mobile archive systems"],
  ["İstehsalat mebeli","Производственная мебель","Industrial furniture"],
  ["Metal mebel","Металлическая мебель","Metal furniture"],
  ["Metal dirəklər","Металлические опоры","Metal poles"],
  ["Metal konstruksiyalar","Металлоконструкции","Steel structures"],
  ["Dekorasiya və metal işləri","Декоративные металлоизделия","Decorative metalwork"],
  ["Bağ üçün metal məhsullar","Садовые металлоизделия","Garden metalwork"],
  ["Quru və soyuduculu konteynerlər","Сухогрузные и рефрижераторные контейнеры","Dry and refrigerated containers"],
  ["Sənaye soyuducu qapıları","Двери для промышленных холодильных камер","Industrial cold-room doors"],
  ["Yük avtomobili kuzovları","Кузова грузовых автомобилей","Truck bodies"],
  ["Kəsmə, bükmə və qaynaq","Резка, гибка и сварка","Cutting, bending and welding"],
  ["Elektrostatik toz boyama","Порошковая окраска","Powder coating"],
  ["Çarpayı və mebel karkasları","Каркасы кроватей и мебели","Bed and furniture frames"],
  ["Metal geyim dolabı","Металлический шкаф для одежды","Metal locker"],
  ["Metal anbar rəfi","Металлический складской стеллаж","Warehouse metal shelving"],
  ["Pul və sənəd seyfi","Сейф для денег и документов","Cash and document safe"],
  ["Tibbi metal dolab","Медицинский металлический шкаф","Medical metal cabinet"],
  ["Mobil arxiv sistemi","Передвижная архивная система","Mobile archive shelving system"],
  ["Metal iş masası","Металлический верстак","Metal workbench"],
  ["Metal çarpayı","Металлическая кровать","Metal bed"],
  ["Masa və oturacaq üçün metal karkaslar","Металлические каркасы столов и стульев","Metal frames for tables and chairs"],
  ["Metal konstruksiyaların hazırlanması və quraşdırılması","Изготовление и монтаж металлоконструкций","Steel fabrication and installation"],
  ["Sifarişlə dekorativ metal işləri","Декоративные металлоизделия на заказ","Custom decorative metalwork"],
  ["Quru və soyuducu konteynerlər","Сухогрузные и рефрижераторные контейнеры","Dry and refrigerated containers"],
  ["Soyuducu kameralar üçün sürgülü qapılar","Откатные двери для холодильных камер","Sliding cold-room doors"],
  ["Yük avtomobilləri üçün kuzovlar","Кузова для грузовых автомобилей","Truck body fabrication"],
  ["İşıqlandırma üçün metal dirəklər","Металлические опоры освещения","Metal lighting poles"],
  ["Nəzarət kameraları üçün metal dirəklər","Опоры для камер видеонаблюдения","CCTV camera poles"],
  ["Manqallar, tonqal ocaqları və bağ yelləncəkləri","Мангалы, очаги и садовые качели","Barbecues, fire pits and garden swings"],
  ["CNC lazer, Punch kəsmə və metal emalı","Лазерная и координатно-пробивная резка, металлообработка","CNC laser cutting, punching and metalworking"],
  ["Sənəd və qovluqlar üçün rels üzərində hərəkət edən, əl çarxı ilə idarə olunan mobil arxiv sistemləri.","Передвижные архивные стеллажи с ручным приводом на рельсах для хранения документов и папок.","Rail-mounted mobile archive shelving with manual operation for files and documents."],
  ["Anbarlar","Склады","Warehouses"],
  ["Arxivlər","Архивы","Archives"],
  ["İstehsal və ticarət sahələri","Производственные и торговые помещения","Industrial and retail spaces"],
  ["İşçi soyunma otaqları","Раздевалки персонала","Staff changing rooms"],
  ["İdman məkanları","Спортивные объекты","Sports facilities"],
  ["Ofis və müəssisələr","Офисы и предприятия","Offices and businesses"],
  ["Ofislər","Офисы","Offices"],
  ["Şəxsi istifadə","Личное использование","Personal use"],
  ["Ticarət obyektləri","Торговые объекты","Retail premises"],
  ["Tibb kabinetləri","Медицинские кабинеты","Medical practices"],
  ["Klinikalar","Клиники","Clinics"],
  ["Laboratoriyalar","Лаборатории","Laboratories"],
  ["Sənəd arxivləri","Документальные архивы","Document archives"],
  ["Kitabxanalar","Библиотеки","Libraries"],
  ["Müəssisələr","Предприятия","Businesses"],
  ["Emalatxanalar","Мастерские","Workshops"],
  ["İstehsal sahələri","Производственные помещения","Manufacturing facilities"],
  ["Texniki xidmət məkanları","Сервисные мастерские","Service workshops"],
  ["Yaşayış məkanları","Жилые помещения","Residential premises"],
  ["İstirahət otaqları","Комнаты отдыха","Rest areas"],
  ["Yataqxanalar","Общежития","Dormitories"],
  ["Şirkətin WhatsApp nömrəsi","WhatsApp компании","Company WhatsApp"],
  ["Hündürlük, en və dərinlik","Высота, ширина и глубина","Height, width and depth"],
  ["Rəf sayı və yükün paylanması","Количество полок и распределение нагрузки","Shelf count and load distribution"],
  ["Material və səth örtüyü","Материал и покрытие поверхности","Material and surface finish"],
  ["Ölçülər və bölmə sayı","Размеры и количество секций","Dimensions and number of compartments"],
  ["Qapı və kilid seçimi","Выбор дверей и замков","Door and lock options"],
  ["Rəng və səth örtüyü","Цвет и покрытие","Color and surface finish"],
  ["Xarici və daxili ölçülər","Внешние и внутренние размеры","External and internal dimensions"],
  ["Kilid mexanizmi","Замковый механизм","Locking mechanism"],
  ["Bərkidilmə və təhlükəsizlik tələbləri","Требования к креплению и безопасности","Mounting and security requirements"],
  ["Ölçülər və rəf sayı","Размеры и количество полок","Dimensions and shelf count"],
  ["Şüşəli və ya bağlı bölmələr","Секции со стеклянными или глухими дверцами","Glazed or solid-door compartments"],
  ["Səth örtüyü və istifadə tələbləri","Покрытие и условия эксплуатации","Surface finish and usage requirements"],
  ["İş səthinin ölçüləri","Размеры рабочей поверхности","Worktop dimensions"],
  ["Siyirmə və dolab bölmələri","Ящики и секции шкафа","Drawers and cabinet compartments"],
  ["İstifadə və yük tələbləri","Условия использования и нагрузка","Usage and load requirements"],
  ["Çarpayının ölçüləri","Размеры кровати","Bed dimensions"],
  ["Karkas və dayaq quruluşu","Конструкция каркаса и опор","Frame and support structure"],
  ["Ölçü və komplektasiya barədə məlumat alın.","Уточните размеры и комплектацию.","Ask about dimensions and configuration."],
  ["İş həcmi və tələblər barədə məlumat alın.","Уточните объём работ и требования.","Ask about project scope and requirements."],
  ["İstifadə sahələri","Области применения","Applications"],
  ["Metal stellaj — dolu vəziyyət (nümunə görüntü)","Металлический стеллаж — с грузом (иллюстрация)","Metal shelving — loaded (illustration)"],
  ["Metal stellaj — boş vəziyyət (nümunə görüntü)","Металлический стеллаж — пустой (иллюстрация)","Metal shelving — empty (illustration)"],
  ["Metal dolab — qapalı vəziyyət (nümunə görüntü)","Металлический шкаф — закрытый (иллюстрация)","Metal cabinet — closed (illustration)"],
  ["Metal seyf — açıq vəziyyət (nümunə görüntü)","Металлический сейф — открытый (иллюстрация)","Metal safe — open (illustration)"],
  ["Nümunə görüntü","Иллюстративное изображение","Illustrative image"],
  ["Gənclik Mall","Gənclik Mall","Gənclik Mall"],
  ["Skamya","Скамейка","Bench"],
  ["Dekorativ stend","Декоративный стенд","Decorative stand"],
  ["Məhəccər","Перила","Railings"],
  ["Pilləkən","Лестница","Stairs"],
  ["Metal karkaslı yataq","Кровать с металлическим каркасом","Metal-frame bed"],
  ["Loft üslublu mebel","Мебель в стиле лофт","Loft-style furniture"],
  ["Tor detallı metal rəf","Металлический стеллаж с сеткой","Metal shelving with mesh"],
  ["Metal karkaslı oturacaq","Стул с металлическим каркасом","Metal-frame chair"],
  ["Loft üslublu ayaqqabılıq","Обувница в стиле лофт","Loft-style shoe rack"],
  ["Rəf və dolab sistemi","Система стеллажей и шкафов","Shelving and cabinet system"],
  ["Yüngül və məişət stellajları","Лёгкие и бытовые стеллажи","Light-duty and household shelving"],
  ["Ofis və arxiv stellajları","Офисные и архивные стеллажи","Office and archive shelving"],
  ["Standart anbar stellajları","Стандартные складские стеллажи","Standard warehouse shelving"],
  ["Gücləndirilmiş sənaye stellajları","Усиленные промышленные стеллажи","Heavy-duty industrial shelving"],
  ["Təkər və disk saxlama stellajları","Стеллажи для шин и дисков","Tyre and wheel storage racks"],
  ["Xüsusi təyinatlı rəf sistemləri","Специализированные стеллажные системы","Special-purpose shelving"],
  ["Stellaj hissələri və aksesuarları","Детали и аксессуары стеллажей","Shelving parts and accessories"],
  ["Metal ofis dolabları","Металлические офисные шкафы","Metal office cabinets"],
  ["Geyim saxlama dolabları","Шкафчики для одежды","Clothing lockers"],
  ["Kartoteka və sənəd dolabları","Картотечные шкафы и шкафы для документов","Filing and document cabinets"],
  ["Metal masa karkasları","Металлические каркасы столов","Metal table frames"],
  ["Ofis rəfləri","Офисные стеллажи","Office shelving"],
  ["Siyirməli metal tumbalar","Металлические тумбы с ящиками","Metal drawer pedestals"],
  ["Açar saxlama dolabları","Ключницы и шкафы для ключей","Key cabinets"],
  ["Şüşəli və kombinə edilmiş dolablar","Шкафы со стеклянными и комбинированными дверцами","Glazed and combination cabinets"],
  ["Pul və sənəd seyfləri","Сейфы для денег и документов","Cash and document safes"],
  ["Otel seyfləri","Гостиничные сейфы","Hotel safes"],
  ["Elektron kilidli seyflər","Сейфы с электронным замком","Electronic-lock safes"],
  ["Silah saxlama seyfləri","Сейфы для хранения оружия","Gun safes"],
] as const;

const byAz = new Map<string, { ru: string; en: string }>(
  glossary.map(([az, ru, en]) => [az, { ru, en }]),
);
export function tr(locale: Locale, original: string): string {
  if (locale === "az" || !original) return original;
  const manual = byAz.get(original) ?? supplementaryTranslations.get(original) ?? categoryTranslations.get(original);
  if (!manual) {
    const uiMatch = Object.values(ui).find((texts) => texts[0] === original);
    if (uiMatch) return uiMatch[locale === "ru" ? 1 : 2];
  }
  if (manual) return manual[locale];
  const rack = original.match(/^Metal stellaj — (\d+) kq\/rəf$/);
  if (rack) return locale === "ru"
    ? `Металлический стеллаж — ${rack[1]} кг/полка`
    : `Metal shelving — ${rack[1]} kg/shelf`;
  return original;
}
export function categoryLabel(locale: Locale, name: string): string { return tr(locale, name); }
