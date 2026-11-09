# LEGENDS GENERAL V2 — Catalog Architecture & Execution Baseline
**Status:** Phase 0 architecture baseline; not an implemented catalog.  
**Date:** 2026-11-09  
**Branch:** `redesign-v2` (main remains unchanged)  
**Owner:** Legends General MMC; product scope and manufacturing capabilities provided by company leadership.

## 1. Goal and decisions
Create an original, premium 2026 Azerbaijani-language B2B manufacturing website for Legends General. Use the category->model->configuration UX pattern observed on Stel-Teh and the product-family breadth of six SAFE.RU reference categories, but **do not duplicate competitors' brand assets, photos, text, model trademarks, or proprietary design**. Use real Legends photography and its own brand identity.

The user explicitly confirms Legends manufactures products across these six SAFE.RU reference categories. **Family-level scope confirmation is NOT confirmation that every competitor SKU, dimension, rating, safety class, certification or exact image is identical to a Legends product.** Create Legends-specific models and options as their data is supplied. Distinguish confirmed, provisional and missing fields.

**Existing stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4, shadcn; static export. Preserve existing `/kataloq/` and `/mehsullar/[slug]/` URLs and contact/WhatsApp workflow. Do not move to a new repository or introduce a database just to support the quote catalog. Do not merge or deploy to production without approval.

**Brand:** anthracite `#252B32`, soft white `#F4F6F8`, metal grey `#AAB5C0`, restrained steel blue `#286B9B`. Premium industrial minimalism; real manufacturing imagery; restrained motion; strong mobile interaction. Existing partner banner remains a single banner; leadership-provided official brand logos to be sourced, checked and added in content phase, not placed in a new partner page.

## 2. What exists in the repository (baseline)
- `lib/content.ts`: currently defines `divisions`, `categories`, `products`, `shelfClasses`, `getProductMedia` and partner logos. Most non-shelving products are represented by umbrella models or services rather than individual SKUs.
- `components/site/catalog.tsx`: category links and text search, but not technical faceted filtering or variant-specific sorting. Uses search params.
- `app/mehsullar/[slug]/page.tsx`: per-product static URLs, gallery, descriptive specs and quote CTA. Not a connected configuration form.
- `app/page.tsx`: hero, partner banner, broad product areas, about, gallery and contact. Redesign should elevate categories near the top while preserving the existing partner block.
- `docs/content-sources.md`: authoritative record of the 2026-09-26 client presentation and 2026-10-01 clarifications. It distinguishes actual company works and generated example imagery; preserve that distinction.
- `app/layout.tsx` contains `robots: { index: false, follow: false }` for preview. Do not enable indexing until a canonical production domain and SEO release are explicitly approved.
- Existing shelf classes are **per shelf / total rack**: 120/500 kg, 200/800 kg, 500/1500 kg and 1500/4500 kg. These are business-provided broad classes, NOT validated values for arbitrary dimensions and shelf counts.

## 3. Primary navigation taxonomy
Keep broad navigation intuitive and avoid duplicate products in multiple sections. Distinct filters and technical templates are mapped by family. Underlying products may have multiple **use-case tags**, but must have one canonical product page.

### A. Metal stellajlar
Families: lightweight/household; standard archive and office; warehouse/heavy-duty; industrial; wheel/tyre storage; speciality shelves; rack components and accessories. The four confirmed Legends per-shelf classes remain explicit entry points. **Do not convert SAFE.RU section-load claims to shelf-load claims.**

### B. Mobil arxiv sistemləri
Families: manual hand-crank / rail; lightweight; heavy-capacity; electronic-control as a reference family requiring engineering confirmation. Prior client notes approved manual hand-crank rail systems, not electric-control claims. Quoting requires room dimensions, floor suitability, aisle clearance, number of mobile blocks, shelf count, intended loads, and controls.

### C. İstehsalat mebeli
Families: workbenches by light/medium/heavy class; manufacturing tables; ESD tables (technical claims require proof); tool carts; tool cabinets (light/heavy/modular); tool-storage modules; pegboards and accessories; dry cabinets; drawer pedestals; industrial seating; custom production furniture. Competitor series names (GARAGE, MASTER, PROFI, EXPERT, HARD) are research grouping examples only, **not Legends model names**.

### D. Ofis mebeli və metal dolablar
Families: office desks and metal underframes; drawer pedestals; office storage cabinets; lockers; filing/card-index cabinets; office shelving; seating when actually offered; metal/laminate combined products where supported. Existing source notes that Legends primarily supplied **metal underframes** in the office furniture context; do not silently claim manufacture of wooden tops or upholstered seats without confirmation. Add key cabinets under a single canonical category instead of duplicating.

