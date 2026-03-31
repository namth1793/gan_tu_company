export default function TopBar() {
  return (
    <div className="bg-[#1a0f0f] text-gray-400 text-xs border-b border-white/5">
      <div className="max-w-[1200px] mx-auto px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <svg className="w-3 h-3 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            55 Lý Nam Đế, P. Minh Phụng, TP. Hồ Chí Minh
          </span>
          <span className="hidden md:flex items-center gap-1.5">
            <svg className="w-3 h-3 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            190-192 Quốc lộ 1A, P. Long An, Tây Ninh
          </span>
          <span className="hidden lg:flex items-center gap-1.5">
            <svg className="w-3 h-3 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            info@gantu.vn
          </span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="hidden sm:flex items-center gap-1.5">
            <svg className="w-3 h-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            T2–T7: 8:00 – 17:30
          </span>
          <div className="w-px h-3 bg-white/10" />
          <a href="tel:0902487928" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1">
            🇻🇳 0902 487 928
          </a>
          <div className="w-px h-3 bg-white/10 hidden sm:block" />
          <a href="tel:+8615159818989" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors hidden sm:flex items-center gap-1">
            🇨🇳 +86 1515 981 8989
          </a>
        </div>
      </div>
    </div>
  );
}
