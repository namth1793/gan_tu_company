import './globals.css';
import TopBar from '@/components/TopBar';
import TopBanner from '@/components/TopBanner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';

export const metadata = {
  title: 'Gan Tu - Giày Dép Thời Trang Chất Lượng Cao',
  description: 'Gan Tu chuyên cung cấp giày dép thời trang: giày thể thao, giày da nam, giày cao gót, dép sandal, giày trẻ em. Freeship toàn quốc.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-100 font-sans">
        {/* Thanh địa chỉ + email trên cùng */}
        <TopBar />
        {/* Hero banner: logo + tên + search + hotline */}
        <TopBanner />
        {/* Nav header sticky */}
        <Header />
        <main>{children}</main>
        <Footer />
        {/* Floating contact buttons */}
        <FloatingContact />
      </body>
    </html>
  );
}
