'use client';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
import { useState, useEffect } from 'react';
import SectionTitle from './SectionTitle';

const mockNews = [
  { id: 1, title: 'Gan Tu tham dự triển lãm MTA Vietnam 2026', slug: 'mta-2026', excerpt: 'Trưng bày máy CNC, dây chuyền tự động mới nhất tại triển lãm quốc tế', image_url: 'https://picsum.photos/600/400?random=51', created_at: '2026-03-27' },
  { id: 2, title: 'Ra mắt dòng máy ép thủy lực thế hệ mới', slug: 'may-ep-moi', excerpt: 'Công nghệ servo tiết kiệm 40% điện năng so với thế hệ cũ', image_url: 'https://picsum.photos/600/400?random=52', created_at: '2026-03-20' },
  { id: 3, title: 'Hợp tác chiến lược với đối tác Nhật Bản', slug: 'hop-tac-nhat', excerpt: 'Phân phối chính thức máy CNC Fanuc tại thị trường Việt Nam', image_url: 'https://picsum.photos/600/400?random=53', created_at: '2026-03-15' },
  { id: 4, title: 'Chương trình khuyến mãi tháng 3/2026', slug: 'khuyen-mai-3', excerpt: 'Giảm giá 15% tất cả sản phẩm vật tư công nghiệp trong tháng 3', image_url: 'https://picsum.photos/600/400?random=54', created_at: '2026-03-10' },
  { id: 5, title: 'Khai trương showroom mới tại Hà Nội', slug: 'showroom-hanoi', excerpt: 'Showroom 500m² trưng bày hơn 200 sản phẩm máy móc và thiết bị', image_url: 'https://picsum.photos/600/400?random=55', created_at: '2026-03-05' },
];

export default function VideoNewsSection() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/news?limit=6`)
      .then(r => r.json())
      .then(d => setNews(d.news || d.data || []))
      .catch(() => setNews(mockNews));
  }, []);

  const displayNews = news.length > 0 ? news : mockNews;

  const formatDate = (dateStr) => {
    if (!dateStr) return '27/03/2026';
    try { return new Date(dateStr).toLocaleDateString('vi-VN'); } catch { return dateStr; }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
      <div className="flex gap-5">
        {/* Left: video + news list */}
        <div className="flex-1 min-w-0">
          <SectionTitle title="Video giới thiệu" href="/video" />

          {/* Video thumbnail */}
          <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4 cursor-pointer group" style={{ paddingBottom: '56.25%' }}>
            <div className="absolute inset-0">
              <img
                src="https://picsum.photos/600/338?random=100"
                alt="Video giới thiệu Gan Tu"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-xl transition-all group-hover:scale-110 border border-white/30">
                  <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-white text-xs font-semibold bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  Gan Tu – Giới thiệu công ty
                </span>
              </div>
            </div>
          </div>

          {/* News list */}
          <SectionTitle title="Tin tức mới nhất" href="/tin-tuc" />
          <div className="space-y-2">
            {displayNews.slice(0, 4).map((n, i) => (
              <a
                key={n.id}
                href={`/tin-tuc/${n.slug || n.id}`}
                className="flex gap-3 p-2 rounded-lg hover:bg-amber-50 transition-all group hover:-translate-y-px"
              >
                <div className="relative w-16 h-12 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={n.image_url || `https://picsum.photos/80/60?random=${n.id}`}
                    alt={n.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {i === 0 && (
                    <span className="absolute top-0 left-0 bg-red-500 text-white text-[8px] font-bold px-1 py-0.5">MỚI</span>
                  )}
                </div>
                <div className="min-w-0 flex flex-col justify-center">
                  <p className="text-xs font-semibold text-gray-800 line-clamp-2 group-hover:text-[#271C1C] transition-colors leading-snug">
                    {n.title}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(n.created_at)}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right: featured news cards */}
        <div className="w-[230px] flex-shrink-0">
          <SectionTitle title="Tin tức nổi bật" href="/tin-tuc" />
          <div className="space-y-3">
            {displayNews.slice(0, 3).map(n => (
              <a
                key={n.id}
                href={`/tin-tuc/${n.slug || n.id}`}
                className="block rounded-lg overflow-hidden border border-gray-100 hover:shadow-md hover:border-amber-200 transition-all group hover:-translate-y-0.5"
              >
                <div className="overflow-hidden h-24 relative">
                  <img
                    src={n.image_url || `https://picsum.photos/230/120?random=${n.id + 50}`}
                    alt={n.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-semibold text-gray-800 line-clamp-2 group-hover:text-[#271C1C] transition-colors leading-snug">
                    {n.title}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1.5 flex items-center gap-1">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(n.created_at)}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
