'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminGuard({ children }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.replace('/admin/login');
    } else {
      setOk(true);
    }
  }, []);

  if (!ok) return (
    <div className="flex items-center justify-center min-h-screen text-gray-400">
      Đang kiểm tra...
    </div>
  );
  return children;
}
