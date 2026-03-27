'use client';
import { useState, useEffect } from 'react';

const slides = [
  {
    title: 'GIÀY DÉP THỜI TRANG - CHẤT LƯỢNG CAO',
    sub: 'Hơn 500+ mẫu giày dép nam nữ trẻ em – Freeship toàn quốc',
    bg: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 60%, #388e3c 100%)',
    badge: '👟 Thời trang giày dép',
  },
  {
    title: 'BỘ SƯU TẬP MỚI 2026',
    sub: 'Giày thể thao, giày da, cao gót, dép sandal – Cập nhật liên tục',
    bg: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 60%, #1976d2 100%)',
    badge: '✨ Bộ sưu tập mới',
  },
  {
    title: 'FREESHIP TOÀN QUỐC',
    sub: 'Đổi trả miễn phí trong 7 ngày nếu không vừa size',
    bg: 'linear-gradient(135deg, #4a148c 0%, #6a1b9a 60%, #7b1fa2 100%)',
    badge: '🚚 Giao hàng nhanh',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <div
      className="relative overflow-hidden rounded"
      style={{ height: '200px', background: slide.bg, transition: 'background 0.5s ease' }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-8 text-white text-8xl">👟</div>
        <div className="absolute bottom-4 right-24 text-white text-5xl">👠</div>
      </div>

      <div className="absolute inset-0 flex flex-col justify-center px-8">
        <span className="inline-block bg-white bg-opacity-20 text-white text-xs px-2.5 py-0.5 rounded-full mb-2 w-fit">
          {slide.badge}
        </span>
        <h2 className="text-white text-xl md:text-2xl font-black uppercase mb-2 leading-tight drop-shadow">
          {slide.title}
        </h2>
        <p className="text-green-100 text-sm mb-4">{slide.sub}</p>
        <div className="flex gap-2">
          <a
            href="/san-pham"
            className="bg-white text-[#2e7d32] px-4 py-1.5 rounded text-sm font-bold hover:bg-green-50 transition-colors shadow"
          >
            Xem sản phẩm
          </a>
          <a
            href="/lien-he"
            className="bg-yellow-400 text-gray-900 px-4 py-1.5 rounded text-sm font-bold hover:bg-yellow-300 transition-colors shadow"
          >
            Tư vấn size
          </a>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 right-4 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all ${i === current ? 'bg-white w-4 h-2' : 'bg-white/40 w-2 h-2'}`}
          />
        ))}
      </div>

      {/* Prev/Next arrows */}
      <button
        onClick={() => setCurrent(c => (c - 1 + slides.length) % slides.length)}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-20 hover:bg-opacity-40 rounded-full w-7 h-7 flex items-center justify-center text-sm transition-colors"
      >
        ‹
      </button>
      <button
        onClick={() => setCurrent(c => (c + 1) % slides.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-20 hover:bg-opacity-40 rounded-full w-7 h-7 flex items-center justify-center text-sm transition-colors"
      >
        ›
      </button>
    </div>
  );
}
