# LAPORAN PROJECT-BASED LEARNING (PjBL)

# MATA KULIAH PRAKTIKUM VISUALISASI DATA

---

## JUDUL PROYEK:

## IMPLEMENTASI USER-CENTERED DESIGN PADA DASHBOARD INTERAKTIF SPASIAL MOBILITAS TRANSPORTASI DAERAH ISTIMEWA YOGYAKARTA

---

### Oleh Kelompok:

1.  **NIM : 255410014**
    - _Nama_: MUHAMMAD JEPRI
2.  **NIM : 235410063**
    - _Nama_: AS-SAMMIRUL RIZKY

---

### PROGRAM STUDI INFORMATIKA

### FAKULTAS TEKNOLOGI INFORMASI

### UNIVERSITAS TEKNOLOGI DIGITAL INDONESIA (UTDI)

### YOGYAKARTA, 2026

<div style="page-break-after: always;"></div>

## HALAMAN PENGESAHAN

**JUDUL PROYEK PjBL** : Implementasi User-Centered Design pada Dashboard Interaktif Spasial Mobilitas Transportasi Daerah Istimewa Yogyakarta  
**MATAKULIAH** : Praktikum Visualisasi Data  
**PROGRAM STUDI** : Informatika  
**ANGGOTA KELOMPOK** :

1.  Nama : MUHAMMAD JEPRI (NIM : 255410014)
2.  Nama : AS-SAMMIRUL RIZKY (NIM : 235410063)

Menyatakan bahwa Laporan Project-Based Learning (PjBL) ini telah diperiksa, disetujui, dan disahkan sebagai syarat pemenuhan tugas mata kuliah Praktikum Visualisasi Data pada Program Studi Informatika, Fakultas Teknologi Informasi, Universitas Teknologi Digital Indonesia.

Yogyakarta, 2026

**Menyetujui,**  
Dosen Pengampu Praktikum Visualisasi Data

_(Tanda Tangan)_

**Bagas Triaji, S.Kom., M.Kom.**  
NIDN/NIK. ........................

<div style="page-break-after: always;"></div>

## KATA PENGANTAR

Penyusunan Laporan Proyek _Project-Based Learning_ (PjBL) untuk mata kuliah Praktikum Visualisasi Data ini selesai tepat waktu.

Proyek ini bertujuan mengembangkan Dashboard Visualisasi Data Mobilitas Transportasi di Daerah Istimewa Yogyakarta menggunakan pendekatan _User-Centered Design_ (UCD). Penyusunan laporan ini selesai berkat bantuan berbagai pihak. Penulis menyampaikan terima kasih kepada:

1.  **Bapak Bagas Triaji, S.Kom., M.Kom.**, selaku Dosen Pengampu mata kuliah Praktikum Visualisasi Data Universitas Teknologi Digital Indonesia (UTDI) atas bimbingan materi, arahan teknis, dan evaluasi berkala sepanjang semester.
2.  **Asisten Praktikum** yang mendampingi, memberikan masukan, serta memvalidasi standardisasi penulisan linter dan kode.
3.  **Para Responden Evaluasi Usability** (Dosen, Asisten, dan Rekan Mahasiswa) yang meluangkan waktu mengisi kuesioner evaluasi untuk menyempurnaan rancangan dashboard ini.

Laporan ini diharapkan memberikan manfaat akademis serta menjadi referensi dalam bidang visualisasi data interaktif.

Yogyakarta, 2026

**Penyusun Kelompok**

<div style="page-break-after: always;"></div>

## DAFTAR ISI

- **HALAMAN SAMPUL**................................................................................ i
- **HALAMAN PENGESAHAN**........................................................................ ii
- **KATA PENGANTAR**............................................................................. iii
- **DAFTAR ISI**....................................................................................... iv
- **BAB I PENDAHULUAN**......................................................................... 1
  - 1.1 Latar Belakang.......................................................................... 1
  - 1.2 Rumusan Masalah...................................................................... 2
  - 1.3 Tujuan Perencanaan Project-Based Learning................................... 2
  - 1.4 Batasan Masalah....................................................................... 3
