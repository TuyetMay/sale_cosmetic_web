'use client';

import Link from 'next/link';

const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';

const MOCK_ORDERS = [
  { id: 'LB-QX12P8', date: '2024-03-20', total: 1250000, status: 'delivering', itemsCount: 3 },
  { id: 'LB-Y93K2L', date: '2024-03-12', total: 840000, status: 'completed', itemsCount: 2 },
  { id: 'LB-Z77N5X', date: '2024-02-28', total: 2100000, status: 'completed', itemsCount: 5 },
  { id: 'LB-M42R6W', date: '2024-02-15', total: 450000, status: 'cancelled', itemsCount: 1 },
];

const STATUS_MAP: Record<string, { label: string, color: string, bg: string }> = {
  'delivering': { label: 'Đang giao hàng', color: '#82CAFA', bg: '#f0f7ff' },
  'completed': { label: 'Đã hoàn thành', color: '#10b981', bg: '#ecfdf5' },
  'cancelled': { label: 'Đã hủy', color: '#ef4444', bg: '#fef2f2' },
  'pending': { label: 'Đang xử lý', color: '#f59e0b', bg: '#fffbeb' },
};

export default function OrdersPage() {
  return (
    <div className="bg-[#f8faff] min-h-screen py-16">
      <div className="max-w-full mx-auto px-10">
        <h1 className="text-4xl font-extrabold text-[#0d1f3c] mb-12" style={{ fontFamily: 'Georgia, serif' }}>Lịch sử đơn hàng</h1>

        <div className="space-y-6">
          {MOCK_ORDERS.map((order) => (
            <div key={order.id} className="bg-white rounded-[28px] p-6 border border-[#e8f0fc] shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-[#f5f8ff] mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#f0f7ff] flex items-center justify-center text-3xl">📦</div>
                  <div>
                    <p className="text-[16px] font-bold text-[#0d1f3c] mb-1">Mã đơn hàng: <span className="text-[#82CAFA]">{order.id}</span></p>
                    <p className="text-[13px] text-[#9eb3c8] font-medium leading-none">Đặt ngày: {order.date}</p>
                  </div>
                </div>
                
                <span className="px-4 py-2 rounded-xl text-[12px] font-bold uppercase tracking-wider" 
                      style={{ 
                        color: STATUS_MAP[order.status]?.color ?? '#4a6580', 
                        backgroundColor: STATUS_MAP[order.status]?.bg ?? '#f5f8ff' 
                      }}>
                  {STATUS_MAP[order.status]?.label ?? 'N/A'}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex items-baseline gap-4">
                  <p className="text-[14px] text-[#7a9ab5] font-medium">Tổng giá trị ({order.itemsCount} sản phẩm):</p>
                  <p className="text-2xl font-black text-[#e8363a]">{fmt(order.total)}</p>
                </div>

                <div className="flex gap-4 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none border border-[#e8f0fc] text-[#4a6580] px-6 py-2.5 rounded-xl text-[13px] font-bold hover:bg-[#f5f8ff] transition-all">Chi tiết</button>
                  <button className="flex-1 sm:flex-none bg-[#82CAFA] text-white px-6 py-2.5 rounded-xl text-[13px] font-bold hover:bg-[#6abdf8] transition-all shadow-lg shadow-[#82CAFA]/20 active:scale-95">Mua lại</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {MOCK_ORDERS.length === 0 && (
          <div className="bg-white rounded-[32px] p-20 text-center border border-[#e8f0fc]">
            <p className="text-[#9eb3c8] text-xl font-medium">Bạn chưa có đơn hàng nào.</p>
            <Link href="/products" className="text-[#82CAFA] font-bold mt-4 inline-block underline">Mua sắm ngay</Link>
          </div>
        )}
      </div>
    </div>
  );
}