### E. Seyflər
Families: money/document; office/furniture; hotel; wall-mounted; gun storage; fire-resistant; burglar-resistant; combined fire/burglary; deposit; smart/electronic; accessories. Display third-party graded safety classifications or certified fire ratings **only with proof for the specific Legends model**. Otherwise use neutral language: lock type, dimensions, inner compartment, mounting.

### F. Açar dolabları və poçt qutuları
Families: conventional key cabinets; digital-lock key cabinets; glass-door key cabinets; emergency key boxes; individual and multi-unit mailboxes. Prior source notes postponed mailboxes until images/details; newly confirmed family scope allows planning them but not inventing live SKUs.

### G. Legends-specific families outside the six reference URLs
- İşıqlandırma dirəkləri: wired and solar applications; street lighting.
- Kamera dirəkləri: pole and mounting elements; no claim that CCTV cameras themselves are supplied or installed.
- Yol nişanı dirəkləri and road-infrastructure poles.
- Metal konstruksiyalar, frames, industrial supports and tanks.
- Dekorativ metal işləri: benches, railings, stair frames, stands.
- Bağ məhsulları: grills/mangals, fire pits, swings.
- Quru və soyuduculu konteynerlər.
- Sənaye soyuducu kameraları üçün qapılar.
- Yük avtomobili kuzovları.
- Tibbi metal mebel, beds and bespoke metal frames.
- Services: CNC laser, Punch, cutting/bending, welding, powder coating. **Service request forms** instead of fake SKU configuration.

## 4. Model/variant/data contract
Recommended separation:
```ts
type Readiness = "published-confirmed" | "client-confirmed-family" | "awaiting-specs" | "awaiting-images";
type MediaRole = "hero" | "in-use" | "detail" | "alternate";
type ProductFamily = {
  id: string; name: string; parentCategory: string;
  template: "rack" | "cabinet" | "safe" | "archive" | "pole" |
            "workbench" | "furniture" | "container" | "truck-body" |
            "garden" | "custom-fabrication" | "service";
};
type ProductModel = {
  id: string; slug: string; familyId: string; name: string;
  kind: "product" | "custom-project" | "service";
  readiness: Readiness;
  summary: string;
  verifiedSpecifications: Record<string, string | number>;
  availableOptions: OptionGroup[];
  validConfigurations?: ValidConfiguration[];
  images: ProductMediaAsset[];
};
type OptionGroup = {
  id: string; label: string; unit?: string;
  values: Array<{ id: string; label: string }>;
};
type ValidConfiguration = {
  optionIds: Record<string, string>;
  approvedPerformance?: Record<string, string | number>;
};
type ProductMediaAsset = {
  src: string; alt: string; role: MediaRole;
  provenance: "legends-real" | "approved-render" | "reference-placeholder";
};
```
This is a proposed domain contract, not necessarily final code. Maintain backwards compatibility with existing `Product` and slugs during migration. Technical option groups are **data-driven and per-family**, not one monolithic form. When only a custom dimension request is possible, show free-text dimensions with a clear "təsdiqlənəcək" state rather than selectable fake variants. No unknown default values.

Do not synthesize performance values by multiplying shelf load by shelf count. A model may have a capacity rating independent of some options; attach load validity to confirmed configuration variants only.

## 5. Customer journey and navigation
**Homepage** -> primary catalog tile / top-level mega menu -> **category listing** with subcategories, meaningful filter chips and responsive faceting -> **model detail** with 4-image gallery + verified technical table + compatible option controls -> **quotation shortlist** -> composed WhatsApp inquiry.

Keep a primary CTA "Qiymət təklifi al". The shortlist is not a checkout and shows no prices or fabricated delivery commitments. For services, ask for measurements, project scope and a description (attachment uploads require an actually supported storage/transfer flow). WhatsApp external handoff must not claim a quote was delivered before the user sends it.

Routing: preserve `/kataloq/?kateqoriya=...` and `/mehsullar/[slug]/`; evaluate human-readable category routes only with redirect/link continuity and static export compatibility. Maintain URL-driven category filters when feasible so sharing/back navigation works.

## 6. Media specification
For each **published and fully photographed model**, target four distinct assets (not four arbitrary different models):
- rack: empty/front; in-use/loaded; metal connection/detail; side/alternate
- locker/cabinet: closed; open; interior shelves; material/lock/detail
- safe: closed; open; inner compartments; lock/hinge close-up
- pole: full-length; installed in context; bracket/anchor/detail; alternate angle
- workbench: full view; tools in-use; drawer/pegboard close-up; side/rear
- grill/garden: full; in-use; cooking/firebox/detail; folded/alternate (where applicable)
- custom fabrication/service: project in context; process; assembly/detail; final installation where genuine

