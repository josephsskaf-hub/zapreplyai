@echo off
cd /d "C:\Users\win\Downloads\zapreplyai"
echo === ZapReply AI - Push GitHub (v2) ===
echo.

REM Remove old .git if broken
echo Removendo .git antigo...
rmdir /s /q .git 2>nul

REM Init fresh
echo Inicializando git do zero...
git init -b main
git config user.email "josephsskaf@gmail.com"
git config user.name "josephsskaf-hub"

REM Add remote
git remote add origin https://github.com/josephsskaf-hub/zapreplyai.git

REM Stage all
echo Adicionando arquivos...
git add .

REM Commit
echo Fazendo commit...
git commit -m "feat: ZapReply AI Phase 1 - MVP completo"

REM Push
echo.
echo === PUSH PARA GITHUB ===
echo Vai abrir autenticacao - use seu Personal Access Token como senha
echo.
git push -u origin main

echo.
if %errorlevel% == 0 (
    echo === SUCESSO! ===
    echo Acesse: https://github.com/josephsskaf-hub/zapreplyai
) else (
    echo === ERRO no push ===
    echo Verifique seu Personal Access Token e tente novamente
)
echo.
pause
