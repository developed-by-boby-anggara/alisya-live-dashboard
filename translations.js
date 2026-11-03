// ============================================================================
// 🌐 MODUL 2: TRANSLATIONS.JS (Kamus Bahasa, Afirmasi & Utilitas Waktu/Suara)
// ============================================================================

window.ALISYA_UTILS = {
  timeToMinutes: (tStr) => {
    if (!tStr) return 0;
    if (tStr === '23:59') return 24 * 60;
    const [h, m] = tStr.split(':').map(Number);
    return h * 60 + m;
  },

  formatSecondsToHMS: (totalSeconds) => {
    const sec = Math.max(0, Math.floor(totalSeconds));
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  },

  formatSecondsToMS: (totalSeconds) => {
    const sec = Math.max(0, Math.floor(totalSeconds));
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  },

  calculateDurationHours: (start, end) => {
    if (!start || !end) return 0;
    const [sh, sm] = start.split(':').map(Number);
    let [eh, em] = end.split(':').map(Number);
    if (end === '23:59') { eh = 24; em = 0; }
    let diff = (eh * 60 + em) - (sh * 60 + sm);
    if (diff <= 0) {
      diff = Math.max(0, (24 * 60 - (sh * 60 + sm)) + (eh * 60 + em));
      if (diff > 1440) diff = 120;
    }
    return Math.round((diff / 60) * 10) / 10;
  },

  addDaysToDateStr: (dateStr, daysToAdd) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    dt.setDate(dt.getDate() + daysToAdd);
    const ny = dt.getFullYear();
    const nm = String(dt.getMonth() + 1).padStart(2, '0');
    const nd = String(dt.getDate()).padStart(2, '0');
    return `${ny}-${nm}-${nd}`;
  },

  playNotificationChime: () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const playTone = (freq, startTime, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };
      const now = ctx.currentTime;
      playTone(587.33, now, 0.25);
      playTone(880.00, now + 0.2, 0.45);
    } catch (e) {}
  },

  playWaterBubbleChime: () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const playDrop = (freqStart, freqEnd, startTime, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freqStart, startTime);
        osc.frequency.exponentialRampToValueAtTime(freqEnd, startTime + duration);
        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };
      const now = ctx.currentTime;
      playDrop(420, 880, now, 0.16);
      playDrop(540, 1120, now + 0.18, 0.22);
    } catch (e) {}
  },

  playMekelMeowSound: () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(860, now + 0.14);
      osc.frequency.exponentialRampToValueAtTime(610, now + 0.38);
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch (e) {}
  }
};

