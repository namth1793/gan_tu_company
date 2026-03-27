'use client';
import Link from 'next/link';
import { FaArrowRight, FaPhone, FaCheckCircle, FaIndustry, FaUsers, FaAward, FaHeadset } from 'react-icons/fa';

const stats = [
  { icon: FaIndustry, value: '500+', label: 'Sản phẩm' },
  { icon: FaUsers, value: '1.000+', label: 'Khách hàng' },
  { icon: FaAward, value: '15 năm', label: 'Kinh nghiệm' },
  { icon: FaHeadset, value: '24/7', label: 'Hỗ trợ' },
];

const highlights = [
  'Sản phẩm chính hãng 100%',
  'Bảo hành 12-24 tháng',
  'Giao hàng toàn quốc',
  'Tư vấn kỹ thuật miễn phí',
];

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-700 to-primary-500 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Decorative circles */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary-400 rounded-full opacity-20"></div>
      <div className="absolute -left-10 -bottom-20 w-60 h-60 bg-primary-300 rounded-full opacity-15"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-600 bg-opacity-60 border border-primary-400 border-opacity-50 rounded-full px-4 py-1.5 text-sm mb-6">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
              Đối tác tin cậy của ngành công nghiệp
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Gan Tu Company
              <span className="block text-green-300 mt-1">Giải pháp máy móc &</span>
              <span className="block">thiết bị công nghiệp</span>
            </h1>

            <p className="text-primary-100 text-base md:text-lg mb-6 leading-relaxed max-w-lg">
              Chuyên cung cấp máy CNC, máy ép thủy lực, dây chuyền sản xuất tự động, thiết bị cơ khí chất lượng cao cho các nhà máy, xưởng sản xuất trên toàn quốc.
            </p>

            <ul className="grid grid-cols-2 gap-2 mb-8">
              {highlights.map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-primary-100">
                  <FaCheckCircle className="text-green-300 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/san-pham"
                className="flex items-center gap-2 bg-white text-primary-700 hover:bg-primary-50 px-6 py-3 rounded-lg font-bold text-base transition-colors shadow-lg"
              >
                <FaIndustry />
                Xem sản phẩm
                <FaArrowRight className="text-sm" />
              </Link>
              <Link
                href="/lien-he"
                className="flex items-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-700 px-6 py-3 rounded-lg font-bold text-base transition-all"
              >
                <FaPhone />
                Liên hệ ngay
              </Link>
            </div>
          </div>

          {/* Right - image / illustration */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="w-80 h-80 bg-primary-600 bg-opacity-40 rounded-2xl rotate-6 absolute inset-0"></div>
              <div className="relative w-80 h-80 bg-white bg-opacity-10 rounded-2xl border border-white border-opacity-20 flex items-center justify-center">
                <div className="text-center">
                  <FaIndustry className="text-8xl text-white opacity-60 mx-auto mb-4" />
                  <p className="text-white font-bold text-xl">Industrial Solutions</p>
                  <p className="text-primary-200 text-sm">Máy móc & Thiết bị</p>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 rounded-full px-3 py-1.5 text-xs font-bold shadow-lg">
                ISO 9001
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white text-primary-700 rounded-xl px-3 py-2 text-xs font-bold shadow-lg">
                <div className="text-lg font-black">15+</div>
                <div>Năm KN</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-12 pt-8 border-t border-primary-600 border-opacity-50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-600 bg-opacity-60 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="text-xl text-green-300" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{value}</div>
                  <div className="text-primary-200 text-sm">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
