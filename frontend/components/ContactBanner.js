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
        body: JSON.stringify({ full_name: form.name, email: form.email, phone: form.phone, message: form.message }),
      });
    } catch {}
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg" style={{ background: 'linear-gradient(135deg, #1a0f0f 0%, #271C1C 50%, #1a2a1a 100%)' }}>
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-bold text-base">Liên hệ tư vấn & nhận báo giá</h3>
            <p className="text-gray-400 text-xs mt-0.5">Phản hồi trong vòng 2 giờ làm việc</p>
          </div>
          <div className="ml-auto hidden md:flex items-center gap-4">
            {[
              { icon: '📞', text: '0902 487 928' },
              { icon: '✉️', text: 'info@gantu.vn' },
            ].map(c => (
              <div key={c.text} className="text-gray-400 text-xs flex items-center gap-1">
                <span>{c.icon}</span>
                <span className="text-gray-300">{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5">
        {sent ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-bold text-white text-lg">Gửi thành công!</p>
            <p className="text-gray-400 text-sm mt-1">Đội ngũ tư vấn sẽ liên hệ bạn trong vòng 2 giờ.</p>
            <button
              onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', message: '' }); }}
              className="mt-4 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold py-2 px-6 rounded-lg text-sm transition-all hover:shadow-lg"
            >
              Gửi thêm yêu cầu
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
            {[
              { key: 'name', placeholder: 'Họ và tên *', required: true, col: 1 },
              { key: 'phone', placeholder: 'Số điện thoại *', required: true, col: 1 },
              { key: 'email', placeholder: 'Email', required: false, col: 1 },
            ].map(f => (
              <input
                key={f.key}
                placeholder={f.placeholder}
                required={f.required}
                value={form[f.key]}
                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                className="px-3.5 py-2.5 text-sm rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all"
              />
            ))}
            <textarea
              placeholder="Nội dung cần tư vấn (sản phẩm, số lượng...)"
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              className="px-3.5 py-2.5 text-sm rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 h-[6.5rem] resize-none transition-all"
            />
            <div className="col-span-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold py-2.5 px-6 rounded-lg text-sm uppercase tracking-wide transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Đang gửi...
                  </span>
                ) : 'Gửi thông tin'}
              </button>
              <p className="text-gray-500 text-[10px] leading-tight">
                Bằng cách gửi, bạn đồng ý với<br />chính sách bảo mật của chúng tôi
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
