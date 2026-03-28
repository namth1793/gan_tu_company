import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaYoutube, FaQuestionCircle, FaTools, FaTruck, FaFileAlt } from 'react-icons/fa';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'Hỗ trợ – Gan Tu Company',
  description: 'Trung tâm hỗ trợ khách hàng Gan Tu Company – Tư vấn, kỹ thuật, bảo hành',
};

const faqs = [
  {
    q: 'Công ty có hỗ trợ lắp đặt máy tại xưởng không?',
    a: 'Có. Đội kỹ thuật của chúng tôi sẵn sàng hỗ trợ lắp đặt, vận hành thử và đào tạo nhân viên tại chỗ trong phạm vi toàn quốc.',
  },
  {
    q: 'Thời gian bảo hành thiết bị là bao lâu?',
    a: 'Thiết bị được bảo hành từ 12 – 24 tháng tùy loại máy. Trong thời gian bảo hành, chúng tôi miễn phí sửa chữa và thay thế linh kiện lỗi do nhà sản xuất.',
  },
  {
    q: 'Tôi có thể đặt hàng số lượng nhỏ không?',
    a: 'Chúng tôi nhận đơn hàng không giới hạn số lượng tối thiểu. Liên hệ để được báo giá phù hợp với nhu cầu của bạn.',
  },
  {
    q: 'Sản phẩm có nguồn gốc xuất xứ rõ ràng không?',
    a: 'Tất cả sản phẩm đều có đầy đủ hóa đơn, chứng từ xuất xứ (Trung Quốc, Đài Loan, Hàn Quốc). Chúng tôi cam kết không kinh doanh hàng nhái, hàng kém chất lượng.',
  },
  {
    q: 'Phương thức thanh toán được chấp nhận?',
    a: 'Chúng tôi chấp nhận chuyển khoản ngân hàng, tiền mặt và có hỗ trợ trả góp cho đơn hàng lớn. Liên hệ để biết thêm chi tiết.',
  },
  {
    q: 'Làm thế nào để nhận báo giá nhanh?',
    a: 'Điền vào form Nhận báo giá trên website hoặc liên hệ trực tiếp qua Zalo/điện thoại. Chúng tôi phản hồi trong vòng 2 giờ làm việc.',
  },
];

const supports = [
  { icon: FaTools,      title: 'Hỗ trợ kỹ thuật',   desc: 'Tư vấn kỹ thuật, lắp đặt và vận hành thiết bị',       href: '/lien-he' },
  { icon: FaTruck,      title: 'Giao hàng & vận chuyển', desc: 'Thông tin về vận chuyển, đóng gói và thời gian giao', href: '/lien-he' },
  { icon: FaFileAlt,    title: 'Chính sách bảo hành', desc: 'Điều khoản bảo hành, quy trình đổi trả sản phẩm',     href: '/lien-he' },
  { icon: FaQuestionCircle, title: 'Câu hỏi thường gặp', desc: 'Giải đáp các thắc mắc phổ biến của khách hàng',   href: '#faq' },
];

export default function HoTroPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 flex gap-6">
      <main className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 border-l-4 border-green-600 pl-3">Hỗ trợ</h1>
        <p className="text-gray-500 text-sm mb-8">Chúng tôi luôn sẵn sàng hỗ trợ bạn – liên hệ bất kỳ lúc nào</p>

        {/* Contact quick */}
        <div className="bg-[#271C1C] rounded-xl p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="tel:0902487928" className="flex items-center gap-3 text-white hover:text-yellow-400 transition-colors">
            <FaPhone className="text-yellow-400 text-xl flex-shrink-0" />
            <div>
              <div className="text-xs text-gray-400">Hotline Việt Nam</div>
              <div className="font-bold">0902 487 928</div>
            </div>
          </a>
          <a href="mailto:gantu@gantu.com.vn" className="flex items-center gap-3 text-white hover:text-yellow-400 transition-colors">
            <FaEnvelope className="text-yellow-400 text-xl flex-shrink-0" />
            <div>
              <div className="text-xs text-gray-400">Email</div>
              <div className="font-bold">gantu@gantu.com.vn</div>
            </div>
          </a>
          <div className="flex items-center gap-3 text-white">
            <FaMapMarkerAlt className="text-yellow-400 text-xl flex-shrink-0" />
            <div>
              <div className="text-xs text-gray-400">Địa chỉ</div>
              <div className="font-bold text-sm">TP. Hồ Chí Minh, Việt Nam</div>
            </div>
          </div>
        </div>

        {/* Support categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {supports.map(s => (
            <Link key={s.title} href={s.href} className="border border-gray-200 rounded-xl p-4 hover:border-green-400 hover:shadow-sm transition-all flex gap-3">
              <s.icon className="text-green-600 text-2xl flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* FAQ */}
        <h2 id="faq" className="text-lg font-bold text-gray-800 mb-4">Câu hỏi thường gặp</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details key={i} className="border border-gray-200 rounded-xl group">
              <summary className="px-4 py-3 cursor-pointer font-medium text-gray-800 text-sm list-none flex items-center justify-between hover:bg-gray-50 rounded-xl">
                {f.q}
                <span className="text-green-600 text-lg group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-4 pb-3 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-2">{f.a}</div>
            </details>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm mb-3">Không tìm thấy câu trả lời bạn cần?</p>
          <Link href="/lien-he" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-lg transition-colors">
            Liên hệ trực tiếp
          </Link>
        </div>
      </main>
      <Sidebar />
    </div>
  );
}
