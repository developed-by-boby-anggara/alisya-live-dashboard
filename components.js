// ============================================================================
// 🧩 MODUL 3: COMPONENTS.JS (Komponen Widget Mandiri: Mekel, Hidrasi & Radar)
// ============================================================================

const { MOOD_LIST: CFG_MOODS, favoriteRewards: CFG_REWARDS } = window.ALISYA_CONFIG;
const { formatSecondsToMS, playMekelMeowSound } = window.ALISYA_UTILS;

window.ALISYA_COMPONENTS = {
  // 1. Komponen Strip Sapaan & Afirmasi Manis di Radar
  CompactGreetingStrip: ({ cuteGreeting, quoteText, onBoostMood, cheerBtnLabel }) => (
    <div className="bg-white/15 backdrop-blur-xs rounded-2xl px-3.5 py-2 border border-pink-200/30 flex flex-wrap items-center justify-between gap-2 text-xs">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <span className="text-base shrink-0 cute-float">🎀</span>
        <span className="font-black text-pink-200 whitespace-nowrap">{cuteGreeting}</span>
        <span className="text-rose-100/90 italic font-medium truncate">
          — "{quoteText}"
        </span>
      </div>
      <button
        type="button"
        onClick={onBoostMood}
        className="bg-pink-500/80 hover:bg-pink-500 text-white font-black text-[10px] px-2.5 py-1 rounded-xl shadow-xs active:scale-95 transition shrink-0 border border-pink-300/50"
      >
        🎲 {cheerBtnLabel}
      </button>
    </div>
  ),

  // 2. Komponen Banner Countdown Detik Real-Time (HH:MM:SS)
  LiveNowBanner: ({ t, liveTracker, realTodayStr }) => (
    <div className="bg-black/30 rounded-2xl p-3.5 border border-white/15 space-y-3 mt-2 shadow-inner">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {liveTracker.activeItem ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 font-black text-emerald-300 text-xs sm:text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>{t.liveNowActive} {liveTracker.activeItem.title}</span>
              </span>
              <span className="bg-white/15 text-rose-100 font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-lg border border-white/15">
                ⏰ {liveTracker.activeItem.start_time} - {liveTracker.activeItem.end_time} ({t.endsAt} {liveTracker.activeItem.end_time})
              </span>
              <span className="bg-emerald-500 text-slate-950 font-mono font-black text-xs px-2.5 py-1 rounded-xl shadow flex items-center gap-1">
                <span>⏳ {t.timeLeft}</span>
                <span className="tracking-wider">{liveTracker.activeItem.remainingHMS}</span>
              </span>
            </div>
          ) : (
            <span className="text-rose-200 font-bold">{t.liveNowIdle}</span>
          )}
        </div>

        {liveTracker.nextItem && (
          <div className="text-[11px] font-bold bg-amber-400/20 border border-amber-300/30 px-3 py-1 rounded-xl text-amber-200 flex items-center gap-1.5">
            <span>⏭️ {t.nextUp}</span>
            <span className="text-white font-black">{liveTracker.nextItem.title}</span>
            <span className="font-mono text-amber-300">({liveTracker.nextItem.start_time})</span>
            <span className="bg-black/40 text-amber-300 font-mono font-black px-2 py-0.5 rounded-lg">
              -{liveTracker.nextItem.startsInHMS}
            </span>
          </div>
        )}
      </div>

      {liveTracker.activeItem && (
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-emerald-200 font-bold">
            <span>⚡ {t.sessionProgress}: {liveTracker.activeItem.title}</span>
            <span className="font-mono">{liveTracker.activeItem.sessionPct}%</span>
          </div>
          <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-300 via-amber-300 to-emerald-400 transition-all duration-300"
              style={{ width: `${liveTracker.activeItem.sessionPct}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="space-y-1">
        <div className="flex justify-between text-[10px] text-rose-200 font-bold">
          <span>📅 {t.progressToday} ({realTodayStr})</span>
          <span className="font-mono">{liveTracker.progressPct}% {t.completed}</span>
        </div>
        <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-400 via-rose-300 to-emerald-300 transition-all duration-500"
            style={{ width: `${liveTracker.progressPct}%` }}
          ></div>
        </div>
      </div>
    </div>
  ),

  // 3. Komponen Checklist Produksi Konten Affiliate
  KontenChecklist: ({ item, onToggleChecklist }) => {
    if (item.brand_id !== 'b_konten' && item.status !== 'Konten') return null;
    const cl = item.checklist || { shoot: false, edit: false, upload: false };
    return (
      <div className="flex flex-wrap items-center gap-1.5 pt-1.5" onClick={e => e.stopPropagation()}>
        <button
          type="button"
          onClick={(e) => onToggleChecklist(e, item.id, 'shoot')}
          className={`px-2.5 py-1 rounded-xl text-[10px] font-black border transition flex items-center gap-1 ${cl.shoot ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs' : 'bg-slate-100 text-slate-600 border-slate-300'}`}
        >
          <span>{cl.shoot ? '✅' : '⬜'}</span><span>1. Take Video</span>
        </button>
        <button
          type="button"
          onClick={(e) => onToggleChecklist(e, item.id, 'edit')}
          className={`px-2.5 py-1 rounded-xl text-[10px] font-black border transition flex items-center gap-1 ${cl.edit ? 'bg-amber-500 text-white border-amber-600 shadow-xs' : 'bg-slate-100 text-slate-600 border-slate-300'}`}
        >
          <span>{cl.edit ? '✅' : '⬜'}</span><span>2. Editing</span>
        </button>
        <button
          type="button"
          onClick={(e) => onToggleChecklist(e, item.id, 'upload')}
          className={`px-2.5 py-1 rounded-xl text-[10px] font-black border transition flex items-center gap-1 ${cl.upload ? 'bg-purple-600 text-white border-purple-700 shadow-xs' : 'bg-slate-100 text-slate-600 border-slate-300'}`}
        >
          <span>{cl.upload ? '🚀' : '⬜'}</span><span>3. Done Upload</span>
        </button>
      </div>
    );
  },

  // 4. Modul Panel Self-Care, Air Putih & Rumah Kucing Mekel
  WellnessAndMekelWidget: ({
    t,
    lang,
    selectedDate,
    wellnessOpen,
    setWellnessOpen,
    currentDayWellness,
    updateDayWellness,
    handleDrinkWaterGlass,
    handleResetWaterToday,
    waterReminderInterval,
    handleChangeWaterInterval,
    waterSecondsLeft,
    handleFeedMekelFood,
    handleGiveMekelWater,
    handleSpinSelfReward,
    handleSelectSpecificReward,
    notify
  }) => {
    const moodList = window.ALISYA_CONFIG.moodList;
    const favRewards = window.ALISYA_CONFIG.favoriteRewards;

    const waterCount = currentDayWellness.water || 0;
    const waterMl = waterCount * 250;
    const waterPct = Math.min(100, Math.round((waterCount / 8) * 100));
    const waterLogs = Array.isArray(currentDayWellness.waterLogs) ? currentDayWellness.waterLogs : [];

    const mekelFood = currentDayWellness.mekelFood || 0;
    const mekelFoodLogs = Array.isArray(currentDayWellness.mekelFoodLogs) ? currentDayWellness.mekelFoodLogs : [];
    const mekelWater = currentDayWellness.mekelWater || 0;
    const mekelWaterLogs = Array.isArray(currentDayWellness.mekelWaterLogs) ? currentDayWellness.mekelWaterLogs : [];

    const prep = currentDayWellness.prep || { makeup: false, bath: false, perfume: false, battery: false };
    const prepDoneCount = [prep.makeup, prep.bath, prep.perfume, prep.battery].filter(Boolean).length;
    const allPrepDone = prepDoneCount === 4;

    return (
      <div className="bg-white rounded-3xl border-2 border-pink-200/80 p-4 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-black text-maroon uppercase tracking-wider flex items-center gap-1.5">
              <span>{t.moodTrackerTitle}</span>
            </span>
            <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {t.autoResetBadge}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-pink-700 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">
              💧 {waterCount}/8 • 🐱 {mekelFood}/3 • 💄 {prepDoneCount}/4
            </span>
            <button
              type="button"
              onClick={() => setWellnessOpen(!wellnessOpen)}
              className="text-[10px] font-black text-maroon bg-pink-100 hover:bg-pink-200 px-2.5 py-1 rounded-xl border border-pink-300 transition"
            >
              {wellnessOpen ? `🔼 ${t.toggleHideWellness}` : `🔽 ${t.toggleShowWellness}`}
            </button>
          </div>
        </div>

        {wellnessOpen && (
          <div className="space-y-4 pt-1">
            {/* Pilihan Mood */}
            <div className="grid grid-cols-5 gap-1.5">
              {moodList.map(m => {
                const isSelected = currentDayWellness.mood === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => updateDayWellness({ mood: m.id })}
                    className={`py-2 px-1 rounded-2xl border text-center transition flex flex-col items-center gap-0.5 active:scale-95 ${isSelected ? `${m.color} font-black ring-2 ring-pink-400 scale-105 shadow-xs` : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-pink-50/50'}`}
                  >
                    <span className="text-lg">{m.emoji}</span>
                    <span className="text-[9px] leading-tight truncate w-full px-0.5">
                      {lang === 'id' ? m.labelId : m.labelEn}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 4 Ceklis Persiapan Live */}
            <div className="bg-pink-50/60 border border-pink-200 rounded-2xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-maroon uppercase tracking-wider">{t.beautyPrepTitle}</span>
                <span className="text-[10px] font-mono font-black text-pink-600">{prepDoneCount}/4 ✨</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { key: 'makeup', label: t.prepMakeup },
                  { key: 'bath', label: t.prepBath },
                  { key: 'perfume', label: t.prepPerfume },
                  { key: 'battery', label: t.prepBattery }
                ].map(item => {
                  const done = !!prep[item.key];
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => updateDayWellness({ prep: { ...prep, [item.key]: !done } })}
                      className={`p-2.5 rounded-xl border text-[11px] font-black text-left transition flex items-center justify-between active:scale-95 ${done ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-600 shadow-xs' : 'bg-white text-slate-700 border-pink-200 hover:bg-pink-50'}`}
                    >
                      <span className="truncate">{item.label}</span>
                      <span>{done ? '✅' : '⬜'}</span>
                    </button>
                  );
                })}
              </div>
              {allPrepDone && (
                <div className="bg-pink-100 border border-pink-300 text-maroon text-[10px] font-black py-1.5 px-3 rounded-xl text-center animate-pulse">
                  {t.prepAllDone}
                </div>
              )}
            </div>

            {/* Rumah Kucing Mekel */}
            <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50/70 border-2 border-pink-200 rounded-2xl p-3.5 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-12 rounded-2xl bg-white border-2 border-pink-200 flex items-center justify-center text-2xl shadow-2xs cute-float shrink-0">
                    {(mekelFood >= 2 && mekelWater >= 2) ? '😻' : '🐱'}
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-black text-maroon flex items-center gap-1.5 flex-wrap">
                      <span>{t.petName}</span>
                      <span className="bg-pink-200 text-pink-950 text-[9px] font-black px-2 py-0.5 rounded-full border border-pink-300">
                        ❤️ {currentDayWellness.petHearts || 0}
                      </span>
                    </div>
                    <p className="text-[10px] font-bold text-rose-800 leading-snug">
                      {(mekelFood >= 2 && mekelWater >= 2)
                        ? t.petHappy
                        : (mekelFood > 0 || mekelWater > 0)
                          ? t.petHalf
                          : t.petHungry}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    playMekelMeowSound();
                    updateDayWellness({ petHearts: (currentDayWellness.petHearts || 0) + 1 });
                    notify('🐾 Purrr~ Mekel senang banget dielus sama Alisya! 😻💖');
                  }}
                  className="bg-white hover:bg-pink-100 text-maroon border border-pink-300 font-black text-[10px] px-2.5 py-1.5 rounded-xl shadow-2xs active:scale-90 transition shrink-0"
                >
                  {t.petPatBtn}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/90 border border-pink-200 rounded-xl p-2.5 space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-black text-amber-900">{t.petFoodLabel}</span>
                    <span className="font-mono font-black text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                      {mekelFood}/3 🐟
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {Array.from({ length: 3 }).map((_, idx) => {
                      const fed = idx < mekelFood;
                      const fLog = mekelFoodLogs[idx];
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleFeedMekelFood(idx + 1 === mekelFood ? idx : idx + 1)}
                          className={`py-1.5 rounded-lg border text-center transition flex flex-col items-center justify-center active:scale-90 ${fed ? 'bg-amber-400 text-amber-950 border-amber-500 font-black shadow-2xs' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                        >
                          <span className="text-xs leading-none">{fed ? '🐟' : '🍽️'}</span>
                          <span className="text-[8px] font-mono mt-0.5">{fLog || `#${idx + 1}`}</span>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleFeedMekelFood(Math.min(3, mekelFood + 1))}
                    className="w-full bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 font-black text-[10px] py-1.5 rounded-lg transition active:scale-95"
                  >
                    + {t.petFeedFoodBtn}
                  </button>
                </div>

                <div className="bg-white/90 border border-pink-200 rounded-xl p-2.5 space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-black text-sky-900">{t.petWaterLabel}</span>
                    <span className="font-mono font-black text-sky-700 bg-sky-50 px-1.5 py-0.2 rounded border border-sky-200">
                      {mekelWater}/3 🥛
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {Array.from({ length: 3 }).map((_, idx) => {
                      const watered = idx < mekelWater;
                      const wLog = mekelWaterLogs[idx];
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleGiveMekelWater(idx + 1 === mekelWater ? idx : idx + 1)}
                          className={`py-1.5 rounded-lg border text-center transition flex flex-col items-center justify-center active:scale-90 ${watered ? 'bg-sky-400 text-white border-sky-500 font-black shadow-2xs' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                        >
                          <span className="text-xs leading-none">{watered ? '🥛' : '🥣'}</span>
                          <span className="text-[8px] font-mono mt-0.5">{wLog || `#${idx + 1}`}</span>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleGiveMekelWater(Math.min(3, mekelWater + 1))}
                    className="w-full bg-sky-100 hover:bg-sky-200 text-sky-950 border border-sky-300 font-black text-[10px] py-1.5 rounded-lg transition active:scale-95"
                  >
                    + {t.petFeedWaterBtn}
                  </button>
                </div>
              </div>
            </div>

            {/* Hidrasi Air Putih Alisya */}
            <div className="bg-gradient-to-br from-pink-50 via-rose-50/70 to-sky-50/60 border-2 border-pink-200/80 rounded-2xl p-3.5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-black text-rose-950 flex items-center gap-1">
                    <span>{t.waterTitle}</span>
                  </div>
                  <div className="text-[10px] font-bold text-pink-700">
                    Total Hari Ini: <span className="font-black text-maroon">{waterCount} Kali Minum</span> ({waterMl} ml / 2.000 ml)
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-black text-xs text-pink-700 bg-white px-2.5 py-1 rounded-xl border border-pink-200 shadow-2xs">
                    {waterCount} / 8 🥤
                  </span>
                  {waterCount > 0 && (
                    <button
                      type="button"
                      onClick={handleResetWaterToday}
                      className="text-[10px] font-bold text-rose-500 hover:underline px-1"
                    >
                      {t.waterResetBtn}
                    </button>
                  )}
                </div>
              </div>

              <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-pink-200 p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 via-pink-400 to-rose-500 transition-all duration-500"
                  style={{ width: `${waterPct}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-8 gap-1.5">
                {Array.from({ length: 8 }).map((_, idx) => {
                  const filled = idx < waterCount;
                  const logTime = waterLogs[idx];
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleDrinkWaterGlass(idx + 1 === waterCount ? idx : idx + 1)}
                      className={`h-11 rounded-xl border flex flex-col items-center justify-center transition active:scale-90 relative ${filled ? 'bg-gradient-to-b from-pink-400 to-rose-500 text-white border-rose-500 shadow-sm' : 'bg-white border-pink-200 text-slate-400 hover:border-pink-400'}`}
                    >
                      <span className="text-sm leading-none">{filled ? '🥤' : '🥛'}</span>
                      <span className={`text-[8px] font-mono font-black mt-0.5 ${filled ? 'text-pink-100' : 'text-slate-400'}`}>
                        {logTime ? logTime : `#${idx + 1}`}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => handleDrinkWaterGlass(waterCount + 1)}
                className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 text-white font-black text-xs py-2.5 rounded-2xl shadow-md active:scale-95 transition flex items-center justify-center gap-2 border border-pink-300"
              >
                <span>{t.waterDrinkNowBtn}</span>
              </button>

              <div className="bg-white/90 border border-pink-200 rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-maroon">{t.waterReminderTitle}</span>
                  <select
                    value={waterReminderInterval}
                    onChange={e => handleChangeWaterInterval(e.target.value)}
                    className="bg-pink-50 border border-pink-300 text-maroon font-black rounded-lg px-2 py-1 text-[10px] focus:outline-none cursor-pointer"
                  >
                    <option value={0}>{t.waterRemOff}</option>
                    <option value={30}>{t.waterRem30}</option>
                    <option value={60}>{t.waterRem60}</option>
                    <option value={90}>{t.waterRem90}</option>
                    <option value={120}>{t.waterRem120}</option>
                  </select>
                </div>
                {waterReminderInterval > 0 && (
                  <div className="font-mono text-[10px] font-black text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping"></span>
                    <span>{t.waterNextIn} {formatSecondsToMS(waterSecondsLeft)}</span>
                  </div>
                )}
              </div>

              <div className="bg-white/80 border border-pink-200/70 rounded-xl p-2.5 space-y-1.5">
                <div className="text-[10px] font-black text-maroon flex items-center justify-between">
                  <span>{t.waterHistoryTitle}</span>
                  <span className="text-[9px] text-pink-600 font-bold">{waterLogs.length}x tercatat</span>
                </div>
                {waterLogs.length === 0 ? (
                  <div className="text-[10px] text-rose-700/80 italic font-medium leading-snug">
                    {t.waterEmptyLog}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1">
                    {waterLogs.map((tm, idx) => (
                      <span
                        key={idx}
                        className="bg-pink-100/90 border border-pink-300 text-maroon font-mono text-[9px] font-black px-2 py-0.5 rounded-lg flex items-center gap-1"
                      >
                        <span>🥤#{idx + 1}</span>
                        <span>{tm}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Jajanan Self-Reward Favorit Alisya */}
            <div className="bg-amber-50/90 border-2 border-amber-200 rounded-2xl p-3 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="space-y-0.5 min-w-0">
                  <div className="text-[10px] font-black text-amber-900 uppercase">{t.rewardTitle}</div>
                  <div className="text-xs font-extrabold text-maroon truncate">
                    {currentDayWellness.reward || (lang === 'id' ? "Pilih atau acak jajanan favoritmu hari ini! 😋✨" : "Pick or spin your favorite treat today! 😋✨")}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSpinSelfReward}
                  className="bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white font-black text-[10px] px-3 py-1.5 rounded-xl shadow active:scale-95 transition shrink-0"
                >
                  {t.rewardSpinBtn}
                </button>
              </div>

              <div className="space-y-1">
                <div className="text-[9px] font-bold text-amber-800">{t.rewardPickHint}</div>
                <div className="flex flex-wrap gap-1">
                  {favRewards.map(item => {
                    const fullText = `${item.emoji} ${lang === 'id' ? item.labelId : item.labelEn}`;
                    const isPicked = currentDayWellness.reward === fullText;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectSpecificReward(item)}
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-black border transition active:scale-95 ${isPicked ? 'bg-maroon text-white border-maroon shadow-xs' : 'bg-white text-amber-950 border-amber-300 hover:bg-amber-100'}`}
                      >
                        {lang === 'id' ? item.shortId : item.shortEn}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Diary Syukur Harian */}
            <div className="bg-pink-50/70 border border-pink-200 rounded-2xl p-3 space-y-1.5">
              <label className="block text-[10px] font-black text-maroon">{t.diaryTitle}</label>
              <input
                type="text"
                value={currentDayWellness.diary || ''}
                onChange={e => updateDayWellness({ diary: e.target.value }, false)}
                placeholder={t.diaryPlaceholder}
                className="w-full bg-white border border-pink-200 rounded-xl px-3 py-2 text-xs font-bold text-rose-950 placeholder:text-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
};
