'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const categories = [
  { id: 1, name: 'Giày thể thao', slug: 'giay-the-thao', icon: '👟' },
  { id: 2, name: 'Giày da nam', slug: 'giay-da-nam', icon: '👞' },
  { id: 3, name: 'Giày cao gót', slug: 'giay-cao-got', icon: '👠' },
  { id: 4, name: 'Dép & Sandal', slug: 'dep-sandal', icon: '🩴' },
  { id: 5, name: 'Giày trẻ em', slug: 'giay-tre-em', icon: '👟' },
  { id: 6, name: 'Giày vải', slug: 'giay-vai', icon: '👟' },
  { id: 7, name: 'Giày bảo hộ', slug: 'giay-bao-ho', icon: '🦺' },
  { id: 8, name: 'Phụ kiện giày', slug: 'phu-kien-giay', icon: '🎀' },
];

export default function Sidebar() {
  return (
    <div>
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        {/* Header */}
        <div className="bg-[#271C1C] px-3 py-2.5">
          <h2 className="text-white font-bold text-sm uppercase tracking-wide">Danh mục sản phẩm</h2>
        </div>

        {/* Category list */}
        <ul className="divide-y divide-gray-100">
          {categories.map(cat => (
            <li key={cat.id}>
              <Link
                href={`/san-pham?cat=${cat.slug}`}
                className="flex items-center justify-between px-3 py-2.5 text-sm transition-colors group hover:bg-[#271C1C] hover:text-white text-gray-700"
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{cat.icon}</span>
                  <span>{cat.name}</span>
                </span>
                <span className="text-xs text-gray-400 group-hover:text-white">▶</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Support box */}
      <div className="mt-3 bg-[#271C1C] text-white p-3 text-center rounded">
        <div className="text-xs mb-1 text-gray-400">Hỗ trợ trực tuyến</div>
        <a href="tel:0902487928" className="font-bold text-lg text-yellow-300 hover:text-yellow-200 transition-colors">
          0902 487 928 / 0938 836 060
        </a>
        <div className="text-xs mt-1 text-gray-400">Thứ 2 - Thứ 7: 8:00 - 17:30</div>
      </div>

      {/* Quick links box */}
      {/* Bản đồ */}
      <div className="mt-3 bg-white border border-gray-200 rounded overflow-hidden">
        <div className="bg-[#271C1C] px-3 py-2">
          <h3 className="text-white font-bold text-xs uppercase">📍 Bản đồ</h3>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6!2d106.6!3d10.76!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f0000000001%3A0x1!2s55+L%C3%BD+Nam+%C4%90%E1%BA%BF%2C+Ph%C6%B0%E1%BB%9Dng+Minh+Ph%E1%BB%A5ng%2C+Qu%E1%BA%ADn+6%2C+TP.+H%E1%BB%93+Ch%C3%AD+Minh!5e0!3m2!1svi!2svn!4v1"
          width="100%"
          height="180"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Vị trí Gan Tu"
        />
        <div className="px-3 py-2 text-xs text-gray-500 bg-gray-50">
          55 Lý Nam Đế, P. Minh Phụng, TP.HCM
        </div>
      </div>

      {/* Truy cập nhanh */}
      <div className="mt-3 bg-white border border-gray-200 rounded overflow-hidden">
        <div className="bg-[#1a1010] px-3 py-2">
          <h3 className="text-white font-bold text-xs uppercase">Truy cập nhanh</h3>
        </div>
        <ul className="divide-y divide-gray-100">
          {[
            { label: 'Nhận báo giá', href: '/nhan-bao-gia' },
            { label: 'Giới thiệu công ty', href: '/gioi-thieu' },
            { label: 'Liên hệ', href: '/lien-he' },
          ].map(l => (
            <li key={l.label}>
              <Link href={l.href} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-stone-100 hover:text-[#271C1C] transition-colors">
                <span className="text-[#271C1C] text-xs">▸</span>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
