@echo off
cd /d "C:\Users\win\Downloads\zapreplyai"
echo === ZapReply AI - Push Sellable Upgrades ===
git add .
git commit -m "feat: sellable upgrades - testimonials, FAQ, urgency banner, /obrigado, legal pages, SEO, GA4"
git push -u origin main --force
echo.
if %errorlevel% == 0 (
    echo === SUCESSO! Deploy na Vercel em ~60s ===
    echo https://zapreplyai.vercel.app
) else (
    echo Erro no push
)
pause