Aim for 4, but never fabricate missing pictures: publish fewer verified images and track missing roles. Images must depict the same actual model and variant; differentiate client-provided real photos from licensed/approved illustrative images. Do not copy SAFE.RU or Stel-Teh product photography.

## 7. Quote templates and validation
- Rack: per-shelf capacity and whole-frame capacity, dimensions, number of tiers, surface treatment, qty; variant compatibility checked.
- Cabinet: height, width, depth, number of sections/doors, lock type, coating, qty.
- Safe: exterior/interior size, lock, interior configuration, qty; certificate-specific fields gated by evidence.
- Archive: manual/electric reference status, room/floor data, block/rail count, archive load needs, qty or project inquiry.
- Pole: height, mounting method, bracket, equipment mass, wall thickness, surface treatment, project site constraints; engineering approval mandatory.
- Workbench: worktop, dimensions, drawers, tool panel, storage, qty.
- Container/cold room: dimensions, insulation, temperature requirements, doors, electrical equipment if supplied; project inquiry.
- Truck body: chassis and vehicle model, legal capacity/weight requirements, construction type, dimensions; engineering quote.
- Service: metal/material, thickness, dimensions, quantity, drawing availability and description.

Use `zod` runtime validation and accessible controls. Store only necessary quote selection client-side until user submits via WhatsApp. Do not claim database persistence or actual transmission without an integration.

## 8. Partner logo scope
Keep the current Partners section as an existing single banner; do not create a new partner page. Expand from the current eight assets by obtaining original logos from official brand resources, checking image quality, keeping aspect ratios and brand colors, and deduplicating the leadership-provided brand list. The user states leadership authorized this list. Do not claim a separate contractual status not stated. Do not redraw or invent logos.

## 9. Non-functional acceptance gates
- Desktop, tablet, 390px mobile responsive QA; keyboard operability and image-lightbox interaction.
- Keyboard and screen-reader labels; focus management, contrast and `prefers-reduced-motion`.
- No broken routes / no blank client-rendered listing; search/filter/clear URL sync/back navigation.
- Variant matrix correctly disallows unavailable configurations; quote request includes all choices and quantity.
- Static export `next build` valid for all generated product routes; preserve GitHub Pages base path.
- `npm run typecheck`, `npm run lint`, `npm run build`; introduce unit tests for configuration logic and Playwright for core navigation when implementation begins.
- SEO review before release: metadata, canonical, sitemap, structured data only when truthful; preserve preview `noindex`.
- Lighthouse/field targets: LCP <=2.5s, INP <=200ms, CLS <=0.1 (measured, not assumed); zero critical accessibility blockers.
- Demo / UI approval required before production merge.

## 10. Execution sequence
**Phase 0 (now):** Audit and data architecture. Record baseline. Inventory all existing slugs, categories and media; map six SAFE.RU families to Legends taxonomy, plus Legends-specific lines. No mass import of third-party SKUs or images. Collect `product-data-gaps.md` with per-model photography/spec gaps.

**Phase 1:** coherent visual concept for exactly three connected surfaces: homepage, catalog, model/configurator (desktop and mobile); leadership-ready preview. Visual approval before broad refactor.

**Phase 2:** create typed taxonomy/data mapping, new category navigation, responsive listing, templates for at least rack, cabinet, safe, pole and project quote flows; retain slugs.

**Phase 3:** import verified Legends products and 4-photo sets, expand remaining model families in batches, integrate quote shortlist.

**Phase 4:** automated regression, accessibility, mobile and performance testing; secondary SOL 6.1 audit; only then draft PR for review. No automatic merge.

## 11. Source and documentation hierarchy
1. Client presentation and `docs/content-sources.md` 2026-10-01 corrections.
2. Current `lib/content.ts` real catalog and preserved URLs.
3. User's 2026-11-09 confirmation of all six SAFE.RU reference product **families**.
4. Competitor catalogs as research references only:
   - https://www.safe.ru/catalog/metallicheskie-stellazhi/
   - https://www.safe.ru/catalog/mobilnyy-arkhiv/
   - https://www.safe.ru/catalog/proizvodstvennaya-mebel/
   - https://www.safe.ru/catalog/drugaya-produktsiya/
   - https://www.safe.ru/catalog/ofisnaya-mebel/
   - https://www.safe.ru/catalog/seyfy/
   - https://stel-teh.ru/catalog/stellazhi/dlya_doma/
   - https://stel-teh.ru/catalog/stellazhi/dlya_doma/stellazh_ekonom_se_750kg/

**Open decisions before publishing individual model pages:** actual Legends model IDs/SKUs, exact dimensions, materials, operating tolerances, fire/burglary/ESD claims, permitted option combinations, real photos, brand logos, upload capability if attachments required.
