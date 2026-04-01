'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ReactNode } from 'react';

const MENU_ITEMS = [
  { label: ' Quản lý sản phẩm', href: '/dashboard/products', icon: '📦' },
  { label: 'Quản lý xuất kho', href: '/dashboard/orders', icon: '📝' },
  { label: 'Quản lý nhập kho', href: '/dashboard/users', icon: '👥' },
  { label: 'Báo cáo', href: '/dashboard/reports', icon: '📈' },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  // Simple protection: only sellers can access dashboard
  if (user && user.role !== 'seller') {
    router.push('/');
    return null;
  }

  return (
    <div className="bg-[#f8faff]">
      {/* Admin Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-[240px] bg-[#0d1f3c] text-white flex flex-col shadow-2xl shadow-[#0d1f3c]/40 z-50">
        <div className="p-8 pb-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#82CAFA] flex items-center justify-center text-2xl">✨</div>
            <div>
              <p className="text-[18px] font-black tracking-tight leading-none" style={{ fontFamily: 'Georgia, serif' }}>Luxé Beauty</p>
              <p className="text-[10px] text-[#82CAFA] font-bold uppercase tracking-[2px] mt-1.5">Admin Portal</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-[14px] ${
                  isActive 
                    ? 'bg-[#82CAFA] text-white shadow-lg shadow-[#82CAFA]/20' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6">
          <div className="bg-white/5 rounded-[24px] p-5 mb-6 border border-white/10">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#82CAFA] to-[#6abdf8] flex items-center justify-center font-bold text-white shadow-sm border border-white/20">
                {user?.firstName?.[0] ?? '?' }
              </div>
              <div>
                <p className="text-[13px] font-bold text-white line-clamp-1">{user?.firstName} {user?.lastName}</p>
                <p className="text-[11px] text-white/40 uppercase tracking-wider font-medium">{user?.role}</p>
              </div>
            </div>
        </div>
        </div>

      </aside>

      {/* Main Content */}
      <main className="ml-[240px] flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-[96px] bg-white border-b border-[#e8f0fc] px-10 flex items-center justify-between flex-shrink-0 z-40">
          <div>
            <h2 className="text-[20px] font-black text-[#0d1f3c]" style={{ fontFamily: 'Georgia, serif' }}>
              {MENU_ITEMS.find(m => m.href === pathname)?.label ?? 'Dashboard'}
            </h2>
            <div className="flex items-center gap-2 text-[12px] text-[#9eb3c8] font-bold uppercase tracking-wider mt-1">
              <span>Admin</span>
              <span>/</span>
              <span className="text-[#82CAFA]">{MENU_ITEMS.find(m => m.href === pathname)?.label ?? 'Overview'}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative w-11 h-11 rounded-2xl bg-[#f8faff] border border-[#e8f0fc] flex items-center justify-center text-[#4a6580] hover:text-[#82CAFA] hover:bg-white transition-all">
              <span className="text-xl">🔔</span>
              <span className="absolute top-3 right-3 w-2 h-2 bg-[#e8363a] rounded-full border-2 border-white" />
            </button>
            <div className="w-px h-8 bg-[#e8f0fc]" />
            <div className="flex items-center gap-3">
              <div className="ml-auto flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-[#1a2f50] text-white flex items-center justify-center font-bold text-sm">NV</div>
             <span className="text-sm font-semibold text-[#4a6580]">NV03 - Admin</span>
          </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          {children}
        </div>
      </main>
    </div>
  );
}
