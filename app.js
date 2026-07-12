// Logic & Interaktivitas Aplikasi Dashboard PjBL Visualisasi Data
document.addEventListener("DOMContentLoaded", () => {
  // --- STATE SYSTEM ---
  let selectedDistrictV1 = "all";
  let selectedDistrictV2 = "all";
  let surveyResponses = [];

  // --- HTML ELEMENT REFERENCES ---
  const tabButtons = document.querySelectorAll(".nav-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  // V1 Elements
  const v1DistrictSelect = document.getElementById("v1-district-select");
  const v1KpiVehicles = document.getElementById("v1-kpi-vehicles");
  const v1KpiCongestion = document.getElementById("v1-kpi-congestion");
  const v1KpiSpeed = document.getElementById("v1-kpi-speed");
  const v1TableBody = document.getElementById("v1-table-body");

  // V2 Elements
  const v2KpiVehicles = document.getElementById("v2-kpi-vehicles");
  const v2KpiCongestion = document.getElementById("v2-kpi-congestion");
  const v2KpiSpeed = document.getElementById("v2-kpi-speed");
  const v2SelectedTitle = document.getElementById("v2-selected-district-title");
  const v2FilterStatus = document.getElementById("v2-filter-status");
  const v2ResetMapBtn = document.getElementById("v2-reset-map-btn");
  const v2SvgMapWrapper = document.getElementById("v2-svg-map-wrapper");
  const v2TableBody = document.getElementById("v2-table-body");

  // Survey Form Elements
  const surveyForm = document.getElementById("vis-survey-form");
  const commentsContainer = document.getElementById("comments-container");

  // Survey Score Display Elements
  const textAccuracy = document.getElementById("text-accuracy");
  const textNavigation = document.getElementById("text-navigation");
  const textFilters = document.getElementById("text-filters");
  const textVisual = document.getElementById("text-visual");
  const textPerformance = document.getElementById("text-performance");

  const barAccuracy = document.getElementById("bar-accuracy");
  const barNavigation = document.getElementById("bar-navigation");
  const barFilters = document.getElementById("bar-filters");
  const barVisual = document.getElementById("bar-visual");
  const barPerformance = document.getElementById("bar-performance");

  const totalRespondentsTxt = document.getElementById("total-respondents");
  const dosenCountTxt = document.getElementById("dosen-count");
  const asistenCountTxt = document.getElementById("asisten-count");
  const mahasiswaCountTxt = document.getElementById("mahasiswa-count");
  const v1AvgScoreTxt = document.getElementById("v1-average-score");

  // --- CHART INSTANCE VARIABLES ---
  let chartV1Hourly, chartV1TransJogja;
  let chartV2Hourly, chartV2TransJogja;
  let chartSurveyRadar;

  // ==============================================
  // 1. SYSTEM INITIALIZATION (LOCAL STORAGE)
  // ==============================================
  function initSystem() {
    const cachedData = localStorage.getItem("yogyakarta_pjbl_survey_responses");
    if (cachedData) {
      surveyResponses = JSON.parse(cachedData);
    } else {
      surveyResponses = [...YOGYAKARTA_TRANSPORT_DATA.initialSurveyData];
      localStorage.setItem("yogyakarta_pjbl_survey_responses", JSON.stringify(surveyResponses));
    }

    // Setup Navigation Tabs
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");
        switchTab(targetTab);
      });
    });

    // Populate Initial Dashboard Views
    updateDashboardV1();
    renderInteractiveMapV2();
    updateDashboardV2();
    updateSurveyAnalytics();

    // V1 Filters Event
    if (v1DistrictSelect) {
      v1DistrictSelect.addEventListener("change", (e) => {
        selectedDistrictV1 = e.target.value;
        updateDashboardV1();
      });
    }

    // Fullscreen Toggle Event
    const fullscreenBtn = document.getElementById("fullscreen-btn");
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener("click", () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch((err) => {
            console.error(`Gagal masuk mode layar penuh: ${err.message}`);
          });
          fullscreenBtn.innerHTML = "📺 Keluar Layar Penuh";
        } else {
          document.exitFullscreen();
          fullscreenBtn.innerHTML = "📺 Layar Penuh";
        }
      });
    }

    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement && fullscreenBtn) {
        fullscreenBtn.innerHTML = "📺 Layar Penuh";
      }
    });

    // Admin/Evaluator Mode Toggle Event
    const adminToggleBtn = document.getElementById("admin-toggle-btn");
    const appContainer = document.querySelector(".app-container");

    if (adminToggleBtn) {
      adminToggleBtn.addEventListener("click", () => {
        const isAdminActive = appContainer.classList.contains("admin-active");
        if (!isAdminActive) {
          const password = prompt("Masukkan passcode untuk mengaktifkan Mode Evaluator (UAS):", "");
          if (password === "admin" || password === "1234") {
            appContainer.classList.add("admin-active");
            adminToggleBtn.innerHTML = "🔒 Kunci Dashboard";
            // Switch to Dashboard V1 for evaluation context
            switchTab("dashboard-v1");
          } else if (password !== null) {
            alert("Passcode salah! Gunakan passcode 'admin' untuk demo.");
          }
        } else {
          appContainer.classList.remove("admin-active");
          adminToggleBtn.innerHTML = "🔑 Mode Evaluator";
          // Revert back to V2 Public mode
          switchTab("dashboard-v2");
        }
      });
    }

    // V2 Reset Map Event
    if (v2ResetMapBtn) {
      v2ResetMapBtn.addEventListener("click", () => {
        selectedDistrictV2 = "all";
        // Reset Map Selections
        const paths = v2SvgMapWrapper.querySelectorAll(".map-path");
        paths.forEach((p) => p.classList.remove("selected"));
        updateDashboardV2();
      });
    }

    // Survey Form Handler
    if (surveyForm) {
      surveyForm.addEventListener("submit", handleSurveySubmit);
    }
  }

  // Navigasi Tabs SPA
  function switchTab(tabId) {
    tabButtons.forEach((btn) => {
      if (btn.getAttribute("data-tab") === tabId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    tabPanes.forEach((pane) => {
      if (pane.id === tabId) {
        pane.classList.add("active");
      } else {
        pane.classList.remove("active");
      }
    });

    // Redraw charts to prevent rendering glitches on tab change
    setTimeout(() => {
      if (chartV1Hourly) {
        chartV1Hourly.update();
      }
      if (chartV1TransJogja) {
        chartV1TransJogja.update();
      }
      if (chartV2Hourly) {
        chartV2Hourly.update();
      }
      if (chartV2TransJogja) {
        chartV2TransJogja.update();
      }
      if (chartSurveyRadar) {
        chartSurveyRadar.update();
      }
    }, 100);
  }

  // Helper formatting numbers
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // ==============================================
  // 2. DASHBOARD V1 LOGIC
  // ==============================================
  function updateDashboardV1() {
    const data = YOGYAKARTA_TRANSPORT_DATA.districts[selectedDistrictV1];
    if (!data) {
      return;
    }

    // V1 KPI Updates (Basic Text Change)
    v1KpiVehicles.innerText = formatNumber(data.totalVehicles);
    v1KpiCongestion.innerText = data.congestionIndex + "%";
    v1KpiSpeed.innerText = data.averageSpeed + " km/h";

    // V1 Table Body Updates
    v1TableBody.innerHTML = "";
    data.topCongestedRoads.forEach((road) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${road.roadName}</strong></td>
        <td>${formatNumber(road.volume)} kend/hari</td>
        <td>${road.speed} km/h</td>
        <td><span class="badge-status ${road.level.toLowerCase().includes("sangat") ? "status-macet" : road.level.toLowerCase().includes("macet") ? "status-padat" : "status-lancar"}">${road.level}</span></td>
      `;
      v1TableBody.appendChild(tr);
    });

    // Render V1 Charts
    renderChartsV1(data);
  }

  function renderChartsV1(data) {
    const ctxHourly = document.getElementById("v1ChartHourly").getContext("2d");
    const ctxTrans = document.getElementById("v1ChartTransJogja").getContext("2d");

    // Labels Jam 00.00 s.d 23.00
    const labelsHourly = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

    // 1. Line Chart Hourly V1 (Polos, warna basic merah)
    if (chartV1Hourly) {
      chartV1Hourly.destroy();
    }
    chartV1Hourly = new Chart(ctxHourly, {
      type: "line",
      data: {
        labels: labelsHourly,
        datasets: [
          {
            label: "Volume Kendaraan (% Kapasitas)",
            data: data.hourlyVolume,
            borderColor: "#e53e3e",
            backgroundColor: "rgba(229, 62, 62, 0.1)",
            borderWidth: 2,
            pointRadius: 1,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: "#cbd5e0" } }
        },
        scales: {
          y: { min: 0, max: 100, grid: { color: "#2d3748" }, ticks: { color: "#cbd5e0" } },
          x: { grid: { color: "#2d3748" }, ticks: { color: "#cbd5e0" } }
        }
      }
    });

    // 2. Bar Chart Trans Jogja V1 (Warna basic biru)
    if (chartV1TransJogja) {
      chartV1TransJogja.destroy();
    }
    chartV1TransJogja = new Chart(ctxTrans, {
      type: "bar",
      data: {
        labels: YOGYAKARTA_TRANSPORT_DATA.transJogjaRoutes.map((r) => r.split(" ")[1]), // Ambil kode rute saja "1A"
        datasets: [
          {
            label: "Jumlah Penumpang Harian",
            data: data.transJogjaPassengerCount,
            backgroundColor: "#3182ce",
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: "#cbd5e0" } }
        },
        scales: {
          y: { grid: { color: "#2d3748" }, ticks: { color: "#cbd5e0" } },
          x: { grid: { color: "#2d3748" }, ticks: { color: "#cbd5e0" } }
        }
      }
    });
  }

  // ==============================================
  // 3. SURVEY SUBMISSION & PERSISTENCE LOGIC
  // ==============================================
  function handleSurveySubmit(e) {
    e.preventDefault();

    const name = document.getElementById("evaluator-name").value.trim();
    const role = document.querySelector('input[name="evaluator-role"]:checked').value;
    const comment = document.getElementById("evaluator-comment").value.trim();

    // Ambil rating dari radio buttons
    const accuracy = parseInt(document.querySelector('input[name="rate-accuracy"]:checked').value);
    const navigation = parseInt(document.querySelector('input[name="rate-navigation"]:checked').value);
    const filters = parseInt(document.querySelector('input[name="rate-filters"]:checked').value);
    const visual = parseInt(document.querySelector('input[name="rate-visual"]:checked').value);
    const performance = parseInt(document.querySelector('input[name="rate-performance"]:checked').value);

    // Tambahkan respons baru ke array
    const newResponse = {
      evaluator: name,
      role: role,
      accuracy: accuracy,
      navigation: navigation,
      filters: filters,
      visual: visual,
      performance: performance,
      comments: comment
    };

    surveyResponses.push(newResponse);
    localStorage.setItem("yogyakarta_pjbl_survey_responses", JSON.stringify(surveyResponses));

    // Reset formulir
    surveyForm.reset();

    // Jalankan pembaruan data analitik
    updateSurveyAnalytics();

    // Tampilkan notifikasi keberhasilan & navigasi otomatis ke analitik
    alert("Terima kasih! Survei evaluasi Anda telah terkirim dan analitik dashboard berhasil diperbarui.");
    switchTab("survey-analytics");
  }

  // ==============================================
  // 4. SURVEY ANALYTICS VIEW LOGIC (RADAR CHART)
  // ==============================================
  function updateSurveyAnalytics() {
    const total = surveyResponses.length;
    totalRespondentsTxt.innerText = total;

    // Hitung per-role
    let dosen = 0,
      asisten = 0,
      mahasiswa = 0;
    let sumAcc = 0,
      sumNav = 0,
      sumFlt = 0,
      sumVis = 0,
      sumPrf = 0;

    surveyResponses.forEach((r) => {
      if (r.role === "Dosen") {
        dosen++;
      } else if (r.role === "Asisten") {
        asisten++;
      } else if (r.role === "Mahasiswa") {
        mahasiswa++;
      }

      sumAcc += r.accuracy;
      sumNav += r.navigation;
      sumFlt += r.filters;
      sumVis += r.visual;
      sumPrf += r.performance;
    });

    dosenCountTxt.innerText = dosen;
    asistenCountTxt.innerText = asisten;
    mahasiswaCountTxt.innerText = mahasiswa;

    // Kalkulasi rata-rata skor
    const avgAcc = total > 0 ? sumAcc / total : 0;
    const avgNav = total > 0 ? sumNav / total : 0;
    const avgFlt = total > 0 ? sumFlt / total : 0;
    const avgVis = total > 0 ? sumVis / total : 0;
    const avgPrf = total > 0 ? sumPrf / total : 0;

    const v1OverallAvg = (avgAcc + avgNav + avgFlt + avgVis + avgPrf) / 5;

    // Update text dan progress bar
    textAccuracy.innerText = avgAcc.toFixed(1);
    textNavigation.innerText = avgNav.toFixed(1);
    textFilters.innerText = avgFlt.toFixed(1);
    textVisual.innerText = avgVis.toFixed(1);
    textPerformance.innerText = avgPrf.toFixed(1);
    v1AvgScoreTxt.innerText = v1OverallAvg.toFixed(2);

    barAccuracy.style.width = (avgAcc / 5) * 100 + "%";
    barNavigation.style.width = (avgNav / 5) * 100 + "%";
    barFilters.style.width = (avgFlt / 5) * 100 + "%";
    barVisual.style.width = (avgVis / 5) * 100 + "%";
    barPerformance.style.width = (avgPrf / 5) * 100 + "%";

    // Rendisi Komentar Kualitatif
    commentsContainer.innerHTML = "";
    // balikkan array respons agar masukan terbaru tampil paling atas
    [...surveyResponses].reverse().forEach((res) => {
      const card = document.createElement("div");
      card.className = "comment-card";
      card.innerHTML = `
        <div class="comment-meta">
          <span class="author">${res.evaluator}</span>
          <span class="role role-${res.role}">${res.role}</span>
        </div>
        <p class="comment-text">"${res.comments}"</p>
      `;
      commentsContainer.appendChild(card);
    });

    // Rendisi Radar Chart Perbandingan (V1 vs Target V2)
    renderRadarChart(avgAcc, avgNav, avgFlt, avgVis, avgPrf);
  }

  function renderRadarChart(acc, nav, flt, vis, prf) {
    const ctx = document.getElementById("surveyRadarChart").getContext("2d");

    if (chartSurveyRadar) {
      chartSurveyRadar.destroy();
    }
    chartSurveyRadar = new Chart(ctx, {
      type: "radar",
      data: {
        labels: [
          "Akurasi Data",
          "Kemudahan Navigasi",
          "Fungsionalitas Filter",
          "Kejelasan Visual",
          "Kecepatan Performa"
        ],
        datasets: [
          {
            label: "Dashboard V1 (Rata-rata)",
            data: [acc, nav, flt, vis, prf],
            borderColor: "rgba(229, 62, 62, 1)",
            backgroundColor: "rgba(229, 62, 62, 0.2)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(229, 62, 62, 1)"
          },
          {
            label: "Dashboard V2 (Target Kualitas)",
            data: [5, 5, 5, 5, 5],
            borderColor: "rgba(49, 151, 149, 1)",
            backgroundColor: "rgba(49, 151, 149, 0.05)",
            borderWidth: 1.5,
            borderDash: [5, 5],
            pointBackgroundColor: "rgba(49, 151, 149, 1)"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false } // legend manual di html
        },
        scales: {
          r: {
            angleLines: { color: "#2d3748" },
            grid: { color: "#2d3748" },
            pointLabels: { color: "#cbd5e0", font: { size: 10, family: "Plus Jakarta Sans" } },
            ticks: { display: false },
            min: 0,
            max: 5
          }
        }
      }
    });
  }

  // ==============================================
  // 5. INTERACTIVE MAP V2 RENDERING (SVG GEOSPATIAL)
  // ==============================================
  function renderInteractiveMapV2() {
    v2SvgMapWrapper.innerHTML = "";

    // Buat tag SVG
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("viewBox", "0 0 500 400");
    svg.setAttribute("id", "yogyakarta-svg");

    // Definisikan elemen tooltip spasial sederhana
    const tooltip = document.createElement("div");
    tooltip.className = "map-tooltip";
    tooltip.style.position = "absolute";
    tooltip.style.background = "rgba(10, 14, 23, 0.95)";
    tooltip.style.border = "1px solid var(--accent-gold)";
    tooltip.style.color = "white";
    tooltip.style.padding = "0.5rem 0.75rem";
    tooltip.style.borderRadius = "6px";
    tooltip.style.fontSize = "0.75rem";
    tooltip.style.pointerEvents = "none";
    tooltip.style.display = "none";
    tooltip.style.boxShadow = "0 4px 12px rgba(0,0,0,0.5)";
    tooltip.style.zIndex = "10";
    v2SvgMapWrapper.appendChild(tooltip);

    // Loop data region dari data.js
    YOGYAKARTA_TRANSPORT_DATA.mapRegions.forEach((region) => {
      const path = document.createElementNS(svgNamespace, "path");
      path.setAttribute("d", region.svgPath);
      path.setAttribute("data-id", region.id);
      path.setAttribute("class", "map-path");

      // Cek index kepadatan untuk memberi warna status (High, Med, Low)
      const distInfo = YOGYAKARTA_TRANSPORT_DATA.districts[region.id];
      if (distInfo) {
        if (distInfo.congestionIndex >= 70) {
          path.classList.add("congestion-high");
        } else if (distInfo.congestionIndex >= 50) {
          path.classList.add("congestion-medium");
        } else {
          path.classList.add("congestion-low");
        }
      }

      // Hover Tooltip events
      path.addEventListener("mousemove", (e) => {
        const info = YOGYAKARTA_TRANSPORT_DATA.districts[region.id];
        tooltip.innerHTML = `
          <strong>${region.name}</strong><br/>
          Kepadatan: ${info.congestionIndex}%<br/>
          Kecepatan Rerata: ${info.averageSpeed} km/h
        `;
        tooltip.style.display = "block";

        // Posisikan tooltip relatif terhadap wrapper peta
        const wrapperRect = v2SvgMapWrapper.getBoundingClientRect();
        tooltip.style.left = e.clientX - wrapperRect.left + 15 + "px";
        tooltip.style.top = e.clientY - wrapperRect.top + 15 + "px";
      });

      path.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });

      // Click Map Filter Event
      path.addEventListener("click", () => {
        // Hapus kelas selected dari seluruh path lain
        const allPaths = svg.querySelectorAll(".map-path");
        allPaths.forEach((p) => p.classList.remove("selected"));

        if (selectedDistrictV2 === region.id) {
          // Klik dua kali, kembalikan ke global
          selectedDistrictV2 = "all";
        } else {
          selectedDistrictV2 = region.id;
          path.classList.add("selected");
        }

        updateDashboardV2();
      });

      svg.appendChild(path);

      // Tambahkan Label Nama Wilayah di tengah region
      const text = document.createElementNS(svgNamespace, "text");
      text.setAttribute("x", region.center.x);
      text.setAttribute("y", region.center.y);
      text.setAttribute("class", "map-label");
      text.setAttribute("text-anchor", "middle");
      text.textContent = region.name;
      svg.appendChild(text);
    });

    v2SvgMapWrapper.appendChild(svg);
  }

  // ==============================================
  // 6. PREMIUM DASHBOARD V2 VIEW LOGIC
  // ==============================================
  function updateDashboardV2() {
    const data = YOGYAKARTA_TRANSPORT_DATA.districts[selectedDistrictV2];
    if (!data) {
      return;
    }

    // V2 Title Info Updates
    v2SelectedTitle.innerText = "Wilayah: " + data.name;
    v2FilterStatus.innerText =
      selectedDistrictV2 === "all" ? "Semua Wilayah DIY Terhitung" : `Memfilter wilayah: ${data.name}`;

    // V2 KPI Updates (Animasi Micro-interaksi)
    animateValue(v2KpiVehicles, parseInt(v2KpiVehicles.innerText.replace(/,/g, "")), data.totalVehicles);
    v2KpiCongestion.innerText = data.congestionIndex + "%";
    v2KpiSpeed.innerText = data.averageSpeed + " km/h";

    // V2 KPI Trends and Classes
    const cardCong = v2KpiCongestion.closest(".v2-kpi-card");
    if (data.congestionIndex >= 70) {
      cardCong.setAttribute("data-trend", "up");
      cardCong.querySelector(".kpi-trend").innerText = "Kategori: Sangat Padat";
    } else if (data.congestionIndex >= 50) {
      cardCong.setAttribute("data-trend", "warning");
      cardCong.querySelector(".kpi-trend").innerText = "Kategori: Padat Merayap";
    } else {
      cardCong.setAttribute("data-trend", "down");
      cardCong.querySelector(".kpi-trend").innerText = "Kategori: Lancar";
    }

    // V2 Table Updates with Policy Recommendations
    v2TableBody.innerHTML = "";
    data.topCongestedRoads.forEach((road) => {
      let solution = "";
      if (road.level.includes("Sangat")) {
        solution = "Pemberlakuan satu arah, sterilisasi jalur bus umum, pembatasan parkir liar.";
      } else if (road.level.includes("Maret") || road.level.includes("Macet")) {
        solution = "Optimalisasi siklus lampu lalu lintas, penertiban angkutan barang jam sibuk.";
      } else {
        solution = "Patroli rutin dan penyediaan rambu digital informasi kemacetan.";
      }

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${road.roadName}</strong></td>
        <td>${formatNumber(road.volume)} kend/hari</td>
        <td>${road.speed} km/h</td>
        <td><span class="badge-status ${road.level.toLowerCase().includes("sangat") ? "status-macet" : road.level.toLowerCase().includes("macet") ? "status-padat" : "status-lancar"}">${road.level}</span></td>
        <td><span style="font-size: 0.8rem; color: var(--text-secondary);">${solution}</span></td>
      `;
      v2TableBody.appendChild(tr);
    });

    // Render V2 Charts with Smooth Aesthetics
    renderChartsV2(data);
  }

  // Animasi angka berjalan untuk KPI V2
  function animateValue(obj, start, end) {
    if (isNaN(start)) {
      start = 0;
    }
    if (start === end) {
      return;
    }

    const duration = 800;
    const startTime = performance.now();

    function updateNumber(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      obj.innerText = formatNumber(current);

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    }
    requestAnimationFrame(updateNumber);
  }

  function renderChartsV2(data) {
    const ctxHourly = document.getElementById("v2ChartHourly").getContext("2d");
    const ctxTrans = document.getElementById("v2ChartTransJogja").getContext("2d");

    const labelsHourly = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

    // 1. Line Chart Hourly V2 (Premium styled: Golden glow line, curved tension)
    if (chartV2Hourly) {
      chartV2Hourly.destroy();
    }

    // Gradient background for Line Chart V2
    const gradientLine = ctxHourly.createLinearGradient(0, 0, 0, 160);
    gradientLine.addColorStop(0, "rgba(229, 184, 59, 0.4)");
    gradientLine.addColorStop(1, "rgba(229, 184, 59, 0.0)");

    chartV2Hourly = new Chart(ctxHourly, {
      type: "line",
      data: {
        labels: labelsHourly,
        datasets: [
          {
            label: "Volume Jalan (% Kapasitas)",
            data: data.hourlyVolume,
            borderColor: "#e5b83b",
            backgroundColor: gradientLine,
            borderWidth: 3,
            pointRadius: 2,
            pointHoverRadius: 6,
            pointBackgroundColor: "#e5b83b",
            fill: true,
            tension: 0.35 // Membuat kurva melengkung lembut
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false } // Sembunyikan legenda demi kesederhanaan
        },
        scales: {
          y: {
            min: 0,
            max: 100,
            grid: { color: "rgba(255, 255, 255, 0.09)" },
            ticks: { color: "#e2e8f0", font: { family: "Plus Jakarta Sans", size: 10, weight: "bold" } }
          },
          x: {
            grid: { display: false },
            ticks: { color: "#e2e8f0", font: { family: "Plus Jakarta Sans", size: 10, weight: "bold" } }
          }
        }
      }
    });

    // 2. Bar Chart Trans Jogja V2 (Premium styled: Royal Blue, rounded corners)
    if (chartV2TransJogja) {
      chartV2TransJogja.destroy();
    }

    const gradientBar = ctxTrans.createLinearGradient(0, 0, 0, 160);
    gradientBar.addColorStop(0, "#3b82f6");
    gradientBar.addColorStop(1, "#1d4ed8");

    chartV2TransJogja = new Chart(ctxTrans, {
      type: "bar",
      data: {
        labels: YOGYAKARTA_TRANSPORT_DATA.transJogjaRoutes.map((r) => r.split(" ")[1]),
        datasets: [
          {
            label: "Rerata Penumpang",
            data: data.transJogjaPassengerCount,
            backgroundColor: gradientBar,
            borderRadius: 4, // Sisi batang tumpul modern
            borderWidth: 0,
            barPercentage: 0.6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            grid: { color: "rgba(255, 255, 255, 0.09)" },
            ticks: { color: "#e2e8f0", font: { family: "Plus Jakarta Sans", size: 10, weight: "bold" } }
          },
          x: {
            grid: { display: false },
            ticks: { color: "#e2e8f0", font: { family: "Plus Jakarta Sans", size: 10, weight: "bold" } }
          }
        }
      }
    });
  }

  // --- START INITIALIZATION ---
  initSystem();
});
