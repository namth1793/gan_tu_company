const db = require('./database');

console.log('Seeding database...');

// Clear existing data and reset autoincrement counters
db.exec(`
  DELETE FROM videos;
  DELETE FROM contacts;
  DELETE FROM news;
  DELETE FROM products;
  DELETE FROM categories;
  DELETE FROM sqlite_sequence WHERE name IN ('categories','products','news','videos','contacts');
`);

// Categories
const categories = [
  { name: 'Giày thể thao', slug: 'giay-the-thao', icon: 'FaShoePrints', description: 'Giày thể thao nam nữ trẻ em, sneaker, giày chạy bộ các loại', sort_order: 1 },
  { name: 'Giày da nam', slug: 'giay-da-nam', icon: 'FaShoe', description: 'Giày da nam công sở, oxford, derby, loafer, boot da chất lượng cao', sort_order: 2 },
  { name: 'Giày cao gót', slug: 'giay-cao-got', icon: 'FaFemale', description: 'Giày cao gót nữ thời trang, đế vuông, mũi nhọn, sandal cao gót', sort_order: 3 },
  { name: 'Dép & Sandal', slug: 'dep-sandal', icon: 'FaLeaf', description: 'Dép lê, sandal quai hậu, dép thể thao, dép đi biển các loại', sort_order: 4 },
  { name: 'Giày trẻ em', slug: 'giay-tre-em', icon: 'FaChild', description: 'Giày dép trẻ em, học sinh, bé trai bé gái đủ size', sort_order: 5 },
  { name: 'Giày vải', slug: 'giay-vai', icon: 'FaTshirt', description: 'Giày vải canvas, slip-on, espadrilles thoáng khí thời trang', sort_order: 6 },
  { name: 'Giày bảo hộ', slug: 'giay-bao-ho', icon: 'FaHardHat', description: 'Giày bảo hộ lao động, mũi thép, chống trơn, ủng cao su', sort_order: 7 },
  { name: 'Phụ kiện giày', slug: 'phu-kien-giay', icon: 'FaStar', description: 'Lót giày, dây giày, kem dưỡng da, bộ vệ sinh giày, hộp đựng', sort_order: 8 },
];

const insertCat = db.prepare(`INSERT INTO categories (name, slug, icon, description, sort_order) VALUES (?, ?, ?, ?, ?)`);
categories.forEach(c => insertCat.run(c.name, c.slug, c.icon, c.description, c.sort_order));

console.log('Categories seeded:', categories.length);

