import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'Giới thiệu - Gan Tu Giày Dép Thời Trang',
  description: 'Gan Tu chuyên cung cấp giày dép thời trang chất lượng cao, hơn 10 năm kinh nghiệm, 50.000+ khách hàng tin tưởng',
};

export default function GioiThieuPage() {
  const milestones = [
    { year: '2014', title: 'Thành lập', desc: 'Gan Tu được thành lập tại TP.HCM, chuyên bán giày dép thời trang' },
    { year: '2017', title: 'Mở rộng', desc: 'Mở rộng sang giày thể thao, giày bảo hộ và phụ kiện giày' },
    { year: '2020', title: 'Bán hàng online', desc: 'Ra mắt website và kênh bán hàng online, phủ sóng toàn quốc' },
    { year: '2023', title: 'Toàn quốc', desc: 'Mở showroom Hà Nội và Đà Nẵng, đạt 30.000 khách hàng thân thiết' },
    { year: '2026', title: 'Hôm nay', desc: 'Hơn 50.000 khách hàng, 500+ mẫu giày dép, freeship toàn quốc' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-2 pt-3 pb-6">
      {/* Breadcrumb */}
      <div className="bg-[#2e7d32] text-white text-xs px-3 py-1.5 rounded mb-3">
        <a href="/" className="hover:underline">Trang chủ</a>
        <span className="mx-1">»</span>
        <span>Giới thiệu</span>
      </div>

      <div className="flex gap-3">
        <div className="w-[215px] flex-shrink-0"><Sidebar /></div>

        <div className="flex-1 min-w-0 space-y-4">
          {/* Main intro */}
          <div className="bg-white border border-gray-200 rounded p-5">
            <h1 className="text-base font-bold uppercase border-b-2 border-[#2e7d32] pb-2 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#2e7d32] rounded-sm inline-block"></span>
              Giới thiệu công ty
            </h1>

            <div className="flex gap-5">
              <div className="flex-1 text-sm text-gray-700 space-y-3">
                <p className="text-base font-bold text-[#2e7d32]">CÔNG TY TNHH SẢN XUẤT THƯƠNG MẠI GAN TU</p>
                <p>
                  Gan Tu được thành lập năm 2014, chuyên cung cấp giày dép thời trang chất lượng cao cho khách hàng trên toàn quốc. Chúng tôi mang đến hàng trăm mẫu giày dép từ thể thao, da, cao gót đến trẻ em với giá cả hợp lý.
                </p>
                <p>
                  Với hơn 10 năm kinh nghiệm, Gan Tu tự hào là địa chỉ tin cậy của hơn 50.000 khách hàng, từ người tiêu dùng cá nhân đến các đại lý phân phối trên toàn quốc.
                </p>
                <p>
                  Gan Tu cam kết cung cấp sản phẩm chính hãng, chất lượng cao, giá cạnh tranh, kèm chính sách freeship và đổi trả linh hoạt trong 7 ngày.
                </p>

                <h3 className="font-bold text-gray-800 mt-4">Lĩnh vực kinh doanh</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Giày thể thao nam nữ trẻ em – sneaker, giày chạy bộ</li>
                  <li>Giày da nam công sở – oxford, derby, loafer, boot</li>
                  <li>Giày cao gót nữ – đế nhọn, đế vuông, platform</li>
                  <li>Dép sandal – slides, sandal quai, dép đi biển</li>
                  <li>Giày vải, giày bảo hộ, phụ kiện giày dép</li>
                </ul>
              </div>

              {/* Image */}
              <div className="w-56 flex-shrink-0">
                <img
                  src="https://picsum.photos/224/168?random=200"
                  alt="Gan Tu Company"
                  className="w-full rounded border border-gray-200"
                />
                <img
                  src="https://picsum.photos/224/140?random=201"
                  alt="Nhà máy"
                  className="w-full rounded border border-gray-200 mt-2"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { value: '500+', label: 'Mẫu giày dép', icon: '👟' },
              { value: '50.000+', label: 'Khách hàng', icon: '👥' },
              { value: '10 năm', label: 'Kinh nghiệm', icon: '⭐' },
              { value: 'Freeship', label: 'Toàn quốc', icon: '🚚' },
            ].map(s => (
              <div key={s.label} className="bg-white border border-gray-200 rounded p-4 text-center hover:border-[#2e7d32] transition-colors">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xl font-black text-[#2e7d32]">{s.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* History timeline */}
          <div className="bg-white border border-gray-200 rounded p-5">
            <h2 className="text-sm font-bold uppercase border-b-2 border-[#2e7d32] pb-2 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#2e7d32] rounded-sm inline-block"></span>
              Lịch sử hình thành
            </h2>
            <div className="space-y-3">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-[#2e7d32] rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow">
                    {m.year.slice(2)}
                  </div>
                  <div className="flex-1 bg-gray-50 rounded p-3 border border-gray-100">
                    <div className="font-bold text-sm text-gray-800">{m.year} – {m.title}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white border border-gray-200 rounded p-5">
            <h2 className="text-sm font-bold uppercase border-b-2 border-[#2e7d32] pb-2 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#2e7d32] rounded-sm inline-block"></span>
              Chứng nhận & Đối tác
            </h2>
            <div className="flex flex-wrap gap-3">
              {['Hàng chính hãng', 'Freeship toàn quốc', 'Đổi trả 7 ngày', 'Tư vấn size miễn phí', 'Bảo hành chất lượng', 'Thanh toán COD'].map(cert => (
                <div key={cert} className="border-2 border-green-200 rounded px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-[#2e7d32] hover:text-[#2e7d32] transition-colors flex items-center gap-2">
                  <span className="text-green-500">✓</span> {cert}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#2e7d32] rounded p-5 text-center text-white">
            <h3 className="font-bold text-base mb-1">Mua sắm ngay hôm nay!</h3>
            <p className="text-green-200 text-sm mb-4">Khám phá hàng trăm mẫu giày dép thời trang, freeship toàn quốc, đổi trả dễ dàng</p>
            <div className="flex gap-3 justify-center">
              <a href="/san-pham" className="bg-white text-[#2e7d32] px-5 py-2 rounded font-bold text-sm hover:bg-green-50 transition-colors">
                Xem giày dép
              </a>
              <a href="/lien-he" className="border-2 border-white text-white px-5 py-2 rounded font-bold text-sm hover:bg-white hover:text-[#2e7d32] transition-colors">
                Liên hệ ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
