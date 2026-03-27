'use client';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';

function formatDate(dateStr) {
  if (!dateStr) return '';
  try { return new Date(dateStr).toLocaleDateString('vi-VN'); } catch { return dateStr; }
}

export default function TinTucPage() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 10;

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/news?page=${page}&limit=${limit}`)
      .then(r => r.json())
      .then(d => {
        setNews(d.news || d.data || []);
        setTotal(d.total || d.pagination?.total || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <div className="max-w-[1200px] mx-auto px-2 pt-3 pb-6">
      {/* Breadcrumb */}
      <div className="bg-[#2e7d32] text-white text-xs px-3 py-1.5 rounded mb-3">
        <a href="/" className="hover:underline">Trang chủ</a>
        <span className="mx-1">»</span>
        <span>Tin tức</span>
      </div>

      <div className="flex gap-3">
        <div className="w-[215px] flex-shrink-0"><Sidebar /></div>

        <div className="flex-1 min-w-0">
          <div className="bg-white border border-gray-200 rounded p-3">
            <h1 className="text-base font-bold uppercase border-b-2 border-[#2e7d32] pb-2 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#2e7d32] rounded-sm inline-block"></span>
              Tin tức &amp; Sự kiện
            </h1>

            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="flex gap-3 animate-pulse">
                    <div className="w-28 h-20 bg-gray-200 rounded flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : news.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-5xl mb-3">📰</div>
                <p>Chưa có tin tức</p>
              </div>
            ) : (
              <div className="space-y-4">
                {news.map(n => (
                  <a
                    key={n.id}
                    href={`/tin-tuc/${n.slug || n.id}`}
                    className="flex gap-3 hover:bg-gray-50 p-2 rounded transition-colors group border-b border-gray-100 last:border-0 pb-4"
                  >
                    <img
                      src={n.image_url || `https://picsum.photos/120/80?random=${n.id}`}
                      alt={n.title}
                      className="w-28 h-20 object-cover rounded flex-shrink-0 group-hover:opacity-90 transition-opacity"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      {n.is_featured === 1 && (
                        <span className="inline-block bg-[#2e7d32] text-white text-[10px] px-2 py-0.5 rounded-full mb-1 font-bold">Nổi bật</span>
                      )}
                      <h2 className="text-sm font-bold text-gray-800 group-hover:text-[#2e7d32] line-clamp-2 mb-1 transition-colors leading-snug">
                        {n.title}
                      </h2>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-1">{n.excerpt}</p>
                      <p className="text-[10px] text-gray-400">{formatDate(n.created_at)} | {n.author || 'Admin'}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex gap-1 justify-center mt-4 pt-3 border-t border-gray-100">
                {Array.from({ length: Math.min(totalPages, 8) }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-7 h-7 text-xs font-bold rounded transition-colors ${
                      page === n ? 'bg-[#2e7d32] text-white' : 'bg-gray-100 hover:bg-green-100 text-gray-700'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
