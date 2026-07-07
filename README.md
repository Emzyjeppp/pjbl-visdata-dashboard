# Dashboard Transportasi Yogyakarta - PjBL UAS Praktikum Visualisasi Data

Repositori ini berisi proyek akhir Project-Based Learning (PjBL) untuk mata kuliah Praktikum Visualisasi Data. Proyek ini memetakan kondisi kepadatan lalu lintas dan rute Trans Jogja di Daerah Istimewa Yogyakarta menggunakan pendekatan User-Centered Design.

Data yang digunakan disarikan dari statistik resmi Badan Pusat Statistik (BPS) DIY dan Dinas Perhubungan DIY.

---

## Modul Aplikasi

Aplikasi ini berjalan sebagai Single Page Application (SPA) dengan lima modul utama:

1. **Dashboard V1 (Rancangan Awal)**: Berisi purwarupa awal dengan filter dropdown sederhana, tata letak standar, dan kontras warna rendah.
2. **Formulir Survei**: Kuesioner interaktif skala 1 sampai 5 untuk diisi oleh dosen pengampu dan rekan sejawat. Jawaban tersimpan di LocalStorage browser.
3. **Hasil Survei**: Analitik radar chart otomatis dari data survei untuk memetakan kualitas kegunaan (usability) rancangan awal.
4. **Dashboard V2 (Rancangan Final)**: Versi premium hasil perbaikan berdasarkan data survei, dilengkapi peta spasial DIY interaktif (SVG) untuk filter dinamis per wilayah kabupaten.
5. **Laporan UAS**: Dokumentasi komparasi rancangan yang dapat langsung dicetak menjadi dokumen PDF rapi.

---

## Spesifikasi Teknis

- **Bahasa & Gaya**: HTML5, CSS3, JavaScript (ES6+).
- **Library Grafik**: Chart.js via CDN.
- **Mutu Kode**: Lolos pengujian linter ESLint dan formatter Prettier secara penuh.
- **Peta Spasial**: Peta skematik berbasis SVG terintegrasi langsung pada kode frontend.

---

## Cara Menjalankan

Aplikasi ini serverless dan berjalan langsung di browser tanpa perlu instalasi database.

1. **Unduh Proyek**:

   ```bash
   git clone https://github.com/Emzyjeppp/pjbl-visdata-dashboard.git
   cd pjbl-visdata-dashboard
   ```

2. **Jalankan Server Lokal**:
   ```bash
   python -m http.server 8000
   ```
   Buka **[http://localhost:8000](http://localhost:8000)** pada browser.

---

## Kriteria Pengujian Usability

Survei mengukur lima aspek kelayakan visualisasi:

- **Akurasi Data**: Kesesuaian visualisasi dengan kondisi lalu lintas riil.
- **Kemudahan Navigasi**: Kemudahan berpindah antar modul halaman.
- **Fungsionalitas Filter**: Kecepatan dan kemudahan penyaringan data spasial lewat peta.
- **Kejelasan Visual**: Keterbacaan teks, kontras warna, dan kejelasan grafik.
- **Kecepatan Performa**: Waktu respons rendering grafik tanpa lag.
