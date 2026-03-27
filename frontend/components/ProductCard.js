import Link from 'next/link';

export default function ProductCard({ product }) {
  if (!product) return null;
  const href = `/san-pham/${product.slug || product.id}`;

  return (
    <Link
      href={href}
      className="group bg-white border border-gray-200 rounded overflow-hidden flex flex-col hover:shadow-md hover:border-[#5a3a3a] transition-all duration-200"
    >
      <div className="overflow-hidden bg-gray-50 aspect-square flex items-center justify-center p-2">
        <img
          src={product.image_url || `https://picsum.photos/200/200?random=${product.id || 1}`}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </div>
      <div className="p-2 flex-1 flex flex-col justify-between border-t border-gray-100">
        <p className="text-xs font-semibold text-gray-800 uppercase text-center leading-tight line-clamp-2 group-hover:text-[#271C1C] transition-colors">
          {product.name}
        </p>
        {product.code && (
          <p className="text-[10px] text-gray-400 text-center mt-0.5 font-mono">
            Mã: {product.code}
          </p>
        )}
        {product.category_name && (
          <p className="text-[10px] text-green-600 text-center mt-0.5">{product.category_name}</p>
        )}
        <p className="text-sm text-red-600 font-bold text-center mt-1">
          {product.price || 'Liên hệ'}
        </p>
      </div>
    </Link>
  );
}
