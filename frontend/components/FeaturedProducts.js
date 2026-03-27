'use client';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaStar, FaArrowRight } from 'react-icons/fa';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/products/featured`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setProducts(d.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-6 bg-primary-600 rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Sản phẩm nổi bật</h2>
            </div>
            <p className="text-gray-500 text-sm ml-3">Những sản phẩm được khách hàng tin dùng nhiều nhất</p>
          </div>
          <Link
            href="/san-pham"
            className="hidden md:flex items-center gap-2 text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors"
          >
            Xem tất cả <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {/* Top bar */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {['Tất cả', 'Máy CNC', 'Máy ép', 'Thiết bị điện', 'Dây chuyền'].map(label => (
            <button
              key={label}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                label === 'Tất cả'
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary-400 hover:text-primary-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-xl overflow-hidden animate-pulse">
                <div className="bg-gray-200 aspect-[4/3]"></div>
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Mobile view all */}
        <div className="mt-6 text-center md:hidden">
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold border border-primary-600 px-6 py-2.5 rounded-lg hover:bg-primary-50 transition-colors"
          >
            Xem tất cả sản phẩm <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
