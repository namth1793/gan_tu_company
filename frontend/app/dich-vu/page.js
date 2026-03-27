import Link from 'next/link';
import {
  FaWrench, FaTools, FaTruck, FaUserTie, FaShieldAlt,
  FaCog, FaChalkboardTeacher, FaPhone, FaCheckCircle
} from 'react-icons/fa';

export const metadata = {
  title: 'Dịch vụ – Gan Tu Company',
  description: 'Dịch vụ bảo trì, sửa chữa, lắp đặt máy móc thiết bị công nghiệp – Gan Tu Company',
};

const services = [
  {
    icon: FaTruck,
    title: 'Cung cấp & Giao hàng',
    desc: 'Cung cấp máy móc, thiết bị công nghiệp chính hãng. Giao hàng tận nơi trên toàn quốc, đóng gói an toàn.',
    features: ['Vận chuyển toàn quốc', 'Đóng gói chuyên nghiệp', 'Bảo hiểm hàng hóa', 'Theo dõi đơn hàng']
  },
  {
    icon: FaTools,
    title: 'Lắp đặt & Nghiệm thu',
    desc: 'Đội ngũ kỹ sư lắp đặt chuyên nghiệp, kiểm tra vận hành và bàn giao theo đúng tiêu chuẩn nhà sản xuất.',
    features: ['Lắp đặt tại chỗ', 'Chạy thử nghiệm', 'Bàn giao đầy đủ', 'Hướng dẫn vận hành']
  },
  {
    icon: FaWrench,
    title: 'Bảo trì định kỳ',
    desc: 'Dịch vụ bảo trì, kiểm tra định kỳ giúp máy hoạt động ổn định, kéo dài tuổi thọ thiết bị.',
    features: ['Kiểm tra hàng tháng', 'Thay dầu nhớt', 'Kiểm tra điện tử', 'Báo cáo tình trạng']
  },
  {
    icon: FaCog,
    title: 'Sửa chữa khẩn cấp',
    desc: 'Hỗ trợ sửa chữa khẩn cấp 24/7, tối thiểu hóa thời gian ngừng máy, giảm thiệt hại sản xuất.',
    features: ['Hỗ trợ 24/7', 'Kỹ thuật viên tại chỗ', 'Phụ tùng dự trữ', 'Bảo hành sửa chữa']
  },
  {
    icon: FaUserTie,
    title: 'Tư vấn giải pháp',
    desc: 'Tư vấn kỹ thuật chuyên sâu, giúp doanh nghiệp lựa chọn thiết bị phù hợp nhu cầu và ngân sách.',
    features: ['Phân tích nhu cầu', 'So sánh giải pháp', 'Tối ưu chi phí', 'ROI analysis']
  },
  {
    icon: FaChalkboardTeacher,
    title: 'Đào tạo vận hành',
    desc: 'Chương trình đào tạo vận hành, bảo trì cho nhân viên kỹ thuật của khách hàng.',
    features: ['Đào tạo tại xưởng', 'Tài liệu kỹ thuật', 'Cấp chứng chỉ', 'Hỗ trợ sau đào tạo']
  },
];

export default function DichVuPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-500 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <nav className="text-sm text-primary-200 mb-4">
            <Link href="/" className="hover:text-white">Trang chủ</Link>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">Dịch vụ</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Dịch vụ của chúng tôi</h1>
          <p className="text-primary-200 max-w-xl mx-auto">
            Giải pháp toàn diện từ cung cấp, lắp đặt đến bảo trì – đồng hành cùng doanh nghiệp của bạn
          </p>
        </div>
      </div>

      {/* Services grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
              <div key={service.title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary-200 transition-all group">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                  <service.icon className="text-primary-600 text-xl group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <FaCheckCircle className="text-primary-400 flex-shrink-0 text-xs" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Quy trình làm việc</h2>
            <p className="text-gray-500">Đơn giản – Nhanh chóng – Chuyên nghiệp</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Tiếp nhận yêu cầu', desc: 'Khách hàng liên hệ qua hotline, email hoặc form trực tuyến' },
              { step: '02', title: 'Tư vấn & Báo giá', desc: 'Kỹ sư phân tích nhu cầu và gửi báo giá chi tiết trong 1–2 giờ' },
              { step: '03', title: 'Cung cấp & Lắp đặt', desc: 'Giao hàng đúng hẹn, lắp đặt và kiểm tra vận hành đầy đủ' },
              { step: '04', title: 'Hỗ trợ sau bán', desc: 'Bảo hành, bảo trì và hỗ trợ kỹ thuật trong suốt thời gian sử dụng' },
            ].map(p => (
              <div key={p.step} className="text-center">
                <div className="w-14 h-14 bg-primary-600 text-white rounded-2xl flex items-center justify-center text-xl font-black mx-auto mb-4 shadow-lg">
                  {p.step}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary-700 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Cần hỗ trợ dịch vụ?</h2>
          <p className="text-primary-200 mb-6">Đội ngũ kỹ thuật 50+ kỹ sư sẵn sàng phục vụ 24/7</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:02812345678" className="flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-xl font-bold hover:bg-primary-50 transition-colors">
              <FaPhone /> 028 1234 5678
            </a>
            <Link href="/lien-he" className="border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-primary-700 transition-all">
              Liên hệ ngay
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
