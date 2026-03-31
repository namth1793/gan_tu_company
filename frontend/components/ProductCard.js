import Link from 'next/link';

export default function ProductCard({ product }) {
  if (!product) return null;
  const href = `/san-pham/${product.slug || product.id}`;

  return (
    <Link
      href={href}
      className="group bg-white border border-gray-100 rounded-lg overflow-hidden flex flex-col hover:shadow-xl hover:border-amber-300 hover:-translate-y-1 transition-all duration-250"
    >
      {/* Image area */}
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        <img
          src={product.image_url || `https://picsum.photos/200/200?random=${product.id || 1}`}
          alt={product.name}
          className="w-full h-full object-contain p-2 group-hover:scale-108 transition-transform duration-350"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#271C1C]/0 group-hover:bg-[#271C1C]/10 transition-colors duration-250 flex items-center justify-center">
          <span className="bg-amber-400 text-gray-900 text-[10px] font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-250 translate-y-2 group-hover:translate-y-0 shadow">
            Xem chi tiết →
          </span>
        </div>
        {/* Category badge */}
        {product.category_name && (
          <span className="absolute top-1.5 left-1.5 bg-green-600 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded">
            {product.category_name}
          </span>
        )}
      </div>

      {/* Info area */}
      <div className="p-2.5 flex-1 flex flex-col gap-1 border-t border-gray-100">
        <p className="text-xs font-semibold text-gray-800 uppercase text-center leading-snug line-clamp-2 group-hover:text-[#271C1C] transition-colors min-h-[2.5rem]">
          {product.name}
        </p>
        {product.code && (
          <p className="text-[9px] text-gray-400 text-center font-mono tracking-wide">
            #{product.code}
          </p>
        )}
        <div className="mt-auto pt-1.5 border-t border-gray-100 flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
          <span className="text-xs text-red-600 font-bold">{product.price || 'Liên hệ'}</span>
        </div>
      </div>
    </Link>
  );
}
