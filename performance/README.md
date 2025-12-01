
# Laporan Hasil Pengujian Performa

## Informasi Umum

- **Aplikasi:** MAGNET-Magang-Network-And-Tracking
- **Tanggal Pengujian:** 1 Desember 2025
- **Lingkungan:** Localhost (Laragon, <http://127.0.0.1:8001>)
- **Tools:** k6 (API, Load, Soak, Spike, Stress)

## Anggota Kelompok 1

| Nama                              | NIM           |
|-----------------------------------|---------------|
| Muhammad Irsyad Dimas Abdillah    | 2341720088    |
| Ghoffar Abdul Ja'far              | 2341720035    |
| Fajrul Santoso                    | 244107023010  |
| Annisa Eka Puspita                | 2341720131    |

---

---

## 1. Pengujian API (`api.js`)

**Tujuan:** Menguji endpoint API yang membutuhkan autentikasi.

**Endpoint:** `/api/user` (dilindungi Sanctum)

**Hasil:**

- Seluruh request gagal (status 401 Unauthorized).
- Tidak ada request yang berhasil (0% sukses, 100% gagal).
- Rata-rata waktu respons: 521ms.

**Analisis:**
Endpoint ini memang membutuhkan autentikasi (token Sanctum). Karena pengujian dilakukan tanpa token, hasil 401 adalah normal dan sesuai ekspektasi untuk endpoint yang dilindungi.

![Screenshot API Test](api_test.png)

---

## 2. Pengujian Load (`load.js`)

**Tujuan:** Menguji performa aplikasi pada beban normal (20 virtual user selama 30 detik) di endpoint publik.

**Endpoint:** `/`, `/pengembang`, `/tata-tertib`, `/cara-magang`, `/tips-memilih-magang`

**Hasil:**

- Seluruh request berhasil (100% sukses, 0% gagal).
- Rata-rata waktu respons: 3.88 detik.

**Analisis:**
Semua endpoint publik dapat diakses dengan baik pada beban normal. Waktu respons cukup baik, menandakan server mampu menangani beban standar.

![Screenshot Load Test](load_test.png)

---

## 3. Pengujian Soak (`soak.js`)

**Tujuan:** Menguji stabilitas aplikasi pada beban menengah dalam waktu lebih lama (2 menit).

**Endpoint:** Sama seperti load test

**Hasil:**

- Seluruh request berhasil (100% sukses, 0% gagal).
- Rata-rata waktu respons: 5.39 detik.

**Analisis:**
Server tetap stabil pada beban menengah dalam waktu lebih lama. Tidak ada error, namun waktu respons sedikit meningkat karena beban yang lebih lama.

![Screenshot Soak Test](soak_test.png)

---

## 4. Pengujian Spike (`spike.js`)

**Tujuan:** Menguji aplikasi saat terjadi lonjakan user secara tiba-tiba (hingga 150 VUs).

**Endpoint:** Sama seperti load test

**Hasil:**

- Seluruh request berhasil (100% sukses, 0% gagal).
- Rata-rata waktu respons: 18.24 detik.

**Analisis:**
Server mampu menangani lonjakan user, namun waktu respons meningkat drastis. Hal ini wajar karena resource server lokal terbatas, sehingga saat spike, antrian request menjadi panjang.

![Screenshot Spike Test](spike_test.png)

---

## 5. Pengujian Stress (`stress.js`)

**Tujuan:** Menguji aplikasi pada beban sangat tinggi (50 VUs) untuk mengetahui batas optimal resource.

**Endpoint:** Sama seperti load test

**Hasil:**

- Seluruh request berhasil (100% sukses, 0% gagal).
- Rata-rata waktu respons: 6.44 detik.

**Analisis:**
Server tetap stabil pada beban tinggi, namun waktu respons naik signifikan. Ini menandakan server mulai mencapai batas optimal resource, namun masih mampu melayani semua request tanpa error.

![Screenshot Stress Test](stress_test.png)

---

## 6. Analisis Umum

- **Endpoint API yang Dilindungi:**
  - Status 401 pada `/api/user` adalah normal jika tidak menggunakan token autentikasi.
- **Endpoint Publik:**
  - Semua endpoint publik dapat diakses dengan baik pada berbagai skenario beban, tanpa error.
- **Waktu Respons:**
  - Waktu respons meningkat seiring bertambahnya user dan durasi, menandakan keterbatasan resource pada server lokal (Laragon).
- **Stabilitas:**
  - Tidak ada request yang gagal pada pengujian endpoint publik, menunjukkan aplikasi stabil pada beban yang diuji.

---

## 7. Rekomendasi

1. **Pengujian API dengan Token:**

- Untuk menguji endpoint yang dilindungi, gunakan token autentikasi pada header request.

2. **Optimasi Server:**

- Jika ingin waktu respons lebih baik pada beban tinggi, optimalkan konfigurasi web server dan resource Laragon.

3. **Pengujian di Produksi:**

- Untuk hasil lebih representatif, lakukan pengujian di server staging/produksi.

---

## 8. Kesimpulan

Aplikasi berjalan stabil pada berbagai skenario beban di lingkungan lokal, dengan waktu respons yang meningkat pada beban tinggi. Hasil 401 pada endpoint API yang dilindungi adalah normal tanpa autentikasi.

---
