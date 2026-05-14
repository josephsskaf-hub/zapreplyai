@echo off
cd /d "C:\Users\win\Downloads\zapreplyai"
echo === ZapReply AI - Push para GitHub ===
echo.

REM Check if .git exists
if not exist ".git" (
    echo Inicializando git...
    git init
    git remote add origin https://github.com/josephsskaf-hub/zapreplyai.git
)

REM Check remote
git remote -v

echo.
echo Adicionando arquivos...
git add .
git status

echo.
echo Fazendo commit...
git commit -m "feat: ZapReply AI Phase 1 - MVP completo" 2>nul || echo (nada novo para commitar)

echo.
echo Fazendo push para GitHub...
echo (vai pedir usuario e senha - use seu Personal Access Token como senha)
echo.
git push -u origin HEAD:main

echo.
if %errorlevel% == 0 (
    echo SUCESSO! Codigo enviado para github.com/josephsskaf-hub/zapreplyai
) else (
    echo Se falhou, tente: git push -u origin master:main
    git push -u origin master:main
)
echo.
pause
