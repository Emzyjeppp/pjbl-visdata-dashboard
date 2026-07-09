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

Menyatakan bahwa Laporan Project-Based Learning (PjBL) ini telah diperiksa, disetujui, dan disahkan sebagai salah satu syarat pemenuhan tugas mata kuliah Praktikum Visualisasi Data pada Program Studi Informatika, Fakultas Teknologi Informasi, Universitas Teknologi Digital Indonesia.

Yogyakarta, 2026

**Menyetujui,**  
Dosen Pengampu Praktikum Visualisasi Data

_(Tanda Tangan)_

**Nama Dosen Pengampu Matakuliah**  
NIDN/NIK. ........................

<div style="page-break-after: always;"></div>

## KATA PENGANTAR

Puji syukur kami panjatkan kehadirat Tuhan Yang Maha Esa atas selesainya penyusunan Laporan Proyek _Project-Based Learning_ (PjBL) untuk mata kuliah Praktikum Visualisasi Data ini dengan tepat waktu.

Proyek ini bertujuan untuk merancang dan mengembangkan Dashboard Visualisasi Data Mobilitas Transportasi di Daerah Istimewa Yogyakarta menggunakan pendekatan _User-Centered Design_ (UCD). Kami menyadari sepenuhnya bahwa keberhasilan proyek ini tidak lepas dari bantuan berbagai pihak. Oleh karena itu, kami ingin menyampaikan ucapan terima kasih kepada:

1.  **Ibu Dosen Pengampu** mata kuliah Praktikum Visualisasi Data Universitas Teknologi Digital Indonesia (UTDI) atas bimbingan materi, arahan teknis, dan evaluasi berkelanjutan yang diberikan sepanjang semester.
2.  **Rekan-Rekan Asisten Praktikum** yang telah mendampingi, memberikan saran pengembangan, serta membantu memvalidasi standardisasi penulisan linter dan kode.
3.  **Para Responden Evaluasi Usability** (Dosen, Asisten, dan Teman Sekelas) yang telah meluangkan waktu mengisi Google Form evaluasi guna memberikan masukan berharga demi penyempurnaan rancangan dashboard kami.

Kami berharap laporan ini dapat memberikan manfaat akademis serta menjadi referensi bagi rekan mahasiswa lainnya dalam bidang visualisasi data interaktif.

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

Daerah Istimewa Yogyakarta (DIY) merupakan salah satu provinsi di Indonesia dengan tingkat pertumbuhan volume kendaraan bermotor yang sangat pesat. Sebagai pusat pariwisata, pendidikan, dan kebudayaan, mobilitas harian penduduk lokal serta wisatawan asing di koridor-koridor utama DIY kerap memicu kemacetan parah di jam sibuk pagi dan sore hari. Untuk mengatasi tantangan lalu lintas ini, pemetaan spasial dan visualisasi data yang terperinci sangat diperlukan oleh Dinas Perhubungan dan pemangku kebijakan.

Selama ini, data statistik mobilitas (seperti total kendaraan terdaftar, indeks kepadatan ruas jalan, dan rata-rata jumlah penumpang angkutan umum massal Trans Jogja) dipublikasikan secara terpisah dalam dokumen teks PDF yang tebal, seperti buku _Transportasi Dalam Angka (TDA)_ oleh Dishub DIY atau buku statistik BPS DIY. Format penyajian statis ini menyulitkan pengguna dalam menangkap relasi data spasial secara cepat dan intuitif.

Oleh karena itu, proyek PjBL ini bertujuan untuk mengintegrasikan data sekunder riil tersebut ke dalam sebuah Dashboard Visualisasi Data Interaktif berbasis web. Melalui pendekatan _User-Centered Design_ (UCD), dashboard awal (V1) yang dinilai kaku dan membingungkan direkonstruksi menjadi dashboard yang ramah pengguna (V2) dengan penambahan Peta Spasial SVG interaktif dan koordinasi grafik dinamis guna meningkatkan kegunaan (_usability_) sistem.

### 1.2 Rumusan Masalah

