'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  { label: 'Sản phẩm', href: '/san-pham', hasDropdown: true },
  { label: 'Tin tức', href: '/tin-tuc' },
  { label: 'Liên hệ', href: '/lien-he' },
];

const dropdownCategories = [
  { label: 'Giày thể thao', href: '/san-pham?cat=giay-the-thao' },
  { label: 'Giày da nam', href: '/san-pham?cat=giay-da-nam' },
  { label: 'Giày cao gót', href: '/san-pham?cat=giay-cao-got' },
  { label: 'Dép & Sandal', href: '/san-pham?cat=dep-sandal' },
  { label: 'Giày trẻ em', href: '/san-pham?cat=giay-tre-em' },
  { label: 'Giày vải', href: '/san-pham?cat=giay-vai' },
  { label: 'Giày bảo hộ', href: '/san-pham?cat=giay-bao-ho' },
  { label: 'Phụ kiện giày', href: '/san-pham?cat=phu-kien-giay' },
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
      <div className="bg-[#271C1C] border-b border-[#3d2a2a]">
        <div className="max-w-[1200px] mx-auto px-3 flex items-center justify-center">
          <nav className="hidden md:flex items-center justify-center">
            {navItems.map(item => (
              item.hasDropdown ? (
                <div key={item.label} className="nav-item relative">
                  <Link
                    href={item.href}
                    className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1 ${
                      isActive(item.href)
                        ? 'text-yellow-400 border-yellow-400'
                        : 'text-gray-300 hover:text-yellow-400 hover:border-yellow-400 border-transparent'
                    }`}
                  >
                    {item.label} ▾
                  </Link>
                  <div className="nav-dropdown absolute top-full left-0 w-52 bg-[#271C1C] border border-[#3d2a2a] rounded shadow-xl z-50 py-1">
                    {dropdownCategories.map(cat => (
                      <Link
                        key={cat.label}
                        href={cat.href}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#3d2a2a] hover:text-yellow-400 transition-colors"
                      >
                        {cat.label}
                      </Link>
                    ))}
                    <div className="border-t border-[#3d2a2a] mt-1 pt-1">
                      <Link href="/san-pham" className="block px-4 py-2 text-sm font-semibold text-yellow-400 hover:bg-[#3d2a2a] transition-colors">
                        Xem tất cả sản phẩm →
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    isActive(item.href)
                      ? 'text-yellow-400 border-yellow-400'
                      : 'text-gray-300 hover:text-yellow-400 hover:border-yellow-400 border-transparent'
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-3 ml-auto"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <div className="w-5 h-0.5 bg-gray-300 mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-300 mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-300"></div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#3d2a2a] bg-[#271C1C]">
            {navItems.map(item => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-[#3d2a2a] hover:text-yellow-400 border-b border-[#3d2a2a]"
                >
                  {item.label}{item.hasDropdown ? ' ▾' : ''}
                </Link>
                {item.hasDropdown && dropdownCategories.map(cat => (
                  <Link
                    key={cat.label}
                    href={cat.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-8 py-2 text-sm text-gray-400 hover:bg-[#3d2a2a] hover:text-yellow-400 border-b border-[#3d2a2a]"
                  >
                    ▸ {cat.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
