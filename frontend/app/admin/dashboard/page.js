'use client';
import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminGuard from '@/components/AdminGuard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';
}

export default function DashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(r => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const statCards = stats ? [
    { label: 'Tổng sản phẩm', value: stats.total_products, icon: '👟', color: 'bg-blue-50 border-blue-200 text-blue-700' },
    { label: 'Tổng tin tức', value: stats.total_news, icon: '📰', color: 'bg-green-50 border-green-200 text-green-700' },
    { label: 'Tổng liên hệ', value: stats.total_contacts, icon: '📩', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
    { label: 'Liên hệ mới', value: stats.new_contacts, icon: '🔔', color: 'bg-red-50 border-red-200 text-red-700' },
  ] : [];

  const maxCount = stats?.contacts_by_month?.reduce((m, x) => Math.max(m, x.count), 1) || 1;

  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-xl font-bold text-gray-800 mb-6">📊 Dashboard</h1>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map(s => (
              <div key={s.label} className={`border rounded-xl p-5 ${s.color}`}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-3xl font-black">{s.value}</div>
                <div className="text-sm font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Chart: contacts by month */}
          {stats?.contacts_by_month?.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="font-bold text-gray-700 mb-4">📈 Liên hệ theo tháng (6 tháng gần nhất)</h2>
              <div className="flex items-end gap-3 h-40">
                {stats.contacts_by_month.map(m => (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs font-bold text-gray-600">{m.count}</span>
                    <div
                      className="w-full bg-[#271C1C] rounded-t transition-all"
                      style={{ height: `${(m.count / maxCount) * 120}px`, minHeight: '4px' }}
                    />
                    <span className="text-[10px] text-gray-400">{m.month}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!stats && (
            <div className="text-gray-400 text-sm">Đang tải thống kê...</div>
          )}
        </main>
      </div>
    </AdminGuard>
  );
}
