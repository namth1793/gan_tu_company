'use client';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import SectionTitle from './SectionTitle';

function getMockProducts(slug, limit) {
  return Array.from({ length: limit }, (_, i) => ({
    id: (slug ? slug.length * 100 : 0) + i + 1,
    name: `Sản phẩm ${slug || 'nổi bật'} ${i + 1}`,
    slug: `san-pham-${(slug ? slug.length * 100 : 0) + i + 1}`,
    code: `GT-${String((slug ? slug.length * 100 : 0) + i + 1).padStart(3, '0')}`,
    image_url: `https://picsum.photos/200/200?random=${(slug?.length || 0) * 10 + i + 1}`,
    price: 'Liên hệ',
  }));
}

export default function ProductGrid({ title, categorySlug, limit = 8, showPagination = false }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = categorySlug
      ? `${API_URL}/products?cat_slug=${categorySlug}&page=${page}&limit=${limit}`
      : `${API_URL}/products/featured?limit=${limit}`;

    fetch(url)
      .then(r => r.json())
      .then(data => {
        setProducts(data.products || data.data || []);
        setTotal(data.total || data.pagination?.total || 0);
        setLoading(false);
      })
      .catch(() => {
        setProducts(getMockProducts(categorySlug, limit));
        setLoading(false);
      });
  }, [categorySlug, page, limit]);

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const sectionHref = `/san-pham${categorySlug ? `?cat=${categorySlug}` : ''}`;

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
      <SectionTitle title={title} href={sectionHref} />

      {loading ? (
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: limit }, (_, i) => (
            <div key={i} className="rounded-lg overflow-hidden">
              <div className="aspect-square bg-gray-100 animate-pulse" />
              <div className="p-2 space-y-1.5">
                <div className="h-2.5 bg-gray-100 animate-pulse rounded" />
                <div className="h-2.5 bg-gray-100 animate-pulse rounded w-2/3 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {products.slice(0, limit).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {showPagination && totalPages > 1 && (
        <div className="flex gap-1.5 justify-center mt-4 pt-3 border-t border-gray-100">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 text-xs font-bold rounded-lg bg-gray-100 text-gray-600 hover:bg-[#271C1C] hover:text-white disabled:opacity-30 transition-all"
          >‹</button>
          {Array.from({ length: Math.min(totalPages, 8) }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-8 h-8 text-xs font-bold rounded-lg transition-all ${
                page === n
                  ? 'bg-[#271C1C] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-[#271C1C]'
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-8 h-8 text-xs font-bold rounded-lg bg-gray-100 text-gray-600 hover:bg-[#271C1C] hover:text-white disabled:opacity-30 transition-all"
          >›</button>
        </div>
      )}
    </div>
  );
}
