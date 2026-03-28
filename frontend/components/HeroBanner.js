'use client';
import { useState, useEffect } from 'react';

const slides = [
  {
    title: 'MÁY MÓC & NGUYÊN PHỤ LIỆU SẢN XUẤT GIÀY',
    sub: 'Máy may, máy cắt da, máy dán đế – Nhập khẩu trực tiếp từ Nhật, Đài Loan, Trung Quốc',
    bg: 'linear-gradient(135deg, #271C1C 0%, #3d2a2a 60%, #4a3232 100%)',
    badge: '⚙️ Máy móc công nghiệp',
    icon1: '⚙️',
    icon2: '🔩',
  },
  {
    title: 'ĐẾ GIÀY & ĐẾ SANDAL ĐA DẠNG',
    sub: 'Đế cao su SBR, PVC, TPR, EVA nén, TR, da bò – Đế sandal EVA, cork, memory foam',
    bg: 'linear-gradient(135deg, #1a3a1a 0%, #1b5e20 60%, #2e7d32 100%)',
    badge: '🔲 Đế giày chuyên dụng',
    icon1: '🔲',
    icon2: '🩴',
  },
  {
    title: 'HOÁ CHẤT DÁN ĐẾ & STICKER CHARM',
    sub: 'Keo PU 2 thành phần, keo neoprene, primer, IPA – Sticker phản quang, charm kim loại, patch thêu',
    bg: 'linear-gradient(135deg, #0d2b45 0%, #1565c0 60%, #1976d2 100%)',
    badge: '🧪 Hoá chất & Phụ kiện',
    icon1: '🧪',
    icon2: '✨',
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
      {/* Background decorative icons */}
      <div className="absolute inset-0 opacity-10 select-none pointer-events-none">
        <div className="absolute top-4 right-8 text-white text-8xl">{slide.icon1}</div>
        <div className="absolute bottom-4 right-24 text-white text-5xl">{slide.icon2}</div>
      </div>

      <div className="absolute inset-0 flex flex-col justify-center px-8">
        <span className="inline-block bg-white bg-opacity-20 text-white text-xs px-2.5 py-0.5 rounded-full mb-2 w-fit">
          {slide.badge}
        </span>
        <h2 className="text-white text-xl md:text-2xl font-black uppercase mb-2 leading-tight drop-shadow">
          {slide.title}
        </h2>
        <p className="text-gray-200 text-sm mb-4">{slide.sub}</p>
        <div className="flex gap-2">
          <a
            href="/san-pham"
            className="bg-white text-[#271C1C] px-4 py-1.5 rounded text-sm font-bold hover:bg-yellow-50 transition-colors shadow"
          >
            Xem sản phẩm
          </a>
          <a
            href="/nhan-bao-gia"
            className="bg-yellow-400 text-gray-900 px-4 py-1.5 rounded text-sm font-bold hover:bg-yellow-300 transition-colors shadow"
          >
            Nhận báo giá
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