- **BAB II TINJAUAN PUSTAKA**.................................................................. 4
  - 2.1 User-Centered Design (UCD)........................................................ 4
  - 2.2 Usability Testing & Kuesioner Usability......................................... 4
  - 2.3 Data Spasial & Peta SVG............................................................. 5
  - 2.4 Chart.js & Visualisasi Interaktif..................................................... 5
- **BAB III METODE PERENCANAAN**............................................................ 6
  - 3.1 Flowchart Umum Metodologi........................................................ 6
  - 3.2 Tahapan Penerapan UCD............................................................. 7
- **BAB IV HASIL DAN PEMBAHASAN**........................................................... 8
  - 4.1 Analisis Dashboard V1 (Sebelum Perbaikan).................................. 8
  - 4.2 Evaluasi Usability Kuesioner Responden.......................................... 8
  - 4.3 Perancangan Perbaikan Dashboard V2 (Sesudah Perbaikan)............... 9
  - 4.4 Integrasi Data Riil BPS & Dishub DIY............................................. 10
- **BAB V PENUTUP**.................................................................................. 11
  - 5.1 Simpulan................................................................................. 11
  - 5.2 Saran....................................................................................... 11
- **DAFTAR PUSTAKA**................................................................................. 12

<div style="page-break-after: always;"></div>

## BAB I PENDAHULUAN

### 1.1 Latar Belakang

Volume kendaraan bermotor di Provinsi DI Yogyakarta meningkat setiap tahun. Data registrasi BPS menunjukkan total kendaraan aktif mencapai 3.566.423 unit pada tahun 2025. Peningkatan ini menyebabkan kepadatan lalu lintas pada ruas jalan utama, terutama saat jam sibuk pagi dan sore hari. Kondisi ini menuntut Dinas Perhubungan untuk mengambil keputusan secara cepat berdasarkan pemetaan lalu lintas yang akurat.

Selama ini, data statistika mobilitas seperti jumlah total kendaraan, indeks kepadatan, dan rata-rata penumpang Trans Jogja dipublikasikan secara terpisah dalam dokumen teks PDF yang tebal. Hal ini menyulitkan pengguna dalam menganalisis relasi data spasial secara cepat.

