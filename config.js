// ============================================================================
// 📦 MODUL 1: CONFIG.JS (Pusat Data, Firebase, Preset, & Jajanan Alisya)
// ============================================================================

window.ALISYA_CONFIG = {
  version: "v6.8-Modular PRO",
  adminPin: "101100",

  firebaseConfig: {
    apiKey: "AIzaSyAFiQ_IfBDRKU66J6zZLiORhpuODD71kg4",
    authDomain: "alisya-live-db.firebaseapp.com",
    databaseURL: "https://alisya-live-db-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "alisya-live-db",
    storageBucket: "alisya-live-db.firebasestorage.app",
    messagingSenderId: "409499788186",
    appId: "1:409499788186:web:63500185b22d83a9ded023"
  },

  requiredCategories: [
    { id: 'b_momuung', name: 'Mom Uung', emoji: '🍼', color: '#B6D7A8' },
    { id: 'b_aquapress', name: 'AquaPress', emoji: '💧', color: '#00FFFF' },
    { id: 'b_moell', name: 'Moell / Back Up', emoji: '✨', color: '#FACC15' },
    { id: 'b_konten', name: 'Take Konten Video Affiliate', emoji: '🎬', color: '#8B5CF6' },
    { id: 'b_sleep', name: 'Jam Tidur / Istirahat', emoji: '😴', color: '#6366F1' },
    { id: 'b_lainlain', name: 'Me Time', emoji: '💅', color: '#EC4899' },
    { id: 'b_pribadi', name: 'Agenda Pribadi & OFF', emoji: '☕', color: '#EF4444' }
  ],

  initialSchedules: [
    { id: 's1', date: '2026-10-26', start_time: '14:00', end_time: '18:00', title: 'Shift 3 Mom Uung', brand_id: 'b_momuung', status: 'LIVE', color: '#B6D7A8', notes: 'Target GMV 20 Juta' },
    { id: 's2', date: '2026-10-26', start_time: '10:00', end_time: '12:00', title: 'Meet Aya', brand_id: 'b_pribadi', status: 'Meeting', color: '#00FFFF', notes: 'Briefing Outfit' },
    { id: 's_sleep1', date: '2026-10-26', start_time: '23:00', end_time: '06:00', title: 'Istirahat Tidur Malam', brand_id: 'b_sleep', status: 'Tidur', color: '#6366F1', notes: 'Sleep hygiene 7 jam' },
    { id: 's3', date: '2026-10-27', start_time: '11:00', end_time: '19:00', title: 'Shift 2 Mom Uung', brand_id: 'b_momuung', status: 'LIVE', color: '#B6D7A8', notes: 'Sesi Siang-Sore' },
    { id: 's_konten_sample', date: '2026-10-27', start_time: '06:00', end_time: '08:00', title: 'Take Konten Video', brand_id: 'b_konten', status: 'Konten', color: '#8B5CF6', notes: 'Shopee & TikTok Affiliate', checklist: { shoot: true, edit: false, upload: false } },
    { id: 's_salon1', date: '2026-10-27', start_time: '20:00', end_time: '22:00', title: 'Me Time', brand_id: 'b_lainlain', status: 'Me Time', color: '#EC4899', notes: 'Relax' }
  ],

  timeSlots: [
    { label: "00:00 - 02:00", start: "00:00", end: "02:00" },
    { label: "02:00 - 04:00", start: "02:00", end: "04:00" },
    { label: "04:00 - 06:00", start: "04:00", end: "06:00" },
    { label: "06:00 - 08:00", start: "06:00", end: "08:00" },
    { label: "08:00 - 10:00", start: "08:00", end: "10:00" },
    { label: "10:00 - 12:00", start: "10:00", end: "12:00" },
    { label: "12:00 - 14:00", start: "12:00", end: "14:00" },
    { label: "14:00 - 16:00", start: "14:00", end: "16:00" },
    { label: "16:00 - 18:00", start: "16:00", end: "18:00" },
    { label: "18:00 - 20:00", start: "18:00", end: "20:00" },
    { label: "20:00 - 22:00", start: "20:00", end: "22:00" },
    { label: "22:00 - 23:59", start: "22:00", end: "23:59" }
  ],

  moodList: [
    { id: 'happy', emoji: '🥰', labelId: 'Happy Banget', labelEn: 'Super Happy', color: 'bg-pink-100 text-pink-800 border-pink-300' },
    { id: 'slay', emoji: '💅', labelId: 'Mode Slay!', labelEn: 'Slay Mode!', color: 'bg-purple-100 text-purple-800 border-purple-300' },
    { id: 'fire', emoji: '🔥', labelId: 'Full Semangat', labelEn: 'On Fire', color: 'bg-amber-100 text-amber-800 border-amber-300' },
    { id: 'calm', emoji: '🌸', labelId: 'Kalem & Cantik', labelEn: 'Soft & Pretty', color: 'bg-rose-100 text-rose-800 border-rose-300' },
    { id: 'tired', emoji: '🥺', labelId: 'Butuh Peluk / Bobo', labelEn: 'Need Rest / Hug', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' }
  ],

  favoriteRewards: [
    { id: 'cokelat', emoji: '🍫', labelId: 'Beli Cokelat Manis Favorit!', labelEn: 'Buy Sweet Chocolate!', shortId: '🍫 Cokelat', shortEn: '🍫 Chocolate' },
    { id: 'pancake', emoji: '🥞', labelId: 'Jajan Pancake Lembut & Manis!', labelEn: 'Eat Fluffy Sweet Pancakes!', shortId: '🥞 Pancake', shortEn: '🥞 Pancake' },
    { id: 'tahukocek', emoji: '🌶️', labelId: 'Beli Tahu Kocek Pedas Gurih Mantap!', labelEn: 'Buy Spicy Savory Tahu Kocek!', shortId: '🌶️ Tahu Kocek', shortEn: '🌶️ Tahu Kocek' },
    { id: 'gorengan', emoji: '🥟', labelId: 'Jajan Gorengan Hangat Renyah!', labelEn: 'Eat Crispy Warm Fritters (Gorengan)!', shortId: '🥟 Gorengan', shortEn: '🥟 Gorengan' },
    { id: 'minuman', emoji: '🧋', labelId: 'Beli Minuman Manis Dingin Segar!', labelEn: 'Buy Refreshing Sweet Iced Drink!', shortId: '🧋 Minuman Manis', shortEn: '🧋 Sweet Drink' }
  ],

  momUungPresets: [
    { num: 1, st: "05:00", en: "13:00" },
    { num: 2, st: "11:00", en: "19:00" },
    { num: 3, st: "16:00", en: "23:59" },
    { num: 4, st: "00:00", en: "07:00" }
  ],

  aquaPressPresets: [
    { num: 1, st: "08:00", en: "12:00" },
    { num: 2, st: "12:00", en: "16:00" },
    { num: 3, st: "16:00", en: "20:00" }
  ]
};

// Generate Pilihan Jam Digital (00:00 - 23:59)
window.START_TIME_OPTIONS = [];
for (let h = 0; h < 24; h++) {
  const hh = String(h).padStart(2, '0');
  window.START_TIME_OPTIONS.push(`${hh}:00`);
  window.START_TIME_OPTIONS.push(`${hh}:30`);
}
window.END_TIME_OPTIONS = [...window.START_TIME_OPTIONS, "23:59"];
