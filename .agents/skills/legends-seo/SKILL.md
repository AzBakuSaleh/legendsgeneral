---
name: legends-seo
description: Audit or improve SEO of the Legends General public Next.js catalog website. Use when working on Google indexing, titles/meta, canonical URLs, robots/sitemap, product schema, structured data, Core Web Vitals, mobile UX, image SEO, local search, or AI-search readiness. Cooperate with the third-party Codex SEO suite if it is installed.
---

# Legends General — SEO workflow

This is a **repository-specific companion skill**, not a copy of the third-party Codex SEO suite.

## Source of truth

- Framework: Next.js App Router + TypeScript, currently `output: "export"`; see `package.json` and `next.config.ts`.
- Hosting: `.github/workflows/pages.yml` deploys a static export to GitHub Pages with `NEXT_PUBLIC_BASE_PATH=/legendsgeneral`. Production-domain hosting is NOT confirmed.
- Global metadata: `app/layout.tsx`, currently contains `robots: { index: false, follow: false }` (intentionally a preview setting).
- Catalog, business contact data and actual project references: `lib/content.ts`.
- Product detail SEO: `app/mehsullar/[slug]/page.tsx` and `generateMetadata`.
- Photo provenance: `docs/content-sources.md`, `docs/service-image-sources.json`, and `docs/partner-logo-sources.md`.

## Procedure

1. Inspect the actual code and document a baseline with file paths. Distinguish **verified** behavior from assumptions.
2. Determine whether the target is the current GitHub Pages preview URL or a confirmed official production domain. **Do not enable indexing or invent canonical URLs until the production hostname is approved.**
3. Check each public page for unique Azerbaijani title/description, headings, image alt text, internal linking, HTML language, OpenGraph metadata, canonical correctness and indexability.
4. Check `robots.txt`, `sitemap.xml`, trailing-slash rules, `NEXT_PUBLIC_BASE_PATH`, static-export compatibility and broken links. Provide changes compatible with GitHub Pages until hosting changes.
5. Review product pages for helpful distinct descriptions and structured data. Add only supported Organization/LocalBusiness/Product schema properties. **Do not invent prices, availability, reviews, ratings, capacity certifications, delivery promises or client relationships.**
6. Keep AI-generated sample product photos distinguishable from documented completed works. Do not represent sample images as company projects.
7. When the third-party **Codex SEO** suite is installed, load its `seo` skill and use the relevant specialized audits as appropriate. If unavailable, perform a transparent source-code audit; do not claim a full crawler/Google/Search Console report.
8. Before proposing a change, describe its impact on the live site. Before editing, prefer focused changes and test `npm run typecheck`, `npm run lint` and `npm run build` (where dependencies are available).
9. Report findings in severity order, with exact file paths and evidence. Label browser, Lighthouse, Google Search Console and crawl metrics as **not tested** unless actually measured.

## Safety and scope

- No purchase, paid provider, deployment, credential creation or API access without user authorization.
- Never store API keys, tokens, SEO cache or provider configuration in Git. Use ignored local files.
- The full Codex SEO suite is installed on the user's own Codex workstation separately; see `docs/codex-seo-setup.md`.
