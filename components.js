// ============================================================================
// 🧩 MODUL 3: COMPONENTS.JS (Komponen Mandiri Murni - Anti Layar Putih)
// ============================================================================

const { formatSecondsToMS, playMekelMeowSound } = window.ALISYA_UTILS;

window.ALISYA_COMPONENTS = {
  // 1. Strip Sapaan & Afirmasi Manis di Radar
  CompactGreetingStrip: function({ cuteGreeting, quoteText, onBoostMood, cheerBtnLabel }) {
    const h = React.createElement;
    return h('div', { className: "bg-white/15 backdrop-blur-xs rounded-2xl px-3.5 py-2 border border-pink-200/30 flex flex-wrap items-center justify-between gap-2 text-xs" },
      h('div', { className: "flex items-center gap-2 min-w-0 flex-1" },
        h('span', { className: "text-base shrink-0 cute-float" }, "🎀"),
        h('span', { className: "font-black text-pink-200 whitespace-nowrap" }, cuteGreeting),
        h('span', { className: "text-rose-100/90 italic font-medium truncate" }, `— "${quoteText}"`)
      ),
      h('button', {
        type: "button",
        onClick: onBoostMood,
        className: "bg-pink-500/80 hover:bg-pink-500 text-white font-black text-[10px] px-2.5 py-1 rounded-xl shadow-xs active:scale-95 transition shrink-0 border border-pink-300/50"
      }, `🎲 ${cheerBtnLabel}`)
    );
  },

  // 2. Banner Countdown Detik Real-Time (HH:MM:SS)
  LiveNowBanner: function({ t, liveTracker, realTodayStr }) {
    const h = React.createElement;
    return h('div', { className: "bg-black/30 rounded-2xl p-3.5 border border-white/15 space-y-3 mt-2 shadow-inner" },
      h('div', { className: "flex flex-wrap items-center justify-between gap-2 text-xs" },
        h('div', { className: "flex flex-wrap items-center gap-2" },
          liveTracker.activeItem ? h('div', { className: "flex flex-wrap items-center gap-2" },
            h('span', { className: "flex items-center gap-1.5 font-black text-emerald-300 text-xs sm:text-sm" },
              h('span', { className: "w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" }),
              h('span', null, `${t.liveNowActive} ${liveTracker.activeItem.title}`)
            ),
            h('span', { className: "bg-white/15 text-rose-100 font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-lg border border-white/15" },
              `⏰ ${liveTracker.activeItem.start_time} - ${liveTracker.activeItem.end_time} (${t.endsAt} ${liveTracker.activeItem.end_time})`
            ),
            h('span', { className: "bg-emerald-500 text-slate-950 font-mono font-black text-xs px-2.5 py-1 rounded-xl shadow flex items-center gap-1" },
              h('span', null, `⏳ ${t.timeLeft}`),
              h('span', { className: "tracking-wider" }, liveTracker.activeItem.remainingHMS)
            )
          ) : h('span', { className: "text-rose-200 font-bold" }, t.liveNowIdle)
        ),
        liveTracker.nextItem && h('div', { className: "text-[11px] font-bold bg-amber-400/20 border border-amber-300/30 px-3 py-1 rounded-xl text-amber-200 flex items-center gap-1.5" },
          h('span', null, `⏭️ ${t.nextUp}`),
          h('span', { className: "text-white font-black" }, liveTracker.nextItem.title),
          h('span', { className: "font-mono text-amber-300" }, `(${liveTracker.nextItem.start_time})`),
          h('span', { className: "bg-black/40 text-amber-300 font-mono font-black px-2 py-0.5 rounded-lg" }, `-${liveTracker.nextItem.startsInHMS}`)
        )
      ),
      liveTracker.activeItem && h('div', { className: "space-y-1" },
        h('div', { className: "flex justify-between text-[10px] text-emerald-200 font-bold" },
          h('span', null, `⚡ ${t.sessionProgress}: ${liveTracker.activeItem.title}`),
          h('span', { className: "font-mono" }, `${liveTracker.activeItem.sessionPct}%`)
        ),
        h('div', { className: "w-full h-1.5 bg-black/40 rounded-full overflow-hidden" },
          h('div', { className: "h-full bg-gradient-to-r from-pink-300 via-amber-300 to-emerald-400 transition-all duration-300", style: { width: `${liveTracker.activeItem.sessionPct}%` } })
        )
      ),
      h('div', { className: "space-y-1" },
        h('div', { className: "flex justify-between text-[10px] text-rose-200 font-bold" },
          h('span', null, `📅 ${t.progressToday} (${realTodayStr})`),
          h('span', { className: "font-mono" }, `${liveTracker.progressPct}% ${t.completed}`)
        ),
        h('div', { className: "w-full h-2 bg-black/40 rounded-full overflow-hidden" },
          h('div', { className: "h-full bg-gradient-to-r from-pink-400 via-rose-300 to-emerald-300 transition-all duration-500", style: { width: `${liveTracker.progressPct}%` } })
        )
      )
    );
  },

  // 3. Checklist Produksi Konten Affiliate
  KontenChecklist: function({ item, onToggleChecklist }) {
    const h = React.createElement;
    if (item.brand_id !== 'b_konten' && item.status !== 'Konten') return null;
    const cl = item.checklist || { shoot: false, edit: false, upload: false };
    return h('div', { className: "flex flex-wrap items-center gap-1.5 pt-1.5", onClick: e => e.stopPropagation() },
      h('button', {
        type: "button",
        onClick: (e) => onToggleChecklist(e, item.id, 'shoot'),
        className: `px-2.5 py-1 rounded-xl text-[10px] font-black border transition flex items-center gap-1 ${cl.shoot ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs' : 'bg-slate-100 text-slate-600 border-slate-300'}`
      }, h('span', null, cl.shoot ? '✅' : '⬜'), h('span', null, "1. Take Video")),
      h('button', {
        type: "button",
        onClick: (e) => onToggleChecklist(e, item.id, 'edit'),
        className: `px-2.5 py-1 rounded-xl text-[10px] font-black border transition flex items-center gap-1 ${cl.edit ? 'bg-amber-500 text-white border-amber-600 shadow-xs' : 'bg-slate-100 text-slate-600 border-slate-300'}`
      }, h('span', null, cl.edit ? '✅' : '⬜'), h('span', null, "2. Editing")),
      h('button', {
        type: "button",
        onClick: (e) => onToggleChecklist(e, item.id, 'upload'),
        className: `px-2.5 py-1 rounded-xl text-[10px] font-black border transition flex items-center gap-1 ${cl.upload ? 'bg-purple-600 text-white border-purple-700 shadow-xs' : 'bg-slate-100 text-slate-600 border-slate-300'}`
      }, h('span', null, cl.upload ? '🚀' : '⬜'), h('span', null, "3. Done Upload"))
    );
  }
};
