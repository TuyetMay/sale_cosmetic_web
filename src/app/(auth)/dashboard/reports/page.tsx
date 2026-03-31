'use client';

import { useState } from 'react';

const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';

const BEST_SELLERS = [
  { name: 'Serum Dưỡng Sáng Luxé', sold: 450, revenue: 112500000, growth: '+15.2%', icon: '🧴' },
  { name: 'Kem Chống Nắng Broad Spectrum', sold: 342, revenue: 51300000, growth: '+22.5%', icon: '☀️' },
  { name: 'Nước Hoa Hồng Hydrating', sold: 289, revenue: 72250000, growth: '+8.4%', icon: '💧' },
  { name: 'Sữa Rửa Mặt Gentle Cleanser', sold: 245, revenue: 36750000, growth: '-2.1%', icon: '🧼' },
];

export default function AdminReportsPage() {
  const [reportType, setReportType] = useState('month');

  return (
    <div className="space-y-10 min-h-screen">
      <div className="flex items-center justify-between bg-white px-8 py-6 rounded-[32px] border border-[#e8f0fc] shadow-sm">
        <div>
          <h1 className="text-[28px] font-black text-[#0d1f3c]" style={{ fontFamily: 'Georgia, serif' }}>Báo cáo & Thống kê</h1>
          <p className="text-[14px] text-[#7a9ab5] font-medium">Theo dõi doanh thu, sản phẩm bán chạy và hiệu suất kinh doanh.</p>
        </div>
        <div className="flex items-center bg-[#f8faff] rounded-2xl p-1.5 border border-[#e8f0fc]">
          {['day', 'week', 'month', 'year'].map((type) => (
            <button 
              key={type}
              onClick={() => setReportType(type)}
              className={`px-6 py-3 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all ${
                reportType === type ? 'bg-[#82CAFA] text-white shadow-lg shadow-[#82CAFA]/20' : 'text-[#7a9ab5] hover:text-[#0d1f3c]'
              }`}
            >
              {type === 'day' ? 'Ngày' : type === 'week' ? 'Tuần' : type === 'month' ? 'Tháng' : 'Năm'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Summary */}
        <div className="lg:col-span-2 bg-white rounded-[40px] p-10 border border-[#e8f0fc] shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-[22px] font-bold text-[#0d1f3c]" style={{ fontFamily: 'Georgia, serif' }}>Doanh thu theo thời gian</h3>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#82CAFA]" />
                <span className="text-[12px] font-bold text-[#4a6580]">Năm nay</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#e8f0fc]" />
                <span className="text-[12px] font-bold text-[#9eb3c8]">Năm trước</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] flex items-end gap-6 relative">
            <div className="absolute inset-0 grid grid-rows-4 pointer-events-none">
              {[1, 2, 3, 4].map(i => <div key={i} className="border-t border-[#f5f8ff]" />)}
            </div>
            {[45, 65, 55, 85, 95, 75, 88, 62, 78, 92, 100, 80].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 relative z-10">
                <div 
                  className="w-full bg-gradient-to-t from-[#82CAFA] to-[#6abdf8] rounded-t-xl transition-all duration-700 hover:scale-105 cursor-pointer group"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0d1f3c] text-white px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {fmt(h * 1000000)}
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#9eb3c8] tracking-widest">{i + 1}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-[12px] text-[#9eb3c8] font-bold mt-8 uppercase tracking-[3px]">Tháng trong năm</p>
        </div>

        {/* Quick Report Cards */}
        <div className="space-y-8">
          <div className="bg-[#0d1f3c] rounded-[40px] p-8 text-white shadow-2xl">
            <p className="text-[14px] text-white/50 font-bold uppercase tracking-widest mb-2">Tổng doanh thu</p>
            <h3 className="text-4xl font-black mb-4">2.45B₫</h3>
            <div className="flex items-center gap-2 text-[#10b981] font-bold text-[13px]">
              <span className="text-lg">↗</span> +24.5% so với cùng kỳ
            </div>
          </div>
          <div className="bg-white rounded-[40px] p-8 border border-[#e8f0fc] shadow-sm">
            <p className="text-[14px] text-[#9eb3c8] font-bold uppercase tracking-widest mb-2">Lợi nhuận thuần</p>
            <h3 className="text-4xl font-black text-[#0d1f3c] mb-4">840M₫</h3>
            <div className="flex items-center gap-2 text-[#10b981] font-bold text-[13px]">
              <span className="text-lg">↗</span> +12.1% tăng trưởng
            </div>
          </div>
          <div className="bg-white rounded-[40px] p-8 border border-[#e8f0fc] shadow-sm">
            <p className="text-[14px] text-[#9eb3c8] font-bold uppercase tracking-widest mb-2">Đơn hàng đã hủy</p>
            <h3 className="text-4xl font-black text-[#0d1f3c] mb-4">12</h3>
            <div className="flex items-center gap-2 text-[#ef4444] font-bold text-[13px]">
              <span className="text-lg">↘</span> -5.2% cải thiện
            </div>
          </div>
        </div>
      </div>

      {/* Best Sellers */}
      <div className="bg-white rounded-[40px] border border-[#e8f0fc] shadow-sm p-10">
        <h3 className="text-[22px] font-bold text-[#0d1f3c] mb-10" style={{ fontFamily: 'Georgia, serif' }}>Sản phẩm bán chạy nhất</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BEST_SELLERS.map((p, i) => (
            <div key={i} className="bg-[#f8faff] rounded-[32px] p-8 border border-transparent hover:border-[#82CAFA]/20 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-4xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {p.icon}
              </div>
              <h4 className="text-[15px] font-black text-[#0d1f3c] mb-2 leading-snug line-clamp-2">{p.name}</h4>
              <div className="space-y-4 pt-4 border-t border-[#e8f0fc]">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-bold text-[#9eb3c8] uppercase">Đã bán</span>
                  <span className="text-[14px] font-black text-[#0d1f3c]">{p.sold} sản phẩm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-bold text-[#9eb3c8] uppercase">Doanh thu</span>
                  <span className="text-[14px] font-black text-[#e8363a]">{fmt(p.revenue)}</span>
                </div>
                <div className={`text-[12px] font-bold ${p.growth.startsWith('+') ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                   {p.growth} tăng trưởng
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
