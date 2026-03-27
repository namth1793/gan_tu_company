'use client';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
import { useState, useEffect } from 'react';
import ProductGroup from './ProductGroup';
import { FaCog, FaMicrochip, FaIndustry, FaBolt } from 'react-icons/fa';

const groupConfigs = [
  { categoryId: 1, title: 'Máy ép công nghiệp', icon: FaCog },
  { categoryId: 2, title: 'Máy CNC chính xác', icon: FaMicrochip },
  { categoryId: 3, title: 'Dây chuyền sản xuất', icon: FaIndustry },
  { categoryId: 8, title: 'Thiết bị điện & Tự động hóa', icon: FaBolt },
];

export default function ProductGroupsWrapper() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const results = await Promise.all(
        groupConfigs.map(async (config) => {
          try {
            const res = await fetch(`${API_URL}/products?category_id=${config.categoryId}&limit=5`);
            const data = await res.json();
            return {
              ...config,
              products: data.success ? data.data : [],
            };
          } catch {
            return { ...config, products: [] };
          }
        })
      );
      setGroups(results.filter(g => g.products.length > 0));
    };
    fetchGroups();
  }, []);

  if (groups.length === 0) return null;

  return (
    <div className="bg-gray-50 py-4">
      <div className="divide-y divide-gray-200">
        {groups.map(group => (
          <ProductGroup
            key={group.categoryId}
            title={group.title}
            products={group.products}
            viewAllLink={`/san-pham?category=${group.categoryId}`}
            icon={group.icon}
          />
        ))}
      </div>
    </div>
  );
}
