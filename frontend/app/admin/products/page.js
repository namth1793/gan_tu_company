'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/AdminSidebar';
import AdminGuard from '@/components/AdminGuard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
const getToken = () => localStorage.getItem('admin_token');

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/admin/products?page=${page}&limit=15&search=${encodeURIComponent(search)}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    setProducts(data.products || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [page, search]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id, name) => {
    if (!confirm(`Xóa sản phẩm "${name}"?`)) return;
    await fetch(`${API_URL}/admin/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    load();
  };

  const totalPages = Math.ceil(total / 15);

  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-gray-800">👟 Quản lý sản phẩm ({total})</h1>
            <Link
              href="/admin/products/new"
              className="bg-[#271C1C] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#3d2a2a] transition-colors"
            >
              + Thêm sản phẩm
            </Link>
          </div>

          {/* Search */}
          <div className="flex gap-2 mb-4">
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Tìm theo tên, mã sản phẩm..."
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:border-[#271C1C]"
            />
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Ảnh</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Tên sản phẩm</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Mã</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Danh mục</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Giá</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Nổi bật</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-400">Đang tải...</td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-400">Không có sản phẩm</td>
                  </tr>
                ) : products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded"
                        loading="lazy"
                        onError={e => { e.target.src = 'https://via.placeholder.com/48'; }}
                      />
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-800 max-w-[200px]">
                      <div className="line-clamp-2">{p.name}</div>
                    </td>
                    <td className="px-4 py-2 text-gray-500">{p.code}</td>
                    <td className="px-4 py-2 text-gray-500">{p.category_name}</td>
                    <td className="px-4 py-2 text-red-600 font-medium">{p.price}</td>
                    <td className="px-4 py-2">
                      {p.is_featured ? (
                        <span className="text-yellow-500">⭐</span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex gap-2 justify-end">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="text-blue-600 hover:text-blue-800 text-xs border border-blue-200 rounded px-2 py-1 hover:bg-blue-50 transition-colors"
                        >
                          Sửa
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
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
