'use client';
import { useState, useEffect } from 'react';

const slides = [
  {
    title: 'MÁY MÓC & NGUYÊN PHỤ LIỆU SẢN XUẤT GIÀY',
    sub: 'Máy may, máy cắt da, máy dán đế – Nhập khẩu trực tiếp từ Nhật, Đài Loan, Trung Quốc',
    bg: 'linear-gradient(135deg, #1a0f0f 0%, #271C1C 45%, #3d2a2a 100%)',
    badge: 'Máy móc công nghiệp',
    accent: '#f59e0b',
    pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  },
  {
    title: 'ĐẾ GIÀY & ĐẾ SANDAL ĐA DẠNG',
    sub: 'Đế cao su SBR, PVC, TPR, EVA nén, TR, da bò – Đế sandal EVA, cork, memory foam',
    bg: 'linear-gradient(135deg, #0a1f0a 0%, #14391a 45%, #1b5e20 100%)',
    badge: 'Đế giày chuyên dụng',
    accent: '#4ade80',
    pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  },
  {
    title: 'HOÁ CHẤT DÁN ĐẾ & KHUÔN ĐÚC',
    sub: 'Keo PU 2 thành phần, keo neoprene, primer, IPA – Khuôn đế cao su, khuôn EVA, khuôn khóa, khuôn carbon',
    bg: 'linear-gradient(135deg, #060e1f 0%, #0d1f3d 45%, #1565c0 100%)',
    badge: 'Hoá chất & Khuôn',
    accent: '#60a5fa',
    pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  },
];

const stats = [
  { value: '10+', label: 'Năm kinh nghiệm' },
  { value: '500+', label: 'Khách hàng' },
  { value: '200+', label: 'Mã sản phẩm' },
  { value: '10+', label: 'Quốc gia XK' },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true);
      setTimeout(() => { setCurrent(c => (c + 1) % slides.length); setAnimating(false); }, 300);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const goTo = (i) => {
    setAnimating(true);
    setTimeout(() => { setCurrent(i); setAnimating(false); }, 300);
  };

  const slide = slides[current];

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      {/* Main banner */}
      <div
        className="relative overflow-hidden"
        style={{ height: '260px', background: slide.bg, transition: 'background 0.6s ease' }}
      >
        {/* Pattern overlay */}
        <div className="absolute inset-0" style={{ backgroundImage: slide.pattern }} />

        {/* Geometric accent shapes */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-5" style={{ background: slide.accent, transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 right-16 w-48 h-48 rounded-full opacity-5" style={{ background: slide.accent, transform: 'translate(0%, 40%)' }} />

        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: `linear-gradient(to bottom, transparent, ${slide.accent}, transparent)` }} />

        {/* Content */}
        <div
          className="absolute inset-0 flex flex-col justify-center px-10"
          style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(8px)' : 'translateY(0)', transition: 'opacity 0.3s, transform 0.3s' }}
        >
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit"
            style={{ background: `${slide.accent}22`, color: slide.accent, border: `1px solid ${slide.accent}44` }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: slide.accent }} />
            {slide.badge}
          </span>
          <h2 className="text-white text-2xl md:text-3xl font-black uppercase mb-3 leading-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            {slide.title}
          </h2>
          <p className="text-gray-300 text-sm mb-5 max-w-xl leading-relaxed">{slide.sub}</p>
          <div className="flex gap-3">
            <a
              href="/san-pham"
              className="bg-white text-gray-900 px-5 py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Xem sản phẩm →
            </a>
            <a
              href="/nhan-bao-gia"
              className="px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-gray-900"
              style={{ background: slide.accent }}
            >
              Nhận báo giá
            </a>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-10 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? '24px' : '8px',
                height: '8px',
                background: i === current ? slide.accent : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() => goTo((current - 1 + slides.length) % slides.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-base transition-all hover:scale-110"
        >‹</button>
        <button
          onClick={() => goTo((current + 1) % slides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-base transition-all hover:scale-110"
        >›</button>
      </div>

      {/* Stats strip */}
      <div className="bg-[#271C1C] grid grid-cols-4 divide-x divide-white/10">
        {stats.map(s => (
          <div key={s.label} className="flex flex-col items-center py-2.5 px-2">
            <span className="text-yellow-400 font-black text-lg leading-none">{s.value}</span>
            <span className="text-gray-400 text-[10px] mt-0.5 text-center">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
