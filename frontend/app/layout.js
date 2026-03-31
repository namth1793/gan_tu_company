import './globals.css';
import TopBar from '@/components/TopBar';
import TopBanner from '@/components/TopBanner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';

export const metadata = {
  title: 'Gan Tu - Máy Móc & Nguyên Phụ Liệu Sản Xuất Giày',
  description: 'Gan Tu chuyên cung cấp máy móc, đế giày, hoá chất, đế sandal, khuôn mold cho ngành sản xuất giày. Liên hệ 0902 487 928.',
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
        <TopBar />
        <TopBanner />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
