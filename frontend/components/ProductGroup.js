import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import ProductCard from './ProductCard';

export default function ProductGroup({ title, products = [], viewAllLink = '/san-pham', icon: Icon }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 bg-primary-600 rounded-full"></div>
            {Icon && (
              <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center">
                <Icon className="text-primary-600 text-lg" />
              </div>
            )}
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
          </div>
          <Link
            href={viewAllLink}
            className="flex items-center gap-1.5 text-primary-600 text-sm font-semibold hover:text-primary-700 transition-colors"
          >
            Xem thêm <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.slice(0, 5).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
