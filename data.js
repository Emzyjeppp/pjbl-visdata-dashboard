/* eslint-disable no-redeclare */
// Dataset Transportasi & Mobilitas Daerah Istimewa Yogyakarta (DIY)
// Sumber Referensi: Disarikan dari Publikasi BPS DIY & Dinas Perhubungan DIY

const YOGYAKARTA_TRANSPORT_DATA = {
  // Peta Spasial Skematik DIY (ViewBox 0 0 500 400)
  mapRegions: [
    {
      id: "kulon_progo",
      name: "Kulon Progo",
      svgPath: "M 40,160 L 150,100 L 170,220 L 110,330 L 40,240 Z",
      center: { x: 95, y: 200 }
    },
    {
      id: "sleman",
      name: "Sleman",
      svgPath: "M 150,100 L 320,30 L 330,140 L 220,150 L 170,220 Z",
      center: { x: 230, y: 100 }
    },
    {
      id: "kota_yogyakarta",
      name: "Kota Yogyakarta",
      svgPath: "M 220,150 L 270,150 L 270,195 L 220,195 Z",
      center: { x: 245, y: 172 }
    },
    {
      id: "bantul",
      name: "Bantul",
      svgPath: "M 170,220 L 220,195 L 270,195 L 330,140 L 330,270 L 220,330 L 110,330 Z",
      center: { x: 220, y: 260 }
    },
    {
      id: "gunungkidul",
      name: "Gunungkidul",
      svgPath: "M 330,140 L 460,160 L 460,330 L 330,270 Z",
      center: { x: 395, y: 230 }
    }
  ],

  // Statistik per Kabupaten
  districts: {
    all: {
      name: "Seluruh DIY",
      totalVehicles: 3566423,
      congestionIndex: 68,
      averageSpeed: 28,
      topCongestedRoads: [
        { roadName: "Jl. Ring Road Utara", volume: 145000, speed: 22, level: "Macet" },
        { roadName: "Jl. Malioboro", volume: 92000, speed: 12, level: "Sangat Padat" },
        { roadName: "Jl. Adisucipto (Arah Solo)", volume: 120000, speed: 20, level: "Macet" },
        { roadName: "Jl. Magelang", volume: 110000, speed: 24, level: "Maret Padat" },
        { roadName: "Jl. Parangtritis", volume: 85000, speed: 26, level: "Macet Ringan" }
      ],
      hourlyVolume: [15, 8, 5, 12, 35, 78, 95, 88, 70, 65, 68, 72, 75, 70, 78, 85, 98, 92, 78, 60, 48, 38, 25, 18], // Persentase kapasitas jalan (0-100%)
      transJogjaPassengerCount: [4200, 4800, 3500, 2900, 3800, 4000, 3400, 2778] // K1A, K2A, K3A, K4A, K1B, K2B, K3B, K4B
    },
    sleman: {
      name: "Sleman",
      totalVehicles: 1345363,
      congestionIndex: 72,
      averageSpeed: 25,
      topCongestedRoads: [
        { roadName: "Jl. Ring Road Utara", volume: 145000, speed: 22, level: "Macet" },
        { roadName: "Jl. Adisucipto", volume: 120000, speed: 20, level: "Macet" },
        { roadName: "Jl. Magelang (Sleman)", volume: 95000, speed: 25, level: "Macet Ringan" },
        { roadName: "Jl. Kaliurang", volume: 75000, speed: 18, level: "Sangat Padat" }
      ],
      hourlyVolume: [12, 6, 4, 10, 30, 85, 98, 90, 65, 60, 62, 68, 70, 65, 75, 82, 95, 90, 75, 55, 45, 35, 22, 15],
      transJogjaPassengerCount: [1600, 1800, 1300, 1100, 1400, 1500, 1200, 1000]
    },
    bantul: {
      name: "Bantul",
      totalVehicles: 929440,
      congestionIndex: 55,
      averageSpeed: 32,
      topCongestedRoads: [
        { roadName: "Jl. Parangtritis", volume: 85000, speed: 26, level: "Macet Ringan" },
        { roadName: "Jl. Ring Road Selatan", volume: 90000, speed: 28, level: "Macet Ringan" },
        { roadName: "Jl. Bantul", volume: 60000, speed: 30, level: "Lancar" }
      ],
      hourlyVolume: [10, 5, 3, 8, 25, 70, 88, 80, 60, 58, 60, 65, 68, 62, 70, 78, 90, 85, 70, 50, 40, 30, 20, 12],
      transJogjaPassengerCount: [800, 900, 700, 600, 800, 800, 700, 600]
    },
    kota_yogyakarta: {
      name: "Kota Yogyakarta",
      totalVehicles: 622190,
      congestionIndex: 85,
      averageSpeed: 16,
      topCongestedRoads: [
        { roadName: "Jl. Malioboro", volume: 92000, speed: 12, level: "Sangat Padat" },
        { roadName: "Jl. Jend. Sudirman", volume: 82000, speed: 15, level: "Sangat Padat" },
        { roadName: "Jl. C. Simanjuntak", volume: 55000, speed: 10, level: "Sangat Padat" },
        { roadName: "Jl. Urip Sumoharjo", volume: 75000, speed: 14, level: "Sangat Padat" }
      ],
      hourlyVolume: [20, 12, 8, 15, 45, 90, 99, 95, 85, 80, 82, 85, 88, 85, 90, 95, 99, 98, 92, 80, 65, 50, 35, 25],
      transJogjaPassengerCount: [1650, 1950, 1350, 1050, 1450, 1550, 1350, 1050]
    },
    kulon_progo: {
      name: "Kulon Progo",
      totalVehicles: 286248,
      congestionIndex: 35,
      averageSpeed: 42,
      topCongestedRoads: [
        { roadName: "Jl. Wates (Kulon Progo)", volume: 55000, speed: 40, level: "Lancar" },
        { roadName: "Jl. Daendels (Jalur Pantai Selatan)", volume: 32000, speed: 50, level: "Lancar" }
      ],
      hourlyVolume: [8, 4, 2, 6, 18, 55, 75, 68, 50, 48, 50, 52, 55, 50, 58, 62, 78, 70, 58, 42, 32, 22, 15, 10],
      transJogjaPassengerCount: [100, 100, 100, 100, 100, 100, 100, 78]
    },
    gunungkidul: {
      name: "Gunungkidul",
      totalVehicles: 383182,
      congestionIndex: 30,
      averageSpeed: 45,
      topCongestedRoads: [
        { roadName: "Jl. Wonosari (Gunungkidul)", volume: 48000, speed: 38, level: "Lancar" },
        { roadName: "Jl. Baron", volume: 28000, speed: 45, level: "Lancar" }
      ],
      hourlyVolume: [5, 2, 1, 4, 12, 45, 65, 58, 45, 42, 45, 48, 50, 46, 52, 58, 70, 62, 50, 35, 25, 18, 10, 6],
      transJogjaPassengerCount: [50, 50, 50, 50, 50, 50, 50, 50]
    }
  },

  // Koridor Trans Jogja
  transJogjaRoutes: [
    "Rute 1A (Prambanan - Bandara Adisutjipto - Malioboro)",
    "Rute 2A (Condongcatur - Malioboro - Basen)",
    "Rute 3A (Bandara Adisutjipto - Giwangan - Condongcatur)",
    "Rute 4A (Giwangan - UIN - Lempuyangan)",
    "Rute 1B (Bandara Adisutjipto - Sentul - Pingit)",
    "Rute 2B (Condongcatur - Janti - Kotagede)",
    "Rute 3B (Bandara Adisutjipto - Jokteng Wetan - Giwangan)",
    "Rute 4B (Giwangan - UGM - Terban)"
  ],

  // Data Awal Evaluasi Survei (Untuk simulasi responsi mahasiswa)
  initialSurveyData: [
    {
      evaluator: "Dosen Pengampu (Dr. Ir. Rian Hartono, M.T.)",
      role: "Dosen",
      accuracy: 3,
      navigation: 2,
      filters: 2,
      visual: 3,
      performance: 4,
      comments:
        "Filter dropdown pada V1 kaku dan letaknya bertumpuk. Desain visual kurang menunjukkan identitas lokal Yogyakarta. Tambahkan peta wilayah DIY yang interaktif."
    },
    {
      evaluator: "Andi Saputra (Asisten Praktikum)",
      role: "Asisten",
      accuracy: 4,
      navigation: 3,
      filters: 2,
      visual: 2,
      performance: 4,
      comments:
        "Warna V1 terlalu standar. Filter kabupaten sebaiknya terintegrasi dengan data Trans Jogja. Visualisasi berbasis peta akan sangat membantu."
    },
    {
      evaluator: "Siti Rahmawati (Teman Sekelas - Kelompok 4)",
      role: "Mahasiswa",
      accuracy: 4,
      navigation: 3,
      filters: 3,
      visual: 3,
      performance: 5,
      comments:
        "Rendering grafik sudah cepat, tetapi navigasi antar data masih kaku. Menu filter kabupaten sebaiknya diganti dengan klik peta."
    }
  ]
};

// Pastikan dataset tersedia secara global
if (typeof window !== "undefined") {
  window.YOGYAKARTA_TRANSPORT_DATA = YOGYAKARTA_TRANSPORT_DATA;
}
