# API Load Testing Project - Restful Booker

Project ini berisi rangkaian pengujian beban (Load Testing) untuk API Restful Booker menggunakan k6, InfluxDB, dan Grafana.

## Test Cases
1. **TC 01**: Auth Positif
2. **TC 02**: Auth Negatif
3. **TC 03-07**: Booking Flow (Create, Update, Delete, Get)

## Cara Menjalankan
Cukup jalankan file `auto_run.bat` di lingkungan Windows. Script ini akan secara otomatis:
- Menjalankan ke-7 Test Cases secara berurutan.
- Mengirimkan data ke InfluxDB.
- Mengarsipkan script ke folder `Hasil_Test`.
- Membuka Dashboard Grafana secara otomatis.

## Teknologi yang Digunakan
- **k6** (Load Testing Tool)
- **InfluxDB** (Time Series Database)
- **Grafana** (Visualization Dashboard)