'use client';

import { useState } from 'react';

const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';

// 1. Mock Data: Doanh thu theo tháng
const MONTHLY_REVENUE = [
  { month: 'Tháng 1/2024', orders: 342, revenue: 855000000 },
  { month: 'Tháng 2/2024', orders: 289, revenue: 620000000 },
  { month: 'Tháng 3/2024', orders: 415, revenue: 1150000000 },
  { month: 'Tháng 4/2024', orders: 390, revenue: 980000000 },
  { month: 'Tháng 5/2024', orders: 512, revenue: 1420000000 },
];

// 2. Mock Data: Sản phẩm bán chạy
const BEST_SELLERS = [
  { id: 'SP05', name: 'Kem duong am Nivea Soft', sold: 16, icon: '🧴' },
  { id: 'SP01', name: 'Sua rua mat Cetaphil 125ml', sold: 15, icon: '🧼' },
  { id: 'SP02', name: 'Sua rua mat Senka Perfect Whip', sold: 14, icon: '🫧' },
  { id: 'SP10', name: 'Kem chong nang Sunplay SPF50+', sold: 13, icon: '☀️' },
  { id: 'SP03', name: 'Nuoc tay trang Bioderma 500ml', sold: 12, icon: '💧' },
];

// 3. Mock Data: Sản phẩm sắp hết hàng
const LOW_STOCK = [
  { id: 'SP15', name: 'Kem nen LOréal True Match', stock: 2, icon: '🎨' },
  { id: 'SP20', name: 'Kem lot Maybelline Baby Skin', stock: 5, icon: '✨' },
  { id: 'SP01', name: 'Sua rua mat Cetaphil 125ml', stock: 6, icon: '🧼' },
  { id: 'SP09', name: 'Kem chong nang Anessa SPF50+', stock: 8, icon: '☀️' },
  { id: 'SP24', name: 'Dau goi Head & Shoulders 650g', stock: 9, icon: '🧴' },
];

export default function AdminReportsPage() {
  const [reportType, setReportType] = useState('month');

  return (
    <div className="space-y-6 min-h-screen bg-[#f4f7fb] p-6 lg:p-8 font-sans text-[#0d1f3c]">
      
      {/* ── HEADER ── */}
      <div className="flex items-center justify-between bg-white px-6 py-5 border border-[#e4ecf7] rounded-sm shadow-sm">
        <div>
          <h1 className="text-xl font-semibold text-[#0d1f3c]">Báo cáo & Thống kê</h1>
          <p className="text-sm text-[#5a7898] mt-1">Theo dõi doanh thu, sản phẩm bán chạy và hiệu suất kinh doanh.</p>
        </div>
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ── BẢNG DOANH THU THEO THÁNG ── */}
        <div className="lg:col-span-2 bg-white border border-[#e4ecf7] rounded-sm shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e4ecf7]">
            <h3 className="text-base font-semibold text-[#0d1f3c]">Doanh thu theo tháng</h3>
            
          </div>
          
          <div className="overflow-x-auto p-4">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#e4ecf7] bg-[#f8faff] text-[#5a7898] font-semibold">
                  <th className="py-3 px-4 uppercase tracking-wider text-xs">Kỳ báo cáo</th>
                  <th className="py-3 px-4 text-right uppercase tracking-wider text-xs">Số đơn hàng</th>
                  <th className="py-3 px-4 text-right uppercase tracking-wider text-xs">Tổng Doanh thu</th>
                </tr>
              </thead>
              <tbody>
                {MONTHLY_REVENUE.map((row, index) => (
                  <tr key={index} className="border-b border-[#f0f4f8] hover:bg-[#fcfcfd] transition-colors">
                    <td className="py-3 px-4 font-medium text-[#0d1f3c]">{row.month}</td>
                    <td className="py-3 px-4 text-right text-[#4a6580]">{row.orders} đơn</td>
                    <td className="py-3 px-4 text-right font-semibold text-[#1a73e8]">{fmt(row.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── THẺ TỔNG QUAN NHANH ── */}
        <div className="space-y-6">
          <div className="bg-[#0d1f3c] border border-[#0d1f3c] rounded-sm p-6 text-white shadow-sm flex flex-col justify-center h-[160px]">
            <p className="text-sm text-[#82CAFA] font-medium uppercase tracking-wider mb-2">Tổng doanh thu YTD</p>
            <h3 className="text-3xl font-semibold tracking-tight">5.02B ₫</h3>
          </div>
          
          <div className="bg-white border border-[#e4ecf7] rounded-sm p-6 shadow-sm flex flex-col justify-center h-[160px]">
            <p className="text-sm text-[#5a7898] font-medium uppercase tracking-wider mb-2">Lợi nhuận thuần</p>
            <h3 className="text-3xl font-semibold text-[#0d1f3c] tracking-tight">1.25B ₫</h3>
          </div>
        </div>
      </div>

      {/* ── TOP SẢN PHẨM BÁN CHẠY ── */}
      <div className="bg-white border border-[#e4ecf7] rounded-sm shadow-sm">
        <div className="px-6 py-4 border-b border-[#e4ecf7]">
          <h3 className="text-base font-semibold text-[#0d1f3c]">Top 5 Sản phẩm bán chạy nhất</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {BEST_SELLERS.map((p, i) => (
              <div key={i} className="bg-[#f8faff] border border-[#e4ecf7] rounded-sm p-4 hover:border-[#1a73e8] transition-colors flex flex-col h-full">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 bg-white border border-[#e4ecf7] rounded-sm flex items-center justify-center text-xl shadow-sm">
                    {p.icon}
                  </div>
                  <span className="text-xs font-semibold text-[#1a73e8] bg-[#e8f0fc] px-2 py-0.5 rounded-sm">{p.id}</span>
                </div>
                <h4 className="text-sm font-semibold text-[#0d1f3c] mb-3 line-clamp-2 flex-1">{p.name}</h4>
                <div className="pt-3 border-t border-[#e4ecf7] flex justify-between items-center">
                  <span className="text-xs font-medium text-[#5a7898]">Lượng bán</span>
                  <span className="text-sm font-semibold text-[#0d1f3c]">{p.sold}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SẢN PHẨM SẮP HẾT HÀNG ── */}
      <div className="bg-white border border-[#e4ecf7] rounded-sm shadow-sm">
        <div className="px-6 py-4 border-b border-[#e4ecf7] flex items-center gap-2">
          <h3 className="text-base font-semibold text-[#0d1f3c]">Sản phẩm cần nhập kho (Tồn kho thấp)</h3>
          <span className="w-2.5 h-2.5 rounded-full bg-[#e8363a] animate-pulse"></span>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {LOW_STOCK.map((p, i) => (
              <div key={i} className="bg-[#fffafa] border border-[#ffe0e0] rounded-sm p-4 hover:border-[#e8363a] transition-colors flex flex-col h-full">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 bg-white border border-[#ffe0e0] rounded-sm flex items-center justify-center text-xl shadow-sm">
                    {p.icon}
                  </div>
                  <span className="text-xs font-semibold text-[#e8363a] bg-[#fff0f0] px-2 py-0.5 rounded-sm">{p.id}</span>
                </div>
                <h4 className="text-sm font-semibold text-[#0d1f3c] mb-3 line-clamp-2 flex-1">{p.name}</h4>
                <div className="pt-3 border-t border-[#ffe0e0] flex justify-between items-center">
                  <span className="text-xs font-medium text-[#e8363a]">Tồn kho</span>
                  <span className="text-sm font-bold text-[#e8363a]">{p.stock}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}