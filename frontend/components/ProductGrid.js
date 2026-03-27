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
    <div className="bg-white border border-gray-200 rounded p-3">
      <SectionTitle title={title} href={sectionHref} />

      {loading ? (
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: limit }, (_, i) => (
            <div key={i} className="bg-gray-100 rounded animate-pulse aspect-square" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {products.slice(0, limit).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {showPagination && totalPages > 1 && (
        <div className="flex gap-1 justify-center mt-3">
          {Array.from({ length: Math.min(totalPages, 8) }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-7 h-7 text-xs font-bold rounded transition-colors ${
                page === n
                  ? 'bg-[#271C1C] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-[#271C1C]'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
