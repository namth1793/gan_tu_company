'use client';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
import { useState } from 'react';

export default function ContactBanner() {
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
    <div className="bg-[#271C1C] rounded p-5 mt-4">
      <h3 className="text-white font-bold text-base uppercase mb-4 text-center tracking-wide">
        👟 Đăng ký nhận ưu đãi & tư vấn size
      </h3>
      {sent ? (
        <div className="text-center text-white py-4">
          <div className="text-3xl mb-2">✅</div>
          <p className="font-medium text-lg">Cảm ơn bạn đã liên hệ!</p>
          <p className="text-gray-400 text-sm mt-1">Chúng tôi sẽ phản hồi trong vòng 2 giờ làm việc.</p>
          <button
            onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', message: '' }); }}
            className="mt-3 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-1.5 px-5 rounded text-sm transition-colors"
          >
            Gửi thêm
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
          <input
            placeholder="Họ và tên *"
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="col-span-1 px-3 py-2 text-sm rounded border-0 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
          />
          <input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="col-span-1 px-3 py-2 text-sm rounded border-0 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
          />
          <input
            placeholder="Số điện thoại *"
            required
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="col-span-1 px-3 py-2 text-sm rounded border-0 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
          />
          <textarea
            placeholder="Nội dung cần tư vấn"
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            className="col-span-1 px-3 py-2 text-sm rounded border-0 focus:outline-none focus:ring-2 focus:ring-yellow-400 h-20 resize-none text-gray-800"
          />
          <div className="col-span-2 text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-2.5 px-10 rounded uppercase text-sm transition-colors disabled:opacity-70"
            >
              {loading ? 'Đang gửi...' : 'GỬI THÔNG TIN'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
