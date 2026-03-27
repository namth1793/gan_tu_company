'use client';
import Sidebar from '@/components/Sidebar';
import ProductGrid from '@/components/ProductGrid';
import VideoNewsSection from '@/components/VideoNewsSection';
import ContactBanner from '@/components/ContactBanner';

export default function HomePage() {
  return (
    <div className="max-w-[1200px] mx-auto px-2 pt-3 pb-6">
      <div className="flex gap-3">
        {/* LEFT SIDEBAR */}
        <div className="w-[215px] flex-shrink-0">
          <Sidebar />
        </div>

        {/* RIGHT MAIN CONTENT */}
        <div className="flex-1 min-w-0 space-y-4">
          <ProductGrid title="GIÀY THỂ THAO" categorySlug="giay-the-thao" limit={8} />
          <ProductGrid title="SẢN PHẨM NỔI BẬT" limit={8} />
          <VideoNewsSection />
          <ProductGrid title="GIÀY DA NAM" categorySlug="giay-da-nam" limit={8} showPagination />
          <ProductGrid title="GIÀY CAO GÓT" categorySlug="giay-cao-got" limit={8} showPagination />
          <ProductGrid title="DÉP & SANDAL" categorySlug="dep-sandal" limit={8} />
          <ProductGrid title="GIÀY TRẺ EM" categorySlug="giay-tre-em" limit={8} showPagination />
          <ContactBanner />
        </div>
      </div>
    </div>
  );
}