Berdasarkan latar belakang di atas, rumusan masalah dalam proyek PjBL ini adalah:

1.  Bagaimana merancang dashboard visualisasi data transportasi DIY yang interaktif dan mudah dipahami sesuai pedoman _User-Centered Design_ (UCD)?
2.  Bagaimana mengatasi kelemahan interaksi dropdown kaku pada rancangan awal (V1) melalui implementasi peta spasial SVG interaktif?
3.  Bagaimana menyinkronkan data visualisasi pada grafik dengan data sekunder riil bersumber dari BPS DIY dan Dishub DIY?

### 1.3 Tujuan Perencanaan Project-Based Learning

Tujuan dari pelaksanaan proyek PjBL ini adalah:

1.  Membangun Dashboard Visualisasi Data Transportasi Yogyakarta yang memiliki nilai kegunaan (_usability score_) tinggi berdasarkan hasil survei pengguna.
2.  Menerapkan metode UCD untuk menghasilkan antarmuka visual yang estetik (_glassmorphism dark mode_) dan responsif pada perangkat mobile.
3.  Menyajikan integrasi data lalu lintas harian Yogyakarta dan trayek penumpang Trans Jogja 2025 secara valid dan transparan.

### 1.4 Batasan Masalah

Ruang lingkup proyek visualisasi data ini dibatasi oleh beberapa ketentuan:

1.  **Wilayah Kajian**: Dibatasi pada 5 wilayah kabupaten/kota di DI Yogyakarta (Sleman, Bantul, Kota Yogyakarta, Gunungkidul, Kulon Progo), dengan visualisasi detail dinamis difokuskan pada Sleman, Bantul, dan Kota Yogyakarta.
2.  **Sumber Data**: Menggunakan data sekunder resmi dari tabel Registrasi Kendaraan ERI BPS DIY 2025 dan Buku _Transportasi Dalam Angka 2025_ Dinas Perhubungan DIY.
3.  **Teknologi**: Menggunakan HTML5, CSS3 vanilla (tanpa framework eksternal), JavaScript ES6 murni, Chart.js untuk grafik, dan berkas SVG untuk peta spasial.

<div style="page-break-after: always;"></div>

## BAB II TINJAUAN PUSTAKA

### 2.1 User-Centered Design (UCD)

_User-Centered Design_ (UCD) adalah metodologi perancangan antarmuka pengguna yang memposisikan kebutuhan, batasan, dan perilaku pengguna akhir sebagai pusat dari setiap keputusan desain. Proses UCD melibatkan siklus analisis kebutuhan, desain alternatif, pembuatan prototipe, dan evaluasi kegunaan secara berulang (_iterative design_). Melalui pendekatan ini, pengembang dapat menjamin produk akhir mudah dioperasikan dan meminimalisir kesalahan interpretasi data.

### 2.2 Usability Testing & Kuesioner Usability

_Usability Testing_ adalah metode pengujian untuk mengukur seberapa mudah suatu sistem digunakan oleh pengguna akhir. Sesuai lembar kuesioner evaluasi UAS, terdapat 5 kriteria utama skala likert (1-5) yang dinilai:

1.  **Akurasi Data**: Kesesuaian informasi di layar dengan data riil atau sumber terpercaya.
2.  **Kemudahan Navigasi**: Kecepatan menemukan KPI utama dalam waktu kurang dari 5 detik.
3.  **Fungsionalitas Filter**: Efektivitas tombol penyaring data.
4.  **Kejelasan Visual**: Kenyamanan membaca grafik, teks, dan pilihan kontras warna.
5.  **Kecepatan Performa**: Waktu muat data saat filter dioperasikan.

### 2.3 Data Spasial & Peta SVG

Data spasial merepresentasikan posisi geografis dari suatu objek. Penggunaan format _Scalable Vector Graphics_ (SVG) untuk peta interaktif memungkinkan penggambaran batas-batas wilayah administrasi kabupaten Yogyakarta secara tajam di segala resolusi layar. Berkas SVG bertindak sebagai elemen DOM yang dapat berinteraksi langsung dengan JavaScript untuk mendeteksi aksi klik pengguna (_event listener_) guna memicu pembaruan filter wilayah (_cross-filtering_).

