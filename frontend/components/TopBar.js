export default function TopBar() {
  return (
    <div className="bg-[#1a1010] text-gray-400 text-xs">
      <div className="max-w-[1200px] mx-auto px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-wrap">
          <span>🏢 VP: 55 Lý Nam Đế, P. Minh Phụng, TP. Hồ Chí Minh</span>
          <span className="hidden md:inline">🏭 Xưởng: 190-192 Quốc lộ 1A, P. Long An, Tây Ninh</span>
          <span className="hidden lg:inline">✉️ contact@gantu.vn</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="hidden sm:inline">⏰ T2–T7: 8:00 – 20:00</span>
          <a href="tel:0902487928" className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors">
            🇻🇳 0902 487 928
          </a>
          <span className="text-gray-600">|</span>
          <a href="tel:+8615159818989" className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors hidden sm:inline">
            🇨🇳 +86 1515 981 8989
          </a>
        </div>
      </div>
    </div>
  );
}
