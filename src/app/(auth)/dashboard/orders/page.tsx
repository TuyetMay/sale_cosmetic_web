'use client';

import { useState } from 'react';

const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';

const MOCK_ORDERS = [
  { id: '#LB-9921', customer: 'Nguyễn Văn A', email: 'vana@gmail.com', date: '2024-03-31 22:30', total: 1250000, status: 'pending', items: 3 },
  { id: '#LB-9920', customer: 'Trần Thị B', email: 'thib@gmail.com', date: '2024-03-31 21:15', total: 840000, status: 'processing', items: 2 },
  { id: '#LB-9919', customer: 'Lê Văn C', email: 'vanc@gmail.com', date: '2024-03-31 19:45', total: 2100000, status: 'delivering', items: 5 },
  { id: '#LB-9918', customer: 'Phạm Minh D', email: 'minhd@gmail.com', date: '2024-03-31 18:00', total: 450000, status: 'completed', items: 1 },
  { id: '#LB-9917', customer: 'Hoàng Gia E', email: 'giae@gmail.com', date: '2024-03-31 16:30', total: 320000, status: 'cancelled', items: 1 },
];

const ORDER_STATUSES: Record<string, { label: string, color: string, bg: string }> = {
  'pending': { label: 'Chờ duyệt', color: '#f59e0b', bg: '#fffbeb' },
  'processing': { label: 'Đang chuẩn bị', color: '#6366f1', bg: '#f5f5ff' },
  'delivering': { label: 'Đang vận chuyển', color: '#82CAFA', bg: '#f0f7ff' },
  'completed': { label: 'Đã hoàn thành', color: '#10b981', bg: '#ecfdf5' },
  'cancelled': { label: 'Đã hủy', color: '#ef4444', bg: '#fef2f2' },
};

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-10 min-h-screen">
      <div className="flex items-center justify-between bg-white px-8 py-6 rounded-[32px] border border-[#e8f0fc] shadow-sm">
        <div>
          <h1 className="text-[28px] font-black text-[#0d1f3c]" style={{ fontFamily: 'Georgia, serif' }}>Quản lý đơn hàng</h1>
          <p className="text-[14px] text-[#7a9ab5] font-medium">Theo dõi và cập nhật trạng thái đơn hàng của khách hàng.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-[#f0f7ff] rounded-2xl px-5 py-3 flex flex-col items-center border border-[#82CAFA]/20">
            <span className="text-[11px] font-bold text-[#82CAFA] uppercase tracking-widest">Đang chờ xử lý</span>
            <span className="text-[22px] font-black text-[#0d1f3c]">12</span>
          </div>
          <div className="bg-[#ecfdf5] rounded-2xl px-5 py-3 flex flex-col items-center border border-[#10b981]/20">
            <span className="text-[11px] font-bold text-[#10b981] uppercase tracking-widest">Giao thành công</span>
            <span className="text-[22px] font-black text-[#0d1f3c]">45</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-[#e8f0fc] shadow-sm overflow-hidden p-8">
        <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {['all', 'pending', 'processing', 'delivering', 'completed', 'cancelled'].map((s) => (
            <button 
              key={s}
              onClick={() => setFilter(s)}
              className={`px-6 py-3 rounded-2xl text-[13px] font-bold transition-all whitespace-nowrap active:scale-95 ${
                filter === s 
                  ? 'bg-[#0d1f3c] text-white shadow-xl shadow-[#0d1f3c]/20' 
                  : 'bg-[#f8faff] text-[#7a9ab5] border border-transparent hover:border-[#82CAFA] hover:text-[#82CAFA]'
              }`}
            >
              {s === 'all' ? 'Tất cả đơn hàng' : ORDER_STATUSES[s]?.label ?? s}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#f5f8ff] text-[12px] text-[#9eb3c8] font-extrabold uppercase tracking-widest bg-[#fcfdff]">
                <th className="py-5 pl-6">Mã đơn hàng</th>
                <th className="py-5">Khách hàng</th>
                <th className="py-5">Ngày đặt</th>
                <th className="py-5">Trạng thái</th>
                <th className="py-5">Tổng tiền</th>
                <th className="py-5 pr-6 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ORDERS.filter(o => filter === 'all' || o.status === filter).map((order) => (
                <tr key={order.id} className="border-b border-[#fcfdff] hover:bg-[#f8faff] transition-colors rounded-2xl">
                  <td className="py-6 pl-6 text-[14px] font-black text-[#82CAFA]">{order.id}</td>
                  <td className="py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#f0f7ff] flex items-center justify-center font-bold text-[#82CAFA] text-[13px]">{order.customer[0]}</div>
                      <div>
                        <p className="text-[14px] font-black text-[#0d1f3c] leading-none mb-1">{order.customer}</p>
                        <p className="text-[11px] text-[#9eb3c8] font-medium">{order.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 text-[13px] font-bold text-[#4a6580]">{order.date}</td>
                  <td className="py-6">
                    <span className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider" 
                          style={{ 
                            color: ORDER_STATUSES[order.status]?.color ?? '#4a6580', 
                            backgroundColor: ORDER_STATUSES[order.status]?.bg ?? '#f5f8ff' 
                          }}>
                      {ORDER_STATUSES[order.status]?.label ?? 'N/A'}
                    </span>
                  </td>
                  <td className="py-6 text-[15px] font-extrabold text-[#e8363a]">{fmt(order.total)}</td>
                  <td className="py-6 pr-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <select className="bg-[#f0f7ff] text-[#82CAFA] px-3 py-1.5 rounded-xl text-[11px] font-bold outline-none border border-transparent focus:border-[#82CAFA]">
                        <option>Cập nhật trạng thái</option>
                        <option>Xác nhận đơn hàng</option>
                        <option>Bắt đầu giao</option>
                        <option>Hoàn thành</option>
                        <option>Hủy đơn</option>
                      </select>
                      <button className="w-10 h-10 rounded-xl bg-[#f8faff] text-[#4a6580] flex items-center justify-center hover:bg-[#82CAFA] hover:text-white transition-all shadow-sm active:scale-90" title="Chi tiết đơn hàng">
                         📊
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
