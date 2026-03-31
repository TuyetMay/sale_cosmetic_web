'use client';

import { useAuth } from '@/contexts/AuthContext';
import { MOCK_PRODUCTS } from '@/data/mockProducts';

const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';

const STATS = [
  { label: 'Doanh thu tháng', value: '45,210,000₫', trend: '+12.5%', icon: '💰', color: '#10b981' },
  { label: 'Đơn hàng mới', value: '128', trend: '+8.2%', icon: '📦', color: '#82CAFA' },
  { label: 'Khách hàng mới', value: '342', trend: '+24.1%', icon: '👥', color: '#6366f1' },
  { label: 'Tỷ lệ chuyển đổi', value: '3.2%', trend: '+1.5%', icon: '📈', color: '#f59e0b' },
];

export default function DashboardOverview() {
  const { user } = useAuth();

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-[#0d1f3c] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Chào buổi sáng, {user?.firstName}! 👋
          </h1>
          <p className="text-[14px] text-[#7a9ab5] font-medium leading-relaxed">Dưới đây là tóm tắt hoạt động của cửa hàng hôm nay.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-white border-2 border-[#e8f0fc] px-6 py-3 rounded-2xl font-bold text-[13px] text-[#4a6580] hover:border-[#82CAFA] hover:text-[#82CAFA] transition-all flex items-center gap-2">
            📅 Khoảng thời gian: <span className="text-[#0d1f3c]">Tháng này</span>
          </button>
          <button className="bg-[#82CAFA] text-white px-8 py-3 rounded-2xl font-bold text-[13px] hover:bg-[#6abdf8] transition-all shadow-xl shadow-[#82CAFA]/20 flex items-center gap-2 active:scale-95">
            📥 Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-white rounded-[32px] p-8 border border-[#e8f0fc] shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-6">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-transparent group-hover:scale-110 transition-transform" 
                style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <span className="text-[12px] font-bold text-[#10b981] bg-[#ecfdf5] px-3 py-1.5 rounded-full border border-[#10b981]/10">
                {stat.trend}
              </span>
            </div>
            <p className="text-[13px] text-[#9eb3c8] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-[#0d1f3c] leading-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Mock */}
        <div className="lg:col-span-2 bg-white rounded-[40px] p-10 border border-[#e8f0fc] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[22px] font-bold text-[#0d1f3c]" style={{ fontFamily: 'Georgia, serif' }}>Đơn hàng gần đây</h3>
            <button className="text-[13px] font-bold text-[#82CAFA] hover:underline">Xem tất cả</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#f5f8ff] text-[12px] text-[#9eb3c8] font-extrabold uppercase tracking-widest">
                  <th className="pb-4 pl-4">Khách hàng</th>
                  <th className="pb-4">Mã đơn</th>
                  <th className="pb-4">Trạng thái</th>
                  <th className="pb-4">Giá trị</th>
                  <th className="pb-4 pr-4">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Nguyễn Văn A', id: '#LB-9921', status: 'pending', total: 1250000, date: '10 phút trước' },
                  { name: 'Trần Thị B', id: '#LB-9920', status: 'delivering', total: 840000, date: '1 giờ trước' },
                  { name: 'Lê Văn C', id: '#LB-9919', status: 'completed', total: 2100000, date: '3 giờ trước' },
                ].map((order, i) => (
                  <tr key={i} className="group hover:bg-[#f8faff] transition-colors rounded-2xl">
                    <td className="py-6 pl-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#f0f7ff] flex items-center justify-center font-bold text-[#82CAFA]">{order.name[0]}</div>
                        <div>
                          <p className="text-[14px] font-bold text-[#0d1f3c]">{order.name}</p>
                          <p className="text-[11px] text-[#9eb3c8] font-medium">{order.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 text-[14px] font-bold text-[#4a6580]">{order.id}</td>
                    <td className="py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        order.status === 'pending' ? 'bg-[#fffbeb] text-[#f59e0b]' : 
                        order.status === 'delivering' ? 'bg-[#f0f7ff] text-[#82CAFA]' : 'bg-[#ecfdf5] text-[#10b981]'
                      }`}>
                        {order.status === 'pending' ? 'Chờ duyệt' : order.status === 'delivering' ? 'Đang giao' : 'Hoàn thành'}
                      </span>
                    </td>
                    <td className="py-6 text-[15px] font-extrabold text-[#e8363a]">{fmt(order.total)}</td>
                    <td className="py-6 pr-4">
                      <button className="text-[13px] font-bold text-[#82CAFA] underline decoration-2 underline-offset-4">Chi tiết</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Inventory Alert */}
        <div className="bg-[#0d1f3c] rounded-[40px] p-10 text-white shadow-2xl shadow-[#0d1f3c]/20 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-[32px] bg-white/10 flex items-center justify-center text-4xl mb-8 animate-bounce-slow">📉</div>
          <h3 className="text-[24px] font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>Sản phẩm sắp hết</h3>
          <p className="text-white/60 text-[13px] font-medium leading-relaxed mb-10">Cảnh báo: Hiện có 12 sản phẩm đang ở mức tồn kho thấp hơn 10 đơn vị.</p>
          <div className="w-full space-y-4 mb-10">
            {MOCK_PRODUCTS.slice(0, 3).map((p, i) => (
              <div key={i} className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-2xl">
                <span className="text-[13px] font-bold line-clamp-1 flex-1 text-left">{p.TenSP}</span>
                <span className="text-[12px] font-black text-[#e8363a] bg-white px-2 py-1 rounded-lg ml-3">Hết hàng</span>
              </div>
            ))}
          </div>
          <button className="w-full bg-[#82CAFA] text-[#0d1f3c] py-4 rounded-2xl font-bold text-[14px] hover:bg-white transition-all active:scale-95 flex items-center justify-center gap-2">
            Quản lý tồn kho
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 12h14m-7-7 7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
