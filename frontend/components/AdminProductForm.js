'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
const getToken = () => localStorage.getItem('admin_token');

export default function AdminProductForm({ productId }) {
  const router = useRouter();
  const isEdit = !!productId;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    category_id: '',
    name: '',
    code: '',
    price: '',
    description: '',
    specifications: '',
    image_url: '',
    is_featured: false,
  });

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then(r => r.json())
      .then(d => setCategories(d.categories || d || []));

    if (isEdit) {
      fetch(`${API_URL}/admin/products?limit=1000`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
        .then(r => r.json())
        .then(d => {
          const p = (d.products || []).find(x => x.id == productId);
          if (p) {
            setForm({
              category_id: p.category_id,
              name: p.name,
              code: p.code || '',
              price: p.price || '',
              description: p.description || '',
              specifications: p.specifications || '',
              image_url: p.image_url || '',
              is_featured: !!p.is_featured,
            });
          }
        });
    }
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const url = isEdit
        ? `${API_URL}/admin/products/${productId}`
        : `${API_URL}/admin/products`;
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi');
      router.push('/admin/products');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const inputCls =
    'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#271C1C]';

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 max-w-2xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded px-3 py-2 mb-4">{error}</div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm *</label>
          <input
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục *</label>
          <select
            required
            value={form.category_id}
            onChange={e => setForm({ ...form, category_id: e.target.value })}
            className={inputCls}
          >
            <option value="">Chọn danh mục</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mã sản phẩm</label>
          <input
            value={form.code}
            onChange={e => setForm({ ...form, code: e.target.value })}
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Giá</label>
          <input
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            placeholder="VD: 850.000đ"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL ảnh</label>
          <input
            value={form.image_url}
            onChange={e => setForm({ ...form, image_url: e.target.value })}
            className={inputCls}
          />
        </div>
        {form.image_url && (
          <div className="col-span-2">
            <img
              src={form.image_url}
              alt="preview"
              className="w-24 h-24 object-cover rounded border"
            />
          </div>
        )}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className={inputCls + ' h-24 resize-none'}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Thông số kỹ thuật (JSON)</label>
          <textarea
            value={form.specifications}
            onChange={e => setForm({ ...form, specifications: e.target.value })}
            placeholder='{"Size": "36-44", "Chất liệu": "Da thật"}'
            className={inputCls + ' h-20 resize-none font-mono text-xs'}
          />
        </div>
        <div className="col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={form.is_featured}
            onChange={e => setForm({ ...form, is_featured: e.target.checked })}
          />
          <label htmlFor="featured" className="text-sm text-gray-700">
            Sản phẩm nổi bật ⭐
          </label>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#271C1C] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#3d2a2a] transition-colors disabled:opacity-60"
        >
          {loading ? 'Đang lưu...' : isEdit ? 'Cập nhật' : 'Thêm sản phẩm'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
        >
          Hủy
        </button>
      </div>
    </form>
  );
}
