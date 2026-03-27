'use client';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ProductCard from '@/components/ProductCard';

function SanPhamContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 20;

  const cat = searchParams.get('cat') || '';

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit });
    if (search) params.set('search', search);
    if (cat) params.set('cat_slug', cat);

    fetch(`${API_URL}/products?${params}`)
      .then(r => r.json())
      .then(d => {
        setProducts(d.products || d.data || []);
        setTotal(d.total || d.pagination?.total || 0);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, [page, search, cat]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const totalPages = Math.ceil(total / limit) || 1;
  const catName = cat ? cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Tất cả sản phẩm';

  return (
    <div className="max-w-[1200px] mx-auto px-2 pt-3 pb-6">
      {/* Breadcrumb */}
      <div className="bg-[#2e7d32] text-white text-xs px-3 py-1.5 rounded mb-3">
        <a href="/" className="hover:underline">Trang chủ</a>
        <span className="mx-1">»</span>
        <span>Sản phẩm</span>
        {cat && <><span className="mx-1">»</span><span>{catName}</span></>}
      </div>

      <div className="flex gap-3">
        <div className="w-[215px] flex-shrink-0">
          <Sidebar />
        </div>

        <div className="flex-1 min-w-0">
          <div className="bg-white border border-gray-200 rounded p-3">
            <div className="flex items-center justify-between border-b-2 border-[#2e7d32] pb-2 mb-3">
              <h1 className="text-base font-bold uppercase text-gray-800 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#2e7d32] rounded-sm inline-block"></span>
                {catName}
                {total > 0 && <span className="text-xs font-normal text-gray-500 normal-case">({total} sản phẩm)</span>}
              </h1>
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="border border-gray-300 rounded px-2 py-1 text-sm w-36 focus:outline-none focus:border-[#2e7d32]"
                />
                <button
                  type="submit"
                  className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Tìm
                </button>
              </form>
            </div>

            {loading ? (
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="bg-gray-100 rounded animate-pulse aspect-square" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-5xl mb-3">📦</div>
                <p>Không tìm thấy sản phẩm</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 mb-4">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex gap-1 justify-center mt-4">
                {page > 1 && (
                  <button onClick={() => setPage(page - 1)} className="w-8 h-7 text-xs rounded bg-gray-100 hover:bg-green-100 text-gray-700">‹</button>
                )}
                {Array.from({ length: Math.min(totalPages, 8) }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-7 h-7 text-xs font-bold rounded transition-colors ${
                      page === n
                        ? 'bg-[#2e7d32] text-white'
                        : 'bg-gray-100 hover:bg-green-100 text-gray-700'
                    }`}
                  >
                    {n}
                  </button>
                ))}
                {page < totalPages && (
                  <button onClick={() => setPage(page + 1)} className="w-8 h-7 text-xs rounded bg-gray-100 hover:bg-green-100 text-gray-700">›</button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SanPhamPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">Đang tải...</div>}>
      <SanPhamContent />
    </Suspense>
  );
}
