'use client';
import { useParams } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import AdminGuard from '@/components/AdminGuard';
import AdminProductForm from '@/components/AdminProductForm';

export default function EditProductPage() {
  const { id } = useParams();
  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-xl font-bold text-gray-800 mb-6">✏️ Sửa sản phẩm</h1>
          <AdminProductForm productId={id} />
        </main>
      </div>
    </AdminGuard>
  );
}
