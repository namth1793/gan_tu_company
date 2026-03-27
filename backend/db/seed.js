const db = require('./database');

console.log('Seeding database...');

db.exec(`
  DELETE FROM videos;
  DELETE FROM contacts;
  DELETE FROM news;
  DELETE FROM products;
  DELETE FROM categories;
  DELETE FROM sqlite_sequence WHERE name IN ('categories','products','news','videos','contacts');
`);

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
const categories = [
  { name: 'Máy móc',       slug: 'may-moc',       icon: 'FaCog',      description: 'Máy móc thiết bị sản xuất giày: may, cắt, dán đế, lasting, ép nhiệt', sort_order: 1 },
  { name: 'Thành phẩm',    slug: 'thanh-pham',    icon: 'FaShoePrints', description: 'Giày dép hoàn chỉnh thành phẩm xuất xưởng: thể thao, da, sandal, bảo hộ', sort_order: 2 },
  { name: 'Đế giày',       slug: 'de-giay',       icon: 'FaLayerGroup', description: 'Đế giày các loại: cao su SBR, PVC, TPR, EVA nén, TR, da bò nguyên khối', sort_order: 3 },
  { name: 'Hoá chất',      slug: 'hoa-chat',      icon: 'FaFlask',    description: 'Keo dán đế, dung môi, primer xử lý bề mặt, keo PU, hot melt chuyên dụng', sort_order: 4 },
  { name: 'Đế sandal',     slug: 'de-sandal',     icon: 'FaLeaf',     description: 'Đế sandal EVA, PVC bơm, cork tự nhiên, TPR, foam memory đủ size', sort_order: 5 },
  { name: 'Sticker - Charm', slug: 'sticker-charm', icon: 'FaStar',   description: 'Sticker phản quang, charm kim loại, patch dán nhiệt, nhãn PVC, huy hiệu đính đá', sort_order: 6 },
];

const insertCat = db.prepare(`INSERT INTO categories (name, slug, icon, description, sort_order) VALUES (?, ?, ?, ?, ?)`);
categories.forEach(c => insertCat.run(c.name, c.slug, c.icon, c.description, c.sort_order));
console.log('Categories seeded:', categories.length);

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
// Unsplash & picsum images relevant to each category
const UNS = (id) => `https://images.unsplash.com/photo-${id}?w=400&h=400&fit=crop&auto=format`;
const SEED = (s) => `https://picsum.photos/seed/${s}/400/400`;

