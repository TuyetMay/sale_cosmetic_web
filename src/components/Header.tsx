'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { totalItems } = useCart();
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e8f0fc] px-10 h-[80px] flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: '#82CAFA' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C9.2 2 7 4.2 7 7c0 1.8.9 3.4 2.3 4.4C6.8 12.5 5 14.9 5 17.7V20h14v-2.3c0-2.8-1.8-5.2-4.3-6.3C16.1 10.4 17 8.8 17 7c0-2.8-2.2-5-5-5z" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <div className="hidden sm:block">
            <p className="text-[16px] font-bold text-[#0d1f3c] leading-tight" style={{ fontFamily: 'Georgia, serif' }}>Luxé Beauty</p>
            <p className="text-[9px] text-[#9eb3c8] tracking-[2px] uppercase font-medium">Original Premium</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/products" className="text-[14px] font-semibold text-[#4a6580] hover:text-[#82CAFA] transition-colors">Sản Phẩm</Link>
        </nav>
      </div>

      {/* Search */}
      <div className="flex-1 relative max-w-[480px] mx-8 hidden lg:block">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a9ab5]" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm mỹ phẩm, thương hiệu..."
          className="w-full pl-11 pr-4 py-2.5 bg-[#f5f8ff] border-2 border-transparent rounded-full text-[14px] text-[#0d1f3c] outline-none focus:border-[#82CAFA] focus:bg-white transition-all placeholder-[#7a9ab5]"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Cart */}
        <Link href="/cart" className="relative w-10 h-10 rounded-full flex items-center justify-center bg-[#f5f8ff] hover:bg-[#82CAFA]/10 text-[#4a6580] hover:text-[#82CAFA] transition-all border border-transparent">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#e8363a] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              {totalItems}
            </span>
          )}
        </Link>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 p-1 rounded-full hover:bg-[#f5f8ff] transition-colors"
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-bold text-white bg-gradient-to-br from-[#82CAFA] to-[#6abdf8] shadow-sm">
              {user?.firstName?.[0] ?? '?' }
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-3 w-56 bg-white border border-[#e8f0fc] rounded-2xl shadow-xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-5 py-4 border-b border-[#e8f0fc] bg-[#fcfdff]">
                <p className="text-[14px] font-bold text-[#0d1f3c]">{user ? `${user.firstName} ${user.lastName}` : 'Khách hàng'}</p>
                <p className="text-[11px] text-[#9eb3c8] truncate mt-0.5">{user?.email ?? 'luxebeauty.vn'}</p>
                {user?.role === 'seller' && (
                  <Link href="/dashboard" className="block mt-2 text-[11px] font-bold text-[#82CAFA] uppercase tracking-widest hover:underline">
                    Dashboard Admin 📊
                  </Link>
                )}
              </div>
              <div className="py-2">
                {[
                  { label: 'Tài khoản của tôi', icon: '👤', href: '/profile' },
                  { label: 'Đơn hàng của tôi', icon: '📦', href: '/orders' },
                ].map((item) => (
                  <Link key={item.label} href={item.href} className="flex items-center gap-3 px-5 py-2.5 text-[13px] text-[#4a6580] hover:bg-[#f5f8ff] hover:text-[#82CAFA] transition-colors">
                    <span className="text-[16px]">{item.icon}</span> {item.label}
                  </Link>
                ))}
              </div>
              <div className="border-t border-[#e8f0fc] pt-1 pb-1 bg-[#fff8f8]/50">
                <button
                  onClick={() => { logout(); router.push('/sign-in'); }}
                  className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] text-[#e8363a] font-semibold hover:bg-[#ffeaea] transition-colors"
                >
                  <span className="text-[16px]">⎋</span> Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
