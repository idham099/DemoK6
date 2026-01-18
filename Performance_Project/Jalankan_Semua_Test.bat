@echo off
title K6 Load Testing - 7 Test Cases
cls

echo ======================================================
echo    MEMULAI PENGUJIAN OTOMATIS (TC 01 - TC 07)
echo ======================================================

:: 1. Jalankan TC 01
echo Running TC 01: Auth Positif...
k6 run -o influxdb=http://localhost:8086/k6 tc_pft_01_auth_positif.js

:: 2. Jalankan TC 02
echo Running TC 02: Auth Negatif...
k6 run -o influxdb=http://localhost:8086/k6 tc_pft_02_auth_negatif_missing_pwd.js

:: 3. Jalankan TC 03
echo Running TC 03: Booking Positif...
k6 run -o influxdb=http://localhost:8086/k6 tc_pft_03_booking_positif.js

:: 4. Jalankan TC 04
echo Running TC 04: Booking Negatif...
k6 run -o influxdb=http://localhost:8086/k6 tc_pft_04_booking_negatif_mismatch.js

:: 5. Jalankan TC 05
echo Running TC 05: Booking Negatif Heaviy..
k6 run -o influxdb=http://localhost:8086/k6 tc_pft_05_booking_negatif_heavy.js

:: 6. Jalankan TC 06
echo Running TC 06: E2E Positif...
k6 run -o influxdb=http://localhost:8086/k6 tc_pft_06_e2e_positif.js

:: 7. Jalankan TC 07
echo Running TC 07: Get E2E Negatif...
k6 run -o influxdb=http://localhost:8086/k6 tc_pft_07_e2e_negatif_no_token.js

echo ======================================================
echo    SEMUA PENGUJIAN SELESAI! MEMBUKA GRAFANA...
echo ======================================================

:: Membuka Browser langsung ke Dashboard k6
start http://localhost:3000/d/38c97573-3577-4b24-80d7-f1c1fe614e1d/k6-load-testing-results?orgId=1&from=now-30m&to=now&timezone=browser&var-Measurement=$__all&refresh=5s
pause