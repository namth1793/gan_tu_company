'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-6">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Col 1: Company info */}
          <div>
            <div className="text-white font-black text-xl mb-0.5">GAN TU</div>
            <div className="text-yellow-400 text-xs mb-3 leading-tight">CÔNG TY TNHH SẢN XUẤT THƯƠNG MẠI GAN TU</div>
            <p className="text-sm mb-1.5 flex items-start gap-2">
              <span className="flex-shrink-0">🏢</span>
              <span><span className="text-gray-400 text-xs">Văn phòng:</span> 55 Lý Nam Đế, P. Minh Phụng, TP. Hồ Chí Minh</span>
            </p>
            <p className="text-sm mb-1.5 flex items-start gap-2">
              <span className="flex-shrink-0">🏭</span>
              <span><span className="text-gray-400 text-xs">Xưởng SX:</span> 190-192 Quốc lộ 1A, P. Long An, Tây Ninh</span>
            </p>
            <div className="text-sm mb-1.5 space-y-0.5">
              <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">🇻🇳 Việt Nam</div>
              <div>📞 <a href="tel:0902487928" className="text-yellow-400 font-bold hover:text-yellow-300 transition-colors">0902 487 928</a></div>
              <div>📞 <a href="tel:0938 836 060" className="text-yellow-400 font-bold hover:text-yellow-300 transition-colors">0938 836 060</a></div>
            </div>
            <div className="text-sm mb-1.5 space-y-0.5">
              <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">🇨🇳 Trung Quốc</div>
              <div>📞 <a href="tel:+8615159818989" className="text-yellow-400 hover:text-yellow-300 transition-colors">+86 1515 981 8989</a></div>
              <div>📞 <a href="tel:+8613489274273" className="text-yellow-400 hover:text-yellow-300 transition-colors">+86 1348 927 4273</a></div>
            </div>
            <p className="text-sm mb-1.5">
              📧 <a href="mailto:info@gantu.vn" className="hover:text-white transition-colors">info@gantu.vn</a>
            </p>
            <p className="text-sm">🕐 T2-T7: 7:30 – 17:30 | Hỗ trợ 24/7</p>
            {/* Social */}
            <div className="flex items-center gap-2 mt-4">
              <a href="#" className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors text-xs font-bold text-white">f</a>
              <a href="#" className="w-8 h-8 bg-red-600 rounded flex items-center justify-center hover:bg-red-700 transition-colors text-xs font-bold text-white">YT</a>
              <a href="#" className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center hover:bg-blue-800 transition-colors text-xs font-bold text-white">in</a>
            </div>
          </div>

          {/* Col 2: Quick links */}
          <div>
            <h4 className="text-white font-bold mb-3 text-sm uppercase border-b border-gray-700 pb-2">Liên kết nhanh</h4>
            <ul className="space-y-1.5 text-sm">
              {[
                { label: 'Trang chủ', href: '/' },
                { label: 'Giới thiệu', href: '/gioi-thieu' },
                { label: 'Sản phẩm', href: '/san-pham' },
                { label: 'Tin tức', href: '/tin-tuc' },
                { label: 'Liên hệ', href: '/lien-he' },
                { label: 'Chính sách đổi trả', href: '/lien-he' },
                { label: 'Hướng dẫn chọn size', href: '/lien-he' },
                { label: 'Chăm sóc giày dép', href: '/tin-tuc' },
              ].map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="hover:text-yellow-400 transition-colors flex items-center gap-1.5">
                    <span className="text-green-600">▸</span> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Product categories */}
          <div>
            <h4 className="text-white font-bold mb-3 text-sm uppercase border-b border-gray-700 pb-2">Danh mục sản phẩm</h4>
            <ul className="space-y-1.5 text-sm">
              {[
                { label: 'Giày thể thao', slug: 'giay-the-thao' },
                { label: 'Giày da nam', slug: 'giay-da-nam' },
                { label: 'Giày cao gót', slug: 'giay-cao-got' },
                { label: 'Dép & sandal', slug: 'dep-sandal' },
                { label: 'Giày trẻ em', slug: 'giay-tre-em' },
                { label: 'Giày vải', slug: 'giay-vai' },
                { label: 'Phụ kiện giày', slug: 'phu-kien-giay' },
              ].map(c => (
                <li key={c.label}>
                  <Link href={`/san-pham?cat=${c.slug}`} className="hover:text-yellow-400 transition-colors flex items-center gap-1.5">
                    <span className="text-green-600">▸</span> {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-3 text-center text-xs text-gray-500">
        © 2026 Gan Tu Company. All rights reserved. |{' '}
        <a href="#" className="hover:text-gray-300 transition-colors">Chính sách bảo mật</a>
        {' '}|{' '}
        <a href="#" className="hover:text-gray-300 transition-colors">Điều khoản sử dụng</a>
        <Link href="/admin" className="ml-3 text-gray-700 hover:text-gray-500 transition-colors opacity-30 hover:opacity-100" title="Admin">🔐</Link>
      </div>
    </footer>
  );
}