### 2.4 Chart.js & Visualisasi Interaktif

Chart.js adalah pustaka JavaScript berbasis kanvas HTML5 yang ringan dan responsif untuk merender bagan statistik. Dalam proyek ini, Chart.js digunakan untuk memvisualisasikan data runtun waktu (_time-series_) fluktuasi volume jalan raya menggunakan _Line Chart_ dan sebaran penumpang koridor Trans Jogja menggunakan _Bar Chart_.

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

Penerapan UCD dilakukan melalui 4 langkah iteratif:

1.  **Memahami Konteks Pengguna**: Dosen, asisten, dan mahasiswa membutuhkan penyajian informasi ringkas tanpa perlu membaca PDF tebal.
2.  **Menentukan Persyaratan Bisnis & Data**: Mengumpulkan data kuantitatif dari dokumen Dishub DIY dan BPS DIY.
3.  **Membuat Solusi Desain**: Membangun visualisasi dashboard teroptimasi (V2) dengan skema warna kontras tinggi Yogyakarta (Gold & Royal Blue).
4.  **Mengevaluasi Desain**: Melakukan pengumpulan umpan balik responden secara kuantitatif melalui pengisian kuesioner lokal untuk memvalidasi kenaikan skor kepuasan.

<div style="page-break-after: always;"></div>

## BAB IV HASIL DAN PEMBAHASAN

### 4.1 Analisis Dashboard V1 (Sebelum Perbaikan)

Pada rancangan awal (V1), tata letak dashboard dirancang sangat sederhana dengan latar belakang putih bawaan browser. Navigasi filter kabupaten diletakkan pada menu dropdown di atas halaman. Pengguna mengeluhkan beberapa kendala krusial:

- Bagan data bertumpuk di layar kecil dan legenda grafik membingungkan.
- Tidak adanya peta geografis Yogyakarta sehingga pemfilteran tidak kontekstual.
- Tingkat kepuasan visual sangat rendah (rata-rata skor kegunaan hanya bernilai **3.0 dari 5.0**).

### 4.2 Evaluasi Usability Kuesioner Responden

Setelah diuji oleh 3 profil responden utama (Dosen Pengampu, Asisten Praktikum, dan Mahasiswa Sekelas) melalui pengisian formulir survei usability, diperoleh rekapitulasi data penilaian sebagai berikut:

| Kategori Usability        | Dashboard V1 (Skor Rata-rata) | Dashboard V2 (Skor Rata-rata) |
| :------------------------ | :---------------------------: | :---------------------------: |
| **Akurasi Data**          |              3.6              |              4.8              |
| **Kemudahan Navigasi**    |              2.6              |              5.0              |
| **Fungsionalitas Filter** |              2.3              |              5.0              |
| **Kejelasan Visual**      |              2.6              |              4.9              |
| **Kecepatan Performa**    |              4.0              |              5.0              |
| **RATA-RATA GLOBAL**      |         **3.0 / 5.0**         |         **4.9 / 5.0**         |

Perubahan penilaian ini divisualisasikan secara langsung menggunakan diagram radar (_Radar Chart_), membuktikan adanya lonjakan kepuasan pengguna setelah diterapkannya perbaikan desain berbasis UCD pada V2.

### 4.3 Perancangan Perbaikan Dashboard V2 (Sesudah Perbaikan)

Perbaikan antarmuka pada Dashboard V2 difokuskan pada peningkatan estetika dan kemudahan interaksi:

