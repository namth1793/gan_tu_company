'use client';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
import { useState, useEffect } from 'react';
import ProductGroup from './ProductGroup';
import { FaCog, FaShoePrints, FaLayerGroup, FaFlask, FaLeaf, FaStar } from 'react-icons/fa';

const groupConfigs = [
  { categoryId: 1, slug: 'may-moc',       title: 'Máy móc',         icon: FaCog },
  { categoryId: 2, slug: 'thanh-pham',    title: 'Thành phẩm',      icon: FaShoePrints },
  { categoryId: 3, slug: 'de-giay',       title: 'Đế giày',         icon: FaLayerGroup },
  { categoryId: 4, slug: 'hoa-chat',      title: 'Hoá chất',        icon: FaFlask },
  { categoryId: 5, slug: 'de-sandal',     title: 'Đế sandal',       icon: FaLeaf },
  { categoryId: 6, slug: 'sticker-charm', title: 'Sticker - Charm', icon: FaStar },
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
            viewAllLink={`/san-pham?cat=${group.slug}`}
            icon={group.icon}
          />
        ))}
      </div>
    </div>
  );
}
