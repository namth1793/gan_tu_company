'use client';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

const productCategories = [
  'Máy móc',
  'Thành phẩm (giày hoàn chỉnh)',
  'Đế giày (cao su, PVC, TPR, EVA, TR)',
  'Hoá chất (keo dán, dung môi, primer)',
  'Đế sandal (EVA, cork, TPR, memory foam)',
  'Khuôn / Mold (khuôn đế cao su, EVA, khóa, carbon)',
  'Khác',
];

export default function NhanBaoGiaPage() {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', product: '', quantity: '', message: '',
  });
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
          company: form.company,
          email: form.email,
          phone: form.phone,
          product_interest: form.product,
          message: `Sản phẩm: ${form.product}\nSố lượng: ${form.quantity}\nGhi chú: ${form.message}`,
        }),
      });
    } catch {}
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-2 pt-3 pb-6">
      {/* Breadcrumb */}
      <div className="bg-[#2e7d32] text-white text-xs px-3 py-1.5 rounded mb-3">
        <a href="/" className="hover:underline">Trang chủ</a>
        <span className="mx-1">»</span>
        <span>Nhận báo giá</span>
      </div>

      <div className="flex gap-3">
        <div className="w-[215px] flex-shrink-0"><Sidebar /></div>

        <div className="flex-1 min-w-0">
          <div className="bg-white border border-gray-200 rounded p-5">
            <h1 className="text-base font-bold uppercase border-b-2 border-[#2e7d32] pb-2 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#2e7d32] rounded-sm inline-block"></span>
              Yêu cầu báo giá
            </h1>

            {/* Steps */}
            <div className="flex items-center gap-2 mb-5 text-xs">
              {['Điền thông tin', 'Nhận báo giá', 'Xác nhận'].map((step, i) => (
                <div key={step} className="flex items-center gap-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${i === 0 ? 'bg-[#2e7d32] text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {i + 1}
                  </div>
                  <span className={i === 0 ? 'text-[#2e7d32] font-semibold' : 'text-gray-400'}>{step}</span>
                  {i < 2 && <span className="text-gray-300 mx-1">→</span>}
                </div>
              ))}
            </div>

            {sent ? (
              <div className="text-center py-12 text-[#2e7d32]">
                <div className="text-5xl mb-3">✅</div>
                <p className="text-lg font-bold">Yêu cầu báo giá đã được gửi!</p>
                <p className="text-sm text-gray-500 mt-1">Chúng tôi sẽ phản hồi trong vòng 1–2 giờ làm việc.</p>
                <div className="flex gap-3 justify-center mt-5">
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', company: '', email: '', phone: '', product: '', quantity: '', message: '' }); }}
                    className="bg-[#2e7d32] text-white px-5 py-2 rounded font-bold text-sm hover:bg-[#1b5e20] transition-colors"
                  >
                    Gửi thêm
                  </button>
                  <a href="/san-pham" className="border border-gray-300 text-gray-700 px-5 py-2 rounded font-bold text-sm hover:bg-gray-50 transition-colors">
                    Xem sản phẩm
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Họ và tên *</label>
                    <input
                      required
                      placeholder="Nguyễn Văn A"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2e7d32]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Công ty / Tổ chức</label>
                    <input
                      placeholder="Tên công ty"
                      value={form.company}
                      onChange={e => setForm({ ...form, company: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2e7d32]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                    <input
                      placeholder="email@congty.vn"
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2e7d32]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Số điện thoại *</label>
                    <input
                      required
                      placeholder="0901 234 567"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2e7d32]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Danh mục sản phẩm</label>
                    <select
                      value={form.product}
                      onChange={e => setForm({ ...form, product: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2e7d32] bg-white"
                    >
                      <option value="">-- Chọn danh mục --</option>
                      {productCategories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Số lượng dự kiến</label>
                    <input
                      placeholder="VD: 1 máy, 2 bộ..."
                      value={form.quantity}
                      onChange={e => setForm({ ...form, quantity: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2e7d32]"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Yêu cầu chi tiết</label>
                  <textarea
                    placeholder="Mô tả chi tiết về sản phẩm: model, thông số kỹ thuật, ứng dụng, ngân sách dự kiến..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm h-28 resize-none focus:outline-none focus:border-[#2e7d32]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white py-3 rounded font-bold text-sm transition-colors disabled:opacity-70"
                >
                  {loading ? 'Đang gửi...' : 'GỬI YÊU CẦU BÁO GIÁ'}
                </button>

                <p className="text-center text-xs text-gray-400 mt-3">
                  Hoặc liên hệ trực tiếp:{' '}
                  <a href="tel:0902487928" className="text-[#2e7d32] font-semibold hover:underline">0902 487 928</a>
                  {' '}|{' '}
                  <a href="mailto:info@gantu.vn" className="text-[#2e7d32] font-semibold hover:underline">info@gantu.vn</a>
                </p>
              </form>
            )}
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { icon: '⚡', title: 'Phản hồi nhanh', desc: 'Báo giá trong 1–2 giờ làm việc' },
              { icon: '💰', title: 'Giá cạnh tranh', desc: 'Giá tốt nhất, chiết khấu hấp dẫn' },
              { icon: '🔧', title: 'Tư vấn miễn phí', desc: 'Kỹ sư tư vấn kỹ thuật chuyên sâu' },
            ].map(b => (
              <div key={b.title} className="bg-white border border-gray-200 rounded p-4 text-center hover:border-[#2e7d32] transition-colors">
                <div className="text-2xl mb-2">{b.icon}</div>
                <h3 className="font-bold text-gray-800 text-sm">{b.title}</h3>
                <p className="text-gray-500 text-xs mt-1">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
