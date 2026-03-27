'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
const getToken = () => localStorage.getItem('admin_token');

export default function AdminNewsForm({ newsId }) {
  const router = useRouter();
  const isEdit = !!newsId;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    is_featured: false,
  });

  useEffect(() => {
    if (isEdit) {
      fetch(`${API_URL}/admin/news?limit=1000`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
        .then(r => r.json())
        .then(d => {
          const n = (d.news || []).find(x => x.id == newsId);
          if (n) {
            setForm({
              title: n.title,
              slug: n.slug || '',
              excerpt: n.excerpt || '',
              content: n.content || '',
              image_url: n.image_url || '',
              is_featured: !!n.is_featured,
            });
          }
        });
    }
  }, [newsId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const url = isEdit
        ? `${API_URL}/admin/news/${newsId}`
        : `${API_URL}/admin/news`;
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
      router.push('/admin/news');
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
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề *</label>
          <input
            required
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
          <input
            value={form.slug}
            onChange={e => setForm({ ...form, slug: e.target.value })}
            placeholder="tu-dong-tao-neu-de-trong"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL ảnh đại diện</label>
          <input
            value={form.image_url}
            onChange={e => setForm({ ...form, image_url: e.target.value })}
            className={inputCls}
          />
        </div>
        {form.image_url && (
          <div>
            <img
              src={form.image_url}
              alt="preview"
              className="w-40 h-24 object-cover rounded border"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tóm tắt</label>
          <textarea
            value={form.excerpt}
            onChange={e => setForm({ ...form, excerpt: e.target.value })}
            className={inputCls + ' h-20 resize-none'}
            placeholder="Mô tả ngắn hiển thị ngoài danh sách..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
          <textarea
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            className={inputCls + ' h-48 resize-y'}
            placeholder="Nội dung bài viết đầy đủ..."
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="news_featured"
            checked={form.is_featured}
            onChange={e => setForm({ ...form, is_featured: e.target.checked })}
          />
          <label htmlFor="news_featured" className="text-sm text-gray-700">
            Bài viết nổi bật ⭐
          </label>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#271C1C] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#3d2a2a] transition-colors disabled:opacity-60"
        >
          {loading ? 'Đang lưu...' : isEdit ? 'Cập nhật' : 'Đăng bài'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/news')}
          className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
        >
          Hủy
        </button>
      </div>
    </form>
  );
}
