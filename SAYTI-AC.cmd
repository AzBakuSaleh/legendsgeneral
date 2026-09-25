@echo off
cd /d "%~dp0"
where node >nul 2>nul
if %errorlevel% equ 0 (
  node scripts\serve-static.mjs
) else if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" (
  "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" scripts\serve-static.mjs
) else (
  echo Node.js tapilmadi. nodejs.org saytindan Node.js LTS qurasdirin.
)
pause
