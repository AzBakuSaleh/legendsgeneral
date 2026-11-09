/**
 * Legends General V2 — approved catalog *family taxonomy*.
 *
 * These families are a roadmap derived from owner-confirmed catalog scope,
 * not imported competitor SKUs, product specifications, inventory or photos.
 * Exact Legends models, dimensions, options and compliance claims require
 * explicit company approval before they can appear as sellable products.
 */
export type ProductFamilyPlan = {
  id: string;
  title: string;
  description: string;
  existingCategory: string;
  subfamilies: readonly string[];
};

export const plannedProductFamilies: readonly ProductFamilyPlan[] = [
  {
    id: "metal-stellajlar",
    title: "Metal stellajlar",
    description: "Anbar, arxiv və sənaye saxlama sistemləri",
    existingCategory: "refler",
    subfamilies: [
      "Yüngül və məişət stellajları",
      "Ofis və arxiv stellajları",
      "Standart anbar stellajları",
      "Gücləndirilmiş sənaye stellajları",
      "Təkər və disk saxlama stellajları",
      "Xüsusi təyinatlı rəf sistemləri",
      "Stellaj hissələri və aksesuarları",
    ],
  },
  {
    id: "mobil-arxiv",
    title: "Mobil arxiv sistemləri",
    description: "Yerdən səmərəli istifadə üçün relsli arxiv həlləri",
    existingCategory: "arxiv",
    subfamilies: [
      "Əl çarxlı rels üzərində mobil arxivlər",
      "Yüngül arxiv blokları",
      "Yüksək tutumlu arxiv blokları",
      "Elektron idarəetməli sistemlər — mühəndislik təsdiqi tələb olunur",
    ],
  },
  {
    id: "istehsalat-mebeli",
    title: "İstehsalat mebeli",
    description: "Emalatxana, zavod və texniki iş yerləri üçün",
    existingCategory: "istehsalat",
    subfamilies: [
      "Yüngül, orta və ağır iş masaları",
      "İstehsalat və montaj masaları",
      "Alət dolabları",
      "Alət arabaları",
      "Modul alət saxlama sistemləri",
      "Siyirməli bloklar",
      "Asma alət panelləri",
      "Sənaye oturacaqları",
      "Quru saxlama dolabları",
      "ESD iş masaları — texniki təsdiq tələb olunur",
    ],
  },
  {
    id: "ofis-mebeli",
    title: "Ofis mebeli və metal dolablar",
    description: "Ofis saxlama və metal karkas həlləri",
    existingCategory: "dolablar",
    subfamilies: [
      "Metal ofis dolabları",
      "Geyim saxlama dolabları",
      "Kartoteka və sənəd dolabları",
      "Metal masa karkasları",
      "Ofis rəfləri",
      "Siyirməli metal tumbalar",
      "Açar saxlama dolabları",
      "Şüşəli və kombinə edilmiş dolablar",
    ],
  },
  {
    id: "seyfler",
    title: "Seyflər",
    description: "Müxtəlif tətbiq sahələri üçün metal saxlanma həlləri",
    existingCategory: "seyfler",
    subfamilies: [
      "Pul və sənəd seyfləri",
      "Ofis və mebel seyfləri",
      "Otel seyfləri",
      "Divara quraşdırılan seyflər",
      "Depozit seyfləri",
      "Elektron kilidli seyflər",
      "Silah saxlama seyfləri",
      "Yanğına davamlılıq sinfi — yalnız sertifikatla",
      "Oğurluğa müqavimət sinfi — yalnız sertifikatla",
    ],
  },
  {
    id: "diger-metal-mehsullar",
    title: "Digər metal məhsullar",
    description: "Xüsusi saxlama və təşkilati həllər",
    existingCategory: "metal-mebel",
    subfamilies: [
      "Adi açar dolabları",
      "Rəqəmsal kilidli açar dolabları",
      "Şüşə qapılı açar dolabları",
      "Fövqəladə hallar üçün açar qutuları",
      "Fərdi və çoxbölməli poçt qutuları",
    ],
  },
] as const;
