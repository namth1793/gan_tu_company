@echo off
echo ========================================
echo   Gan Tu Company Website - Installing
echo ========================================
echo.

echo [1/4] Installing backend dependencies...
cd /d c:\MyProject\gan_tu\backend
call npm install
if %errorlevel% neq 0 (echo Backend install FAILED & pause & exit /b 1)

echo.
echo [2/4] Installing frontend dependencies...
cd /d c:\MyProject\gan_tu\frontend
call npm install
if %errorlevel% neq 0 (echo Frontend install FAILED & pause & exit /b 1)

echo.
echo [3/4] Seeding database...
cd /d c:\MyProject\gan_tu\backend
node db/seed.js
if %errorlevel% neq 0 (echo Seed FAILED & pause & exit /b 1)

echo.
echo [4/4] Done!
echo ========================================
echo   Installation complete!
echo   Run start.bat to launch the website
echo ========================================
pause
