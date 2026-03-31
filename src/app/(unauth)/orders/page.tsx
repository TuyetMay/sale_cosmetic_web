'use client';

import { useState } from 'react';
import Link from 'next/link';

const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';

// 1. Mở rộng Mock Data để chứa chi tiết sản phẩm bên trong đơn hàng (Giống Shopee)
const MOCK_ORDERS = [
  {
    id: 'LB-QX12P8',
    date: '2024-03-20 14:30',
    status: 'delivering',
    total: 785000,
    items: [
      { id: 'SP03', name: 'Nước tẩy trang Bioderma 500ml', variant: 'Nắp hồng - Da nhạy cảm', price: 420000, qty: 1, image: 'https://placehold.co/150x150/f8fbff/82cafa?text=Bioderma' },
      { id: 'SP08', name: 'Serum Niacinamide 10% The Ordinary', variant: '30ml', price: 310000, qty: 1, image: 'https://placehold.co/150x150/f8fbff/82cafa?text=Ordinary' },
    ],
    shippingFee: 55000,
  },
  {
    id: 'LB-Z77N5X',
    date: '2024-02-28 09:15',
    status: 'completed',
    total: 2100000,
    items: [
      { id: 'SP06', name: 'Kem dưỡng da Laneige Water Bank', variant: '50ml - Cấp ẩm sâu', price: 750000, qty: 2, image: 'https://placehold.co/150x150/f8fbff/82cafa?text=Laneige' },
      { id: 'SP09', name: 'Kem chống nắng Anessa SPF50+', variant: '60ml', price: 520000, qty: 1, image: 'https://placehold.co/150x150/f8fbff/82cafa?text=Anessa' },
      { id: 'SP05', name: 'Kem dưỡng ẩm Nivea Soft', variant: '200ml', price: 80000, qty: 1, image: 'https://placehold.co/150x150/f8fbff/82cafa?text=Nivea' },
    ],
    shippingFee: 0, // Freeship
  },
  {
    id: 'LB-M42R6W',
    date: '2024-02-15 19:00',
    status: 'cancelled',
    total: 185000,
    items: [
      { id: 'SP01', name: 'Sữa rửa mặt Cetaphil 125ml', variant: 'Mọi loại da', price: 185000, qty: 1, image: 'https://placehold.co/150x150/f8fbff/82cafa?text=Cetaphil' },
    ],
    shippingFee: 30000,
  },
  {
    id: 'LB-Y93K2L',
    date: '2024-04-01 08:20',
    status: 'pending',
    total: 320000,
    items: [
      { id: 'SP07', name: 'Serum Vitamin C The Ordinary', variant: '30ml', price: 320000, qty: 1, image: 'https://placehold.co/150x150/f8fbff/82cafa?text=Vit+C' },
    ],
    shippingFee: 0,
  },
];

const TABS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'pending', label: 'Chờ xác nhận' },
  { id: 'processing', label: 'Chờ lấy hàng' },
  { id: 'delivering', label: 'Đang giao' },
  { id: 'completed', label: 'Hoàn thành' },
  { id: 'cancelled', label: 'Đã hủy' },
];

