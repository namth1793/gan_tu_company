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
    <div className="bg-white border border-gray-200 rounded p-3">
      <div className="flex gap-4">
        {/* Left: video + news list */}
        <div className="flex-1 min-w-0">
          <SectionTitle title="Video giới thiệu" href="#" />

          {/* Video thumbnail */}
          <div className="relative bg-gray-900 rounded overflow-hidden mb-4" style={{ paddingBottom: '56.25%' }}>
            <div className="absolute inset-0">
              <img
                src="https://picsum.photos/600/338?random=100"
                alt="Video giới thiệu Gan Tu"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <button className="w-14 h-14 bg-[#271C1C] hover:bg-[#1a1010] rounded-full flex items-center justify-center shadow-xl transition-colors group">
                  <svg className="w-7 h-7 text-white ml-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <span className="text-white text-xs mt-2 bg-black bg-opacity-40 px-3 py-1 rounded">
                  Gan Tu - Giới thiệu công ty
                </span>
              </div>
            </div>
          </div>

          {/* News list */}
          <SectionTitle title="Tin tức mới nhất" href="/tin-tuc" />
          <div className="space-y-2">
            {displayNews.slice(0, 4).map(n => (
              <a
                key={n.id}
                href={`/tin-tuc/${n.slug || n.id}`}
                className="flex gap-2 hover:bg-gray-50 rounded p-1 transition-colors group"
              >
                <img
                  src={n.image_url || `https://picsum.photos/80/60?random=${n.id}`}
                  alt={n.title}
                  className="w-16 h-12 object-cover rounded flex-shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-800 line-clamp-2 group-hover:text-[#271C1C] transition-colors leading-snug">
                    {n.title}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{formatDate(n.created_at)}</p>
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
                className="block border border-gray-100 rounded overflow-hidden hover:shadow-md hover:border-yellow-400 transition-all group"
              >
                <img
                  src={n.image_url || `https://picsum.photos/230/120?random=${n.id + 50}`}
                  alt={n.title}
                  className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
                <div className="p-2">
                  <p className="text-xs font-semibold text-gray-800 line-clamp-2 group-hover:text-[#271C1C] transition-colors leading-snug">
                    {n.title}
                  </p>
                  <p className="text-[10px] text-gray-500 line-clamp-2 mt-1">{n.excerpt}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{formatDate(n.created_at)}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