const products = [

  // ── Máy móc (cat 1) ──────────────────────────────────────────────
  {
    category_id: 1, code: 'MM-001',
    name: 'Máy May Giày Công Nghiệp Juki DDL-9000',
    slug: 'may-may-giay-juki-ddl-9000',
    description: 'Máy may 1 kim điện tử Juki DDL-9000, tốc độ 5500 m/p, tự động cắt chỉ, phù hợp may thân giày da và vải canvas. Tiết kiệm điện, ít tiếng ồn.',
    specifications: '{"Hãng":"Juki","Model":"DDL-9000","Tốc độ":"5500 mũi/phút","Động cơ":"Servo 550W","Trọng lượng":"38kg","Xuất xứ":"Nhật Bản"}',
    image_url: UNS('1565043589221-1a6fd9ae45c7'),
    price: 'Liên hệ', is_featured: 1,
  },
  {
    category_id: 1, code: 'MM-002',
    name: 'Máy Cắt Da CNC Leathermaster 500',
    slug: 'may-cat-da-cnc-leathermaster-500',
    description: 'Máy cắt da CNC điều khiển máy tính, lưỡi dao dao động tần số cao, cắt chính xác 0.1mm, tiết kiệm nguyên liệu tối đa 20%. Hỗ trợ file DXF/AI.',
    specifications: '{"Model":"LM-500","Khổ làm việc":"500×400mm","Độ chính xác":"±0.1mm","Lưỡi dao":"Dao dao động","Phần mềm":"NestFab/FlexiCAD","Xuất xứ":"Trung Quốc"}',
    image_url: UNS('1504328345606-18bbc8c9d7d1'),
    price: 'Liên hệ', is_featured: 1,
  },
  {
    category_id: 1, code: 'MM-003',
    name: 'Máy Dán Đế Thủy Lực 20 Tấn',
    slug: 'may-dan-de-thuy-luc-20-tan',
    description: 'Máy ép dán đế giày thủy lực lực ép 20 tấn, bàn ép có gia nhiệt 80°C, đảm bảo keo dán đế bám chắc. Phù hợp dán đế cao su, TPR, EVA.',
    specifications: '{"Lực ép":"20 tấn","Nhiệt độ bàn ép":"40–120°C","Kích thước bàn ép":"420×280mm","Công suất":"3kW","Chu kỳ":"8 giây/đôi"}',
    image_url: UNS('1581091226825-a6a2a5aee158'),
    price: 'Liên hệ', is_featured: 1,
  },
  {
    category_id: 1, code: 'MM-004',
    name: 'Máy Lasting Tự Động (Mũi Giày)',
    slug: 'may-lasting-tu-dong-mui-giay',
    description: 'Máy lasting tự động phần mũi giày, điều chỉnh lực căng tự động theo độ cứng của da. Năng suất 600–800 đôi/ca, phù hợp giày da và thể thao.',
    specifications: '{"Kiểu":"Lasting mũi tự động","Năng suất":"600–800 đôi/ca","Lực kéo":"0–80 kg (điều chỉnh)","Nguồn điện":"380V/3 pha","Xuất xứ":"Đài Loan"}',
    image_url: SEED('lasting-machine-shoe'),
    price: 'Liên hệ', is_featured: 0,
  },
  {
    category_id: 1, code: 'MM-005',
    name: 'Máy Mài Đế Giày Băng Tải',
    slug: 'may-mai-de-giay-bang-tai',
    description: 'Máy mài nhám đế giày băng tải liên tục, hạt mài 60–120 grit, tạo độ nhám tối ưu cho keo bám dính. Hút bụi tích hợp, an toàn lao động.',
    specifications: '{"Băng nhám":"60–120 grit","Tốc độ băng":"10–30 m/phút (biến tần)","Công suất":"1.5kW","Hệ thống hút bụi":"Tích hợp","Kích thước":"L1200×W600×H1100mm"}',
    image_url: SEED('grinding-machine-belt'),
    price: 'Liên hệ', is_featured: 0,
  },
  {
    category_id: 1, code: 'MM-006',
    name: 'Máy Ép Nhiệt Logo Giày HiPress HP-4050',
    slug: 'may-ep-nhiet-logo-giay-hipress',
    description: 'Máy ép nhiệt chuyển logo, nhãn hiệu lên giày và đế. Nhiệt độ điều chỉnh 0–220°C, thời gian 0–99s, màn hình LCD điều khiển số.',
    specifications: '{"Model":"HP-4050","Nhiệt độ":"0–220°C","Thời gian":"0–99 giây","Lực ép":"0–6 tấn (điều chỉnh)","Bàn ép":"400×500mm","Màn hình":"LCD số"}',
    image_url: UNS('1518770660439-4636190af475'),
    price: 'Liên hệ', is_featured: 0,
  },

  // ── Thành phẩm (cat 2) ───────────────────────────────────────────
  {
    category_id: 2, code: 'TP-001',
    name: 'Giày Thể Thao Nam EVA Đúc GT-S1',
    slug: 'giay-the-thao-nam-eva-duc-gt-s1',
    description: 'Giày thể thao nam đế EVA đúc nguyên khối, upper lưới Flyknit thoáng khí, lót kháng khuẩn. Sản xuất theo đơn từ 500 đôi, in logo thương hiệu theo yêu cầu.',
    specifications: '{"Size":"38–45","Upper":"Flyknit lưới 3D","Đế":"EVA đúc nguyên khối","Lót":"Kháng khuẩn memory foam","MOQ":"500 đôi","Lead time":"30 ngày"}',
    image_url: UNS('1542291026-7eec264c27ff'),
    price: 'Liên hệ', is_featured: 1,
  },
  {
    category_id: 2, code: 'TP-002',
    name: 'Giày Thể Thao Nữ Phản Quang GT-W2',
    slug: 'giay-the-thao-nu-phan-quang-gt-w2',
    description: 'Giày thể thao nữ upper vải lưới phối dải phản quang 3M, đế TPR bám đường, lót chân êm. Xuất khẩu EU, đạt chứng nhận REACH.',
    specifications: '{"Size":"35–41","Upper":"Vải lưới + 3M phản quang","Đế":"TPR chống trơn","Tiêu chuẩn":"REACH EU","MOQ":"500 đôi","Lead time":"35 ngày"}',
    image_url: UNS('1460353581641-37baddab0fa2'),
    price: 'Liên hệ', is_featured: 1,
  },
  {
    category_id: 2, code: 'TP-003',
    name: 'Giày Da Nam Oxford Công Sở GT-D1',
    slug: 'giay-da-nam-oxford-cong-so-gt-d1',
    description: 'Giày da nam Oxford upper da bò Italy 1.2mm, đế cao su ngoài + lót da bò, đường may Goodyear welted. Thiết kế OEM/ODM theo brand khách hàng.',
    specifications: '{"Size":"38–45","Upper":"Da bò Italy 1.2mm","Đế":"Cao su ngoài + lót da","Đường may":"Goodyear welted","MOQ":"300 đôi","Lead time":"45 ngày"}',
    image_url: UNS('1533867617858-e7b97e060509'),
    price: 'Liên hệ', is_featured: 1,
  },
  {
    category_id: 2, code: 'TP-004',
    name: 'Giày Sandal Nữ Đế Cork GT-SC1',
    slug: 'giay-sandal-nu-de-cork-gt-sc1',
    description: 'Sandal nữ thời trang đế cork tự nhiên bọc da lộn, quai da PU điều chỉnh được. Sản xuất hàng loạt theo đơn hàng brand nước ngoài.',
    specifications: '{"Size":"35–41","Quai":"Da PU + khóa điều chỉnh","Đế":"Cork tự nhiên + cao su ngoài","Chiều cao đế":"4cm","MOQ":"300 đôi"}',
    image_url: UNS('1603487742131-4160ec999306'),
    price: 'Liên hệ', is_featured: 0,
  },
  {
    category_id: 2, code: 'TP-005',
    name: 'Giày Bảo Hộ Mũi Thép S1P GT-BH1',
    slug: 'giay-bao-ho-mui-thep-s1p-gt-bh1',
    description: 'Giày bảo hộ chuẩn S1P: mũi thép chịu 200J, đế chống đinh xuyên, kháng dầu, kháng hóa chất. Chứng nhận CE EN ISO 20345:2022.',
    specifications: '{"Size":"38–47","Mũi bảo vệ":"Thép 200J","Đế":"Chống đinh xuyên PU/cao su","Tiêu chuẩn":"CE EN ISO 20345 S1P","MOQ":"200 đôi"}',
    image_url: UNS('1491553895911-0055eca6402d'),
    price: 'Liên hệ', is_featured: 0,
  },

  // ── Đế giày (cat 3) ──────────────────────────────────────────────
  {
    category_id: 3, code: 'DG-001',
    name: 'Đế Cao Su Tổng Hợp SBR Chống Trơn',
    slug: 'de-cao-su-tong-hop-sbr-chong-tron',
    description: 'Đế cao su SBR (Styrene-Butadiene Rubber) ép khuôn nhiệt, độ cứng Shore A 60–70, pattern chống trơn sâu 4mm. Phù hợp giày bảo hộ, giày outdoor.',
    specifications: '{"Vật liệu":"SBR cao su tổng hợp","Độ cứng":"Shore A 60–70","Pattern":"Chống trơn 4mm","Màu sắc":"Đen/Nâu/Trắng","Đóng gói":"50 đôi/thùng"}',
    image_url: SEED('rubber-shoe-sole-sbr'),
    price: 'Liên hệ', is_featured: 1,
  },
  {
    category_id: 3, code: 'DG-002',
    name: 'Đế PVC Phun Ép Bơm Khí',
    slug: 'de-pvc-phun-ep-bom-khi',
    description: 'Đế PVC phun bơm khí bên trong, nhẹ và êm chân, bề mặt ngoài sắc nét chi tiết. Phù hợp giày thời trang nữ, giày đế thấp, màu sắc đa dạng.',
    specifications: '{"Vật liệu":"PVC bơm khí","Trọng lượng":"Nhẹ hơn cao su 30%","Màu sắc":"Theo yêu cầu RAL","Size":"34–46","MOQ":"200 đôi/mã"}',
    image_url: SEED('pvc-shoe-sole-injection'),
    price: 'Liên hệ', is_featured: 0,
  },
  {
    category_id: 3, code: 'DG-003',
    name: 'Đế TPR Thermoplastic Rubber',
    slug: 'de-tpr-thermoplastic-rubber',
    description: 'Đế TPR (Thermoplastic Rubber) tái chế được, dẻo dai, kháng dầu mỡ tốt, bề mặt mịn bóng. Ứng dụng rộng giày casual, giày học sinh, giày thể thao phổ thông.',
    specifications: '{"Vật liệu":"TPR","Độ cứng":"Shore A 50–65","Kháng dầu":"Tốt","Bề mặt":"Mịn bóng / nhám tùy chọn","Màu":"Trắng/Đen/Trong suốt","Tái chế":"100%"}',
    image_url: SEED('tpr-rubber-sole-shoe'),
    price: 'Liên hệ', is_featured: 1,
  },
  {
    category_id: 3, code: 'DG-004',
    name: 'Đế EVA Nén Phong Thể Thao',
    slug: 'de-eva-nen-phong-the-thao',
    description: 'Đế EVA (Ethylene-Vinyl Acetate) nén phong cao cấp, nhẹ siêu nhẹ chỉ 120–150g/đôi, đàn hồi tốt, hấp thụ xung lực cao. Dùng cho giày chạy bộ, giày thể thao.',
    specifications: '{"Vật liệu":"EVA nén phong","Trọng lượng":"120–150g/đôi","Độ nén":"±1.5%","Màu sắc":"Trắng/Đen/Màu theo yêu cầu","Độ dày":"20–35mm"}',
    image_url: SEED('eva-foam-sport-sole'),
    price: 'Liên hệ', is_featured: 1,
  },
  {
    category_id: 3, code: 'DG-005',
    name: 'Đế TR Thermo Rubber Cao Cấp',
    slug: 'de-tr-thermo-rubber-cao-cap',
    description: 'Đế TR (Thermo Rubber) pha trộn nhiệt, vừa bền như cao su vừa nhẹ như EVA, bề mặt mịn đẹp hơn TPR. Phổ biến trong giày da nam công sở.',
    specifications: '{"Vật liệu":"TR (Thermo Rubber)","Ưu điểm":"Bền + nhẹ + bề mặt đẹp","Độ cứng":"Shore A 55–70","Kháng mài mòn":"Tốt","Ứng dụng":"Giày da, giày casual"}',
    image_url: SEED('tr-thermo-rubber-outsole'),
    price: 'Liên hệ', is_featured: 0,
  },
  {
    category_id: 3, code: 'DG-006',
    name: 'Đế Da Bò Nguyên Khối Full Grain',
    slug: 'de-da-bo-nguyen-khoi-full-grain',
    description: 'Đế da bò nguyên khối full grain dày 5–8mm, cắt laser CNC chính xác, mài cạnh thủ công. Dùng cho giày tây cao cấp Goodyear welted, Oxford, Derby.',
    specifications: '{"Vật liệu":"Da bò full grain","Độ dày":"5–8mm","Cắt":"Laser CNC","Màu":"Nâu tự nhiên / Đen nhuộm","Ứng dụng":"Giày Goodyear welted cao cấp"}',
    image_url: SEED('leather-shoe-sole-full-grain'),
    price: 'Liên hệ', is_featured: 0,
  },

  // ── Hoá chất (cat 4) ─────────────────────────────────────────────
  {
    category_id: 4, code: 'HC-001',
    name: 'Keo PU Hai Thành Phần Siken 520A/B',
    slug: 'keo-pu-hai-thanh-phan-siken-520ab',
    description: 'Keo Polyurethane 2 thành phần (A+B), sau trộn đóng rắn hoàn toàn trong 24h, lực bám ≥4 MPa. Dán được cao su, EVA, da, PVC, vải. Không bay màu da.',
    specifications: '{"Hãng":"Siken","Loại":"PU 2 thành phần","Tỉ lệ trộn":"A:B = 10:1","Thời gian mở":"20–25 phút","Lực bám":"≥4 MPa","Đóng gói":"5kg+0.5kg/bộ"}',
    image_url: UNS('1532187863486-abf9dbad1b69'),
    price: 'Liên hệ', is_featured: 1,
  },
  {
    category_id: 4, code: 'HC-002',
    name: 'Keo Neoprene Dán Đế 6102 Yellow',
    slug: 'keo-neoprene-dan-de-6102-yellow',
    description: 'Keo neoprene tiếp xúc màu vàng 6102, bôi 2 mặt chờ khô 3–5 phút ép dán. Bám dính tức thì, chịu nhiệt 80°C, kháng nước tốt. Tiêu chuẩn an toàn SVHC.',
    specifications: '{"Loại":"Neoprene contact","Màu":"Vàng","Thời gian mở":"3–5 phút","Chịu nhiệt":"80°C","Kháng nước":"Tốt","Đóng gói":"1L/4L/18L"}',
    image_url: SEED('neoprene-contact-cement-shoe'),
    price: 'Liên hệ', is_featured: 1,
  },
  {
    category_id: 4, code: 'HC-003',
    name: 'Dung Môi Tẩy Bề Mặt IPA 99.9%',
    slug: 'dung-moi-tay-be-mat-ipa-999',
    description: 'Isopropyl Alcohol (IPA) 99.9% tẩy dầu mỡ, bụi bẩn bề mặt da và đế trước khi phủ primer và dán keo. Bay hơi nhanh, không để lại vết ố.',
    specifications: '{"Thành phần":"IPA 99.9%","Độ tinh khiết":"≥99.9%","Nhiệt độ sôi":"82.5°C","Bay hơi":"Nhanh","Đóng gói":"1L/5L/25L","Tiêu chuẩn":"Industrial grade"}',
    image_url: SEED('ipa-solvent-industrial-cleaning'),
    price: 'Liên hệ', is_featured: 0,
  },
  {
    category_id: 4, code: 'HC-004',
    name: 'Primer Xử Lý Bề Mặt Da & Cao Su',
    slug: 'primer-xu-ly-be-mat-da-cao-su',
    description: 'Chất primer chuẩn bị bề mặt da, cao su, EVA trước khi dán keo. Tăng độ bám keo 2–3 lần, đặc biệt hiệu quả với cao su lưu hoá và EVA mật độ cao.',
    specifications: '{"Ứng dụng":"Da / cao su / EVA / PU","Tác dụng":"Tăng độ bám keo 2–3×","Thời gian chờ khô":"3–5 phút","Màu":"Trong suốt","Đóng gói":"0.5L/1L/5L"}',
    image_url: SEED('primer-adhesive-shoe-treatment'),
    price: 'Liên hệ', is_featured: 0,
  },
  {
    category_id: 4, code: 'HC-005',
    name: 'Keo Hot Melt Thanh Chuyên Dụng',
    slug: 'keo-hot-melt-thanh-chuyen-dung',
    description: 'Keo hot melt dạng thanh dùng cho súng bắn keo, dán viền mũi giày, gắn lót chân, cố định trang trí. Chịu nhiệt 70°C, dẻo dai sau đóng rắn.',
    specifications: '{"Dạng":"Thanh Ø11mm×300mm","Nhiệt độ nóng chảy":"160–180°C","Độ nhớt":"2500 cPs","Chịu nhiệt":"70°C","Màu":"Trong / Trắng","Đóng gói":"5kg/thùng"}',
    image_url: SEED('hot-melt-glue-stick-shoe'),
    price: 'Liên hệ', is_featured: 0,
  },

  // ── Đế sandal (cat 5) ────────────────────────────────────────────
  {
    category_id: 5, code: 'DS-001',
    name: 'Đế Sandal EVA Nhẹ Siêu Bền',
    slug: 'de-sandal-eva-nhe-sieu-ben',
    description: 'Đế sandal EVA đúc phun một màu hoặc 2 màu, siêu nhẹ chỉ 80–100g/đôi, độ nảy tốt, không thấm nước. Sẵn kho size 36–45, hàng trăm mẫu.',
    specifications: '{"Vật liệu":"EVA","Trọng lượng":"80–100g/đôi","Size":"34–46","Chiều cao":"20–40mm","Màu sắc":"Trắng/Đen/Nude/Theo yêu cầu","MOQ":"100 đôi/màu"}',
    image_url: SEED('eva-sandal-sole-light'),
    price: 'Liên hệ', is_featured: 1,
  },
  {
    category_id: 5, code: 'DS-002',
    name: 'Đế Sandal PVC Bơm Khí 2 Lớp',
    slug: 'de-sandal-pvc-bom-khi-2-lop',
    description: 'Đế sandal PVC bơm khí 2 lớp: lớp ngoài cứng bảo vệ, lớp giữa khí bơm êm ái. Thích hợp sandal cao gót, sandal platform thời trang.',
    specifications: '{"Vật liệu":"PVC 2 lớp bơm khí","Chiều cao":"30–80mm","Bề mặt":"Mịn bóng / văn hoa","Màu sắc":"Theo yêu cầu","Size":"35–42","MOQ":"200 đôi"}',
    image_url: SEED('pvc-sandal-platform-sole'),
    price: 'Liên hệ', is_featured: 1,
  },
  {
    category_id: 5, code: 'DS-003',
    name: 'Đế Sandal Cork Tự Nhiên Bọc Da',
    slug: 'de-sandal-cork-tu-nhien-boc-da',
    description: 'Đế sandal làm từ cork (bần) tự nhiên bọc da lộn, thân thiện môi trường, đặc tính kháng nấm tự nhiên, ôm hình bàn chân theo thời gian.',
    specifications: '{"Vật liệu":"Cork tự nhiên + da lộn","Chiều cao":"15–40mm","Tính năng":"Kháng nấm, ôm bàn chân","Màu bọc":"Nâu/Đen/Be","MOQ":"100 đôi"}',
    image_url: SEED('cork-sandal-sole-natural'),
    price: 'Liên hệ', is_featured: 0,
  },
  {
    category_id: 5, code: 'DS-004',
    name: 'Đế Sandal TPR Chống Trượt Outdoor',
    slug: 'de-sandal-tpr-chong-truot-outdoor',
    description: 'Đế sandal TPR pattern sâu 5mm chống trượt trên địa hình ẩm ướt, kháng dầu, bền màu UV. Phù hợp sandal trekking, sandal thể thao ngoài trời.',
    specifications: '{"Vật liệu":"TPR outdoor","Pattern":"Chevron sâu 5mm","Kháng UV":"Tốt","Kháng dầu":"Tốt","Size":"36–46","MOQ":"150 đôi"}',
    image_url: SEED('tpr-outdoor-sandal-sole'),
    price: 'Liên hệ', is_featured: 0,
  },
  {
    category_id: 5, code: 'DS-005',
    name: 'Đế Sandal Memory Foam Cao Cấp',
    slug: 'de-sandal-memory-foam-cao-cap',
    description: 'Đế sandal lõi memory foam mật độ cao bọc PU, ôm hình bàn chân sau 3–5 lần đi, giảm mỏi chân tối đa. Hàng cao cấp xuất EU, Mỹ.',
    specifications: '{"Vật liệu":"Memory foam mật độ cao + bọc PU","Mật độ foam":"40–50 kg/m³","Tính năng":"Ôm bàn chân, giảm mỏi","Chiều cao":"25–35mm","MOQ":"100 đôi"}',
    image_url: SEED('memory-foam-sandal-sole'),
    price: 'Liên hệ', is_featured: 0,
  },

  // ── Sticker - Charm (cat 6) ──────────────────────────────────────
  {
    category_id: 6, code: 'SC-001',
    name: 'Sticker Phản Quang 3M Dán Giày',
    slug: 'sticker-phan-quang-3m-dan-giay',
    description: 'Sticker phản quang chất liệu 3M Scotchlite 8910, phản chiếu ánh sáng 150–200 lần ban đêm, dán nhiệt 120°C/15s lên vải và da. Kích thước, hình dạng in theo yêu cầu.',
    specifications: '{"Chất liệu":"3M Scotchlite 8910","Phản chiếu":"150–200 lần","Dán":"Nhiệt 120°C/15 giây","Chịu giặt":"50 lần ở 40°C","MOQ":"500 cái/mã","Kích thước":"Theo yêu cầu"}',
    image_url: SEED('reflective-3m-sticker-shoe'),
    price: 'Liên hệ', is_featured: 1,
  },
  {
    category_id: 6, code: 'SC-002',
    name: 'Charm Kim Loại Jibbitz Kẹp Lỗ Giày',
    slug: 'charm-kim-loai-jibbitz-kep-lo-giay',
    description: 'Charm kim loại kẽm hợp kim mạ vàng/bạc/chrome, thiết kế đa dạng (động vật, chữ cái, biểu tượng), kẹp lỗ giày Crocs và sandal lỗ tiêu chuẩn Ø12mm.',
    specifications: '{"Vật liệu":"Kẽm hợp kim","Mạ":"Vàng / Bạc / Chrome","Tương thích":"Lỗ Ø12mm tiêu chuẩn","Kích thước":"25–35mm","MOQ":"100 cái/mã","Tùy chỉnh":"Logo, hình theo yêu cầu"}',
    image_url: SEED('jibbitz-metal-charm-crocs-shoe'),
    price: 'Liên hệ', is_featured: 1,
  },
  {
    category_id: 6, code: 'SC-003',
    name: 'Patch Logo Thêu Dán Nhiệt',
    slug: 'patch-logo-theu-dan-nhiet',
    description: 'Patch thêu máy mật độ cao dán nhiệt lên vải, da, canvas. Sắc nét từng chi tiết, màu sắc bền đẹp theo thời gian. In logo, mascot, chữ theo bản vẽ.',
    specifications: '{"Loại":"Thêu máy mật độ cao","Phương pháp dán":"Nhiệt 150°C/20 giây","Chịu giặt":"100 lần","Kích thước":"20–120mm","MOQ":"100 cái/mã","File thiết kế":"DST/EMB"}',
    image_url: SEED('embroidered-patch-iron-on-shoe'),
    price: 'Liên hệ', is_featured: 0,
  },
  {
    category_id: 6, code: 'SC-004',
    name: 'Nhãn In PVC Ép Nhiệt (Heat Transfer)',
    slug: 'nhan-in-pvc-ep-nhiet-heat-transfer',
    description: 'Nhãn PVC dẻo in offset hoặc kỹ thuật số, ép nhiệt 130°C/10s, bám chắc vào vải và da. Dùng làm nhãn size, nhãn brand, barcode, logo lên giày.',
    specifications: '{"Vật liệu":"PVC dẻo","In":"Offset / kỹ thuật số","Dán":"Ép nhiệt 130°C/10 giây","Chịu giặt":"60 lần","MOQ":"500 cái","Kích thước":"Tùy chỉnh"}',
    image_url: SEED('pvc-heat-transfer-label-shoe'),
    price: 'Liên hệ', is_featured: 0,
  },
  {
    category_id: 6, code: 'SC-005',
    name: 'Huy Hiệu Đính Đá PU 3D Cao Cấp',
    slug: 'huy-hieu-dinh-da-pu-3d-cao-cap',
    description: 'Huy hiệu PU 3D đính đá pha lê, đổ resin bóng cao cấp, dán keo hoặc khâu vào giày. Hiệu ứng lấp lánh sang trọng cho giày nữ, giày trẻ em.',
    specifications: '{"Vật liệu":"PU + đá pha lê","Công nghệ":"Đổ resin 3D","Phương pháp gắn":"Keo / khâu","Kích thước":"15–50mm","MOQ":"200 cái/mã","Màu sắc":"Theo yêu cầu"}',
    image_url: SEED('rhinestone-pu-badge-shoe-decoration'),
    price: 'Liên hệ', is_featured: 0,
  },
];

