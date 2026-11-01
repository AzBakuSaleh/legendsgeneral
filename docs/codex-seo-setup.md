# Codex SEO for Legends General

The repository includes the `legends-seo` project skill under `.agents/skills/legends-seo/SKILL.md`. This skill is **usable from the repository on its own** but is **not** the 26-workflow third-party Codex SEO package.

## Installing the full third-party suite on Windows (one time per PC)

Official source: https://github.com/AgriciDaniel/codex-seo

Version selected for repeatable setup: `v1.9.6-codex.5`. This is a third-party open-source package and its installer runs code and downloads dependencies. Read the installer before running it; do not execute downloaded scripts blindly.

Prerequisites: Codex with local skill support, Git, and Python 3.10+.

In PowerShell:

```powershell
git clone --depth 1 --branch v1.9.6-codex.5 https://github.com/AgriciDaniel/codex-seo.git "$env:TEMP\codex-seo-v1.9.6-codex.5"
Set-Location "$env:TEMP\codex-seo-v1.9.6-codex.5"
notepad .\install.ps1
```

After reviewing the script and confirming you trust the package:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\install.ps1
```

Installer documentation says it installs the suite in `~/.codex/skills/`, agent profiles in `~/.codex/agents/`, and Python tooling in the `seo` skill folder; some optional features require further configuration. **Installing the package is local to that PC and cannot be completed by adding files to GitHub alone.**

Check whether the main SEO skill was installed:

```powershell
Test-Path "$HOME\.codex\skills\seo\SKILL.md"
Get-ChildItem "$HOME\.codex\skills" -Directory -Filter "seo*" | Select-Object Name
```

Restart Codex if it does not discover the new skills automatically, and open the `legendsgeneral` repository.

Example first task for Codex:

> Audit the Legends General Next.js project using the legends-seo skill and, if installed, the Codex SEO suite. First inspect code and report technical SEO, sitemap, robots, canonical, structured-data, product content and performance issues. Do not change indexing until an official production domain is confirmed. Do not modify code or deploy before proposing a prioritized plan.

## Notes

- The repository currently exports a static site for a GitHub Pages subpath.
- Its preview metadata has indexing disabled on purpose.
- Optional API-integrated providers (such as DataForSEO or Google services) may require accounts and credentials; do not enter them into the repository.
- `.seo-cache/` is ignored. Keep SEO reports and temporary output untracked unless explicitly reviewed for inclusion.
- Skill setup is not the same as a successful SEO audit; run build/tests and browser audits separately.
