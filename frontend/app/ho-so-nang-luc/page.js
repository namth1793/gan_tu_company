import Link from 'next/link';
import { FaDownload, FaFilePdf, FaAward, FaIndustry, FaGlobeAsia, FaUsers } from 'react-icons/fa';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'Hồ sơ năng lực – Gan Tu Company',
  description: 'Hồ sơ năng lực công ty Gan Tu – Máy móc & nguyên phụ liệu sản xuất giày',
};

const stats = [
  { icon: FaIndustry,   value: '15+',   label: 'Năm kinh nghiệm' },
  { icon: FaUsers,      value: '500+',  label: 'Khách hàng tin tưởng' },
  { icon: FaGlobeAsia,  value: '10+',   label: 'Quốc gia xuất khẩu' },
  { icon: FaAward,      value: '3',     label: 'Chứng nhận quốc tế' },
];

const certificates = [
  'ISO 9001:2015 – Hệ thống quản lý chất lượng',
  'CE Marking – Tiêu chuẩn châu Âu',
  'Giấy phép kinh doanh số 0315xxxxxx',
];

const capabilities = [
  {
    title: 'Máy móc thiết bị',
    desc: 'Cung cấp đầy đủ các loại máy móc dùng trong sản xuất giày dép: máy may, máy dán, máy ép, máy cắt, thiết bị hoàn thiện.',
  },
  {
    title: 'Nguyên phụ liệu',
    desc: 'Đế giày, đế sandal, hoá chất, keo dán, khuôn đế và các phụ kiện sản xuất giày đa dạng mẫu mã.',
  },
  {
    title: 'Tư vấn & hỗ trợ kỹ thuật',
    desc: 'Đội ngũ kỹ thuật viên giàu kinh nghiệm, sẵn sàng tư vấn lựa chọn thiết bị phù hợp và hỗ trợ vận hành.',
  },
  {
    title: 'Bảo hành & bảo trì',
    desc: 'Dịch vụ bảo hành chính hãng, bảo trì định kỳ, cung cấp phụ tùng thay thế nhanh chóng toàn quốc.',
  },
  {
    title: 'Nhập khẩu trực tiếp',
    desc: 'Nhập khẩu trực tiếp từ Trung Quốc, Đài Loan, Hàn Quốc đảm bảo chất lượng nguồn gốc rõ ràng, giá cạnh tranh.',
  },
  {
    title: 'Giao hàng toàn quốc',
    desc: 'Hệ thống vận chuyển nhanh chóng, đóng gói cẩn thận, giao hàng đến tận xưởng sản xuất trên toàn quốc.',
  },
];

export default function HoSoNangLucPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 flex gap-6">
      <main className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 border-l-4 border-green-600 pl-3">Hồ sơ năng lực</h1>
        <p className="text-gray-500 text-sm mb-8">Gan Tu Company – Nhà cung cấp máy móc & nguyên phụ liệu sản xuất giày uy tín</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map(s => (
            <div key={s.label} className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
              <s.icon className="text-green-600 text-2xl mx-auto mb-2" />
              <div className="text-2xl font-black text-green-700">{s.value}</div>
              <div className="text-gray-500 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Năng lực cung cấp */}
        <h2 className="text-lg font-bold text-gray-800 mb-4">Năng lực cung cấp</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {capabilities.map(c => (
            <div key={c.title} className="border border-gray-200 rounded-xl p-4 hover:border-green-400 transition-colors">
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">{c.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Chứng nhận */}
        <h2 className="text-lg font-bold text-gray-800 mb-4">Chứng nhận & giấy phép</h2>
        <ul className="space-y-2 mb-10">
          {certificates.map(c => (
            <li key={c} className="flex items-center gap-2 text-sm text-gray-700">
              <FaAward className="text-green-600 flex-shrink-0" /> {c}
            </li>
          ))}
        </ul>

        {/* Download CTA */}
        <div className="bg-[#271C1C] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">Tải hồ sơ năng lực</h3>
            <p className="text-gray-400 text-sm">Hồ sơ đầy đủ thông tin sản phẩm, dịch vụ và năng lực công ty</p>
          </div>
          <Link
            href="/lien-he"
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
          >
            <FaFilePdf /> Liên hệ để nhận hồ sơ
          </Link>
        </div>
      </main>
      <Sidebar />
    </div>
  );
}