// Products
const products = [
  // Giày thể thao (cat 1)
  { category_id: 1, name: 'Giày Thể Thao Nam Boost 350', slug: 'giay-the-thao-nam-boost-350', code: 'GT-001', description: 'Giày thể thao nam Boost 350 phiên bản mới nhất, đế Boost êm ái, form dáng thời trang, phù hợp đi chơi và tập gym.', specifications: '{"Size":"39-44","Chất liệu":"Primeknit","Đế":"Boost foam","Màu sắc":"Đen/Trắng/Xám","Xuất xứ":"Nhập khẩu"}', image_url: 'https://picsum.photos/300/300?random=1', price: '850.000đ', is_featured: 1 },
  { category_id: 1, name: 'Giày Thể Thao Nữ Air Force', slug: 'giay-the-thao-nu-air-force', code: 'GT-002', description: 'Giày thể thao nữ Air Force 1 Low cổ điển, da PU cao cấp, đế Air êm chân, màu trắng tinh tế dễ phối đồ.', specifications: '{"Size":"35-40","Chất liệu":"Da PU","Đế":"Air unit","Màu sắc":"Trắng/Đen/Hồng","Xuất xứ":"Nhập khẩu"}', image_url: 'https://picsum.photos/300/300?random=2', price: '650.000đ', is_featured: 1 },
  { category_id: 1, name: 'Giày Chạy Bộ UltraBoost', slug: 'giay-chay-bo-ultraboost', code: 'GT-003', description: 'Giày chạy bộ UltraBoost chuyên dụng, đế siêu êm, ôm chân hoàn hảo, phù hợp chạy bộ hàng ngày và marathon.', specifications: '{"Size":"38-45","Chất liệu":"Primeknit","Đế":"UltraBoost","Màu sắc":"Đen/Xanh/Đỏ","Trọng lượng":"280g"}', image_url: 'https://picsum.photos/300/300?random=3', price: '1.200.000đ', is_featured: 1 },
  { category_id: 1, name: 'Giày Thể Thao Trẻ Em', slug: 'giay-the-thao-tre-em-cat1', code: 'GT-004', description: 'Giày thể thao trẻ em bền đẹp, đế mềm chống trơn, thoáng khí, phù hợp cho bé vận động năng động.', specifications: '{"Size":"28-35","Chất liệu":"Vải lưới","Đế":"Cao su EVA","Màu sắc":"Đỏ/Xanh/Hồng","Độ tuổi":"5-12 tuổi"}', image_url: 'https://picsum.photos/300/300?random=4', price: '350.000đ', is_featured: 0 },
  { category_id: 1, name: 'Giày Thể Thao Nam Jordan', slug: 'giay-the-thao-nam-jordan', code: 'GT-033', description: 'Giày thể thao nam Jordan phiên bản cao cổ, da thật cao cấp, đệm Air Max siêu êm, biểu tượng thời trang đường phố.', specifications: '{"Size":"39-46","Chất liệu":"Da thật + vải","Đế":"Air Max","Màu sắc":"Đen/Đỏ/Trắng","Xuất xứ":"Nhập khẩu"}', image_url: 'https://picsum.photos/300/300?random=33', price: '1.500.000đ', is_featured: 1 },

  // Giày da nam (cat 2)
  { category_id: 2, name: 'Giày Da Nam Công Sở', slug: 'giay-da-nam-cong-so', code: 'GT-005', description: 'Giày da nam công sở lịch lãm, da bò thật 100%, đế da khâu tay, phù hợp đi làm và sự kiện trang trọng.', specifications: '{"Size":"39-44","Chất liệu":"Da bò thật","Đế":"Da bò","Màu sắc":"Đen/Nâu","Kiểu":"Derby"}', image_url: 'https://picsum.photos/300/300?random=5', price: '750.000đ', is_featured: 1 },
  { category_id: 2, name: 'Giày Tây Oxford Da Bò', slug: 'giay-tay-oxford-da-bo', code: 'GT-006', description: 'Giày tây Oxford da bò cao cấp, đường khâu thủ công tỉ mỉ, lót da êm chân, phong cách quý ông.', specifications: '{"Size":"38-44","Chất liệu":"Da bò Italy","Đế":"Da + cao su","Màu sắc":"Đen/Nâu cognac","Kiểu":"Oxford"}', image_url: 'https://picsum.photos/300/300?random=6', price: '950.000đ', is_featured: 1 },
  { category_id: 2, name: 'Giày Lười Da Nam', slug: 'giay-luoi-da-nam', code: 'GT-007', description: 'Giày lười da nam loafer không dây tiện lợi, da mềm mại, đế cao su êm, phù hợp đi làm và đi chơi.', specifications: '{"Size":"38-44","Chất liệu":"Da lộn cao cấp","Đế":"Cao su","Màu sắc":"Đen/Nâu/Xanh navy","Kiểu":"Loafer"}', image_url: 'https://picsum.photos/300/300?random=7', price: '580.000đ', is_featured: 0 },
  { category_id: 2, name: 'Giày Boot Da Nam', slug: 'giay-boot-da-nam', code: 'GT-008', description: 'Giày boot cổ cao da bò thật, khóa bên hông tiện lợi, đế Goodyear welted bền bỉ, phong cách mạnh mẽ.', specifications: '{"Size":"38-44","Chất liệu":"Da bò thật","Đế":"Goodyear welted","Màu sắc":"Đen/Nâu đậm","Chiều cao":"Cổ cao 20cm"}', image_url: 'https://picsum.photos/300/300?random=8', price: '1.100.000đ', is_featured: 0 },
  { category_id: 2, name: 'Giày Da Nâu Vintage Nam', slug: 'giay-da-nau-vintage-nam', code: 'GT-035', description: 'Giày da nâu vintage phong cách retro, da pull-up tạo màu đẹp theo thời gian, cá tính và thời trang.', specifications: '{"Size":"38-44","Chất liệu":"Da pull-up","Đế":"Cao su đế bằng","Màu sắc":"Nâu vintage","Kiểu":"Casual"}', image_url: 'https://picsum.photos/300/300?random=35', price: '820.000đ', is_featured: 0 },

  // Giày cao gót (cat 3)
  { category_id: 3, name: 'Giày Cao Gót Nữ 7cm', slug: 'giay-cao-got-nu-7cm', code: 'GT-009', description: 'Giày cao gót nữ 7cm thanh lịch, da PU bóng, đế nhọn gợi cảm, phù hợp đi tiệc và công sở.', specifications: '{"Size":"35-40","Chất liệu":"Da PU","Đế":"Nhọn 7cm","Màu sắc":"Đen/Nude/Đỏ","Kiểu":"Stiletto"}', image_url: 'https://picsum.photos/300/300?random=9', price: '420.000đ', is_featured: 1 },
  { category_id: 3, name: 'Giày Cao Gót Nữ 5cm Đế Vuông', slug: 'giay-cao-got-nu-5cm-de-vuong', code: 'GT-010', description: 'Giày cao gót 5cm đế vuông ổn định dễ đi, da lộn mềm, mũi tròn thanh lịch, thoải mái đứng lâu.', specifications: '{"Size":"35-40","Chất liệu":"Da lộn","Đế":"Vuông 5cm","Màu sắc":"Kem/Đen/Camel","Kiểu":"Block heel"}', image_url: 'https://picsum.photos/300/300?random=10', price: '380.000đ', is_featured: 0 },
  { category_id: 3, name: 'Giày Cao Gót Mũi Nhọn', slug: 'giay-cao-got-mui-nhon', code: 'GT-011', description: 'Giày cao gót mũi nhọn quyến rũ, da bóng gương sang trọng, gót cao 9cm, phù hợp dự tiệc.', specifications: '{"Size":"35-39","Chất liệu":"Da bóng","Đế":"Nhọn 9cm","Màu sắc":"Đen/Đỏ/Hồng champagne","Kiểu":"Pointed toe"}', image_url: 'https://picsum.photos/300/300?random=11', price: '550.000đ', is_featured: 0 },
  { category_id: 3, name: 'Sandal Cao Gót Nữ', slug: 'sandal-cao-got-nu', code: 'GT-012', description: 'Sandal cao gót nữ quai ngang tinh tế, đế nhọn 8cm, màu metallic thời trang, phù hợp đi biển và tiệc.', specifications: '{"Size":"35-40","Chất liệu":"PU metallic","Đế":"Nhọn 8cm","Màu sắc":"Vàng/Bạc/Đen","Kiểu":"Strappy sandal"}', image_url: 'https://picsum.photos/300/300?random=12', price: '320.000đ', is_featured: 0 },
  { category_id: 3, name: 'Giày Nữ Platform Chunky', slug: 'giay-nu-platform-chunky', code: 'GT-034', description: 'Giày nữ platform chunky đế dày trend 2026, da PU cao cấp, quai cổ chân điều chỉnh, cá tính năng động.', specifications: '{"Size":"35-40","Chất liệu":"Da PU","Đế":"Platform 5cm","Màu sắc":"Trắng/Đen/Nâu","Kiểu":"Platform"}', image_url: 'https://picsum.photos/300/300?random=34', price: '480.000đ', is_featured: 1 },

  // Dép & Sandal (cat 4)
  { category_id: 4, name: 'Dép Lê Nam Đế Cao Su', slug: 'dep-le-nam-de-cao-su', code: 'GT-013', description: 'Dép lê nam đế cao su chống trơn, quai EVA êm chân, siêu nhẹ, phù hợp dùng trong nhà và đi biển.', specifications: '{"Size":"39-45","Chất liệu":"EVA","Đế":"Cao su chống trơn","Màu sắc":"Đen/Xanh/Xám","Trọng lượng":"150g"}', image_url: 'https://picsum.photos/300/300?random=13', price: '120.000đ', is_featured: 0 },
  { category_id: 4, name: 'Dép Sandal Nữ Quai Chéo', slug: 'dep-sandal-nu-quai-cheo', code: 'GT-014', description: 'Dép sandal nữ quai chéo thời trang, da PU mềm mại, đế cao su êm chân, dễ phối đồ mùa hè.', specifications: '{"Size":"35-40","Chất liệu":"Da PU","Đế":"Cao su êm","Màu sắc":"Nude/Đen/Nâu/Trắng","Kiểu":"Strappy"}', image_url: 'https://picsum.photos/300/300?random=14', price: '180.000đ', is_featured: 0 },
  { category_id: 4, name: 'Dép Thể Thao Adidas Slides', slug: 'dep-the-thao-adidas-slides', code: 'GT-015', description: 'Dép thể thao slides phong cách sport, đế EVA siêu êm, quai cao su mềm, logo thương hiệu thời trang.', specifications: '{"Size":"36-46","Chất liệu":"Cao su EVA","Đế":"EVA 2.5cm","Màu sắc":"Đen/Trắng/Xanh navy","Kiểu":"Slides"}', image_url: 'https://picsum.photos/300/300?random=15', price: '350.000đ', is_featured: 1 },
  { category_id: 4, name: 'Dép Sandal Đi Biển', slug: 'dep-sandal-di-bien', code: 'GT-016', description: 'Dép sandal đi biển chống nước, đế chống trượt an toàn, quai nylon bền bỉ, màu sắc tươi sáng.', specifications: '{"Size":"36-44","Chất liệu":"Nylon + EVA","Đế":"Cao su chống trượt","Màu sắc":"Xanh biển/Vàng/Cam","Chống nước":"100%"}', image_url: 'https://picsum.photos/300/300?random=16', price: '150.000đ', is_featured: 0 },
  { category_id: 4, name: 'Sandal Quai Thun Nữ', slug: 'sandal-quai-thun-nu', code: 'GT-036', description: 'Sandal nữ quai thun co giãn ôm chân thoải mái, đế bằng phẳng êm, nhẹ nhàng phù hợp đi dạo hàng ngày.', specifications: '{"Size":"35-40","Chất liệu":"Thun + PU","Đế":"EVA bằng","Màu sắc":"Trắng/Đen/Hồng/Xanh","Kiểu":"Flat sandal"}', image_url: 'https://picsum.photos/300/300?random=36', price: '160.000đ', is_featured: 0 },

  // Giày trẻ em (cat 5)
  { category_id: 5, name: 'Giày Thể Thao Trẻ Em 4-8 Tuổi', slug: 'giay-the-thao-tre-em-4-8-tuoi', code: 'GT-017', description: 'Giày thể thao trẻ em 4-8 tuổi, chất liệu lưới thoáng khí, đế mềm chống trơn, dán quai tiện lợi.', specifications: '{"Size":"24-32","Chất liệu":"Lưới thoáng khí","Đế":"Cao su EVA mềm","Màu sắc":"Đỏ/Xanh/Hồng","Dán quai":"Có"}', image_url: 'https://picsum.photos/300/300?random=17', price: '280.000đ', is_featured: 0 },
  { category_id: 5, name: 'Giày Sandal Trẻ Em', slug: 'giay-sandal-tre-em', code: 'GT-018', description: 'Sandal trẻ em quai điều chỉnh được, chống trơn an toàn, màu sắc tươi sáng, phù hợp mùa hè.', specifications: '{"Size":"24-35","Chất liệu":"EVA + PU","Đế":"Cao su chống trơn","Màu sắc":"Đỏ/Xanh/Vàng","Điều chỉnh quai":"Có"}', image_url: 'https://picsum.photos/300/300?random=18', price: '180.000đ', is_featured: 0 },
  { category_id: 5, name: 'Giày Học Sinh Trắng', slug: 'giay-hoc-sinh-trang', code: 'GT-019', description: 'Giày học sinh màu trắng tiêu chuẩn, da PU dễ lau chùi, đế cao su bền, phù hợp đồng phục trường.', specifications: '{"Size":"30-38","Chất liệu":"Da PU trắng","Đế":"Cao su trắng","Màu sắc":"Trắng","Kiểu":"Cột dây"}', image_url: 'https://picsum.photos/300/300?random=19', price: '220.000đ', is_featured: 0 },
  { category_id: 5, name: 'Dép Tổ Ong Trẻ Em', slug: 'dep-to-ong-tre-em', code: 'GT-020', description: 'Dép tổ ong trẻ em chất liệu EVA mềm nhẹ, lỗ thoát khí, nhiều màu đẹp, không thấm nước.', specifications: '{"Size":"24-35","Chất liệu":"EVA cao cấp","Đế":"Tổ ong EVA","Màu sắc":"Nhiều màu","Chống nước":"Có"}', image_url: 'https://picsum.photos/300/300?random=20', price: '120.000đ', is_featured: 0 },
  { category_id: 5, name: 'Giày Bé Gái Công Chúa', slug: 'giay-be-gai-cong-chua', code: 'GT-038', description: 'Giày bé gái công chúa nơ đính đá lấp lánh, da PU mềm, đế bằng an toàn, cho bé từ 2-8 tuổi.', specifications: '{"Size":"22-32","Chất liệu":"Da PU bóng","Đế":"Bằng êm","Màu sắc":"Hồng/Trắng/Tím","Phụ kiện":"Nơ đính đá"}', image_url: 'https://picsum.photos/300/300?random=38', price: '160.000đ', is_featured: 0 },
  { category_id: 5, name: 'Giày Trượt Patin Trẻ Em', slug: 'giay-truot-patin-tre-em', code: 'GT-039', description: 'Giày trượt patin trẻ em điều chỉnh size được, bánh xe phát sáng LED, bảo vệ mắt cá chân an toàn.', specifications: '{"Size":"28-38 (điều chỉnh)","Chất liệu":"Nhựa ABS + da PU","Bánh xe":"PU trong suốt LED","Màu sắc":"Hồng/Xanh/Đen"}', image_url: 'https://picsum.photos/300/300?random=39', price: '450.000đ', is_featured: 1 },

  // Giày vải (cat 6)
  { category_id: 6, name: 'Giày Vải Slip-on Nữ', slug: 'giay-vai-slip-on-nu', code: 'GT-021', description: 'Giày vải slip-on nữ không dây tiện lợi, họa tiết đẹp, đế cao su êm, thoáng khí mùa hè.', specifications: '{"Size":"35-40","Chất liệu":"Canvas","Đế":"Cao su","Màu sắc":"Nhiều họa tiết","Kiểu":"Slip-on"}', image_url: 'https://picsum.photos/300/300?random=21', price: '250.000đ', is_featured: 0 },
  { category_id: 6, name: 'Giày Vải Canvas Nam', slug: 'giay-vai-canvas-nam', code: 'GT-022', description: 'Giày vải canvas nam cổ thấp classic, đế cao su vulcanized, phù hợp mọi phong cách casual.', specifications: '{"Size":"39-44","Chất liệu":"Canvas 100%","Đế":"Cao su vulcanized","Màu sắc":"Trắng/Đen/Navy","Kiểu":"Low-top"}', image_url: 'https://picsum.photos/300/300?random=22', price: '280.000đ', is_featured: 0 },
  { category_id: 6, name: 'Giày Vải Espadrilles', slug: 'giay-vai-espadrilles', code: 'GT-023', description: 'Giày vải espadrilles phong cách Địa Trung Hải, đế cói tự nhiên, nhẹ nhàng thoáng mát.', specifications: '{"Size":"35-41","Chất liệu":"Vải + cói","Đế":"Cói tự nhiên","Màu sắc":"Beige/Xanh/Kẻ sọc","Kiểu":"Espadrilles"}', image_url: 'https://picsum.photos/300/300?random=23', price: '220.000đ', is_featured: 0 },
  { category_id: 6, name: 'Sneaker Vải Nữ', slug: 'sneaker-vai-nu', code: 'GT-024', description: 'Sneaker vải nữ trẻ trung năng động, vải lưới thoáng khí, đế EVA bọt khí êm ái, nhiều màu sắc.', specifications: '{"Size":"35-40","Chất liệu":"Vải lưới","Đế":"EVA bọt khí","Màu sắc":"Trắng/Hồng/Xanh mint","Kiểu":"Sneaker"}', image_url: 'https://picsum.photos/300/300?random=24', price: '320.000đ', is_featured: 0 },
  { category_id: 6, name: 'Giày Lưới Thoáng Khí Nam', slug: 'giay-luoi-thoang-khi-nam', code: 'GT-037', description: 'Giày lưới thoáng khí nam thể thao casual, vải lưới 3D siêu thoáng, đế cao su nhẹ, phù hợp mùa hè.', specifications: '{"Size":"39-44","Chất liệu":"Lưới 3D","Đế":"Cao su nhẹ","Màu sắc":"Xám/Xanh/Đen","Trọng lượng":"220g/chiếc"}', image_url: 'https://picsum.photos/300/300?random=37', price: '290.000đ', is_featured: 0 },

  // Giày bảo hộ (cat 7)
  { category_id: 7, name: 'Giày Bảo Hộ Mũi Thép', slug: 'giay-bao-ho-mui-thep', code: 'GT-025', description: 'Giày bảo hộ mũi thép chống va đập, chứng nhận CE EN ISO 20345, đế chống đinh xuyên, phù hợp công trường.', specifications: '{"Size":"39-45","Chất liệu":"Da thật","Mũi":"Thép S1P","Đế":"Chống đinh","Tiêu chuẩn":"CE EN ISO 20345"}', image_url: 'https://picsum.photos/300/300?random=25', price: '450.000đ', is_featured: 1 },
  { category_id: 7, name: 'Giày Bảo Hộ Chống Trơn', slug: 'giay-bao-ho-chong-tron', code: 'GT-026', description: 'Giày bảo hộ chống trơn trượt chuẩn SRA, phù hợp nhà bếp nhà máy thực phẩm, dễ vệ sinh.', specifications: '{"Size":"36-44","Chất liệu":"Da PU","Đế":"SRA chống trơn","Màu sắc":"Đen/Trắng","Tiêu chuẩn":"SRA/SRB"}', image_url: 'https://picsum.photos/300/300?random=26', price: '380.000đ', is_featured: 0 },
  { category_id: 7, name: 'Ủng Cao Su Chống Nước', slug: 'ung-cao-su-chong-nuoc', code: 'GT-027', description: 'Ủng cao su chống nước toàn phần, đế dày chống đinh, phù hợp nông nghiệp, xây dựng mùa mưa.', specifications: '{"Size":"38-45","Chất liệu":"Cao su tự nhiên","Đế":"Cao su dày","Chiều cao":"30cm","Chống nước":"100%"}', image_url: 'https://picsum.photos/300/300?random=27', price: '290.000đ', is_featured: 0 },
  { category_id: 7, name: 'Giày Bảo Hộ Nhẹ', slug: 'giay-bao-ho-nhe', code: 'GT-028', description: 'Giày bảo hộ siêu nhẹ composite toe, nhẹ hơn 30% so với mũi thép, thoải mái đi cả ngày.', specifications: '{"Size":"38-45","Chất liệu":"Da + lưới","Mũi":"Composite","Đế":"Cao su nhẹ","Trọng lượng":"380g/đôi"}', image_url: 'https://picsum.photos/300/300?random=28', price: '520.000đ', is_featured: 0 },

  // Phụ kiện giày (cat 8)
  { category_id: 8, name: 'Lót Giày Êm Chân', slug: 'lot-giay-em-chan', code: 'GT-029', description: 'Lót giày êm chân memory foam, hỗ trợ vòm bàn chân, kháng khuẩn khử mùi, cắt vừa mọi size.', specifications: '{"Size":"36-46 (cắt vừa size)","Chất liệu":"Memory foam","Dày":"8mm","Tính năng":"Kháng khuẩn, khử mùi"}', image_url: 'https://picsum.photos/300/300?random=29', price: '45.000đ', is_featured: 0 },
  { category_id: 8, name: 'Dây Giày Nhiều Màu', slug: 'day-giay-nhieu-mau', code: 'GT-030', description: 'Dây giày dù bền chắc nhiều màu sắc, phù hợp sneaker và giày thể thao, chiều dài 120cm.', specifications: '{"Chiều dài":"120cm","Chất liệu":"Dù polyester","Màu sắc":"20+ màu","Đường kính":"5mm"}', image_url: 'https://picsum.photos/300/300?random=30', price: '25.000đ', is_featured: 0 },
  { category_id: 8, name: 'Kem Dưỡng Da Giày', slug: 'kem-duong-da-giay', code: 'GT-031', description: 'Kem dưỡng da giày cao cấp, dưỡng ẩm và bảo vệ da, chống nước, giữ màu sắc tươi lâu.', specifications: '{"Thể tích":"75ml","Màu":"Không màu/Đen/Nâu","Thành phần":"Sáp ong + lanolin","Hãng":"Collonil"}', image_url: 'https://picsum.photos/300/300?random=31', price: '85.000đ', is_featured: 0 },
  { category_id: 8, name: 'Bộ Vệ Sinh Giày', slug: 'bo-ve-sinh-giay', code: 'GT-032', description: 'Bộ vệ sinh giày chuyên dụng gồm bàn chải, dung dịch tẩy trắng, khăn lau, tẩy mùi hôi.', specifications: '{"Bộ gồm":"Bàn chải + dung dịch + khăn","Phù hợp":"Da, vải, cao su","Thể tích dung dịch":"100ml","Xuất xứ":"Nhập khẩu"}', image_url: 'https://picsum.photos/300/300?random=32', price: '120.000đ', is_featured: 0 },
  { category_id: 8, name: 'Hộp Đựng Giày Trong Suốt', slug: 'hop-dung-giay-trong-suot', code: 'GT-040', description: 'Hộp đựng giày nhựa trong suốt nhìn thấy bên trong, có thể xếp chồng tiết kiệm diện tích, bền đẹp.', specifications: '{"Kích thước":"32x20x12cm","Chất liệu":"Nhựa PP trong suốt","Tải trọng":"5kg","Màu":"Trong suốt"}', image_url: 'https://picsum.photos/300/300?random=40', price: '35.000đ', is_featured: 0 },
];