1.  **Peta Spasial DIY Interaktif (SVG)**: Menggantikan fungsi dropdown kaku. Mengklik area kabupaten Sleman, Bantul, atau Kota Yogyakarta pada peta secara otomatis memfilter seluruh grafik di sebelah kanan.
2.  **Antarmuka Premium (Dark Glassmorphism)**: Latar belakang gelap (`#0a0e17`) dipadukan dengan panel transparan ber-blur tinggi (`backdrop-filter`) meningkatkan fokus pembacaan data.
3.  **KPI yang Jelas dan Terang**: Indikator utama diletakkan di bagian atas halaman dengan warna mencolok dilengkapi lencana (_badge_) tren.
4.  **Responsif Mobile**: Menggunakan media query CSS untuk memastikan tata letak melipat secara presisi pada layar ponsel berlebar di bawah 768px.

### 4.4 Integrasi Data Riil BPS & Dishub DIY

Untuk membuang kerancuan informasi, seluruh angka statistik di dashboard disinkronkan secara eksak dengan tabel publikasi BPS DIY dan Dishub DIY tahun 2025:

- **Total Kendaraan Terdaftar**: Sleman (1.345.363 unit), Bantul (929.440 unit), Kota Yogyakarta (622.190 unit), Gunungkidul (383.182 unit), Kulon Progo (286.248 unit). Total DIY = **3.566.423 unit**.
- **Indeks Kepadatan & Kecepatan**: Menggunakan rujukan data V/C ratio jalan provinsi (Sleman: 72%, Bantul: 55%, Kota Yogyakarta: 85%).
- **Tautan Rujukan Langsung**: Setiap kartu KPI dan grafik dilengkapi tautan berkas internal PDF yang langsung melompat ke halaman spesifik (**Halaman 15** untuk Kinerja Jalan dan **Halaman 28** untuk data Trans Jogja) guna memudahkan dosen memverifikasi keabsahan data.

<div style="page-break-after: always;"></div>

## BAB V PENUTUP

### 5.1 Simpulan

Berdasarkan seluruh proses perancangan, implementasi, dan pengujian dalam proyek PjBL Visualisasi Data UAS ini, dapat ditarik beberapa simpulan:

1.  Pendekatan _User-Centered Design_ (UCD) terbukti efektif meningkatkan kegunaan dashboard secara signifikan, ditandai dengan naiknya skor kepuasan global usability responden dari **3.0 (Cukup)** menjadi **4.9 (Sangat Baik)**.
2.  Implementasi peta spasial SVG interaktif Yogyakarta sukses mempermudah proses penyaringan data spasial (_cross-filtering_) sehingga informasi lebih terfokus dan mudah dipahami.
3.  Integrasi dokumen PDF internal dari Dinas Perhubungan DIY (TDA 2025) ke dalam tautan dinamis dashboard menjamin akurasi dan transparansi data yang disajikan di depan dosen penguji.

### 5.2 Saran

Beberapa saran yang dapat diajukan untuk pengembangan dashboard di masa depan meliputi:

1.  **Integrasi Real-Time Data**: Mengganti data sekunder statis dengan integrasi API dinamis langsung dari sistem server ATCS Dinas Perhubungan DIY agar informasi kemacetan ter-update setiap menit.
2.  **Penambahan Fitur Prakiraan (Forecasting)**: Menambahkan modul analisis prediksi berbasis kecerdasan buatan (_Machine Learning_) untuk memprakirakan titik kemacetan parah di masa mendatang berdasarkan data historis tahun-tahun sebelumnya.

<div style="page-break-after: always;"></div>

## DAFTAR PUSTAKA

1.  Dinas Perhubungan DI Yogyakarta, 2025, _Buku Laporan Transportasi Dalam Angka 2025_, Dinas Perhubungan DIY, Yogyakarta.
2.  Badan Pusat Statistik DI Yogyakarta, 2025, _Provinsi DI Yogyakarta Dalam Angka 2025_, BPS DIY, Yogyakarta.
3.  Badan Pusat Statistik DI Yogyakarta, 2025, _Jumlah Kendaraan Bermotor Menurut Kabupaten/Kota dan Jenis Kendaraan di Provinsi DI Yogyakarta_, https://yogyakarta.bps.go.id/ (diakses pada 9 Juli 2026 pukul 15.30 WIB).
4.  Stallings, William, 2020, _Computer Organization and Architecture: Designing for Performance_, 11th ed., Pearson, Boston.
