@echo off
cd /d "C:\Users\win\Downloads\zapreplyai"
echo === ZapReply AI - Force Push ===
echo.
git push -u origin main --force
echo.
if %errorlevel% == 0 (
    echo === SUCESSO! ===
    echo https://github.com/josephsskaf-hub/zapreplyai
) else (
    echo Erro - verifique o token
)
pause
