'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/AdminSidebar';
import AdminGuard from '@/components/AdminGuard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
const getToken = () => localStorage.getItem('admin_token');

export default function AdminNewsPage() {
  const [news, setNews] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/admin/news?page=${page}&limit=15`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    setNews(data.news || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [page]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id, title) => {
    if (!confirm(`Xóa bài viết "${title}"?`)) return;
    await fetch(`${API_URL}/admin/news/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    load();
  };

  const totalPages = Math.ceil(total / 15);

  const formatDate = (dt) => {
    if (!dt) return '—';
    return new Date(dt).toLocaleDateString('vi-VN');
  };

  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-gray-800">📰 Quản lý tin tức ({total})</h1>
            <Link
              href="/admin/news/new"
              className="bg-[#271C1C] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3d2a2a] transition-colors"
            >
              + Thêm bài viết
            </Link>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Ảnh</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Tiêu đề</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Tác giả</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Nổi bật</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Ngày đăng</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-400">Đang tải...</td>
                  </tr>
                ) : news.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-400">Không có bài viết</td>
                  </tr>
                ) : news.map(n => (
                  <tr key={n.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <img
                        src={n.image_url}
                        alt={n.title}
                        className="w-16 h-10 object-cover rounded"
                        loading="lazy"
                        onError={e => { e.target.src = 'https://via.placeholder.com/64x40'; }}
                      />
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-800 max-w-[280px]">
                      <div className="line-clamp-2">{n.title}</div>
                    </td>
                    <td className="px-4 py-2 text-gray-500">{n.author || 'Admin'}</td>
                    <td className="px-4 py-2">
                      {n.is_featured ? (
                        <span className="text-yellow-500">⭐</span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-gray-500 whitespace-nowrap">{formatDate(n.created_at)}</td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex gap-2 justify-end">
                        <Link
                          href={`/admin/news/${n.id}/edit`}
                          className="text-blue-600 hover:text-blue-800 text-xs border border-blue-200 rounded px-2 py-1 hover:bg-blue-50 transition-colors"
                        >
                          Sửa
                        </Link>
                        <button
                          onClick={() => handleDelete(n.id, n.title)}
                          className="text-red-600 hover:text-red-800 text-xs border border-red-200 rounded px-2 py-1 hover:bg-red-50 transition-colors"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex gap-1 justify-center mt-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-8 h-8 text-xs rounded font-medium ${
                    page === n
                      ? 'bg-[#271C1C] text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </AdminGuard>
  );
}
