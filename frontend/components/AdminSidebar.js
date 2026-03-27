'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const menu = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { label: 'Sản phẩm', href: '/admin/products', icon: '👟' },
  { label: 'Tin tức', href: '/admin/news', icon: '📰' },
  { label: 'Liên hệ', href: '/admin/contacts', icon: '📩' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    router.push('/admin/login');
  };

  return (
    <aside className="w-56 bg-[#271C1C] min-h-screen flex flex-col flex-shrink-0">
      <div className="px-5 py-5 border-b border-[#3d2a2a]">
        <div className="text-white font-black text-lg tracking-widest">GAN TU</div>
        <div className="text-gray-400 text-xs mt-0.5">Quản trị viên</div>
      </div>
      <nav className="flex-1 py-4">
        {menu.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors ${
              pathname.startsWith(item.href)
                ? 'bg-[#3d2a2a] text-yellow-400 font-medium'
                : 'text-gray-300 hover:bg-[#3d2a2a] hover:text-white'
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="px-5 py-4 border-t border-[#3d2a2a]">
        <Link href="/" className="block text-gray-400 text-xs hover:text-white mb-2 transition-colors">
          ← Về trang chủ
        </Link>
        <button onClick={logout} className="text-red-400 text-xs hover:text-red-300 transition-colors">
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
