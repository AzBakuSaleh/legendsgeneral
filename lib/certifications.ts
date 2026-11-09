/**
 * Public-facing metadata transcribed from Legends General's three supplied
 * product conformity certificates (issued 2026-10-01, expiry 2027-10-01).
 *
 * SECURITY: Do not add the original certificates, scans, signatures, seals,
 * QR codes, or private verification documents to /public or this repository.
 *
 * These certificates cover product groups only, not every model/configuration
 * and not claims of burglary, fire or structural performance.
 */
export const publicCertifications = [
  {
    id: "metal-rack",
    name: "Metal rəflər",
    standard: "ГОСТ 16140-77",
    issuer: "AZSERTUS MMC",
    issuedAt: "2026-10-01",
    expiresAt: "2027-10-01",
    categoryHref: "/kataloq/?kateqoriya=refler",
  },
  {
    id: "metal-cabinet",
    name: "Metal dolablar",
    standard: "ГОСТ Р 56422-2015",
    issuer: "AZSERTUS MMC",
    issuedAt: "2026-10-01",
    expiresAt: "2027-10-01",
    categoryHref: "/kataloq/?kateqoriya=dolablar",
  },
  {
    id: "lighting-pole",
    name: "Metal işıqlandırma dirəkləri",
    standard: "ГОСТ 32947-2014",
    issuer: "AZSERTUS MMC",
    issuedAt: "2026-10-01",
    expiresAt: "2027-10-01",
    categoryHref: "/kataloq/?kateqoriya=direkler",
  },
] as const;
