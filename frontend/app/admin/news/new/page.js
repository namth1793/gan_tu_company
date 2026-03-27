'use client';
import AdminSidebar from '@/components/AdminSidebar';
import AdminGuard from '@/components/AdminGuard';
import AdminNewsForm from '@/components/AdminNewsForm';

export default function NewNewsPage() {
  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <h1 className="text-xl font-bold text-gray-800 mb-6">+ Thêm bài viết mới</h1>
          <AdminNewsForm />
        </main>
      </div>
    </AdminGuard>
  );
}
