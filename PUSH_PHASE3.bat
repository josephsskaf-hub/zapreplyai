@echo off
cd /d "C:\Users\win\Downloads\zapreplyai"
echo === ZapReply AI Phase 3 Push ===
git add .
git commit -m "feat: Phase 3 - sellable landing, niche pages, demo mode, leads form"
git push origin main
echo EXIT CODE: %errorlevel%
pause
