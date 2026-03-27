'use client';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

function formatDate(dateStr) {
  if (!dateStr) return '';
  try { return new Date(dateStr).toLocaleDateString('vi-VN'); } catch { return dateStr; }
}

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/news/${slug}`)
      .then(r => r.json())
      .then(d => {
        const art = d.id ? d : d.data;
        setArticle(art);
        setRelated(d.related || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-2 pt-3 pb-6">
        <div className="flex gap-3">
          <div className="w-[215px] flex-shrink-0"><Sidebar /></div>
          <div className="flex-1 flex items-center justify-center py-20 text-gray-400">Đang tải...</div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-[1200px] mx-auto px-2 pt-3 pb-6">
        <div className="flex gap-3">
          <div className="w-[215px] flex-shrink-0"><Sidebar /></div>
          <div className="flex-1 text-center py-20 text-gray-500">
            <p>Không tìm thấy bài viết</p>
            <a href="/tin-tuc" className="text-[#2e7d32] hover:underline text-sm mt-2 block">← Về trang tin tức</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-2 pt-3 pb-6">
      {/* Breadcrumb */}
      <div className="bg-[#2e7d32] text-white text-xs px-3 py-1.5 rounded mb-3">
        <a href="/" className="hover:underline">Trang chủ</a>
        <span className="mx-1">»</span>
        <a href="/tin-tuc" className="hover:underline">Tin tức</a>
        <span className="mx-1">»</span>
        <span className="text-green-200 line-clamp-1">{article.title}</span>
      </div>

      <div className="flex gap-3">
        <div className="w-[215px] flex-shrink-0"><Sidebar /></div>

        <div className="flex-1 min-w-0">
          <div className="flex gap-3">
            {/* Article */}
            <div className="flex-1 min-w-0">
              <article className="bg-white border border-gray-200 rounded p-4">
                <h1 className="text-xl font-bold text-gray-900 mb-2 leading-snug">{article.title}</h1>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 pb-3 border-b border-gray-100">
                  <span>📅 {formatDate(article.created_at)}</span>
                  <span>👤 {article.author || 'Admin'}</span>
                  {article.view_count > 0 && <span>👁 {article.view_count} lượt xem</span>}
                </div>

                {article.image_url && (
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full max-h-80 object-cover rounded mb-4"
                    loading="lazy"
                  />
                )}

                {article.excerpt && (
                  <p className="text-sm text-gray-600 italic border-l-4 border-[#2e7d32] pl-3 mb-4 bg-green-50 py-2 rounded-r">
                    {article.excerpt}
                  </p>
                )}

                <div className="text-sm text-gray-700 leading-relaxed space-y-3">
                  {(article.content || '').split('\n').filter(p => p.trim()).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100">
                  <a href="/tin-tuc" className="text-[#2e7d32] hover:underline text-sm font-semibold flex items-center gap-1">
                    ← Về trang tin tức
                  </a>
                </div>
              </article>
            </div>

            {/* Right sidebar */}
            {related.length > 0 && (
              <div className="w-[220px] flex-shrink-0">
                <div className="bg-white border border-gray-200 rounded p-3">
                  <h3 className="font-bold text-sm uppercase border-b-2 border-[#2e7d32] pb-1.5 mb-3 flex items-center gap-2">
                    <span className="w-1 h-5 bg-[#2e7d32] rounded-sm inline-block"></span>
                    Bài viết liên quan
                  </h3>
                  <div className="space-y-3">
                    {related.map(r => (
                      <a
                        key={r.id}
                        href={`/tin-tuc/${r.slug || r.id}`}
                        className="flex gap-2 hover:bg-gray-50 rounded p-1 transition-colors group"
                      >
                        <img
                          src={r.image_url || `https://picsum.photos/80/60?random=${r.id}`}
                          alt={r.title}
                          className="w-14 h-11 object-cover rounded flex-shrink-0"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-gray-800 line-clamp-2 group-hover:text-[#2e7d32] leading-snug">
                            {r.title}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{formatDate(r.created_at)}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* CTA box */}
                <div className="bg-[#2e7d32] rounded p-3 mt-3 text-white text-center">
                  <p className="font-bold text-sm mb-1">Cần tư vấn?</p>
                  <p className="text-green-200 text-xs mb-2">Liên hệ ngay để được hỗ trợ</p>
                  <a href="tel:0902487928" className="block bg-yellow-400 text-gray-900 font-bold text-sm py-1.5 rounded hover:bg-yellow-300 transition-colors">
                    0902 487 928
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
