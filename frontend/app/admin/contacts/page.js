'use client';
import { useState, useEffect, useCallback } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminGuard from '@/components/AdminGuard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
const getToken = () => localStorage.getItem('admin_token');

const STATUS_CYCLE = { new: 'read', read: 'done', done: 'new' };
const STATUS_LABEL = { new: 'Mới', read: 'Đã đọc', done: 'Xong' };
const STATUS_COLOR = {
  new: 'bg-red-100 text-red-700 border-red-200',
  read: 'bg-blue-100 text-blue-700 border-blue-200',
  done: 'bg-green-100 text-green-700 border-green-200',
};

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/admin/contacts?page=${page}&limit=20`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const data = await res.json();
    setContacts(data.contacts || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [page]);

  useEffect(() => { load(); }, [load]);

  const cycleStatus = async (id, currentStatus) => {
    const nextStatus = STATUS_CYCLE[currentStatus] || 'new';
    await fetch(`${API_URL}/admin/contacts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ status: nextStatus }),
    });
    setContacts(prev =>
      prev.map(c => c.id === id ? { ...c, status: nextStatus } : c)
    );
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Xóa liên hệ từ "${name}"?`)) return;
    await fetch(`${API_URL}/admin/contacts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    load();
  };

  const totalPages = Math.ceil(total / 20);

  const formatDate = (dt) => {
    if (!dt) return '—';
    return new Date(dt).toLocaleDateString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-gray-800">📩 Quản lý liên hệ ({total})</h1>
            <div className="flex gap-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span> Mới
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-400 inline-block"></span> Đã đọc
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span> Xong
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-8 text-gray-400">Đang tải...</div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-8 text-gray-400 bg-white rounded-xl border border-gray-200">
                Chưa có liên hệ nào
              </div>
            ) : contacts.map(c => (
              <div
                key={c.id}
                className={`bg-white border rounded-xl p-4 ${c.status === 'new' ? 'border-red-200' : 'border-gray-200'}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-gray-800">{c.full_name}</span>
                      {c.company && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{c.company}</span>
                      )}
                      <span className="text-xs text-gray-400">{formatDate(c.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap text-sm">
                      {c.phone && (
                        <a href={`tel:${c.phone}`} className="text-blue-600 hover:underline">📞 {c.phone}</a>
                      )}
                      {c.email && (
                        <a href={`mailto:${c.email}`} className="text-blue-600 hover:underline">✉️ {c.email}</a>
                      )}
                    </div>
                    {c.product_interest && (
                      <div className="text-xs text-gray-500 mb-1">
                        <span className="font-medium">Sản phẩm quan tâm:</span> {c.product_interest}
                      </div>
                    )}
                    {c.message && (
                      <p className="text-sm text-gray-700 bg-gray-50 rounded px-3 py-2 line-clamp-3">{c.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <button
                      onClick={() => cycleStatus(c.id, c.status)}
                      title="Click để thay đổi trạng thái"
                      className={`text-xs border rounded-full px-3 py-1 font-medium cursor-pointer hover:opacity-80 transition-opacity ${STATUS_COLOR[c.status] || STATUS_COLOR.new}`}
                    >
                      {STATUS_LABEL[c.status] || 'Mới'}
                    </button>
                    <button
                      onClick={() => handleDelete(c.id, c.full_name)}
                      className="text-red-500 hover:text-red-700 text-xs border border-red-200 rounded px-2 py-1 hover:bg-red-50 transition-colors"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
