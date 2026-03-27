'use client';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendar, FaArrowRight, FaNewspaper, FaEye } from 'react-icons/fa';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/news?limit=6`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setNews(d.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const featured = news.find(n => n.is_featured === 1) || news[0];
  const smallNews = news.filter(n => n.id !== featured?.id).slice(0, 5);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-6 bg-primary-600 rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Tin tức & Sự kiện</h2>
            </div>
            <p className="text-gray-500 text-sm ml-3">Cập nhật mới nhất từ Gan Tu Company</p>
          </div>
          <Link
            href="/tin-tuc"
            className="hidden md:flex items-center gap-2 text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors"
          >
            Xem tất cả <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 bg-gray-100 rounded-xl aspect-[3/2] animate-pulse"></div>
            <div className="lg:col-span-2 space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="w-20 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <FaNewspaper className="text-4xl mx-auto mb-3" />
            <p>Chưa có tin tức</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Featured news - left */}
            {featured && (
              <div className="lg:col-span-3">
                <Link href={`/tin-tuc/${featured.slug}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={featured.image_url || 'https://picsum.photos/600/400?random=60'}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {featured.is_featured === 1 && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Nổi bật
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <FaCalendar className="text-primary-400" />
                        {formatDate(featured.created_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaEye className="text-primary-400" />
                        {featured.view_count} lượt xem
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-800 text-xl mb-2 group-hover:text-primary-600 transition-colors leading-snug">
                      {featured.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">{featured.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all">
                      Đọc thêm <FaArrowRight className="text-xs" />
                    </span>
                  </div>
                </Link>
              </div>
            )}

            {/* Small news list - right */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {smallNews.map(article => (
                  <Link
                    key={article.id}
                    href={`/tin-tuc/${article.slug}`}
                    className="group flex gap-3 bg-white rounded-xl border border-gray-100 p-3 hover:border-primary-200 hover:shadow-sm transition-all"
                  >
                    <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={article.image_url || 'https://picsum.photos/200/150?random=70'}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 text-sm line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug mb-1">
                        {article.title}
                      </h4>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <FaCalendar className="text-primary-400" />
                        {formatDate(article.created_at)}
                      </span>
                    </div>
                  </Link>
                ))}

                <Link
                  href="/tin-tuc"
                  className="block w-full text-center border border-primary-600 text-primary-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-50 transition-colors"
                >
                  Xem tất cả tin tức
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
