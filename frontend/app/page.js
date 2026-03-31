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
          <ProductGrid title="MÁY MÓC" categorySlug="may-moc" limit={8} />
          <ProductGrid title="SẢN PHẨM NỔI BẬT" limit={8} />
          <VideoNewsSection />
          <ProductGrid title="THÀNH PHẨM" categorySlug="thanh-pham" limit={8} />
          <ProductGrid title="ĐẾ GIÀY" categorySlug="de-giay" limit={8} showPagination />
          <ProductGrid title="HOÁ CHẤT" categorySlug="hoa-chat" limit={8} />
          <ProductGrid title="ĐẾ SANDAL" categorySlug="de-sandal" limit={8} />
          <ProductGrid title="KHUÔN / MOLD" categorySlug="khuon-mold" limit={8} showPagination />
          <ContactBanner />
        </div>
      </div>
    </div>
  );
}