const STATUS_MAP: Record<string, { label: string, color: string }> = {
  'pending': { label: 'CHỜ XÁC NHẬN', color: '#f59e0b' },
  'processing': { label: 'CHỜ LẤY HÀNG', color: '#6366f1' },
  'delivering': { label: 'ĐANG GIAO HÀNG', color: '#82CAFA' },
  'completed': { label: 'ĐÃ GIAO THÀNH CÔNG', color: '#10b981' },
  'cancelled': { label: 'ĐÃ HỦY', color: '#ef4444' },
};

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = MOCK_ORDERS.filter(
    (order) => activeTab === 'all' || order.status === activeTab
  );

  return (
    <div className="bg-[#f5f8ff] min-h-screen py-10 font-[DM_Sans,sans-serif]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0d1f3c] mb-2" style={{ fontFamily: 'Georgia, serif' }}>Đơn hàng của tôi</h1>
          <p className="text-sm text-[#7a9ab5]">Quản lý và theo dõi tiến độ các đơn hàng bạn đã đặt.</p>
        </div>

        {/* ─── TABS (GIỐNG SHOPEE) ─── */}
        <div className="bg-white rounded-t-2xl shadow-sm border-b border-[#e8f0fc] flex overflow-x-auto scrollbar-hide sticky top-0 z-10">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[140px] py-4 text-sm font-semibold transition-colors relative whitespace-nowrap ${
                activeTab === tab.id ? 'text-[#82CAFA]' : 'text-[#4a6580] hover:text-[#82CAFA]'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#82CAFA] rounded-t-md" />
              )}
            </button>
          ))}
        </div>

        {/* ─── DANH SÁCH ĐƠN HÀNG ─── */}
        <div className="space-y-4 mt-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#e8f0fc]">
                
                {/* Order Header */}
                <div className="px-6 py-4 border-b border-[#f5f8ff] flex justify-between items-center bg-[#fafcff]">
                  <div className="flex items-center gap-3">
                    <span className="bg-[#e8363a] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">Mall</span>
                    <span className="font-bold text-[#0d1f3c] text-sm">Luxé Beauty Official</span>
                    <span className="text-[#e8f0fc]">|</span>
                    <span className="text-xs text-[#7a9ab5] font-medium">{order.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold" style={{ color: STATUS_MAP[order.status]?.color }}>
                      {STATUS_MAP[order.status]?.label}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 py-4 border-b border-dashed border-[#e8f0fc] last:border-0">
                      <div className="w-20 h-20 flex-shrink-0 border border-[#e8f0fc] rounded-lg overflow-hidden bg-[#f8fbff]">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-[15px] font-semibold text-[#0d1f3c] line-clamp-1">{item.name}</h3>
                          <p className="text-xs text-[#7a9ab5] mt-1">Phân loại hàng: {item.variant}</p>
                        </div>
                        <p className="text-sm font-bold text-[#0d1f3c]">x{item.qty}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-[15px] font-semibold text-[#0d1f3c]">{fmt(item.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer / Total */}
                <div className="px-6 py-5 bg-[#fafcff] border-t border-[#f5f8ff]">
                  <div className="flex flex-col sm:flex-row justify-end items-end sm:items-center gap-6">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#4a6580] font-medium">Thành tiền:</span>
                      <span className="text-2xl font-extrabold text-[#e8363a]">{fmt(order.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Order Actions */}
                <div className="px-6 py-4 flex justify-end gap-3 border-t border-[#f5f8ff]">
                  {order.status === 'completed' && (
                    <button className="px-6 py-2 border border-[#82CAFA] text-[#82CAFA] rounded-md text-sm font-bold hover:bg-[#f0f7ff] transition-colors">
                      Đánh giá sản phẩm
                    </button>
                  )}
                  {order.status === 'pending' && (
                    <button className="px-6 py-2 border border-[#7a9ab5] text-[#4a6580] rounded-md text-sm font-bold hover:bg-[#f5f8ff] transition-colors">
                      Hủy đơn hàng
                    </button>
                  )}
                  <button className="px-8 py-2 bg-[#82CAFA] text-white rounded-md text-sm font-bold hover:bg-[#6abdf8] shadow-md shadow-[#82CAFA]/20 transition-all">
                    Mua lại
                  </button>
                </div>

              </div>
            ))
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl p-20 text-center border border-[#e8f0fc] flex flex-col items-center">
              <div className="w-24 h-24 bg-[#f0f7ff] rounded-full flex items-center justify-center text-4xl mb-4">🛒</div>
              <p className="text-[#4a6580] text-lg font-semibold mb-2">Chưa có đơn hàng</p>
              <p className="text-[#7a9ab5] text-sm mb-6">Bạn chưa có đơn hàng nào trong mục này.</p>
              <Link href="/" className="px-8 py-3 bg-[#0d1f3c] text-white font-bold rounded-lg hover:bg-[#1a2f50] transition-all">
                Tiếp tục mua sắm
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}