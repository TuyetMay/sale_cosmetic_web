'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_PRODUCTS } from '@/data/mockProducts'; 
import type { Product } from '@/data/mockProducts'; 

/* ─── Mock Data cho UI (Không có trong DB) ───────────────────────────────── */
const CATEGORIES = [
  { id: 'c1', name: 'Chăm sóc da', icon: '🧴' },
  { id: 'c2', name: 'Trang điểm', icon: '💄' },
  { id: 'c3', name: 'Chăm sóc tóc', icon: '💇‍♀️' },
  { id: 'c4', name: 'Nước hoa', icon: '🌸' },
  { id: 'c5', name: 'Cơ thể', icon: '🛁' },
  { id: 'c6', name: 'Thực phẩm', icon: '💊' },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */
const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';

/* ─── Product Card ───────────────────────────────────────────────────────── */
function ProductCard({ product, size = 'md' }: { product: Product; size?: 'sm' | 'md' | 'lg' }) {
  const [hovered, setHovered] = useState(false);

  const cardW = size === 'lg' ? 'w-[220px]' : size === 'sm' ? 'w-[160px]' : 'w-[190px]';
  const imgH  = size === 'lg' ? 'h-[220px]' : size === 'sm' ? 'h-[160px]' : 'h-[190px]';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`${cardW} flex-shrink-0 bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-200 border border-[#e8f0fc] flex flex-col`}
      style={{ boxShadow: hovered ? '0 4px 20px rgba(130,202,250,0.18)' : '0 1px 4px rgba(0,0,0,0.05)', transform: hovered ? 'translateY(-2px)' : 'none' }}
    >
      <div className={`${imgH} w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#f0f7ff] to-[#e8f0fc] relative`}>
        <span className="text-5xl opacity-80 mb-2">📦</span>
        <span className="text-[10px] text-[#9eb3c8] font-medium tracking-wider uppercase">No Image</span>
        
        <span className="absolute top-2 left-2 bg-white text-[#4a6580] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#dde9f7] shadow-sm">
          {product.MaSP}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-[13px] text-[#0d1f3c] leading-snug line-clamp-2 mb-1.5 font-bold" title={product.TenSP}>
          {product.TenSP}
        </p>
        
        <p className="text-[11px] text-[#7a9ab5] line-clamp-2 mb-3 flex-1" title={product.MoTaSP}>
          {product.MoTaSP || 'Chưa có mô tả'}
        </p>

        <div className="flex items-end justify-between mt-auto">
          <span className="text-[#e8363a] text-[15px] font-bold">{fmt(product.GiaBanHienTai)}</span>
          <span className="text-[11px] font-medium px-2 py-1 rounded bg-[#f5f9ff] text-[#4a6580]">
            Kho: {product.SoLuongConLai}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Section Header ─────────────────────────────────────────────────────── */
function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-[20px] font-semibold text-[#0d1f3c]" style={{ fontFamily: 'Georgia, serif' }}>{title}</h2>
      {action && (
        <button className="text-[13px] text-[#82CAFA] font-medium hover:text-[#5db8f5] transition-colors">
          {action} →
        </button>
      )}
    </div>
  );
}

/* ─── Sidebar ────────────────────────────────────────────────────────────── */
function Sidebar() {
  const navLinks = [
    { label: 'Trang chủ', icon: '⌂', href: '/' },
    { label: 'Giỏ hàng', icon: '📦', href: '/orders' },
    { label: 'Thanh toán', icon: '💳', href: '/checkout' },
    { label: 'Theo dõi đơn hàng', icon: '💳', href: '/checkout' }
  ];

  return (
    <aside className="w-[220px] flex-shrink-0 flex flex-col gap-4">
      <div className="bg-white rounded-2xl p-4 border border-[#e8f0fc] shadow-sm">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#82CAFA' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C9.2 2 7 4.2 7 7c0 1.8.9 3.4 2.3 4.4C6.8 12.5 5 14.9 5 17.7V20h14v-2.3c0-2.8-1.8-5.2-4.3-6.3C16.1 10.4 17 8.8 17 7c0-2.8-2.2-5-5-5z" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <div>
            <p className="text-[14px] font-semibold text-[#0d1f3c]" style={{ fontFamily: 'Georgia, serif' }}>Luxé Beauty</p>
            <p className="text-[10px] text-[#9eb3c8] tracking-widest uppercase">Mỹ phẩm chính hãng</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {navLinks.map((l) => (
            <button key={l.label}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] text-[#4a6580] font-medium hover:bg-[#f0f7ff] hover:text-[#82CAFA] transition-all text-left w-full">
              <span style={{ fontSize: 15 }}>{l.icon}</span>
              {l.label}
            </button>
          ))}
        </nav>
      </div>

      
    </aside>
  );
}

/* ─── Top Header ─────────────────────────────────────────────────────────── */
function TopHeader({ cartCount }: { cartCount: number }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#27A4F2] px-6 h-[70px] flex items-center gap-6 shadow-md">
      <div className="lg:hidden flex items-center gap-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#82CAFA' }}>
          <span className="text-white text-xs font-bold">L</span>
        </div>
      </div>

      <div className="flex-1 relative max-w-[600px]">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a9ab5]" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm theo Tên sản phẩm hoặc Mã SP..."
          className="w-full pl-11 pr-4 py-2.5 bg-[#1a2f50] border-2 border-transparent rounded-xl text-[14px] text-white outline-none focus:border-[#82CAFA] focus:bg-[#20385e] transition-all placeholder-[#7a9ab5]"
        />
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button className="relative w-10 h-10 rounded-xl flex items-center justify-center bg-[#1a2f50] border border-transparent hover:border-[#82CAFA] text-white transition-colors">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#e8363a] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#0d1f3c] shadow-sm">
              {cartCount}
            </span>
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-[#1a2f50] transition-colors border border-transparent"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-[#0d1f3c] bg-white">
              {user?.firstName?.[0] ?? 'K'}
            </div>
            <span className="text-[14px] font-semibold text-white hidden sm:block">
              {user?.firstName ?? 'Khách hàng'}
            </span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#e8f0fc] rounded-xl shadow-lg overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-[#e8f0fc]">
                <p className="text-[13px] font-semibold text-[#0d1f3c]">{user?.firstName} {user?.lastName}</p>
                <p className="text-[11px] text-[#9eb3c8] truncate">{user?.email}</p>
              </div>
              {[
                { label: 'Tài khoản của tôi', icon: '👤' },
                { label: 'Giỏ hàng', icon: '📦' },
              ].map((item) => (
                <button key={item.label} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#4a6580] hover:bg-[#f5f9ff] transition-colors">
                  <span style={{ fontSize: 13 }}>{item.icon}</span> {item.label}
                </button>
              ))}
              <div className="border-t border-[#e8f0fc]">
                <button
                  onClick={() => { logout(); router.push('/sign-in'); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#e8363a] hover:bg-[#fff5f5] transition-colors"
                >
                  <span style={{ fontSize: 13 }}>⎋</span> Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const [cartCount] = useState(2);

  return (
    <div className="min-h-screen bg-[#f5f8ff] font-[DM_Sans,sans-serif]">
      <TopHeader cartCount={cartCount} />

      <div className="flex gap-6 p-6 max-w-[14000px] mx-auto">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          
          {/* ─── SECTION: DANH MỤC SẢN PHẨM ─── */}
          <section className="bg-white rounded-2xl p-6 border border-[#e8f0fc] shadow-sm mb-6">
            <SectionHeader title="Danh Mục Sản Phẩm" />
            
            {/* Scroll ngang trên thiết bị nhỏ */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button 
                  key={cat.id} 
                  className="flex flex-col items-center gap-3 min-w-[90px] p-3 rounded-xl hover:bg-[#f0f7ff] transition-colors border border-transparent hover:border-[#d6eaff] group"
                >
                  <div className="w-16 h-16 bg-[#f5f9ff] rounded-full flex items-center justify-center text-3xl shadow-sm border border-[#e8f0fc] group-hover:scale-105 transition-transform duration-200">
                    {cat.icon}
                  </div>
                  <span className="text-[13px] font-medium text-[#4a6580] text-center group-hover:text-[#82CAFA] transition-colors">
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* ─── SECTION: DANH SÁCH SẢN PHẨM ─── */}
          <section className="bg-white rounded-2xl p-6 border border-[#e8f0fc] shadow-sm">
            <SectionHeader title="Danh Sách Sản Phẩm" action="Xem tất cả" />
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-6 gap-3">
              {MOCK_PRODUCTS.map((p) => (
                <div key={p.MaSP}>
                  <ProductCard product={p} size="lg" />
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}