'use client';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function LienHePage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });
    } catch {}
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-2 pt-3 pb-6">
      {/* Breadcrumb */}
      <div className="bg-[#271C1C] text-white text-xs px-3 py-1.5 rounded mb-3">
        <a href="/" className="hover:underline">Trang chủ</a>
        <span className="mx-1">»</span>
        <span>Liên hệ</span>
      </div>

      <div className="flex gap-3">
        <div className="w-[215px] flex-shrink-0"><Sidebar /></div>

        <div className="flex-1 min-w-0">
          <div className="bg-white border border-gray-200 rounded p-5">
            <h1 className="text-base font-bold uppercase border-b-2 border-[#271C1C] pb-2 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#271C1C] rounded-sm inline-block"></span>
              Liên hệ với chúng tôi
            </h1>

            <div className="grid grid-cols-2 gap-6">
              {/* Company info */}
              <div>
                <h3 className="font-bold text-sm mb-3 text-gray-700 uppercase">Thông tin công ty</h3>
                <div className="space-y-2.5 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5">📍</span>
                    <span>55 Lý Nam Đế, P. Minh Phụng, TP. Hồ Chí Minh</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5">🏭</span>
                    <span><span className="font-medium text-gray-700">Xưởng SX:</span> 190-192 Quốc lộ 1A, P. Long An, Tây Ninh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📞</span>
                    <a href="tel:0902487928" className="text-[#271C1C] font-bold hover:underline">0902 487 928</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📧</span>
                    <a href="mailto:info@gantu.vn" className="hover:text-[#271C1C]">info@gantu.vn</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🕐</span>
                    <span>Thứ 2 - Thứ 7: 7:30 - 17:30</span>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="mt-4 bg-gray-100 rounded overflow-hidden border border-gray-200" style={{ height: '160px' }}>
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 text-sm">
                    <span className="text-3xl mb-2">🗺</span>
                    <span>Bản đồ - KCN Tân Bình, TP.HCM</span>
                  </div>
                </div>
              </div>

              {/* Contact form */}
              <div>
                <h3 className="font-bold text-sm mb-3 text-gray-700 uppercase">Gửi tin nhắn cho chúng tôi</h3>
                {sent ? (
                  <div className="text-center py-8 text-[#271C1C]">
                    <div className="text-4xl mb-3">✅</div>
                    <p className="font-bold text-base">Đã gửi thành công!</p>
                    <p className="text-gray-500 text-sm mt-1">Chúng tôi sẽ phản hồi trong vòng 24 giờ.</p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', message: '' }); }}
                      className="mt-4 bg-[#271C1C] text-white px-5 py-1.5 rounded text-sm font-bold hover:bg-[#1b5e20] transition-colors"
                    >
                      Gửi thêm
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      required
                      placeholder="Họ tên *"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#271C1C]"
                    />
                    <input
                      placeholder="Email"
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#271C1C]"
                    />
                    <input
                      required
                      placeholder="Số điện thoại *"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#271C1C]"
                    />
                    <textarea
                      placeholder="Nội dung"
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm h-24 resize-none focus:outline-none focus:border-[#271C1C]"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#271C1C] hover:bg-[#1b5e20] text-white py-2.5 rounded font-bold text-sm transition-colors disabled:opacity-70"
                    >
                      {loading ? 'Đang gửi...' : 'GỬI THÔNG TIN'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
