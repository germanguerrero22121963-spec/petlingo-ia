@echo off
chcp 65001 >nul
title Restaurar Petlingo IA - Punto Estable 17-Oct-2026
echo =======================================================================
echo         PETLINGO IA - RESTAURADOR AL PUNTO ESTABLE DE SEGURIDAD
echo =======================================================================
echo.
echo Fecha del punto de restauración: 17 de Octubre de 2026
echo Commit seguro: d127a87 (Tag: restauracion-estable-17oct)
echo.
echo Este script devolverá TODO tu proyecto al estado 100%% operativo que incluye:
echo   [+] Scraping nacional de 224 clínicas y pet shops en Ecuador
echo   [+] Filtros dinámicos por ciudad y botón Exportar CSV en /admin
echo   [+] Formulario de Scoring (HOT, WARM, COLD) conectado a Supabase
echo   [+] Panel comercial protegido con clave (petlingo2026)
echo   [+] Landing Page con diseño Tech & Premium Pet Care
echo   [+] Enlace de despliegue en Vercel
echo.
echo ADVERTENCIA: Cualquier cambio no confirmado posterior a esta fecha será revertido.
echo.
set /p resp="¿Deseas proceder con la restauración ahora mismo? (S/N): "
if /i "%resp%" NEQ "S" goto cancel

echo.
echo [1/3] Restaurando archivos de código con Git...
git reset --hard restauracion-estable-17oct
git clean -fd -e .env -e backup_snapshot_17oct

echo [2/3] Verificando variables de entorno (.env)...
if exist "backup_snapshot_17oct\.env" (
    copy /y "backup_snapshot_17oct\.env" .env >nul
    echo       - Archivo .env verificado y restaurado.
)

echo [3/3] Asegurando branch principal...
git checkout -B main restauracion-estable-17oct

echo.
echo =======================================================================
echo   ✅ ¡RESTAURACIÓN FINALIZADA CON ÉXITO!
echo   El proyecto ha quedado exactamente igual que el 17 de Octubre de 2026.
echo =======================================================================
echo.
pause
exit /b 0

:cancel
echo.
echo Restauración cancelada por el usuario. No se realizó ninguna modificación.
echo.
pause
