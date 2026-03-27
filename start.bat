@echo off
echo ========================================
echo   Gan Tu Company Website - Starting
echo ========================================
echo.
echo Starting backend (port 5011)...
start cmd /k "cd /d c:\MyProject\gan_tu\backend && npm run dev"

timeout /t 2 /nobreak >nul

echo Starting frontend (port 3000)...
start cmd /k "cd /d c:\MyProject\gan_tu\frontend && npm run dev"

echo.
echo ========================================
echo   Backend:  http://localhost:5011
echo   Frontend: http://localhost:3000
echo   API:      http://localhost:5011/api/health
echo ========================================
echo.
pause
