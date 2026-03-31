'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/data/mockProducts'; 
import type { Product } from '@/data/mockProducts'; 
import { useCart } from '@/contexts/CartContext';

const CATEGORIES = [
  { id: 'c1', name: 'Chăm sóc da', icon: '🧴' },
  { id: 'c2', name: 'Trang điểm', icon: '💄' },
  { id: 'c3', name: 'Chăm sóc tóc', icon: '💇‍♀️' },
  { id: 'c4', name: 'Nước hoa', icon: '🌸' },
  { id: 'c5', name: 'Cơ thể', icon: '🛁' },
  { id: 'c6', name: 'Thực phẩm', icon: '💊' },
];

const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#82CAFA]/10 transition-all duration-300 border border-[#e8f0fc] flex flex-col h-full relative">
      <Link
        href={`/products/${product.MaSP}`}
        className="aspect-square w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#f8fbff] to-[#f0f7ff] relative overflow-hidden"
      >
        <span className="text-6xl group-hover:scale-110 transition-transform duration-500 opacity-80">📦</span>
        <div className="absolute inset-0 bg-[#82CAFA]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#4a6580] text-[10px] font-bold px-2.5 py-1 rounded-lg border border-[#e8f0fc] shadow-sm uppercase tracking-wider">
          {product.MaSP}
        </span>
      </Link>

      {/* Quick Add Button */}
      <button 
        onClick={(e) => { e.preventDefault(); addToCart(product); }}
        className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8f0fc] flex items-center justify-center text-[#82CAFA] opacity-0 group-hover:opacity-100 transition-all hover:bg-[#82CAFA] hover:text-white shadow-sm active:scale-90"
        title="Thêm nhanh vào giỏ"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14"/>
        </svg>
      </button>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/products/${product.MaSP}`}>
          <h3 className="text-[14px] font-bold text-[#0d1f3c] leading-tight mb-2 group-hover:text-[#82CAFA] transition-colors line-clamp-2" title={product.TenSP}>
            {product.TenSP}
          </h3>
        </Link>
        
        <p className="text-[12px] text-[#7a9ab5] line-clamp-2 mb-4 flex-1 leading-relaxed">
          {product.MoTaSP || 'Khám phá bí quyết vẻ đẹp rạng ngời với sản phẩm cao cấp từ Luxé Beauty...'}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-[#f5f8ff] mt-auto">
          <span className="text-[#e8363a] text-[17px] font-extrabold">{fmt(product.GiaBanHienTai)}</span>
          <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-[#f0f7ff] text-[#82CAFA]">
            Còn {product.SoLuongConLai}
          </span>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  const [activeCategory, setActiveCategory] = useState('c1');
  
  return (
    <aside className="w-[260px] flex-shrink-0 sticky top-24 h-fit hidden lg:flex flex-col gap-6">
      <div className="bg-white rounded-2xl p-6 border border-[#e8f0fc] shadow-sm">
        <h3 className="text-[15px] font-bold text-[#0d1f3c] mb-5 pb-3 border-b border-[#f5f8ff]">Danh mục</h3>
        <nav className="flex flex-col gap-1.5">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold transition-all text-left w-full group ${
                activeCategory === cat.id 
                  ? 'bg-[#82CAFA] text-white shadow-lg shadow-[#82CAFA]/20' 
                  : 'text-[#4a6580] hover:bg-[#f5f8ff]'
              }`}
            >
              <span className={`text-lg transition-transform group-hover:scale-110`}>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-gradient-to-br from-[#82CAFA] to-[#6abdf8] rounded-2xl p-6 text-white shadow-lg shadow-[#82CAFA]/20">
        <h4 className="font-bold text-[16px] mb-2" style={{ fontFamily: 'Georgia, serif' }}>Ưu đãi độc quyền</h4>
        <p className="text-[12px] text-white/80 leading-relaxed mb-4">Nhận ngay voucher 50k khi đăng ký thành viên mới hôm nay!</p>
        <button className="w-full bg-white text-[#82CAFA] py-2.5 rounded-xl text-[13px] font-bold hover:bg-[#f0f7ff] transition-colors shadow-sm">
          Đăng ký ngay
        </button>
      </div>
    </aside>
  );
}

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState('newest');

  return (
    <div className="bg-[#f8faff] min-h-screen py-10">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Page Title & Breadcrumbs */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-[12px] text-[#9eb3c8] font-medium mb-3">
            <Link href="/" className="hover:text-[#82CAFA]">Trang chủ</Link>
            <span>/</span>
            <span className="text-[#4a6580]">Sản phẩm</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-[32px] font-bold text-[#0d1f3c] mb-2" style={{ fontFamily: 'Georgia, serif' }}>Tất cả sản phẩm</h1>
              <p className="text-[14px] text-[#7a9ab5]">Khám phá hơn 2,400+ mỹ phẩm chính hãng chất lượng cao</p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-semibold text-[#4a6580]">Sắp xếp:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#e8f0fc] rounded-xl px-4 py-2.5 text-[13px] font-bold text-[#0d1f3c] outline-none focus:border-[#82CAFA] transition-all cursor-pointer shadow-sm"
              >
                <option value="newest">Mới nhất</option>
                <option value="price-low">Giá: Thấp đến Cao</option>
                <option value="price-high">Giá: Cao đến Thấp</option>
                <option value="popular">Phổ biến</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-10">
          <Sidebar />

          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {MOCK_PRODUCTS.map((p) => (
                <ProductCard key={p.MaSP} product={p} />
              ))}
            </div>

            {/* Pagination Mock */}
            <div className="mt-16 flex justify-center items-center gap-2">
              {[1, 2, 3, '...', 12].map((page, i) => (
                <button 
                  key={i}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-[14px] font-bold transition-all ${
                    page === 1 
                      ? 'bg-[#82CAFA] text-white shadow-lg shadow-[#82CAFA]/20' 
                      : 'bg-white text-[#4a6580] border border-[#e8f0fc] hover:border-[#82CAFA] hover:text-[#82CAFA]'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="px-5 h-10 rounded-xl bg-white text-[#4a6580] border border-[#e8f0fc] text-[14px] font-bold hover:border-[#82CAFA] hover:text-[#82CAFA] transition-all ml-2">
                Tiếp theo →
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}