window.ALISYA_TRANSLATIONS = {
  id: {
    locale: 'id-ID',
    modeHP: "Mode HP",
    modePC: "Mode PC",
    lockBtn: "Kunci",
    loginBtn: "Login",
    radarTitle: "Radar Jadwal Alisya (00:00 - 23:59)",
    availableTitle: "Available Schedule (Slot Jam Kosong)",
    allSlotsFilled: "⚠️ Semua slot jam di tanggal ini sudah terisi penuh!",
    slotsReady: "Slot Siap Pakai",
    calendarTitle: "Kalender Tanggal",
    sessionList: "Daftar Sesi Jadwal",
    noSchedule: "Tidak Ada Jadwal di Tanggal Ini 🌸",
    noScheduleSub: "Yeay! Alisya libur atau seluruh slot jam di tanggal ini masih kosong. Waktunya santai!",
    btnShareWA: "Share WhatsApp",
    btnSavePNG: "Simpan PNG",
    btnShareRekapWA: "Share Rekap Spreadsheet ke WA",
    btnDownloadTablePNG: "Unduh Gambar Tabel (.PNG)",
    btnAddSession: "+ Tambah Sesi",
    btnCloneDay: "📋 Salin 1 Hari",
    jump: "Lompat:",
    today: "Hari Ini",
    tomorrow: "Besok",
    dayAfter: "Lusa",
    tabAgenda: "Agenda Harian",
    tabSpreadsheet: "Kalender Spreadsheet",
    tabKPI: "KPI & Diagram Grafik",
    tabList: "Daftar Lengkap Semua Jadwal",
    tabColors: "Atur Warna Brand & Agenda",
    btnExportCSV: "Ekspor CSV (Excel)",
    btnAddSch: "+ Tambah Jadwal",
    statFilterTitle: "📊 Filter Rentang Waktu Statistik (00:00 - 23:59)",
    statFilterDesc: "Pilih periode dan tanggal untuk mengevaluasi jam kerja, tidur, dan me time:",
    selectOption: "Tentukan Pilihan:",
    weekFrom: "Minggu dari tgl:",
    yearLabel: "Tahun",
    daily: "📅 Harian",
    weekly: "🗓️ Mingguan",
    monthly: "📆 Bulanan",
    yearly: "📈 Tahunan",
    totalLive: "TOTAL SHIFT LIVE",
    takeKonten: "TAKE KONTEN VIDEO",
    sleepTime: "JAM TIDUR / ISTIRAHAT",
    meTime: "ME TIME",
    offDay: "HARI LIBUR / OFF",
    hoursLive: "Jam Streaming",
    hoursProd: "Jam Produksi",
    hoursSleep: "Jam Istirahat",
    hoursMeTime: "Jadwal Me Time & Relax",
    hoursOff: "Hari Libur Penuh",
    propTitle: "PROPORSI WAKTU ALISYA",
    barTitle: "BEBAN AKTIVITAS PER KATEGORI",
    burnoutGuard: "🛡️ Health & Burnout Guard",
    balanceScore: "Skor Keseimbangan Work-Life:",
    scoreBalanced: "🟢 Seimbang & Sehat (Porsi Kerja, Tidur & Me Time Ideal)",
    scoreWarning: "🟡 Perhatian (Kurang Waktu Tidur / Me Time Minggu Ini)",
    scoreBurnout: "🔴 Burnout Alert! (Beban Jam Kerja Sangat Tinggi, Butuh Istirahat)",
    shortBreakWarning: "⚠️ Jeda istirahat antar shift terlalu singkat (<5 jam)!",
    liveNowActive: "SEDANG BERLANGSUNG:",
    liveNowIdle: "✨ Saat ini tidak ada sesi yang sedang berlangsung",
    endsAt: "Habis Pukul",
    startsAt: "Mulai Pukul",
    timeLeft: "Sisa Waktu Mundur:",
    startsInCountdown: "Mulai Dalam:",
    sessionProgress: "Progres Sesi Berjalan",
    nextUp: "Sesi Berikutnya:",
    inMin: "dlm",
    minLeft: "mnt lagi",
    minUnit: "mnt",
    progressToday: "Progres Total Agenda Hari Ini",
    completed: "Selesai",
    scheduledSessions: "Sesi Terjadwal",
    productiveActs: "Aktivitas Produktif",
    colDateTime: "TANGGAL & HARI \\ JAM",
    colDayStatus: "STATUS HARI",
    todayBadge: "HARI INI",
    statusFree: "✨ FREE SLOT",
    statusLow: "🟢 LOW",
    statusMed: "⚡ MEDIUM",
    statusFull: "🔥 FULL SCHEDULE",
    statusOff: "☕ LIBUR / OFF",
    allRegistered: "Semua Jadwal Terdaftar",
    searchKeyword: "Cari Kata Kunci:",
    searchPlaceholder: "🔍 Cari nama shift, catatan...",
    catBrand: "Kategori / Brand:",
    allCategories: "Semua Kategori",
    attStatus: "Status Kehadiran:",
    allStatuses: "Semua Status",
    checkDate: "Pilih Cek Tanggal:",
    checkStartHour: "Cek Jam Mulai (Digital):",
    allHours: "Semua Jam",
    colDay: "Hari",
    colDate: "Tanggal",
    colHour: "Jam Digital",
    colTitle: "Judul Shift / Agenda",
    colCategory: "Kategori",
    colStatus: "Status",
    colNotes: "Catatan",
    colAction: "Aksi",
    copyBtn: "📋 Salin",
    editBtn: "Edit",
    deleteBtn: "Hapus",
    noMatchFilter: "Tidak ada jadwal yang cocok dengan filter pencarian ini.",
    colorDesc: "Ubah warna visual brand, take konten video affiliate, jam tidur, dan jadwal me time dengan Color Picker.",
    editable: "BISA DIUBAH",
    locked: "TERKUNCI",
    adminAccessTitle: "Akses Admin",
    adminAccessDesc: "Masukkan PIN untuk mengelola jadwal Alisya.",
    pinPlaceholder: "Masukkan PIN Akses",
    pinWrong: "PIN salah! Coba lagi.",
    cancelBtn: "Batal",
    unlockBtn: "Buka Akses",
    modalEditTitle: "✏️ Edit Jadwal",
    modalAddTitle: "✨ Tambah Jadwal Baru",
    presetMomUung: "Shift Cepat Mom Uung (1-Klik Isi):",
    presetAquaPress: "Shift Cepat AquaPress (1-Klik Isi):",
    formTitleLabel: "Judul Shift / Aktivitas *",
    formStartDate: "Tanggal Mulai *",
    formRepeat: "🔁 Ulangi Beruntun",
    rep1: "Hanya 1 Hari Ini",
    rep2: "2 Hari Beruntun",
    rep3: "3 Hari Beruntun",
    rep5: "5 Hari Beruntun",
    rep7: "1 Minggu (7 Hari)",
    formStartHour: "Jam Mulai (Digital) *",
    formEndHour: "Jam Selesai (Digital) *",
    formNotes: "Catatan / Target GMV",
    deleteSchBtn: "🗑️ Hapus Jadwal",
    saveCloudBtn: "Simpan ke Cloud",
    stickyNoteLabel: "📌 Catatan Fokus:",
    editNoteBtn: "✏️ Ubah Catatan",
    cloneModalTitle: "📋 Salin Semua Jadwal Hari Ini",
    cloneModalDesc: "Salin seluruh daftar sesi dari tanggal",
    cloneTargetLabel: "Pilih Tanggal Tujuan:",
    cloneConfirmBtn: "🚀 Salin Sekarang",
    greetMorning: "Selamat Pagi, Alisya Cantik! ☀️🌸",
    greetAfternoon: "Selamat Siang, Princess Alisya! 🌤️🌷",
    greetEvening: "Selamat Sore, Queen Alisya! 🌅✨",
    greetNight: "Selamat Malam, Sweetheart! 🌙💖",
    moodTrackerTitle: "🎀 Mood, Minum Air & Rumah Kucing Mekel",
    autoResetBadge: "🔄 Auto-Reset Tiap Hari 00:00",
    waterTitle: "💧 Hidrasi & Pengingat Air Putih:",
    waterGoalDone: "🎉 Yeay! Target 8 gelas (2.000 ml) hari ini tercapai! Suara jernih & kulit glowing!",
    waterDrinkNowBtn: "+ Minum 1 Gelas Air Putih (250ml) 🥤",
    waterResetBtn: "Reset",
    waterReminderTitle: "⏰ Pengingat Minum Air:",
    waterRemOff: "🔕 Mati",
    waterRem30: "🔔 Tiap 30 Menit",
    waterRem60: "🔔 Tiap 1 Jam",
    waterRem90: "🔔 Tiap 1.5 Jam",
    waterRem120: "🔔 Tiap 2 Jam",
    waterNextIn: "Minum lagi dlm:",
    waterHistoryTitle: "📝 Riwayat Jam Minum Alisya Hari Ini:",
    waterEmptyLog: "🥺 Kamu belum minum air putih hari ini. Yuk klik tombol minum di atas biar nggak dehidrasi!",
    waterPopupTitle: "💧 Waktunya Minum Air Putih, Cantik! 🌸",
    waterPopupDesc: "Jangan lupa minum segelas air putih dulu ya biar tenggorokan tetap segar saat bicara, badan fit, dan wajah makin glowing!",
    waterPopupConfirm: "🥤 Aku Sudah Minum! (+1 Gelas)",
    waterPopupSnooze: "⏳ Ingatkan 10 Menit Lagi",
    petName: "🐱 Mekel (Kucing Kesayangan Alisya)",
    petHungry: "Meow.. Mekel belum makan & minum nih, jangan lupa kasih makan & minum Mekel ya! 🐾",
    petHalf: "Mekel senang sudah dikasih maem/minum, tambahin lagi nanti ya Cantik! 🐾💖",
    petHappy: "Purrr~ Mekel kenyang & segar banget hari ini! Makasih ya Princess Alisya! 😻💖",
    petFeedFoodBtn: "🐟 Kasih Makan",
    petFeedWaterBtn: "🥛 Kasih Minum",
    petPatBtn: "🐾 Elus Mekel",
    petFoodLabel: "🐟 Makan Mekel:",
    petWaterLabel: "🥛 Minum Mekel:",
    beautyPrepTitle: "💄 Ceklis Persiapan Cantik Sebelum Live:",
    prepAllDone: "👑 Yeay! 100% Princess Alisya Sudah Siap & Wangi Buat Live!",
    prepMakeup: "💄 Make Up",
    prepBath: "🚿 Mandi Segar",
    prepPerfume: "🌸 Semprot Parfum",
    prepBattery: "🔋 Cek Baterai HP",
    rewardTitle: "🎁 Jajanan Self-Reward Alisya Hari Ini:",
    rewardSpinBtn: "🎰 Acak Jajanan",
    rewardPickHint: "Klik pilih langsung jajanan yang kamu pengen hari ini:",
    diaryTitle: "💌 Catatan Kecil / Hal yang Bikin Senang Hari Ini:",
    diaryPlaceholder: "Tulis hal manis hari ini (misal: Habis jajan tahu kocek & cokelat enak banget!)...",
    cheerMeBtn: "💖 Ganti Kalimat",
    slotOccupiedLabel: "Terisi:",
    overlapWarningTitle: "⛔ Jam Bentrok / Sudah Terisi!",
    overlapWarningDesc: "Rentang jam ini bertumpuk dengan jadwal:",
    occupiedTimelineTitle: "🔒 Daftar Jam yang Sudah Terisi di Tanggal Ini:",
    allFreeTimeline: "✨ Semua jam di tanggal ini masih kosong bebas dipilih!",
    presetBlocked: "🔒 Jam Terisi",
    badgeFinished: "✅ SELESAI",
    badgeUpcoming: "⏳ AKAN DATANG",
    toggleHideWellness: "Sembunyikan Panel",
    toggleShowWellness: "Buka Panel Mekel & Air",
    affirmations: [
      "✨ Kamu cantik, berbakat, dan rezekimu mengalir deras hari ini! Semangat live-nya ya!",
      "🌸 Jangan lupa senyum manis dulu sebelum mulai! Energi positifmu bikin penonton betah.",
      "💖 Satu per satu jadwal selesai, kamu hebat banget hari ini! Jangan lupa minum air putih ya.",
      "👑 Queen Alisya siap pecah telor GMV hari ini! Tetap rileks dan happy terus ya!",
      "🌷 Kalau capek, istirahat sebentar ya. Kesehatan dan kebahagiaanmu selalu nomor satu!",
      "🍓 Hari ini adalah hari keberuntunganmu! Semua produk yang kamu pegang pasti laris manis.",
      "🎀 Aura positifmu hari ini luar biasa cantik, siapa pun yang lihat live kamu pasti langsung checkout!",
      "💫 Pelan-pelan saja, nikmati setiap sesinya. Kamu sudah bekerja sangat keras dan keren banget!",
      "🍒 Jangan lupa tarik napas dalam-dalam dan tersenyum, kamu pantas mendapatkan semua hal indah hari ini!",
      "🌷 Suaramu yang ramah dan ceria adalah magnet rezeki. Jaga tenggorokan dan minum yang cukup ya!",
      "💎 Setiap detik usahamu hari ini sedang membuka pintu rezeki yang lebih besar lagi. Proud of you!",
      "🧁 Habis selesai semua shift hari ini, jangan lupa jajan tahu kocek, pancake, atau cokelat favoritmu ya!",
      "🦢 Kamu anggun, pintar berbicara, dan selalu memikat hati audiens. Bersinar terus ya Alisya!",
      "🌈 Apapun target hari ini, kamu pasti bisa melewatinya dengan senyuman paling manis!",
      "🍭 Mood yang bagus adalah kunci GMV meroket! Yuk mulai hari ini dengan hati yang gembira.",
      "💐 Terima kasih sudah selalu semangat dan konsisten. Diri kamu di masa depan pasti bangga banget!",
      "🦋 Seperti kupu-kupu yang indah, pesonamu hari ini bikin suasana live jadi hangat dan seru!",
      "🌟 Jangan khawatir soal angka, fokus saja jadi dirimu yang ceria, rezeki terbaik pasti mengikuti!",
      "🍑 Wajah segar, sudah mandi wangi, baterai HP penuh! Hari ini semuanya berjalan lancar!",
      "🧸 Kalau ada jam kosong, manfaatkan buat main sama Mekel atau dengerin lagu favoritmu ya!",
      "🌺 Kamu itu magnet keberuntungan! Setiap kata yang kamu ucapkan membawa berkah dan kebahagiaan.",
      "🍦 Semangat buat sesi hari ini! Ingat, kamu nggak sendirian dan kamu selalu didukung penuh!",
      "🎀 Make up oke, parfum wangi, jadwal rapi! Saatnya Alisya bersinar di depan kamera!",
      "💌 Pesan kecil buat hari ini: Kamu berharga, kamu dicintai, dan kamu luar biasa hebat!",
      "🌼 Semoga hari ini dipenuhi pembeli yang ramah, loyal, dan borong banyak tanpa ragu!",
      "🍓 Satu langkah kecil setiap hari membawa perubahan besar. Terus melangkah dengan cantik ya!",
      "💖 Jangan lupa stretching ringan di sela-sela shift supaya badanmu tetap segar dan nyaman!",
      "👑 Tak peduli seberapa padat jadwalnya, kamu selalu punya cara elegan untuk menaklukkannya!",
      "🌷 Senyummu itu menular lho! Sekali kamu senyum, satu ruang live ikut bahagia.",
      "✨ Percaya sama dirimu sendiri ya, kemampuan komunikasimu itu juara banget!",
      "🍒 Hari baru, semangat baru, rezeki baru yang berlimpah ruah khusus buat Alisya & Mekel!",
      "🧁 Istirahat yang cukup itu juga bagian dari produktivitas. Sayangi tubuhmu selalu ya!",
      "🦢 Tetap tenang, tetap anggun, dan biarkan pesona alamimu bekerja menarik banyak keberuntungan.",
      "🌈 Semua lelahmu hari ini akan terbayar lunas dengan hasil yang manis dan membanggakan!",
      "💝 Kamu sudah melakukan yang terbaik! Apresiasi dirimu sendiri karena sudah sejauh ini."
    ]
  },
  en: {
    locale: 'en-US',
    modeHP: "Mobile Mode",
    modePC: "PC Mode",
    lockBtn: "Lock",
    loginBtn: "Login",
    radarTitle: "Alisya's Schedule Radar (00:00 - 23:59)",
    availableTitle: "Available Schedule (Empty Time Slots)",
    allSlotsFilled: "⚠️ All time slots for this date are fully booked!",
    slotsReady: "Slots Available",
    calendarTitle: "Date Calendar",
    sessionList: "Schedule Session List",
    noSchedule: "No Schedule for this Date 🌸",
    noScheduleSub: "Yay! Alisya is off or all time slots for this date are currently empty. Time to relax!",
    btnShareWA: "Share WhatsApp",
    btnSavePNG: "Save PNG",
    btnShareRekapWA: "Share Spreadsheet Recap to WA",
    btnDownloadTablePNG: "Download Table Image (.PNG)",
    btnAddSession: "+ Add Session",
    btnCloneDay: "📋 Clone Full Day",
    jump: "Jump:",
    today: "Today",
    tomorrow: "Tomorrow",
    dayAfter: "Day After",
    tabAgenda: "Daily Agenda",
    tabSpreadsheet: "Spreadsheet Calendar",
    tabKPI: "KPI & Charts",
    tabList: "Complete Schedule List",
    tabColors: "Theme Colors",
    btnExportCSV: "Export CSV (Excel)",
    btnAddSch: "+ Add Schedule",
    statFilterTitle: "📊 Statistical Time Range Filter (00:00 - 23:59)",
    statFilterDesc: "Select period and date to evaluate work, sleep, and personal time:",
    selectOption: "Select Option:",
    weekFrom: "Week starting:",
    yearLabel: "Year",
    daily: "📅 Daily",
    weekly: "🗓️ Weekly",
    monthly: "📆 Monthly",
    yearly: "📈 Yearly",
    totalLive: "TOTAL LIVE SHIFTS",
    takeKonten: "VIDEO CONTENT SHOOT",
    sleepTime: "SLEEP & REST TIME",
    meTime: "ME TIME",
    offDay: "DAY OFF",
    hoursLive: "Streaming Hours",
    hoursProd: "Production Hours",
    hoursSleep: "Rest Hours",
    hoursMeTime: "Me Time & Relax Schedule",
    hoursOff: "Full Days Off",
    propTitle: "ALISYA TIME PROPORTION",
    barTitle: "ACTIVITY LOAD PER CATEGORY",
    burnoutGuard: "🛡️ Health & Burnout Guard",
    balanceScore: "Work-Life Balance Score:",
    scoreBalanced: "🟢 Balanced & Healthy (Ideal Work, Sleep & Me Time)",
    scoreWarning: "🟡 Warning (Low Sleep / Me Time This Period)",
    scoreBurnout: "🔴 Burnout Alert! (High Work Load, Rest Needed)",
    shortBreakWarning: "⚠️ Short break between shifts (<5 hours)!",
    liveNowActive: "LIVE NOW:",
    liveNowIdle: "✨ No active session at this moment",
    endsAt: "Ends At",
    startsAt: "Starts At",
    timeLeft: "Countdown:",
    startsInCountdown: "Starts In:",
    sessionProgress: "Current Session Progress",
    nextUp: "Next Session:",
    inMin: "in",
    minLeft: "min left",
    minUnit: "min",
    progressToday: "Today's Total Agenda Progress",
    completed: "Completed",
    scheduledSessions: "Scheduled Sessions",
    productiveActs: "Productive Activities",
    colDateTime: "DATE & DAY \\ TIME",
    colDayStatus: "DAY STATUS",
    todayBadge: "TODAY",
    statusFree: "✨ FREE SLOT",
    statusLow: "🟢 LOW",
    statusMed: "⚡ MEDIUM",
    statusFull: "🔥 FULL SCHEDULE",
    statusOff: "☕ DAY OFF",
    allRegistered: "All Registered Schedules",
    searchKeyword: "Search Keyword:",
    searchPlaceholder: "🔍 Search shift title, notes...",
    catBrand: "Category / Brand:",
    allCategories: "All Categories",
    attStatus: "Attendance Status:",
    allStatuses: "All Statuses",
    checkDate: "Filter by Date:",
    checkStartHour: "Filter Start Hour (24H):",
    allHours: "All Hours",
    colDay: "Day",
    colDate: "Date",
    colHour: "Time (24H)",
    colTitle: "Shift / Activity Title",
    colCategory: "Category",
    colStatus: "Status",
    colNotes: "Notes",
    colAction: "Action",
    copyBtn: "📋 Copy",
    editBtn: "Edit",
    deleteBtn: "Delete",
    noMatchFilter: "No schedules match your search filter.",
    colorDesc: "Customize brand, affiliate video content, sleep, and me time colors with the Color Picker.",
    editable: "EDITABLE",
    locked: "LOCKED",
    adminAccessTitle: "Admin Access",
    adminAccessDesc: "Enter PIN to manage Alisya's schedule.",
    pinPlaceholder: "Enter Access PIN",
    pinWrong: "Incorrect PIN! Try again.",
    cancelBtn: "Cancel",
    unlockBtn: "Unlock",
    modalEditTitle: "✏️ Edit Schedule",
    modalAddTitle: "✨ Add New Schedule",
    presetMomUung: "Mom Uung Quick Shifts (1-Click Fill):",
    presetAquaPress: "AquaPress Quick Shifts (1-Click Fill):",
    formTitleLabel: "Shift / Activity Title *",
    formStartDate: "Start Date *",
    formRepeat: "🔁 Repeat Consecutively",
    rep1: "Only 1 Day",
    rep2: "2 Consecutive Days",
    rep3: "3 Consecutive Days",
    rep5: "5 Consecutive Days",
    rep7: "1 Full Week (7 Days)",
    formStartHour: "Start Time (24H) *",
    formEndHour: "End Time (24H) *",
    formNotes: "Notes / GMV Target",
    deleteSchBtn: "🗑️ Delete Schedule",
    saveCloudBtn: "Save to Cloud",
    stickyNoteLabel: "📌 Weekly Focus:",
    editNoteBtn: "✏️ Edit Note",
    cloneModalTitle: "📋 Clone Full Day Schedule",
    cloneModalDesc: "Copy all sessions from date",
    cloneTargetLabel: "Select Target Date:",
    cloneConfirmBtn: "🚀 Clone Now",
    greetMorning: "Good Morning, Pretty Alisya! ☀️🌸",
    greetAfternoon: "Good Afternoon, Princess Alisya! 🌤️🌷",
    greetEvening: "Good Evening, Queen Alisya! 🌅✨",
    greetNight: "Good Night, Sweetheart! 🌙💖",
    moodTrackerTitle: "🎀 Mood, Water & Mekel's Corner",
    autoResetBadge: "🔄 Auto-Resets Daily at 00:00",
    waterTitle: "💧 Hydration & Water Reminder:",
    waterGoalDone: "🎉 Yay! 8 glasses (2,000 ml) achieved today! Clear voice & glowing skin!",
    waterDrinkNowBtn: "+ Drink 1 Glass of Water (250ml) 🥤",
    waterResetBtn: "Reset",
    waterReminderTitle: "⏰ Water Reminder:",
    waterRemOff: "🔕 Off",
    waterRem30: "🔔 Every 30 Min",
    waterRem60: "🔔 Every 1 Hour",
    waterRem90: "🔔 Every 1.5 Hours",
    waterRem120: "🔔 Every 2 Hours",
    waterNextIn: "Next sip in:",
    waterHistoryTitle: "📝 Alisya's Drinking Log Today:",
    waterEmptyLog: "🥺 You haven't logged any water today. Click the button above to stay hydrated!",
    waterPopupTitle: "💧 Time to Drink Water, Pretty! 🌸",
    waterPopupDesc: "Take a refreshing sip of water now so your voice stays clear, energized, and your skin stays glowing!",
    waterPopupConfirm: "🥤 I Drank a Glass! (+1 Glass)",
    waterPopupSnooze: "⏳ Remind in 10 Mins",
    petName: "🐱 Mekel (Alisya's Beloved Cat)",
    petHungry: "Meow.. Mekel hasn't eaten or drunk yet today, don't forget to feed Mekel! 🐾",
    petHalf: "Mekel is happy! Don't forget Mekel's next meal & water later, Pretty! 🐾💖",
    petHappy: "Purrr~ Mekel is super full and hydrated today! Thank you Princess Alisya! 😻💖",
    petFeedFoodBtn: "🐟 Feed Mekel",
    petFeedWaterBtn: "🥛 Give Water",
    petPatBtn: "🐾 Pet Mekel",
    petFoodLabel: "🐟 Mekel's Food:",
    petWaterLabel: "🥛 Mekel's Water:",
    beautyPrepTitle: "💄 Princess Live Prep Checklist:",
    prepAllDone: "👑 Yay! 100% Princess Alisya is Fresh & Ready for Live!",
    prepMakeup: "💄 Make Up",
    prepBath: "🚿 Fresh Shower",
    prepPerfume: "🌸 Sweet Perfume",
    prepBattery: "🔋 Check Phone Battery",
    rewardTitle: "🎁 Alisya's Favorite Treat Today:",
    rewardSpinBtn: "🎰 Spin Treat",
    rewardPickHint: "Or click your favorite craving for today:",
    diaryTitle: "💌 Little Gratitude / Sweet Note Today:",
    diaryPlaceholder: "Write a sweet moment today (e.g. Bought delicious tahu kocek & chocolate!)...",
    cheerMeBtn: "💖 New Quote",
    slotOccupiedLabel: "Booked:",
    overlapWarningTitle: "⛔ Time Slot Conflict!",
    overlapWarningDesc: "This time range overlaps with:",
    occupiedTimelineTitle: "🔒 Booked Time Slots on This Date:",
    allFreeTimeline: "✨ All time slots on this date are completely free!",
    presetBlocked: "🔒 Booked",
    badgeFinished: "✅ DONE",
    badgeUpcoming: "⏳ UPCOMING",
    toggleHideWellness: "Hide Panel",
    toggleShowWellness: "Open Mekel & Water Panel",
    affirmations: [
      "✨ You are glowing, talented, and abundant today! Have an amazing stream!",
      "🌸 Put on your sweetest smile first! Your positive energy makes everyone stay.",
      "💖 Step by step, you're doing so well today! Don't forget to stay hydrated.",
      "👑 Queen Alisya is ready to crush all GMV targets today with joy and grace!",
      "🌷 Take a gentle breath whenever you feel tired. Your happiness always comes first!",
      "🍓 Today is your lucky day! Everything you showcase will sell out effortlessly.",
      "🎀 Your radiant aura is magnetic today—viewers will love every second of your live!",
      "💫 Take it one session at a time. You are working so hard and doing phenomenally!",
      "🍒 Take a deep breath and smile—you deserve all the wonderful blessings coming today!",
      "🌷 Your warm and cheerful voice is your superpower. Keep your throat hydrated!",
      "💎 Every minute of your effort today is opening doors to massive abundance!",
      "🧁 After finishing today's shifts, treat yourself to chocolate, pancakes, or tahu kocek!",
      "🦢 Graceful, articulate, and charming—keep shining brightly, Alisya!",
      "🌈 Whatever the target is today, you will breeze through it with your sweetest smile!",
      "🍭 Good mood equals sky-rocketing GMV! Let's start with a happy heart.",
      "💐 Thank you for being so dedicated and consistent. Your future self is so proud of you!",
      "🦋 Like a lovely butterfly, your presence makes every live session warm and exciting!",
      "🌟 Focus on having fun and being your authentic self—the best results will follow!",
      "🍑 Fresh shower, pretty makeup, full phone battery! Today is going to flow smoothly.",
      "🧸 Whenever you have a free slot, cuddle with Mekel and listen to your favorite songs!",
      "🌺 You are a magnet for miracles! Every word you speak brings joy and sales.",
      "🍦 Cheering for you today! Remember you are deeply appreciated and supported!",
      "🎀 Cute outfit check, sweet perfume check, neat schedule check! Time to shine!",
      "💌 Little reminder for today: You are worthy, you are loved, and you are unstoppable!",
      "🌼 May your stream today be filled with kind, generous, and loyal buyers!",
      "🍓 Small consistent steps every day create magical results. Keep glowing!",
      "💖 Do a quick gentle stretch between shifts so your body stays comfy and fresh!",
      "👑 No matter how busy the schedule looks, you always handle it with pure elegance!",
      "🌷 Your smile is contagious! When you smile, the whole live room feels happy.",
      "✨ Trust your charm and communication skills—you are truly a natural star!",
      "🍒 New day, fresh energy, and overflowing blessings specially for Alisya & Mekel!",
      "🧁 Good rest is part of productivity too. Be gentle and loving to yourself!",
      "🦢 Stay calm, stay pretty, and let your natural charisma attract endless luck.",
      "🌈 All your hard work today will pay off with the sweetest, proudest results!",
      "💝 You're doing your absolute best! Give yourself a warm hug for coming this far."
    ]
  }
};
