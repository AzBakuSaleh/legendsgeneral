# Legends General — full repository audit for Codex

**Target application:** https://legends-general-actual-preview.onrender.com  
**Source of truth:** `AzBakuSaleh/legendsgeneral`, branch `preview-actual-local` (NOT `main`, NOT `redesign-v2`).  
**Mode:** READ-ONLY AUDIT. Never change a production branch, deploy, merge, install secrets or edit application code unless explicitly approved. Create GitHub issues or report findings, not speculative fixes.

## Goal
Analyze the **entire repository**, not just this audit-brief PR diff. Find real, reproducible bugs, security vulnerabilities, incomplete user journeys, operational gaps and missing tests. Prioritize correctness and evidence. This website is a Next.js 16 static export deployed to Render from `preview-actual-local` with automatic deployment **disabled**.

## Required passes
1. **Security:** Audit dependency and transitive vulnerability exposure with `npm audit` (production and dev), source code for XSS, unsafe user-supplied URLs, redirect handling, template injection, leaks of credentials, PII retention, unapproved/public certificate assets, accidental client-side secrets, external links, CSP/headers and deployment permissions. Differentiate static-only exposure from server risks. Never test exploits against third-party services.
2. **Functional correctness:** Verify catalog search/filter state, browser back/forward and direct query-string links, category/product mapping, product details, image galleries/lightbox, WhatsApp quote form input validation, preset product preselection and submitted-message encoding, mobile navigation, smooth page transitions, and theme persistence.
3. **Multilingual:** AZ home, `/ru/` and `/en/`; all catalog and product routes, labels, breadcrumbs, alt text, metadata, language switching, untranslated strings, malformed routes, no broken references.
4. **Responsive/accessibility:** Target 320/360/390/768/1024/1440 viewport widths, iPhone Safari and desktop Chromium. Flag overflow, images being cropped (especially road-signs image showing full STOP and other signs), readable typography, keyboard/focus/ARIA, reduced-motion support, contrast and touch target sizing. Manual visual screenshot testing required if available; otherwise explicitly mark untested.
5. **SEO/performance:** Static export/robots/noindex intent, sitemap and canonical strategy for launch, title/description per locale, hreflang, image dimensions/CLS, LCP, resource sizes, loading strategy, unused JS/CSS, asset and routing 404 errors.
6. **Build/CI/deployment:** `npm ci`, `npm run typecheck`, `npm run lint`, `npm run build`, `node --test scripts/check-certificate-assets.test.mjs`, `node scripts/check-certificate-assets.mjs repo`, `node scripts/check-certificate-assets.mjs export`. Confirm `npm audit --omit=dev` status. Inspect CI security guards and Render manual-deploy drift. NEVER trigger Render deployment as an audit side effect.
7. **Maintainability:** TypeScript safety, brittle selectors, category duplication, dead links and dead code, error handling, asset provenance, missing automated tests, over-large components, production readiness.

## Report format
For each confirmed issue provide severity (Critical / High / Medium / Low), file + exact line, reproducible steps or input, actual vs expected, impact/security exploitability, suggested minimal fix, and regression test. Distinguish **confirmed bug**, **potential vulnerability needing validation**, **technical debt** and **not yet tested**. Rank P0/P1 blockers separately and include a short fix roadmap.

## Guardrails
- Do not invent standards, certified capacities, company photos, regulatory compliance or product specifications.
- Do not expose or upload certificate originals (signatures/stamps/QR), private assets, tokens or credentials.
- Preserve approved professional visual design, product data and existing AZ/RU/EN UI.
- Do not modify `preview-actual-local` until the user explicitly approves a tested remediation PR.
- The GitHub Pages `main` history is NOT the currently approved Render website.
- Prior CI passing does not prove mobile UI or security is safe.

## Delivery
Produce a full audit report as a GitHub comment or a new `docs/audits/...` report in a separate proposed PR. Do not implement fixes yet. Explicitly disclose which tools/tests actually ran.
