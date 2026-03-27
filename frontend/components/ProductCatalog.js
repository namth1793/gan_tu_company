'use client';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  FaCog, FaMicrochip, FaIndustry, FaWrench, FaBoxes,
  FaFlask, FaCube, FaBolt, FaSearch, FaChevronRight,
  FaThLarge, FaList
} from 'react-icons/fa';
import ProductCard from './ProductCard';

const categoryIcons = {
  'may-ep': FaCog,
  'may-cnc': FaMicrochip,
  'day-chuyen-san-xuat': FaIndustry,
  'thiet-bi-co-khi': FaWrench,
  'vat-tu-cong-nghiep': FaBoxes,
  'keo-hoa-chat': FaFlask,
  'khuon-mau': FaCube,
  'thiet-bi-dien': FaBolt,
};

export default function ProductCatalog({ initialCategoryId }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId || null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then(r => r.json())
      .then(d => { if (d.success) setCategories(d.data); });
  }, []);

  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) setSelectedCategory(catParam);
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page: currentPage, limit: 12 });
    if (selectedCategory) params.set('category_id', selectedCategory);
    if (search) params.set('search', search);

    fetch(`${API_URL}/products?${params}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setProducts(d.data);
          setPagination(d.pagination);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedCategory, currentPage, search]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setCurrentPage(1);
  };

  const selectedCategoryName = categories.find(c => c.id == selectedCategory)?.name || 'Tất cả sản phẩm';

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section title */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 section-title">Danh mục sản phẩm</h2>
          <p className="text-gray-500 mt-3">Khám phá hàng trăm sản phẩm máy móc thiết bị công nghiệp chất lượng cao</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              {/* Sidebar header */}
              <div className="bg-primary-600 text-white px-4 py-3 flex items-center gap-2 font-semibold">
                <FaThLarge />
                Danh mục
              </div>
              <ul className="py-1">
                <li>
                  <button
                    onClick={() => handleCategorySelect(null)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                      !selectedCategory
                        ? 'bg-primary-50 text-primary-600 font-semibold border-r-4 border-primary-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FaThLarge className="text-gray-400" />
                      <span>Tất cả sản phẩm</span>
                    </div>
                    <FaChevronRight className="text-xs text-gray-400" />
                  </button>
                </li>
                {categories.map(cat => {
                  const Icon = categoryIcons[cat.slug] || FaCog;
                  const isActive = selectedCategory == cat.id;
                  return (
                    <li key={cat.id}>
                      <button
                        onClick={() => handleCategorySelect(cat.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors border-b border-gray-50 ${
                          isActive
                            ? 'bg-primary-50 text-primary-600 font-semibold border-r-4 border-primary-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className={isActive ? 'text-primary-500' : 'text-gray-400'} />
                          <span className="text-left">{cat.name}</span>
                        </div>
                        <FaChevronRight className="text-xs text-gray-400" />
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Contact box */}
              <div className="m-3 bg-primary-50 rounded-lg p-4 border border-primary-100">
                <p className="text-sm font-semibold text-primary-700 mb-1">Cần tư vấn?</p>
                <p className="text-xs text-gray-600 mb-3">Gọi ngay để được hỗ trợ miễn phí</p>
                <a
                  href="tel:02812345678"
                  className="block w-full text-center bg-primary-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors"
                >
                  028 1234 5678
                </a>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-800">{selectedCategoryName}</h3>
                <p className="text-xs text-gray-500">{pagination.total} sản phẩm</p>
              </div>
              <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors"
                >
                  Tìm
                </button>
              </form>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
                    <div className="bg-gray-200 aspect-[4/3]"></div>
                    <div className="p-3 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                <FaSearch className="text-4xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Không tìm thấy sản phẩm phù hợp</p>
                <button
                  onClick={() => { setSearch(''); setSearchInput(''); setSelectedCategory(null); setCurrentPage(1); }}
                  className="mt-3 text-primary-600 text-sm hover:underline"
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  Trước
                </button>
                {[...Array(pagination.totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${
                      currentPage === i + 1
                        ? 'bg-primary-600 text-white'
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={currentPage === pagination.totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  Sau
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