const insertProd = db.prepare(`
  INSERT INTO products (category_id, name, slug, code, description, specifications, image_url, price, is_featured)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
products.forEach(p => insertProd.run(
  p.category_id, p.name, p.slug, p.code,
  p.description, p.specifications, p.image_url, p.price, p.is_featured
));
console.log('Products seeded:', products.length);

// ─── NEWS ─────────────────────────────────────────────────────────────────────
const news = [
  {
    title: 'Máy may giày công nghiệp 2026 – Xu hướng tự động hoá trong sản xuất',
    slug: 'may-may-giay-cong-nghiep-2026-tu-dong-hoa',
    excerpt: 'Ngành sản xuất giày đang chuyển dịch mạnh sang tự động hoá. Những dòng máy may servo điện tử thế hệ mới giúp tăng năng suất 40% và giảm lỗi sản phẩm.',
    content: 'Năm 2026 chứng kiến làn sóng tự động hóa mạnh mẽ trong ngành sản xuất giày. Các nhà máy tại Việt Nam, Trung Quốc và Bangladesh đang thay thế dần máy may cơ học bằng máy may servo điện tử với hệ thống điều khiển số...',
    image_url: UNS('1504328345606-18bbc8c9d7d1'),
    is_featured: 1,
  },
  {
    title: 'Keo PU vs keo Neoprene – Chọn loại nào phù hợp cho từng loại đế?',
    slug: 'keo-pu-vs-keo-neoprene-chon-loai-nao',
    excerpt: 'So sánh ưu nhược điểm của hai loại keo dán đế phổ biến nhất trong ngành sản xuất giày. Hướng dẫn chọn đúng keo theo vật liệu đế và quy trình sản xuất.',
    content: 'Keo PU 2 thành phần và keo neoprene tiếp xúc là hai loại keo được dùng phổ biến nhất trong dán đế giày công nghiệp. Mỗi loại có ưu điểm riêng tùy theo vật liệu đế và điều kiện sản xuất...',
    image_url: UNS('1532187863486-abf9dbad1b69'),
    is_featured: 1,
  },
  {
    title: 'Đế EVA hay đế TPR? Phân tích chi tiết cho nhà sản xuất giày',
    slug: 'de-eva-hay-de-tpr-phan-tich-chi-tiet',
    excerpt: 'Hướng dẫn toàn diện so sánh EVA và TPR: trọng lượng, độ bền, giá thành, khả năng tái chế và ứng dụng phù hợp từng dòng sản phẩm.',
    content: 'Lựa chọn giữa EVA và TPR là quyết định quan trọng ảnh hưởng đến chất lượng, giá thành và định vị sản phẩm. EVA nhẹ hơn 20–30% so với TPR nhưng TPR bền hơn và tái chế được...',
    image_url: SEED('eva-tpr-sole-comparison'),
    is_featured: 0,
  },
  {
    title: 'Gan Tu mở rộng kho hàng tại Bình Dương – Phục vụ miền Nam tốt hơn',
    slug: 'gan-tu-mo-rong-kho-hang-binh-duong',
    excerpt: 'Nhằm rút ngắn thời gian giao hàng cho khách hàng miền Nam, Gan Tu chính thức khai trương kho phân phối 2.000m² tại KCN VSIP Bình Dương từ tháng 4/2026.',
    content: 'Với nhu cầu nguyên phụ liệu sản xuất giày tại miền Nam ngày càng tăng, Gan Tu quyết định đầu tư kho phân phối thứ 2 tại Bình Dương. Kho có diện tích 2.000m², sức chứa 500 tấn hàng, đáp ứng giao hàng trong ngày cho khách hàng tại TP.HCM và Bình Dương...',
    image_url: SEED('warehouse-industrial-factory'),
    is_featured: 1,
  },
  {
    title: 'Quy trình dán đế giày chuẩn 7 bước – Tránh bong tróc sớm',
    slug: 'quy-trinh-dan-de-giay-chuan-7-buoc',
    excerpt: 'Hướng dẫn chi tiết 7 bước dán đế giày đúng kỹ thuật: mài nhám, tẩy dầu, phủ primer, thoa keo, chờ khô, ép dán và kiểm tra chất lượng.',
    content: 'Bong đế sớm là lỗi phổ biến nhất trong sản xuất giày, thường do bỏ qua bước primer hoặc thời gian chờ keo không đúng. Quy trình chuẩn 7 bước sau đây sẽ giúp đế giày bám chắc tối thiểu 2 năm sử dụng...',
    image_url: SEED('shoe-sole-bonding-process'),
    is_featured: 0,
  },
  {
    title: 'Sticker phản quang trên giày – Tiêu chuẩn an toàn và xu hướng thị trường',
    slug: 'sticker-phan-quang-tren-giay-tieu-chuan',
    excerpt: 'Nhiều thị trường EU và Bắc Mỹ bắt buộc giày thể thao và giày bảo hộ phải có dải phản quang. Tìm hiểu tiêu chuẩn EN 13356 và giải pháp của Gan Tu.',
    content: 'Quy định EN 13356 của EU yêu cầu trang bị phản quang trên quần áo và giày dép có khả năng nhìn thấy từ xa 150m trong điều kiện ánh sáng xe pha. Sticker phản quang 3M Scotchlite là giải pháp phổ biến nhất hiện nay...',
    image_url: SEED('reflective-safety-standard-shoe'),
    is_featured: 0,
  },
  {
    title: 'Cork – Vật liệu thân thiện môi trường đang thay thế EVA trong sandal',
    slug: 'cork-vat-lieu-than-thien-moi-truong-sandal',
    excerpt: 'Xu hướng sustainable fashion đẩy nhu cầu đế sandal cork tự nhiên tăng 35% năm 2025. Gan Tu cung cấp đế sandal cork bọc da chất lượng xuất EU.',
    content: 'Cork (bần) là vật liệu 100% tự nhiên, thu hoạch từ vỏ cây bần mà không làm chết cây, tái sinh sau 9 năm. Đế sandal cork nhẹ, kháng nước, kháng nấm tự nhiên và có khả năng ôm hình bàn chân theo thời gian...',
    image_url: SEED('cork-natural-sustainable-sandal'),
    is_featured: 0,
  },
  {
    title: 'Hội chợ SHOES & LEATHER 2026 – Gan Tu tham dự gian hàng B12',
    slug: 'hoi-cho-shoes-leather-2026-gan-tu',
    excerpt: 'Gan Tu sẽ trưng bày đầy đủ dòng sản phẩm máy móc, đế giày, hoá chất và phụ kiện tại Hội chợ Quốc tế Giày Da 2026 tại TP.HCM, gian hàng B12.',
    content: 'Hội chợ Quốc tế Giày Da Việt Nam 2026 (Vietnam International Shoes & Leather Fair) sẽ diễn ra từ 15–18/5/2026 tại SECC, Quận 7, TP.HCM. Gan Tu tham dự với gian hàng 48m² tại khu B12, trưng bày toàn bộ danh mục sản phẩm...',
    image_url: SEED('shoes-leather-trade-fair-exhibition'),
    is_featured: 0,
  },
];

const insertNews = db.prepare(`INSERT INTO news (title, slug, excerpt, content, image_url, is_featured) VALUES (?, ?, ?, ?, ?, ?)`);
news.forEach(n => insertNews.run(n.title, n.slug, n.excerpt, n.content, n.image_url, n.is_featured));
console.log('News seeded:', news.length);

// ─── VIDEOS ───────────────────────────────────────────────────────────────────
const videos = [
  { title: 'Quy Trình Sản Xuất Giày Tại Nhà Máy – Từ Da Đến Thành Phẩm', youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', thumbnail_url: SEED('shoe-factory-production-video'), sort_order: 1 },
  { title: 'Hướng Dẫn Sử Dụng Máy May Giày Juki DDL-9000', youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', thumbnail_url: SEED('juki-sewing-machine-tutorial'), sort_order: 2 },
  { title: 'Giới Thiệu Sản Phẩm Hoá Chất Dán Đế Giày Gan Tu', youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', thumbnail_url: SEED('shoe-adhesive-chemical-intro'), sort_order: 3 },
];

const insertVideo = db.prepare(`INSERT INTO videos (title, youtube_url, thumbnail_url, sort_order) VALUES (?, ?, ?, ?)`);
videos.forEach(v => insertVideo.run(v.title, v.youtube_url, v.thumbnail_url, v.sort_order));
console.log('Videos seeded:', videos.length);

// ─── ADMIN ────────────────────────────────────────────────────────────────────
const bcrypt = require('bcryptjs');
const adminExists = db.prepare('SELECT id FROM admins WHERE username = ?').get('admin');
if (!adminExists) {
  const hash = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').run('admin', hash);
  console.log('Admin seeded: admin / admin123');
}

console.log('Database seeding complete!');
process.exit(0);
