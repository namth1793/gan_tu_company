'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const categories = [
  { id: 1, name: 'Máy móc',      slug: 'may-moc',    icon: '⚙️', color: 'text-orange-600' },
  { id: 2, name: 'Thành phẩm',   slug: 'thanh-pham', icon: '👟', color: 'text-blue-600' },
  { id: 3, name: 'Đế giày',      slug: 'de-giay',    icon: '🔲', color: 'text-gray-600' },
  { id: 4, name: 'Hoá chất',     slug: 'hoa-chat',   icon: '🧪', color: 'text-purple-600' },
  { id: 5, name: 'Đế sandal',    slug: 'de-sandal',  icon: '🩴', color: 'text-teal-600' },
  { id: 6, name: 'Khuôn / Mold', slug: 'khuon-mold', icon: '🔧', color: 'text-red-600' },
];

export default function Sidebar() {
  return (
    <div className="space-y-3">
      {/* Category list */}
      <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
        <div className="bg-gradient-to-r from-[#271C1C] to-[#3d2a2a] px-3 py-2.5 flex items-center gap-2">
          <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          <h2 className="text-white font-bold text-sm uppercase tracking-wide">Danh mục</h2>
        </div>
        <ul className="divide-y divide-gray-50">
          {categories.map(cat => (
            <li key={cat.id}>
              <Link
                href={`/san-pham?cat=${cat.slug}`}
                className="flex items-center justify-between px-3 py-2.5 transition-all group hover:bg-amber-50 hover:pl-4"
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base w-5 text-center">{cat.icon}</span>
                  <span className="text-sm text-gray-700 group-hover:text-[#271C1C] font-medium transition-colors">{cat.name}</span>
                </span>
                <svg className="w-3 h-3 text-gray-300 group-hover:text-amber-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
        <div className="bg-gray-50 px-3 py-2 border-t border-gray-100">
          <Link href="/san-pham" className="text-xs text-[#271C1C] font-semibold hover:text-amber-600 transition-colors flex items-center gap-1">
            Tất cả sản phẩm
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Hotline box */}
      <div className="rounded-lg overflow-hidden shadow-sm" style={{ background: 'linear-gradient(135deg, #271C1C 0%, #3d2a2a 100%)' }}>
        <div className="p-3 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-[10px] font-semibold uppercase tracking-wider">Hỗ trợ trực tuyến</span>
          </div>
          <a href="tel:0902487928" className="block text-yellow-300 font-black text-base hover:text-yellow-200 transition-colors">
            0902 487 928
          </a>
          <a href="tel:0938836060" className="block text-yellow-300 font-bold text-sm hover:text-yellow-200 transition-colors mt-0.5">
            0938 836 060
          </a>
          <div className="mt-2 pt-2 border-t border-white/10">
            <p className="text-gray-400 text-[10px]">T2–T7: 8:00 – 17:30</p>
            <a href="mailto:info@gantu.vn" className="text-gray-400 text-[10px] hover:text-gray-300 transition-colors">info@gantu.vn</a>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
        <div className="bg-gradient-to-r from-[#271C1C] to-[#3d2a2a] px-3 py-2 flex items-center gap-1.5">
          <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <h3 className="text-white font-bold text-xs uppercase">Bản đồ</h3>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6!2d106.6!3d10.76!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f0000000001%3A0x1!2s55+L%C3%BD+Nam+%C4%90%E1%BA%BF%2C+Ph%C6%B0%E1%BB%9Dng+Minh+Ph%E1%BB%A5ng%2C+Qu%E1%BA%ADn+6%2C+TP.+H%E1%BB%93+Ch%C3%AD+Minh!5e0!3m2!1svi!2svn!4v1"
          width="100%"
          height="160"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Vị trí Gan Tu"
        />
        <div className="px-3 py-2 text-[10px] text-gray-500 bg-gray-50 flex items-start gap-1">
          <span className="text-amber-500 mt-0.5 flex-shrink-0">📍</span>
          <span>55 Lý Nam Đế, P. Minh Phụng, TP.HCM</span>
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
        <div className="bg-[#1a1010] px-3 py-2">
          <h3 className="text-white font-bold text-xs uppercase tracking-wide">Truy cập nhanh</h3>
        </div>
        <ul className="divide-y divide-gray-50">
          {[
            { label: 'Nhận báo giá', href: '/nhan-bao-gia', icon: '📋' },
            { label: 'Giới thiệu', href: '/gioi-thieu', icon: '🏢' },
            { label: 'Liên hệ', href: '/lien-he', icon: '📞' },
          ].map(l => (
            <li key={l.label}>
              <Link href={l.href} className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-[#271C1C] transition-all hover:pl-4 group">
                <span className="text-sm">{l.icon}</span>
                <span className="font-medium">{l.label}</span>
                <svg className="w-3 h-3 ml-auto text-gray-300 group-hover:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
