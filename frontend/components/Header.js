'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Trang chủ',      href: '/' },
  { label: 'Giới thiệu',     href: '/gioi-thieu' },
  { label: 'Sản phẩm',       href: '/san-pham', hasDropdown: true },
  { label: 'Dịch vụ',        href: '/dich-vu' },
  { label: 'Hồ sơ',          href: '/ho-so-nang-luc' },
  { label: 'Tin tức',        href: '/tin-tuc' },
  { label: 'Video',          href: '/video' },
  { label: 'Hỗ trợ',        href: '/ho-tro' },
  { label: 'Liên hệ',        href: '/lien-he' },
];

const dropdownCategories = [
  { label: 'Máy móc',      href: '/san-pham?cat=may-moc',    icon: '⚙️' },
  { label: 'Thành phẩm',   href: '/san-pham?cat=thanh-pham', icon: '👟' },
  { label: 'Đế giày',      href: '/san-pham?cat=de-giay',    icon: '🔲' },
  { label: 'Hoá chất',     href: '/san-pham?cat=hoa-chat',   icon: '🧪' },
  { label: 'Đế sandal',    href: '/san-pham?cat=de-sandal',  icon: '🩴' },
  { label: 'Khuôn / Mold', href: '/san-pham?cat=khuon-mold', icon: '🔧' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href.split('?')[0]);
  };

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Logo bar */}
      <div className="bg-[#271C1C] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between py-2.5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-amber-400 flex items-center justify-center font-black text-gray-900 text-sm shadow-md group-hover:bg-amber-300 transition-colors">
              GT
            </div>
            <div className="leading-none">
              <div className="text-white font-black text-lg tracking-wide group-hover:text-amber-300 transition-colors">GAN TU</div>
              <div className="text-amber-400/70 text-[9px] uppercase tracking-widest font-medium">Industrial Supply Co.</div>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center">
            {navItems.map((item, idx) => (
              <div key={item.label} className="flex items-center">
                {idx > 0 && <span className="w-px h-3.5 bg-white/10 mx-0.5 flex-shrink-0" />}

                {item.hasDropdown ? (
                  <div className="nav-item relative">
                    <Link
                      href={item.href}
                      className={`px-3.5 py-2.5 text-[13px] font-medium transition-all whitespace-nowrap flex items-center gap-1 ${
                        isActive(item.href)
                          ? 'text-amber-400'
                          : 'text-gray-300 hover:text-amber-400'
                      }`}
                    >
                      {item.label}
                      <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                    <div className="nav-dropdown absolute top-full left-0 w-52 bg-[#1a0f0f] border border-white/10 rounded-lg shadow-2xl z-50 py-2 mt-1">
                      {dropdownCategories.map(cat => (
                        <Link
                          key={cat.label}
                          href={cat.href}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-amber-400 transition-colors"
                        >
                          <span className="text-base w-5 text-center">{cat.icon}</span>
                          {cat.label}
                        </Link>
                      ))}
                      <div className="border-t border-white/10 mt-1.5 pt-1.5 px-2">
                        <Link href="/san-pham" className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-semibold text-amber-400 hover:bg-white/5 rounded transition-colors">
                          Xem tất cả sản phẩm
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-3.5 py-2.5 text-[13px] font-medium transition-all whitespace-nowrap ${
                      isActive(item.href)
                        ? 'text-amber-400'
                        : 'text-gray-300 hover:text-amber-400'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/nhan-bao-gia"
              className="hidden lg:flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-xs px-4 py-2 rounded-lg transition-all shadow hover:shadow-md hover:-translate-y-px"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Nhận báo giá
            </Link>
            <button
              className="md:hidden p-1.5 text-gray-300 hover:text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Active page indicator bar */}
      <div className="h-0.5 bg-gradient-to-r from-[#271C1C] via-amber-400 to-[#271C1C]" />

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1a0f0f] border-t border-white/10 shadow-xl">
          {navItems.map(item => (
            <div key={item.label}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between px-5 py-3 text-sm font-medium border-b border-white/5 transition-colors ${
                  isActive(item.href) ? 'text-amber-400 bg-white/5' : 'text-gray-300 hover:bg-white/5 hover:text-amber-400'
                }`}
              >
                {item.label}
                {item.hasDropdown && (
                  <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>
              {item.hasDropdown && dropdownCategories.map(cat => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 pl-10 pr-5 py-2.5 text-sm text-gray-400 hover:bg-white/5 hover:text-amber-400 border-b border-white/5 transition-colors"
                >
                  <span className="text-sm">{cat.icon}</span>
                  {cat.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="p-4">
            <Link
              href="/nhan-bao-gia"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-sm py-2.5 rounded-lg transition-colors w-full"
            >
              Nhận báo giá ngay
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
