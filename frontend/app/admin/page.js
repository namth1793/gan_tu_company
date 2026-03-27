'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    router.replace(token ? '/admin/dashboard' : '/admin/login');
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-gray-400">Đang tải...</div>
    </div>
  );
}
