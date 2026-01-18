# 🚀 Automated Performance Testing: Restful Booker with k6

Project ini merupakan framework pengujian beban (Load Testing) otomatis untuk API **Restful Booker** menggunakan ekosistem **k6, InfluxDB, dan Grafana**. Framework ini dirancang untuk mensimulasikan beban pengguna nyata, menganalisis performa server, dan memantau kesehatan infrastruktur melalui visualisasi real-time.

---

<img width="1880" height="913" alt="image" src="https://github.com/user-attachments/assets/4d79981c-8dac-4373-a0bf-c146f97732f1" />


<img width="1886" height="872" alt="image" src="https://github.com/user-attachments/assets/d608e1de-6414-4d66-81ef-f7c7d8f2e1b5" />


<img width="1917" height="925" alt="image" src="https://github.com/user-attachments/assets/3c961e22-8c6c-4a49-ae68-ac08f99dae81" />

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/fcf2af6e-41bb-4bf2-9a19-8ff3fc1241c6" />



## 🛠️ Tech Stack & Architecture

Project ini mengintegrasikan beberapa teknologi utama untuk mencapai hasil pengujian yang akurat:
* **k6**: Alat pengujian beban berbasis JavaScript untuk scripting skenario pengujian.
* **InfluxDB (v1.8)**: Database deret waktu (Time Series) untuk menyimpan metrik hasil pengujian secara persisten.
* **Grafana**: Platform visualisasi untuk menampilkan metrik melalui dashboard interaktif secara real-time.
* **Docker Compose**: Untuk orkestrasi container InfluxDB dan Grafana dalam satu perintah.
* **Windows Batch Script**: Automasi pengujian untuk menjalankan 7 skenario sekaligus.

---


## 📋 Cakupan Pengujian (7 Test Cases)

Framework ini mencakup skenario positif, negatif, dan pengujian alur kerja lengkap (End-to-End):

| ID | Nama Test Case | Deskripsi Skenario | Target (VUs) |
|---|---|---|---|
| **TC-01** | Auth Positif | Login dengan kredensial valid untuk mendapatkan token. | 20 |
| **TC-02** | Auth Negatif | Percobaan login tanpa password (Missing Password). | 20 |
| **TC-03** | Booking Positif | Membuat reservasi baru dengan data valid. | 20 |
| **TC-04** | Booking Mismatch | Testing logika tanggal (Checkout sebelum Check-in). | 20 |
| **TC-05** | Heavy Payload | Mengirim request dengan data karakter besar (1000+). | 20 |
| **TC-06** | E2E Positif | Alur penuh: Auth -> Create Booking -> Verify Get Booking. | 20 |
| **TC-07** | E2E Negatif | Mencoba membuat reservasi tanpa token/cookie (Unauthorized). | 20 |

---


## 🚀 Panduan Instalasi & Persiapan

### 1. Prasyarat (Prerequisites)
Pastikan sistem Anda sudah menginstall:
* [k6](https://k6.io/)
* [Docker Desktop](https://www.docker.com/)
* [Git](https://git-scm.com/)

### 2. Setup Infrastruktur (Database & Monitoring)
Jalankan InfluxDB dan Grafana menggunakan Docker Compose yang tersedia:
```bash
docker-compose up -d
```
* InfluxDB: Berjalan di port 8086 dengan database default k6.
* Grafana: Berjalan di port 3000 (Akses: http://localhost:3000).

### 3. Konfigurasi Dashboard Grafana
  1. Buka Grafana.
  2. Tambahkan Data Source: Pilih InfluxDB, URL: http://influxdb:8086, Database: k6.
  3. Gunakan dashboard k6 yang sudah dikonfigurasi pada UID 38c97573-3577-4b24-80d7-f1c1fe614e1d.



## 🏃 Cara Menjalankan Pengujian
### Automasi Penuh (Recommended)
  Cukup jalankan file batch untuk mengeksekusi ke-7 skenario secara berurutan dan membuka dashboard secara otomatis:
```bash
Jalankan_Semua_Test.bat
```

### Menjalankan Skenario Tunggal
  Jika ingin menjalankan satu test case secara manual:
```bash
k6 run -o influxdb=http://localhost:8086/k6 tc_pft_01_auth_positif.js
```

## 📊 Analisis & Metrik
Setiap pengujian memantau metrik kritis melalui Grafana:
* **http_req_duration**: Waktu respon latensi (SLA p(95)).
* **http_req_failed**: Tingkat kegagalan request (Error Rate).
* **VUs**: Jumlah pengguna virtual yang aktif secara bersamaan.

## 📁 Struktur Folder
```bash
├── docker-compose.yml     # Konfigurasi InfluxDB & Grafana 
├── Jalankan_Semua_Test.bat # Automasi eksekusi testing 
├── tc_pft_01_auth...js    # Script Skenario 01
├── tc_pft_02_auth...js    # Script Skenario 02
├── tc_pft_03_book...js    # Script Skenario 03
├── tc_pft_04_book...js    # Script Skenario 04
├── tc_pft_05_book...js    # Script Skenario 05
├── tc_pft_06_e2e...js     # Script Skenario 06
├── tc_pft_07_e2e...js     # Script Skenario 07
└── README.md              # Dokumentasi Project
```
