'use client';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contactSent, setContactSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' });

  useEffect(() => {
    fetch(`${API_URL}/products/${slug}`)
      .then(r => r.json())
      .then(d => {
        const prod = d.id ? d : d.data;
        setProduct(prod);
        setRelated(d.related || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleContact = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: contactForm.name,
          phone: contactForm.phone,
          message: contactForm.message,
          product_interest: product?.name,
        }),
      });
    } catch {}
    setContactSent(true);
  };

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-2 pt-3 pb-6">
        <div className="flex gap-3">
          <div className="w-[215px] flex-shrink-0"><Sidebar /></div>
          <div className="flex-1 flex items-center justify-center py-20 text-gray-400">Đang tải...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-[1200px] mx-auto px-2 pt-3 pb-6">
        <div className="flex gap-3">
          <div className="w-[215px] flex-shrink-0"><Sidebar /></div>
          <div className="flex-1 text-center py-20 text-gray-500">
            <div className="text-5xl mb-3">😔</div>
            <p>Không tìm thấy sản phẩm</p>
            <a href="/san-pham" className="text-[#2e7d32] hover:underline text-sm mt-2 block">← Về danh sách sản phẩm</a>
          </div>
        </div>
      </div>
    );
  }

  let specs = {};
  try { specs = JSON.parse(product.specifications || '{}'); } catch {}

  return (
    <div className="max-w-[1200px] mx-auto px-2 pt-3 pb-6">
      {/* Breadcrumb */}
      <div className="bg-[#2e7d32] text-white text-xs px-3 py-1.5 rounded mb-3">
        <a href="/" className="hover:underline">Trang chủ</a>
        <span className="mx-1">»</span>
        <a href="/san-pham" className="hover:underline">Sản phẩm</a>
        {product.category_name && (
          <>
            <span className="mx-1">»</span>
            <a href={`/san-pham?cat=${product.category_slug}`} className="hover:underline">{product.category_name}</a>
          </>
        )}
        <span className="mx-1">»</span>
        <span className="text-green-200">{product.name}</span>
      </div>

      <div className="flex gap-3">
        <div className="w-[215px] flex-shrink-0"><Sidebar /></div>

        <div className="flex-1 min-w-0">
          {/* Product detail card */}
          <div className="bg-white border border-gray-200 rounded p-4 mb-3">
            <div className="flex gap-5">
              {/* Product image */}
              <div className="w-64 flex-shrink-0">
                <div className="border border-gray-200 rounded overflow-hidden aspect-square flex items-center justify-center bg-gray-50 p-3">
                  <img
                    src={product.image_url || `https://picsum.photos/300/300?random=${product.id}`}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>

              {/* Product info */}
              <div className="flex-1 min-w-0">
                {product.category_name && (
                  <a href={`/san-pham?cat=${product.category_slug}`} className="text-xs text-green-600 font-semibold uppercase hover:underline">
                    {product.category_name}
                  </a>
                )}
                <h1 className="text-lg font-bold text-gray-900 uppercase mt-1 mb-2 leading-snug">{product.name}</h1>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-gray-500">Mã sản phẩm:</span>
                  <span className="font-mono font-semibold text-gray-700 text-sm">{product.code}</span>
                </div>

                <div className="bg-green-50 border border-green-200 rounded p-3 mb-4">
                  <div className="text-xs text-gray-500 mb-0.5">Giá bán</div>
                  <div className="text-xl font-black text-[#2e7d32]">Liên hệ báo giá</div>
                  <div className="text-xs text-gray-500 mt-1">📞 Gọi ngay để nhận giá tốt nhất</div>
                </div>

                {/* Benefits */}
                <ul className="space-y-1.5 mb-4">
                  {['Hàng chính hãng 100%', 'Bảo hành 12-24 tháng', 'Hỗ trợ kỹ thuật 24/7', 'Giao hàng toàn quốc'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500">✓</span> {item}
                    </li>
                  ))}
                </ul>

                {/* Action buttons */}
                <div className="flex gap-2 flex-wrap">
                  <a
                    href="tel:0902487928"
                    className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white px-5 py-2.5 rounded text-sm font-bold transition-colors flex items-center gap-2"
                  >
                    📞 Gọi ngay: 0902 487 928
                  </a>
                  <a
                    href="/nhan-bao-gia"
                    className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-5 py-2.5 rounded text-sm font-bold transition-colors flex items-center gap-2"
                  >
                    📋 Nhận báo giá
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Description + Specs */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            {/* Description */}
            <div className="col-span-2 bg-white border border-gray-200 rounded p-4">
              <h2 className="font-bold text-sm uppercase text-gray-800 border-b border-[#2e7d32] border-b-2 pb-1.5 mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#2e7d32] rounded-sm inline-block"></span>
                Mô tả sản phẩm
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">{product.description || 'Vui lòng liên hệ để biết thêm thông tin chi tiết về sản phẩm.'}</p>

              {Object.keys(specs).length > 0 && (
                <>
                  <h3 className="font-bold text-sm mt-4 mb-2 text-gray-800">Thông số kỹ thuật</h3>
                  <table className="w-full text-sm border border-gray-200 rounded overflow-hidden">
                    <tbody>
                      {Object.entries(specs).map(([k, v], i) => (
                        <tr key={k} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-3 py-2 font-medium text-gray-600 border-b border-gray-100 w-2/5">{k}</td>
                          <td className="px-3 py-2 text-gray-800 border-b border-gray-100">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>

            {/* Contact form sidebar */}
            <div className="col-span-1 bg-white border border-gray-200 rounded p-4">
              <h3 className="font-bold text-sm uppercase text-gray-800 border-b border-[#2e7d32] border-b-2 pb-1.5 mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#2e7d32] rounded-sm inline-block"></span>
                Liên hệ tư vấn
              </h3>
              {contactSent ? (
                <div className="text-center py-4 text-[#2e7d32]">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="font-bold text-sm">Đã gửi thành công!</p>
                  <p className="text-xs text-gray-500 mt-1">Chúng tôi sẽ liên hệ sớm.</p>
                </div>
              ) : (
                <form onSubmit={handleContact} className="space-y-2">
                  <input
                    required
                    placeholder="Họ và tên *"
                    value={contactForm.name}
                    onChange={e => setContactForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full border border-gray-300 rounded px-2.5 py-2 text-sm focus:outline-none focus:border-[#2e7d32]"
                  />
                  <input
                    required
                    placeholder="Số điện thoại *"
                    value={contactForm.phone}
                    onChange={e => setContactForm(p => ({ ...p, phone: e.target.value }))}
                    className="w-full border border-gray-300 rounded px-2.5 py-2 text-sm focus:outline-none focus:border-[#2e7d32]"
                  />
                  <textarea
                    placeholder="Nội dung..."
                    value={contactForm.message}
                    onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))}
                    rows={3}
                    className="w-full border border-gray-300 rounded px-2.5 py-2 text-sm focus:outline-none focus:border-[#2e7d32] resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white py-2 rounded text-sm font-bold transition-colors"
                  >
                    Gửi yêu cầu
                  </button>
                </form>
              )}
              <div className="border-t border-gray-100 mt-3 pt-3 space-y-1">
                <a href="tel:0902487928" className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#2e7d32]">
                  📞 <span>0902 487 928</span>
                </a>
                <a href="mailto:info@gantu.vn" className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#2e7d32]">
                  📧 <span>info@gantu.vn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="bg-white border border-gray-200 rounded p-3">
              <h3 className="font-bold text-sm uppercase text-gray-800 border-b border-[#2e7d32] border-b-2 pb-1.5 mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#2e7d32] rounded-sm inline-block"></span>
                Sản phẩm liên quan
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {related.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
