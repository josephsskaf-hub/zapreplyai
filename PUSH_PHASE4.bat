@echo off
cd /d "C:\Users\win\Downloads\zapreplyai"
echo === ZapReply AI Phase 4 Push ===
echo.
echo Commit: feat: Phase 4 - Evolution API + Meta Cloud API WhatsApp integration
echo.
git log --oneline -3
echo.
echo Pushing to GitHub...
git push origin main
echo.
if %errorlevel% == 0 (
    echo === SUCESSO! Acesse: https://github.com/josephsskaf-hub/zapreplyai ===
    echo Vercel vai fazer o deploy automaticamente.
) else (
    echo === ERRO no push - verifique seu token do GitHub ===
)
pause
