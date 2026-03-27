'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function TopBanner() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/san-pham?search=${encodeURIComponent(search.trim())}${category ? `&cat=${category}` : ''}`;
    }
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center gap-4">

        {/* TRÁI: Logo */}
        <Link href="/" className="flex-shrink-0 hover:opacity-90 transition-opacity">
          <Image
            src="/logo.png"
            alt="Gan Tu Logo"
            width={150}
            height={85}
            className="object-contain"
            priority
          />
        </Link>

        {/* GIỮA: Tên công ty + Search */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <Link href="/" className="text-center group">
            <h1 className="text-[#271C1C] font-black text-xl tracking-wide uppercase leading-tight group-hover:text-yellow-500 transition-colors">
              CÔNG TY TNHH SẢN XUẤT THƯƠNG MẠI GAN TU
            </h1>
            <p className="text-gray-400 text-xs tracking-widest uppercase mt-0.5">
              Thời Trang Giày Dép Chất Lượng Cao
            </p>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex w-full max-w-xl rounded overflow-hidden shadow-lg">
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="bg-white text-gray-700 text-sm px-2 border-r border-gray-200 focus:outline-none h-10 cursor-pointer"
            >
              <option value="">Tất cả</option>
              <option value="giay-the-thao">Giày thể thao</option>
              <option value="giay-da-nam">Giày da nam</option>
              <option value="giay-cao-got">Giày cao gót</option>
              <option value="dep-sandal">Dép & Sandal</option>
              <option value="giay-tre-em">Giày trẻ em</option>
              <option value="giay-vai">Giày vải</option>
              <option value="giay-bao-ho">Giày bảo hộ</option>
            </select>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Tìm kiếm sản phẩm giày dép..."
              className="flex-1 px-3 text-sm h-10 focus:outline-none text-gray-700"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-5 h-10 text-sm font-bold transition-colors"
            >
              🔍 Tìm
            </button>
          </form>
        </div>

        {/* PHẢI: Hotline */}
        <div className="flex-shrink-0 bg-[#271C1C] rounded-lg px-4 py-3 text-center space-y-1.5">
          <div className="text-yellow-400 text-[10px] uppercase tracking-widest font-bold">📞 Liên hệ</div>
          <div>
            <div className="text-gray-400 text-[9px] mb-0.5">🇻🇳 Việt Nam</div>
            <a href="tel:0902487928" className="text-white font-black text-sm hover:text-yellow-400 transition-colors block leading-tight">0902 487 928</a>
            <a href="tel:0938 836 060" className="text-white font-black text-sm hover:text-yellow-400 transition-colors block leading-tight">0938 836 060</a>
          </div>
          <div>
            <div className="text-gray-400 text-[9px] mb-0.5">🇨🇳 Trung Quốc</div>
            <a href="tel:+8615159818989" className="text-gray-300 text-xs hover:text-yellow-400 transition-colors block leading-tight">+86 1515 981 8989</a>
            <a href="tel:+8613489274273" className="text-gray-300 text-xs hover:text-yellow-400 transition-colors block leading-tight">+86 1348 927 4273</a>
          </div>
        </div>

      </div>
    </div>
  );
}