const insertProd = db.prepare(`
  INSERT INTO products (category_id, name, slug, code, description, specifications, image_url, price, is_featured)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
products.forEach(p => insertProd.run(p.category_id, p.name, p.slug, p.code, p.description, p.specifications, p.image_url, p.price || null, p.is_featured));
console.log('Products seeded:', products.length);

// News
const news = [
  { title: 'Xu hướng giày thể thao 2026 – Những mẫu không thể bỏ qua', slug: 'xu-huong-giay-the-thao-2026', excerpt: 'Khám phá những mẫu giày thể thao hot nhất năm 2026, từ chunky sneaker đến giày chạy bộ công nghệ mới.', content: 'Năm 2026 chứng kiến sự bùng nổ của chunky sneaker và giày platform. Các thương hiệu lớn liên tục ra mắt dòng sản phẩm mới với công nghệ đế tiên tiến, mang lại trải nghiệm vượt trội cho người mặc...', image_url: 'https://picsum.photos/600/400?random=41', is_featured: 1 },
  { title: 'Hướng dẫn chọn size giày chuẩn – Tránh mua nhầm', slug: 'huong-dan-chon-size-giay-chuan', excerpt: 'Bí quyết đo chân và chọn size giày đúng chuẩn, tránh tình trạng chật hay rộng khi mua online.', content: 'Một trong những vấn đề phổ biến khi mua giày online là chọn sai size. Để đo chân chính xác, bạn cần đặt chân lên tờ giấy A4, dùng bút vẽ viền quanh chân, sau đó đo chiều dài từ gót đến ngón dài nhất...', image_url: 'https://picsum.photos/600/400?random=42', is_featured: 1 },
  { title: 'Cách bảo quản giày da đúng cách để giày bền đẹp', slug: 'cach-bao-quan-giay-da-dung-cach', excerpt: 'Bí quyết chăm sóc và bảo quản giày da giúp giày luôn bóng đẹp, bền màu và kéo dài tuổi thọ.', content: 'Giày da cần được chăm sóc thường xuyên để duy trì vẻ đẹp lâu dài. Sau mỗi lần đi, hãy dùng khăn mềm lau sạch bụi bẩn. Định kỳ mỗi 2-3 tuần, thoa kem dưỡng da chuyên dụng...', image_url: 'https://picsum.photos/600/400?random=43', is_featured: 0 },
  { title: 'Giày cao gót nào phù hợp với vóc dáng của bạn?', slug: 'giay-cao-got-phu-hop-voc-dang', excerpt: 'Hướng dẫn chọn kiểu giày cao gót phù hợp với từng dáng người để tôn lên vẻ đẹp tự nhiên.', content: 'Người thấp nên chọn giày cao gót mũi nhọn, dây mảnh để tạo cảm giác chân dài. Người cao gầy hợp với đế chunky. Người mập nên tránh giày quai mắt cá chân to bản...', image_url: 'https://picsum.photos/600/400?random=44', is_featured: 0 },
  { title: 'Top 5 mẫu giày da nam bán chạy tháng 3/2026', slug: 'top-5-giay-da-nam-ban-chay-thang-3-2026', excerpt: 'Những mẫu giày da nam được yêu thích nhất tháng 3/2026 tại Gan Tu – đẹp, bền, giá tốt.', content: 'Dựa trên doanh số bán hàng tháng 3/2026, Gan Tu tổng hợp top 5 mẫu giày da nam được khách hàng yêu thích nhất. Đứng đầu là Giày Tây Oxford Da Bò với thiết kế cổ điển...', image_url: 'https://picsum.photos/600/400?random=45', is_featured: 0 },
  { title: 'Dép sandal hè 2026 – Trẻ trung năng động', slug: 'dep-sandal-he-2026', excerpt: 'Bộ sưu tập dép sandal hè 2026 với màu sắc tươi sáng, thiết kế phóng khoáng cho mùa hè sôi động.', content: 'Mùa hè 2026, xu hướng sandal hướng đến sự thoải mái và cá tính. Sandal quai thun, dép slides và sandal đi biển là những lựa chọn phổ biến nhất...', image_url: 'https://picsum.photos/600/400?random=46', is_featured: 0 },
  { title: 'Giày bảo hộ lao động – Tiêu chuẩn và cách chọn', slug: 'giay-bao-ho-lao-dong-tieu-chuan', excerpt: 'Tìm hiểu các tiêu chuẩn giày bảo hộ quốc tế và cách lựa chọn phù hợp với môi trường làm việc.', content: 'Giày bảo hộ lao động cần đáp ứng tiêu chuẩn EN ISO 20345 của châu Âu. Tùy môi trường làm việc mà chọn loại phù hợp: S1P cho công trường, SRA/SRB cho nhà bếp...', image_url: 'https://picsum.photos/600/400?random=47', is_featured: 0 },
  { title: 'Cách vệ sinh giày trắng như mới sau vài tuần đi', slug: 'cach-ve-sinh-giay-trang-nhu-moi', excerpt: 'Mẹo vệ sinh giày trắng đơn giản tại nhà giúp giày trắng sáng bóng như mới chỉ trong 15 phút.', content: 'Giày trắng rất dễ bẩn và khó làm sạch nếu không biết cách. Hãy dùng bộ vệ sinh giày chuyên dụng kết hợp bàn chải mềm và dung dịch tẩy trắng chuyên dụng...', image_url: 'https://picsum.photos/600/400?random=48', is_featured: 0 },
  { title: 'Gan Tu ra mắt bộ sưu tập giày trẻ em mùa tựu trường', slug: 'gan-tu-ra-mat-bo-suu-tap-giay-tre-em-tuu-truong', excerpt: 'Bộ sưu tập giày trẻ em mùa tựu trường 2026 với nhiều mẫu mới đẹp, bền, an toàn cho bé.', content: 'Nhân dịp đầu năm học 2026-2027, Gan Tu ra mắt bộ sưu tập giày học sinh và giày thể thao trẻ em mới nhất. Các sản phẩm được thiết kế với chất liệu an toàn, không chứa hóa chất độc hại...', image_url: 'https://picsum.photos/600/400?random=49', is_featured: 1 },
  { title: 'Chính sách đổi trả giày dép tại Gan Tu – Minh bạch, dễ dàng', slug: 'chinh-sach-doi-tra-giay-dep-gan-tu', excerpt: 'Gan Tu cam kết đổi trả miễn phí trong 7 ngày nếu không vừa size hoặc lỗi sản phẩm.', content: 'Tại Gan Tu, chúng tôi hiểu rằng mua giày online có thể gặp vấn đề về size. Vì vậy, chúng tôi áp dụng chính sách đổi trả linh hoạt: Đổi size miễn phí trong 7 ngày, hoàn tiền 100% nếu sản phẩm lỗi...', image_url: 'https://picsum.photos/600/400?random=50', is_featured: 0 },
];

const insertNews = db.prepare(`INSERT INTO news (title, slug, excerpt, content, image_url, is_featured) VALUES (?, ?, ?, ?, ?, ?)`);
news.forEach(n => insertNews.run(n.title, n.slug, n.excerpt, n.content, n.image_url, n.is_featured));
console.log('News seeded:', news.length);

// Videos
const videos = [
  { title: 'Bộ Sưu Tập Giày Dép Gan Tu 2026 – Hàng Trăm Mẫu Mới', youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', thumbnail_url: 'https://picsum.photos/640/360?random=51', sort_order: 1 },
  { title: 'Hướng Dẫn Chăm Sóc & Vệ Sinh Giày Da Đúng Cách', youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', thumbnail_url: 'https://picsum.photos/640/360?random=52', sort_order: 2 },
  { title: 'Review Giày Thể Thao Mới Nhất Tại Gan Tu – Đẹp Giá Tốt', youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', thumbnail_url: 'https://picsum.photos/640/360?random=53', sort_order: 3 },
];

const insertVideo = db.prepare(`INSERT INTO videos (title, youtube_url, thumbnail_url, sort_order) VALUES (?, ?, ?, ?)`);
videos.forEach(v => insertVideo.run(v.title, v.youtube_url, v.thumbnail_url, v.sort_order));
console.log('Videos seeded:', videos.length);

// Admin seed
const bcrypt = require('bcryptjs');
const adminExists = db.prepare('SELECT id FROM admins WHERE username = ?').get('admin');
if (!adminExists) {
  const hash = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').run('admin', hash);
  console.log('Admin seeded: admin / admin123');
}

console.log('Database seeding complete!');
process.exit(0);