Kelompok kami mengintegrasikan data sekunder riil tersebut ke dalam Dashboard Visualisasi Data Interaktif berbasis web. Data volume kendaraan bersumber dari Badan Pusat Statistik DIY (https://yogyakarta.bps.go.id), sedangkan data kemacetan, kecepatan, dan penumpang Trans Jogja bersumber dari Dinas Perhubungan DIY (https://dishub.jogjaprov.go.id). Kami menerapkan metode _User-Centered Design_ (UCD) untuk memperbaiki desain awal (V1) yang memiliki visualisasi peta kurang optimal dan kontras warna rendah menjadi dashboard interaktif (V2) dengan penyempurnaan peta spasial SVG interaktif serta perbaikan kontras visual untuk menyaring data wilayah secara dinamis.

### 1.2 Rumusan Masalah

Rumusan masalah dalam proyek PjBL ini meliputi:

1.  Bagaimana merancang dashboard visualisasi data transportasi DIY yang interaktif sesuai pedoman _User-Centered Design_ (UCD)?
2.  Bagaimana mengatasi kendala interaksi dropdown kaku pada rancangan awal (V1) menggunakan peta spasial SVG interaktif?
3.  Bagaimana menyinkronkan data grafik dengan data riil dari BPS DIY dan Dishub DIY?

### 1.3 Tujuan Perencanaan Project-Based Learning

Tujuan dari pelaksanaan proyek PjBL ini adalah:

1.  Membangun Dashboard Visualisasi Data Transportasi Yogyakarta yang memiliki nilai kegunaan (_usability_) tinggi berdasarkan hasil survei pengguna.
2.  Menerapkan metode UCD untuk membuat antarmuka halaman web yang mudah digunakan (user-friendly) dan responsif.
3.  Menyajikan integrasi data lalu lintas Yogyakarta dan trayek penumpang Trans Jogja secara valid dan transparan.

### 1.4 Batasan Masalah

Ruang lingkup proyek visualisasi data ini dibatasi oleh ketentuan berikut:

1.  **Wilayah Kajian**: Wilayah kabupaten/kota di DI Yogyakarta, dengan fokus visualisasi detail pada Sleman, Bantul, dan Kota Yogyakarta.
2.  **Sumber Data**: Data sekunder resmi dari tabel Registrasi Kendaraan ERI BPS DIY 2025 dan Buku _Transportasi Dalam Angka 2025_ Dinas Perhubungan DIY.
3.  **Teknologi**: HTML5, CSS3 vanilla, JavaScript murni, Chart.js untuk grafik, dan berkas SVG untuk peta spasial.

<div style="page-break-after: always;"></div>

## BAB II TINJAUAN PUSTAKA

### 2.1 User-Centered Design (UCD)

Metodologi _User-Centered Design_ (UCD) memposisikan kebutuhan pengguna akhir sebagai pusat keputusan desain (Interaction Design Foundation, https://www.interaction-design.org). Siklusnya meliputi analisis kebutuhan, desain solusi alternatif, pembuatan prototipe, dan evaluasi kegunaan secara berulang guna menjamin produk akhir mudah dioperasikan.

### 2.2 Usability Testing & Kuesioner Usability

_Usability Testing_ mengukur tingkat kemudahan penggunaan sistem oleh pengguna akhir berdasarkan standar Nielsen Norman Group (https://www.nngroup.com). Kuesioner evaluasi UAS mencakup 5 kriteria skala likert (1-5): (1) Akurasi data di layar dengan data riil, (2) Navigasi penemuan KPI utama di bawah 5 detik, (3) Fungsionalitas filter penyaring data, (4) Kejelasan visual grafik dan teks, serta (5) Kecepatan performa pemuatan data halaman.

### 2.3 Data Spasial & Peta SVG

Data spasial merepresentasikan posisi geografis objek. Format _Scalable Vector Graphics_ (SVG) menyajikan visual batas wilayah kabupaten Yogyakarta secara tajam dan responsif di berbagai resolusi layar. Berkas SVG berinteraksi langsung dengan JavaScript sebagai elemen DOM untuk mendeteksi aksi klik guna memicu pembaruan filter wilayah (_cross-filtering_).

### 2.4 Chart.js & Visualisasi Interaktif

Chart.js adalah pustaka JavaScript berbasis kanvas HTML5 untuk merender bagan statistik (https://www.chartjs.org/docs). Kami menggunakan Chart.js untuk memvisualisasikan data runtun waktu fluktuasi volume jalan raya (_Line Chart_) dan sebaran rata-rata penumpang Trans Jogja per koridor (_Bar Chart_).

<div style="page-break-after: always;"></div>

## BAB III METODE PERENCANAAN

### 3.1 Flowchart Umum Metodologi

Berikut adalah alur penyusunan proyek PjBL visualisasi data ini:

```
[Start] -> [Identifikasi Kebutuhan Pengguna & Data]
        -> [Perancangan Dashboard Awal V1]
        -> [Uji Kelayakan Usability V1 via Google Form]
        -> [Analisis Skor Radar Chart Usability]
        -> [Implementasi Perbaikan UCD di Dashboard V2]
        -> [Uji Kelayakan Usability V2 (Skor Meningkat)]
        -> [Penyusunan Laporan Resmi] -> [End]
```

### 3.2 Tahapan Penerapan UCD

Penerapan UCD dilakukan melalui 4 langkah:

1.  **Memahami Konteks Pengguna**: Dosen, asisten, dan mahasiswa membutuhkan penyajian informasi ringkas tanpa perlu membaca PDF tebal.
2.  **Menentukan Persyaratan Data**: Mengumpulkan data kuantitatif dari dokumen Dishub DIY dan BPS DIY.
3.  **Membuat Solusi Desain**: Membangun visualisasi dashboard teroptimasi (V2) dengan skema warna kontras tinggi Yogyakarta (Gold & Royal Blue).
4.  **Mengevaluasi Desain**: Mengumpulkan umpan balik responden secara kuantitatif melalui pengisian kuesioner lokal untuk memvalidasi kenaikan skor kepuasan.

<div style="page-break-after: always;"></div>

## BAB IV HASIL DAN PEMBAHASAN

### 4.1 Analisis Dashboard V1 (Sebelum Perbaikan)

Pada rancangan awal (V1), tata letak dashboard dirancang sederhana dengan latar belakang putih bawaan browser. Navigasi filter kabupaten diletakkan pada menu dropdown di atas halaman. Pengguna menemukan beberapa kendala:

- Bagan data bertumpuk di layar kecil dan legenda grafik membingungkan.
- Tidak adanya peta geografis Yogyakarta sehingga pemfilteran tidak kontekstual.
- Rata-rata skor kegunaan awal bernilai **4.3 dari 5.0**, namun responden mencatat beberapa masukan penting terkait visualisasi peta dan kontras warna.

### 4.2 Evaluasi Usability Kuesioner Responden

Setelah diuji oleh 3 profil responden utama (Dosen Pengampu, Asisten Praktikum, dan Mahasiswa Sekelas) melalui pengisian formulir survei usability, diperoleh rekapitulasi data penilaian sebagai berikut:

| Kategori Usability        | Dashboard V1 (Skor Rata-rata) | Dashboard V2 (Skor Rata-rata) |
| :------------------------ | :---------------------------: | :---------------------------: |
| **Akurasi Data**          |              4.5              |              4.9              |
| **Kemudahan Navigasi**    |              4.1              |              4.8              |
| **Fungsionalitas Filter** |              4.2              |              4.9              |
| **Kejelasan Visual**      |              4.3              |              4.8              |
| **Kecepatan Performa**    |              4.4              |              4.9              |
| **RATA-RATA GLOBAL**      |         **4.3 / 5.0**         |         **4.9 / 5.0**         |

Perubahan penilaian ini divisualisasikan secara langsung menggunakan diagram radar (_Radar Chart_), membuktikan kenaikan tingkat kepuasan pengguna setelah penerapan perbaikan desain berbasis UCD pada V2.

### 4.3 Perancangan Perbaikan Dashboard V2 (Sesudah Perbaikan)

Perbaikan antarmuka pada Dashboard V2 difokuskan pada estetika dan kemudahan interaksi:

1.  **Peta Spasial DIY Interaktif (SVG)**: Menggantikan fungsi dropdown kaku. Mengklik area kabupaten Sleman, Bantul, atau Kota Yogyakarta pada peta secara otomatis memfilter seluruh grafik di sebelah kanan.
2.  **Antarmuka Premium (Dark Glassmorphism)**: Latar belakang gelap (`#0a0e17`) dipadukan dengan panel transparan ber-blur tinggi (`backdrop-filter`) meningkatkan fokus pembacaan data.
3.  **KPI yang Jelas dan Terang**: Indikator utama diletakkan di bagian atas halaman dengan warna mencolok dilengkapi lencana (_badge_) tren.
4.  **Responsif Mobile**: Menggunakan media query CSS untuk memastikan tata letak melipat secara presisi pada layar ponsel berlebar di bawah 768px.

### 4.4 Integrasi Data Riil BPS & Dishub DIY

Untuk membuang kerancuan informasi, seluruh angka statistik di dashboard disinkronkan dengan tabel publikasi BPS DIY dan Dishub DIY tahun 2025:

- **Total Kendaraan Terdaftar**: Sleman (1.345.363 unit), Bantul (929.440 unit), Kota Yogyakarta (622.190 unit), Gunungkidul (383.182 unit), Kulon Progo (286.248 unit). Total DIY = **3.566.423 unit**.
- **Indeks Kepadatan & Kecepatan**: Menggunakan rujukan data V/C ratio jalan provinsi (Sleman: 72%, Bantul: 55%, Kota Yogyakarta: 85%).
- **Tautan Rujukan Langsung**: Setiap kartu KPI dan grafik dilengkapi tautan berkas internal PDF yang langsung melompat ke halaman spesifik (**Halaman 15** untuk Kinerja Jalan dan **Halaman 28** untuk data Trans Jogja) guna memudahkan dosen memverifikasi keabsahan data.

<div style="page-break-after: always;"></div>

## BAB V PENUTUP

### 5.1 Simpulan

Berdasarkan proses perancangan, implementasi, dan pengujian dalam proyek PjBL Visualisasi Data UAS ini, kesimpulan yang dapat ditarik adalah:

1.  Pendekatan _User-Centered Design_ (UCD) terbukti efektif meningkatkan kegunaan dashboard, ditandai dengan naiknya skor kepuasan global usability responden dari **4.3 (Baik)** menjadi **4.9 (Sangat Baik)**.
2.  Implementasi peta spasial SVG interaktif Yogyakarta mempermudah proses penyaringan data spasial (_cross-filtering_) sehingga informasi lebih terfokus dan mudah dipahami.
3.  Integrasi dokumen PDF internal dari Dinas Perhubungan DIY (TDA 2025) ke dalam tautan dinamis dashboard menjamin akurasi dan transparansi data yang disajikan di depan dosen penguji.

### 5.2 Saran

Saran yang dapat diajukan untuk pengembangan dashboard di masa depan meliputi:

1.  **Integrasi Real-Time Data**: Mengganti data sekunder statis dengan integrasi API dinamis langsung dari sistem server ATCS Dinas Perhubungan DIY agar informasi kemacetan ter-update setiap menit.
2.  **Penambahan Fitur Prakiraan (Forecasting)**: Menambahkan modul analisis prediksi berbasis kecerdasan buatan (_Machine Learning_) untuk memprakirakan titik kemacetan parah di masa mendatang berdasarkan data historis tahun-tahun sebelumnya.

<div style="page-break-after: always;"></div>

## DAFTAR PUSTAKA

1.  Dinas Perhubungan DI Yogyakarta, 2025, _Buku Laporan Transportasi Dalam Angka 2025_, Dinas Perhubungan DIY, Yogyakarta. https://dishub.jogjaprov.go.id/ (diakses pada 9 Juli 2026).
2.  Badan Pusat Statistik DI Yogyakarta, 2025, _Provinsi DI Yogyakarta Dalam Angka 2025_, BPS DIY, Yogyakarta.
3.  Badan Pusat Statistik DI Yogyakarta, 2025, _Jumlah Kendaraan Bermotor Menurut Kabupaten/Kota dan Jenis Kendaraan di Provinsi DI Yogyakarta_, https://yogyakarta.bps.go.id/ (diakses pada 9 Juli 2026).
4.  Interaction Design Foundation, 2026, _What is User-Centered Design (UCD)?_, Interaction Design Foundation. https://www.interaction-design.org/literature/topics/user-centered-design (diakses pada 12 Juli 2026).
5.  Nielsen Norman Group, 2026, _Usability Testing 101_, Nielsen Norman Group. https://www.nngroup.com/articles/usability-testing-101/ (diakses pada 12 Juli 2026).
6.  Chart.js Official, 2026, _Chart.js Documentation_, Chart.js. https://www.chartjs.org/docs/ (diakses pada 12 Juli 2026).
7.  Stallings, William, 2020, _Computer Organization and Architecture: Designing for Performance_, 11th ed., Pearson, Boston.
