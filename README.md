# PjBL UAS Praktikum Visualisasi Data - Dashboard Transportasi Yogyakarta

Proyek ini dibangun sebagai tugas akhir Project-Based Learning (PjBL) mata kuliah **Praktikum Visualisasi Data** dengan menerapkan metodologi pengembangan produk berbasis pengguna (*User-Centered Design*).

Dashboard ini memvisualisasikan data kondisi **Kepadatan Jalan & Mobilitas Transportasi (Trans Jogja) di Daerah Istimewa Yogyakarta** berdasarkan data sekunder yang realistis dari publikasi BPS DIY dan Dinas Perhubungan DIY.

---

## 🌟 Fitur Utama
Aplikasi ini dirancang sebagai *Single Page Application* (SPA) dengan 5 modul halaman interaktif:

1. **Dashboard V1 (Sebelum Perbaikan)**: Rancangan awal visualisasi data dengan keterbatasan filter (dropdown kaku), tata letak standar, dan kontras warna rendah.
2. **Formulir Survei Evaluasi**: Kuesioner evaluasi kegunaan (*usability*) interaktif berbasis skala 1-5 bintang untuk Dosen Pengampu, Asisten Praktikum, dan Teman Sekelas. Tanggapan disimpan secara lokal di `LocalStorage` browser agar data tetap persisten.
3. **Analisis Hasil Survei (Real-time)**: Visualisasi rata-rata skor evaluasi 5 aspek (*Akurasi*, *Navigasi*, *Filter*, *Visual*, *Performa*) menggunakan **Radar Chart (Chart.js)** dinamis, disertai daftar tanggapan saran kualitatif.
4. **Dashboard V2 (Sesudah Perbaikan - Premium)**: Desain teroptimasi bertema *dark glassmorphism* dengan **Peta Spasial DIY (SVG) Interaktif**. Pengguna dapat mengklik wilayah kabupaten (Sleman, Bantul, Gunungkidul, Kulon Progo, Kota Yogyakarta) untuk memfilter grafik volume per jam, jumlah penumpang Trans Jogja, dan rekomendasi solusi Dishub secara instan (*cross-filtering*).
5. **Laporan Akhir & Metodologi**: Dokumentasi resmi perbandingan rancangan V1 vs V2 serta tombol cetak siap pakai (`window.print()`) yang otomatis memformat laporan menjadi dokumen PDF bersih bebas dari tombol navigasi/UI.

---

## 🛠️ Tech Stack & Clean Code
Proyek ini dibangun mengikuti prinsip-prinsip penulisan kode bersih (*Clean Code*):
* **SOLID / Single Responsibility**: Logika kode dibagi secara modular dalam JS (inisialisasi bagan, rendering peta, handler survei).
* **DRY & KISS**: Minim duplikasi kode, performa cepat (<100ms), dan serverless (berjalan mandiri di browser).
* **Frontend**: HTML5, Vanilla CSS3 (Custom Variables, Flexbox/Grid, Animations), Vanilla JavaScript (ES6+).
* **Charts Library**: [Chart.js](https://www.chartjs.org/) via CDN.
* **Mutu Kode**: Terintegrasi penuh dengan **ESLint** dan **Prettier** untuk standardisasi kualitas kode dengan kepatuhan 100%.

---

## 🚀 Cara Menjalankan Secara Lokal
Karena proyek ini bersifat serverless, Anda dapat membukanya secara langsung:

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/username/repository.git
   cd pjbl-visdata-dashboard
   ```

2. **Jalankan HTTP Server Lokal** (misal menggunakan Python):
   ```bash
   python -m http.server 8000
   ```
   Lalu buka browser Anda dan akses **[http://localhost:8000](http://localhost:8000)**.

---

## 📊 Matriks Penilaian Survei
Aspek evaluasi kelayakan dashboard yang diuji meliputi:
* **Akurasi Data**: Ketepatan data dengan kondisi statistik riil DIY.
* **Kemudahan Navigasi**: Kejelasan menu dan kelancaran transisi SPA.
* **Fungsionalitas Filter**: Kepekaan interaksi filter spasial peta.
* **Kejelasan Visual**: Harmonisasi warna, tipografi, dan kejelasan bagan.
* **Kecepatan Performa**: Waktu muat grafik tanpa lag.
