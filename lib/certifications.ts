/**
 * Public factual metadata from three Legends General MMC certificate scans.
 * This is NOT evidence of their current registry status or coverage of every
 * model within a broad website category.
 *
 * Never commit full scans, signatures, seals, QR codes or original PDFs.
 */
export const publicCertificates = [
  {
    id: "steel-racks",
    label: "Metal rəflər və stellaj konstruksiyaları",
    standard: "ГОСТ 16140-77",
    certificateScope: "Metal rəflər",
    issuer: "AZSERTUS MMC",
    issueDate: "2026-10-01",
    expiryDate: "2027-10-01",
  },
  {
    id: "storage-lockers",
    label: "Geyim saxlama üçün metal dolablar",
    standard: "ГОСТ Р 56422-2015",
    certificateScope: "Metal dolablar",
    issuer: "AZSERTUS MMC",
    issueDate: "2026-10-01",
    expiryDate: "2027-10-01",
  },
  {
    id: "lighting-poles",
    label: "İşıqlandırma üçün metal dirəklər",
    standard: "ГОСТ 32947-2014",
    certificateScope: "Metal işıqlandırma dirəkləri",
    issuer: "AZSERTUS MMC",
    issueDate: "2026-10-01",
    expiryDate: "2027-10-01",
  },
] as const;
