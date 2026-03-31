'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-6">
      {/* Main footer */}
      <div className="max-w-[1200px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1: Company info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-amber-400 flex items-center justify-center font-black text-gray-900 text-sm shadow">
                GT
              </div>
              <div>
                <div className="text-white font-black text-lg leading-none">GAN TU</div>
                <div className="text-amber-400/60 text-[9px] uppercase tracking-widest">Industrial Supply Co.</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Chuyên cung cấp máy móc thiết bị & nguyên phụ liệu sản xuất giày. Nhập khẩu trực tiếp từ Nhật, Đài Loan, Trung Quốc.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span className="text-gray-400"><span className="text-gray-500 text-xs">Văn phòng:</span> 55 Lý Nam Đế, P. Minh Phụng, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="text-gray-400"><span className="text-gray-500 text-xs">Kho:</span> 190-192 Quốc lộ 1A, P. Long An, Tây Ninh</span>
              </div>
            </div>
            <div className="mt-4 space-y-1.5">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1.5">Liên hệ trực tiếp</div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-[10px] text-gray-500 flex items-center gap-1 mb-0.5">🇻🇳 Việt Nam</div>
                  <a href="tel:0902487928" className="block text-amber-400 font-bold text-sm hover:text-amber-300 transition-colors">0902 487 928</a>
                  <a href="tel:0938836060" className="block text-amber-400 text-sm hover:text-amber-300 transition-colors">0938 836 060</a>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 flex items-center gap-1 mb-0.5">🇨🇳 Trung Quốc</div>
                  <a href="tel:+8615159818989" className="block text-amber-400/80 text-xs hover:text-amber-300 transition-colors">+86 1515 981 8989</a>
                  <a href="tel:+8613489274273" className="block text-amber-400/80 text-xs hover:text-amber-300 transition-colors">+86 1348 927 4273</a>
                </div>
              </div>
              <a href="mailto:info@gantu.vn" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-200 transition-colors mt-1">
                <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@gantu.vn
              </a>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <a href="#" className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-600/30 flex items-center justify-center hover:bg-blue-600/40 transition-colors text-blue-400 text-xs font-bold">f</a>
              <a href="#" className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-600/30 flex items-center justify-center hover:bg-red-600/40 transition-colors text-red-400 text-xs font-bold">YT</a>
              <a href="#" className="w-8 h-8 rounded-lg bg-blue-700/20 border border-blue-700/30 flex items-center justify-center hover:bg-blue-700/40 transition-colors text-blue-300 text-xs font-bold">in</a>
            </div>
          </div>

          {/* Col 2: Quick links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-amber-400 inline-block" />
              Liên kết nhanh
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Trang chủ', href: '/' },
                { label: 'Giới thiệu công ty', href: '/gioi-thieu' },
                { label: 'Tất cả sản phẩm', href: '/san-pham' },
                { label: 'Dịch vụ', href: '/dich-vu' },
                { label: 'Hồ sơ năng lực', href: '/ho-so-nang-luc' },
                { label: 'Tin tức', href: '/tin-tuc' },
                { label: 'Nhận báo giá', href: '/nhan-bao-gia' },
                { label: 'Liên hệ', href: '/lien-he' },
              ].map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors group">
                    <svg className="w-3 h-3 text-amber-600 group-hover:text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Product categories */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-amber-400 inline-block" />
              Danh mục sản phẩm
            </h4>
            <ul className="space-y-2 text-sm mb-6">
              {[
                { label: 'Máy móc',      slug: 'may-moc',    icon: '⚙️' },
                { label: 'Thành phẩm',   slug: 'thanh-pham', icon: '👟' },
                { label: 'Đế giày',      slug: 'de-giay',    icon: '🔲' },
                { label: 'Hoá chất',     slug: 'hoa-chat',   icon: '🧪' },
                { label: 'Đế sandal',    slug: 'de-sandal',  icon: '🩴' },
                { label: 'Khuôn / Mold', slug: 'khuon-mold', icon: '🔧' },
              ].map(c => (
                <li key={c.label}>
                  <Link href={`/san-pham?cat=${c.slug}`} className="flex items-center gap-2.5 text-gray-400 hover:text-amber-400 transition-colors group">
                    <span className="text-sm w-5 text-center">{c.icon}</span>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Opening hours */}
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Giờ làm việc</div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Thứ 2 – Thứ 7</span>
                <span className="text-amber-400 font-semibold">8:00 – 17:30</span>
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-gray-400">Chủ nhật</span>
                <span className="text-gray-500">Nghỉ</span>
              </div>
              <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-[10px] font-medium">Hỗ trợ kỹ thuật 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-3">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© 2026 Công ty TNHH SX TM Gan Tu. Bảo lưu mọi quyền.</span>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-gray-300 transition-colors">Chính sách bảo mật</a>
            <span className="text-gray-700">|</span>
            <a href="#" className="hover:text-gray-300 transition-colors">Điều khoản</a>
            <Link href="/admin" className="text-gray-800 hover:text-gray-500 transition-colors opacity-30 hover:opacity-100" title="Admin">🔐</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
