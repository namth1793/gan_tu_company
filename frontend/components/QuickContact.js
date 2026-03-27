'use client';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheckCircle, FaSpinner } from 'react-icons/fa';

export default function QuickContact() {
  const [form, setForm] = useState({ full_name: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.phone) {
      setError('Vui lòng nhập họ tên và số điện thoại');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setForm({ full_name: '', phone: '', email: '', message: '' });
      } else {
        setError(data.message || 'Có lỗi xảy ra');
      }
    } catch {
      setError('Không thể kết nối máy chủ');
    }
    setLoading(false);
  };

  return (
    <section className="py-12 bg-gradient-to-br from-primary-700 to-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Liên hệ tư vấn miễn phí</h2>
          <p className="text-primary-200">Đội ngũ kỹ thuật sẵn sàng hỗ trợ 24/7</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
            <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
              <FaEnvelope className="text-green-300" />
              Gửi yêu cầu báo giá
            </h3>

            {success ? (
              <div className="text-center py-8">
                <FaCheckCircle className="text-5xl text-green-300 mx-auto mb-3" />
                <p className="text-lg font-semibold">Gửi thành công!</p>
                <p className="text-primary-200 text-sm mt-1">Chúng tôi sẽ liên hệ trong vòng 24 giờ</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 px-6 py-2 bg-white text-primary-700 rounded-lg font-semibold text-sm hover:bg-primary-50 transition-colors"
                >
                  Gửi thêm
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-500 bg-opacity-20 border border-red-400 text-red-100 rounded-lg px-3 py-2 text-sm">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-primary-200 mb-1">Họ tên *</label>
                    <input
                      name="full_name"
                      value={form.full_name}
                      onChange={handleChange}
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-white bg-opacity-15 border border-white border-opacity-30 rounded-lg px-3 py-2.5 text-white placeholder-primary-300 focus:outline-none focus:border-white transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-primary-200 mb-1">Số điện thoại *</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="0901 234 567"
                      className="w-full bg-white bg-opacity-15 border border-white border-opacity-30 rounded-lg px-3 py-2.5 text-white placeholder-primary-300 focus:outline-none focus:border-white transition-colors text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-primary-200 mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@congty.vn"
                    className="w-full bg-white bg-opacity-15 border border-white border-opacity-30 rounded-lg px-3 py-2.5 text-white placeholder-primary-300 focus:outline-none focus:border-white transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-primary-200 mb-1">Nội dung</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Mô tả nhu cầu của bạn..."
                    className="w-full bg-white bg-opacity-15 border border-white border-opacity-30 rounded-lg px-3 py-2.5 text-white placeholder-primary-300 focus:outline-none focus:border-white transition-colors text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-primary-700 hover:bg-primary-50 py-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <><FaSpinner className="animate-spin" /> Đang gửi...</>
                  ) : (
                    'Gửi yêu cầu ngay'
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-5">Thông tin liên hệ</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: FaMapMarkerAlt,
                    title: 'Địa chỉ',
                    content: '123 Đường Công Nghiệp, Khu Công Nghiệp Tân Bình, TP. Hồ Chí Minh'
                  },
                  {
                    icon: FaPhone,
                    title: 'Hotline',
                    content: '028 1234 5678',
                    href: 'tel:02812345678'
                  },
                  {
                    icon: FaEnvelope,
                    title: 'Email',
                    content: 'info@gantu.vn',
                    href: 'mailto:info@gantu.vn'
                  },
                  {
                    icon: FaClock,
                    title: 'Giờ làm việc',
                    content: 'Thứ 2 – Thứ 7: 7:30 – 17:30\nHỗ trợ kỹ thuật: 24/7'
                  },
                ].map(({ icon: Icon, title, content, href }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="text-green-300" />
                    </div>
                    <div>
                      <p className="text-primary-200 text-xs mb-0.5">{title}</p>
                      {href ? (
                        <a href={href} className="text-white font-semibold hover:text-green-300 transition-colors">{content}</a>
                      ) : (
                        <p className="text-white font-semibold whitespace-pre-line text-sm">{content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white bg-opacity-10 rounded-2xl p-5 border border-white border-opacity-20">
              <h4 className="font-bold mb-4 text-green-300">Cam kết của chúng tôi</h4>
              <ul className="space-y-3">
                {[
                  'Phản hồi trong vòng 2 giờ làm việc',
                  'Báo giá chi tiết, minh bạch',
                  'Kỹ sư tư vấn chuyên sâu',
                  'Hỗ trợ kỹ thuật trọn đời',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-primary-100">
                    <FaCheckCircle className="text-green-300 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
