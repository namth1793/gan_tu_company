import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'Giới thiệu - Gan Tu | Máy Móc & Nguyên Phụ Liệu Sản Xuất Giày',
  description: 'Gan Tu chuyên cung cấp máy móc, đế giày, hoá chất dán đế, đế sandal, sticker charm cho ngành sản xuất giày. Hơn 10 năm kinh nghiệm, đối tác Nhật - Đài Loan - Trung Quốc.',
};

export default function GioiThieuPage() {
  const milestones = [
    { year: '2014', title: 'Thành lập', desc: 'Gan Tu thành lập tại TP.HCM, chuyên nhập khẩu và phân phối nguyên phụ liệu sản xuất giày' },
    { year: '2017', title: 'Mở rộng kho', desc: 'Khai trương kho hàng 3.000m² tại Tây Ninh, tăng năng lực lưu trữ và phân phối' },
    { year: '2019', title: 'Máy móc thiết bị', desc: 'Mở rộng sang phân phối máy móc thiết bị sản xuất giày: máy may, máy cắt, máy dán đế' },
    { year: '2022', title: 'Đối tác Trung Quốc', desc: 'Thiết lập văn phòng đại diện tại Trung Quốc, kết nối trực tiếp nhà máy sản xuất' },
    { year: '2026', title: 'Hôm nay', desc: 'Hơn 1.500 khách hàng nhà máy, 200+ mã sản phẩm, phủ khắp các tỉnh thành sản xuất giày' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-2 pt-3 pb-6">
      {/* Breadcrumb */}
      <div className="bg-[#271C1C] text-white text-xs px-3 py-1.5 rounded mb-3">
        <a href="/" className="hover:underline">Trang chủ</a>
        <span className="mx-1">»</span>
        <span>Giới thiệu</span>
      </div>

      <div className="flex gap-3">
        <div className="w-[215px] flex-shrink-0"><Sidebar /></div>

        <div className="flex-1 min-w-0 space-y-4">
          {/* Main intro */}
          <div className="bg-white border border-gray-200 rounded p-5">
            <h1 className="text-base font-bold uppercase border-b-2 border-[#271C1C] pb-2 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#271C1C] rounded-sm inline-block"></span>
              Giới thiệu công ty
            </h1>

            <div className="flex gap-5">
              <div className="flex-1 text-sm text-gray-700 space-y-3">
                <p className="text-base font-bold text-[#271C1C]">CÔNG TY TNHH SẢN XUẤT THƯƠNG MẠI GAN TU</p>
                <p>
                  Gan Tu được thành lập năm 2014, chuyên cung cấp máy móc thiết bị và nguyên phụ liệu cho ngành sản xuất giày dép. Với hơn 10 năm kinh nghiệm, chúng tôi là đầu mối nhập khẩu và phân phối uy tín, kết nối trực tiếp nhà sản xuất tại Nhật Bản, Đài Loan và Trung Quốc với các nhà máy giày tại Việt Nam.
                </p>
                <p>
                  Gan Tu hiểu sâu về quy trình sản xuất giày từ khâu cắt da, may, lasting đến dán đế và hoàn thiện — vì vậy chúng tôi không chỉ cung cấp sản phẩm mà còn tư vấn giải pháp kỹ thuật phù hợp cho từng công đoạn.
                </p>

                <h3 className="font-bold text-gray-800 mt-4">Lĩnh vực kinh doanh</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Máy móc thiết bị: máy may, máy cắt da CNC, máy dán đế, máy lasting, máy mài, máy ép nhiệt</li>
                  <li>Thành phẩm: giày hoàn chỉnh OEM/ODM theo đơn hàng thương hiệu</li>
                  <li>Đế giày: cao su SBR, PVC bơm, TPR, EVA nén, TR, da bò nguyên khối</li>
                  <li>Hoá chất: keo PU 2 thành phần, keo neoprene, dung môi IPA, primer, hot melt</li>
                  <li>Đế sandal: EVA nhẹ, PVC 2 lớp, cork tự nhiên, TPR outdoor, memory foam</li>
                  <li>Sticker &amp; Charm: phản quang 3M, charm kim loại, patch thêu, nhãn PVC, huy hiệu đính đá</li>
                </ul>
              </div>

              {/* Images */}
              <div className="w-56 flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=224&h=168&fit=crop"
                  alt="Kho hàng Gan Tu"
                  className="w-full rounded border border-gray-200"
                />
                <img
                  src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=224&h=140&fit=crop"
                  alt="Máy móc thiết bị"
                  className="w-full rounded border border-gray-200 mt-2"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { value: '200+', label: 'Mã sản phẩm', icon: '📦' },
              { value: '1.500+', label: 'Khách hàng nhà máy', icon: '🏭' },
              { value: '10 năm', label: 'Kinh nghiệm', icon: '⭐' },
              { value: 'VN + TQ', label: 'Văn phòng', icon: '🌏' },
            ].map(s => (
              <div key={s.label} className="bg-white border border-gray-200 rounded p-4 text-center hover:border-[#271C1C] transition-colors">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xl font-black text-[#271C1C]">{s.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* History timeline */}
          <div className="bg-white border border-gray-200 rounded p-5">
            <h2 className="text-sm font-bold uppercase border-b-2 border-[#271C1C] pb-2 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#271C1C] rounded-sm inline-block"></span>
              Lịch sử hình thành
            </h2>
            <div className="space-y-3">
              {milestones.map((m) => (
                <div key={m.year} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-[#271C1C] rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow">
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
            <h2 className="text-sm font-bold uppercase border-b-2 border-[#271C1C] pb-2 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#271C1C] rounded-sm inline-block"></span>
              Cam kết & Tiêu chuẩn
            </h2>
            <div className="flex flex-wrap gap-3">
              {['Hàng nhập khẩu chính hãng', 'Tư vấn kỹ thuật miễn phí', 'Giao hàng toàn quốc', 'Báo giá trong 2 giờ', 'Hỗ trợ sau bán hàng', 'Đối tác CE / REACH'].map(cert => (
                <div key={cert} className="border-2 border-stone-200 rounded px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-[#271C1C] hover:text-[#271C1C] transition-colors flex items-center gap-2">
                  <span className="text-yellow-500">✓</span> {cert}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#271C1C] rounded p-5 text-center text-white">
            <h3 className="font-bold text-base mb-1">Liên hệ nhận báo giá ngay!</h3>
            <p className="text-gray-300 text-sm mb-4">Đội ngũ kỹ thuật sẽ tư vấn sản phẩm phù hợp và báo giá trong 1–2 giờ làm việc</p>
            <div className="flex gap-3 justify-center">
              <a href="/nhan-bao-gia" className="bg-yellow-400 text-gray-900 px-5 py-2 rounded font-bold text-sm hover:bg-yellow-300 transition-colors">
                Nhận báo giá
              </a>
              <a href="/lien-he" className="border-2 border-white text-white px-5 py-2 rounded font-bold text-sm hover:bg-white hover:text-[#271C1C] transition-colors">
                Liên hệ ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
