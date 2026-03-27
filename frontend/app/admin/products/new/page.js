'use client';
import AdminSidebar from '@/components/AdminSidebar';
import AdminGuard from '@/components/AdminGuard';
import AdminProductForm from '@/components/AdminProductForm';

export default function NewProductPage() {
  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-xl font-bold text-gray-800 mb-6">+ Thêm sản phẩm mới</h1>
          <AdminProductForm />
        </main>
      </div>
    </AdminGuard>
  );
}
