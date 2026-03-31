'use client';

import { useState } from 'react';

type OrderStatus = 'Cho xu ly' | 'Dang giao' | 'Da giao';

type Order = {
  MaDH: string;
  MaTK: string;
  NgayDatHang: string;
  DiaChiGiaoHang: string;
  TrangThaiDonHang: OrderStatus;
  TongTien: number;
  MaNV: string;
  SanPhamItems: { MaSP: string; SoLuong: number }[];
};

const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';

const MOCK_ORDERS: Order[] = [
  { MaDH: 'DH01', MaTK: 'UID01', NgayDatHang: '2025-03-01', DiaChiGiaoHang: 'Hà Nội',     TrangThaiDonHang: 'Da giao',  TongTien: 795000,  MaNV: 'NV02', SanPhamItems: [{ MaSP: 'SP12', SoLuong: 2 }, { MaSP: 'SP01', SoLuong: 1 }] },
  { MaDH: 'DH02', MaTK: 'UID02', NgayDatHang: '2025-03-02', DiaChiGiaoHang: 'TP HCM',     TrangThaiDonHang: 'Da giao',  TongTien: 490000,  MaNV: 'NV02', SanPhamItems: [{ MaSP: 'SP26', SoLuong: 2 }, { MaSP: 'SP14', SoLuong: 1 }, { MaSP: 'SP02', SoLuong: 1 }] },
  { MaDH: 'DH03', MaTK: 'UID03', NgayDatHang: '2025-03-03', DiaChiGiaoHang: 'Đà Nẵng',   TrangThaiDonHang: 'Dang giao', TongTien: 452000,  MaNV: 'NV02', SanPhamItems: [{ MaSP: 'SP03', SoLuong: 1 }] },
  { MaDH: 'DH04', MaTK: 'UID04', NgayDatHang: '2025-03-04', DiaChiGiaoHang: 'Cần Thơ',   TrangThaiDonHang: 'Cho xu ly', TongTien: 550000,  MaNV: 'NV02', SanPhamItems: [{ MaSP: 'SP16', SoLuong: 1 }, { MaSP: 'SP04', SoLuong: 2 }] },
  { MaDH: 'DH05', MaTK: 'UID05', NgayDatHang: '2025-03-05', DiaChiGiaoHang: 'Huế',        TrangThaiDonHang: 'Da giao',  TongTien: 309000,  MaNV: 'NV02', SanPhamItems: [{ MaSP: 'SP17', SoLuong: 2 }, { MaSP: 'SP05', SoLuong: 1 }] },
  { MaDH: 'DH06', MaTK: 'UID06', NgayDatHang: '2025-03-06', DiaChiGiaoHang: 'Hà Nội',    TrangThaiDonHang: 'Da giao',  TongTien: 1105000, MaNV: 'NV02', SanPhamItems: [{ MaSP: 'SP30', SoLuong: 1 }, { MaSP: 'SP18', SoLuong: 1 }, { MaSP: 'SP06', SoLuong: 1 }] },
  { MaDH: 'DH07', MaTK: 'UID07', NgayDatHang: '2025-03-07', DiaChiGiaoHang: 'Hải Phòng', TrangThaiDonHang: 'Dang giao', TongTien: 672000,  MaNV: 'NV02', SanPhamItems: [{ MaSP: 'SP07', SoLuong: 2 }] },
  { MaDH: 'DH08', MaTK: 'UID08', NgayDatHang: '2025-03-08', DiaChiGiaoHang: 'Nam Định',  TrangThaiDonHang: 'Da giao',  TongTien: 515000,  MaNV: 'NV02', SanPhamItems: [{ MaSP: 'SP20', SoLuong: 1 }, { MaSP: 'SP08', SoLuong: 1 }] },
  { MaDH: 'DH09', MaTK: 'UID09', NgayDatHang: '2025-03-09', DiaChiGiaoHang: 'Quảng Ninh',TrangThaiDonHang: 'Cho xu ly', TongTien: 3565000, MaNV: 'NV02', SanPhamItems: [{ MaSP: 'SP34', SoLuong: 1 }, { MaSP: 'SP21', SoLuong: 1 }, { MaSP: 'SP09', SoLuong: 1 }] },
  { MaDH: 'DH10', MaTK: 'UID10', NgayDatHang: '2025-03-10', DiaChiGiaoHang: 'Nghệ An',   TrangThaiDonHang: 'Da giao',  TongTien: 305000,  MaNV: 'NV02', SanPhamItems: [{ MaSP: 'SP10', SoLuong: 2 }] },
];

const STATUS_CONFIG: Record<OrderStatus, { label: string; dot: string; pillCls: string; textCls: string }> = {
  'Cho xu ly': { label: 'Chờ xử lý',  dot: '#f59e0b', pillCls: 'bg-amber-50 border-amber-200',   textCls: 'text-amber-600'   },
  'Dang giao': { label: 'Đang giao',  dot: '#6366f1', pillCls: 'bg-indigo-50 border-indigo-200', textCls: 'text-indigo-600'  },
  'Da giao':   { label: 'Đã giao',    dot: '#10b981', pillCls: 'bg-emerald-50 border-emerald-200',textCls: 'text-emerald-600' },
};


export default function AdminOrdersPage() {
  const [filter, setFilter] = useState<'all' | OrderStatus>('all');
  const [orders] = useState<Order[]>(MOCK_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'table' | 'form'>('table');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Order>({
    MaDH: '',
    MaTK: '',
    NgayDatHang: '',
    DiaChiGiaoHang: '',
    TrangThaiDonHang: 'Cho xu ly',
    TongTien: 0,
    MaNV: 'NV03',
    SanPhamItems: [],
  });

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      MaDH: '',
      MaTK: '',
      NgayDatHang: '',
      DiaChiGiaoHang: '',
      TrangThaiDonHang: 'Cho xu ly',
      TongTien: 0,
      MaNV: 'NV03',
      SanPhamItems: [],
    });
    setView('form');
  };

  const filtered = orders.filter(o => (filter === 'all' || o.TrangThaiDonHang === filter)
    && (searchQuery ? o.MaDH.includes(searchQuery) || o.MaTK.includes(searchQuery) : true));

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-8 font-sans space-y-7">

      <div className="flex justify-between items-center mb-6">
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a9ab5]" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm đơn hàng..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="w-80 pl-11 pr-4 py-2.5 bg-white border border-[#d6eaff] rounded-xl text-sm outline-none focus:border-[#82CAFA] transition-colors shadow-sm" 
                  />
                </div>
                
              </div>

      {/* ── TABLE CARD ── */}
      <div className="bg-white rounded-[28px] border border-[#e4ecf7] shadow-sm overflow-hidden">

        
      
        {view === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-bold text-[#4a6580] uppercase tracking-[0.12em] bg-[#fafcff] border-b border-[#eef2fa]">
                  <th className="py-4 pl-7 pr-3 w-[90px]">Mã ĐH</th>
                <th className="py-4 px-3 w-[95px]">Mã TK</th>
                <th className="py-4 px-3 min-w-[170px]">Sản phẩm</th>
                <th className="py-4 px-3 w-[110px]">Ngày đặt</th>
                <th className="py-4 px-3 min-w-[120px]">Địa chỉ</th>
                <th className="py-4 px-3 w-[130px] text-right">Tổng tiền</th>
                <th className="py-4 px-3 w-[130px]">Trạng thái</th>
                <th className="py-4 px-3 pr-7 w-[105px] text-right">Nhân viên</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => {
                const s = STATUS_CONFIG[order.TrangThaiDonHang];
                return (
                  <tr key={order.MaDH} className="border-b border-[#f3f7fc] hover:bg-[#f8fbff] transition-colors">

                    <td className="py-4 pl-7 pr-3">
                      <span className="text-[13px] font-black text-[#82CAFA] tracking-wide">{order.MaDH}</span>
                    </td>

                    <td className="py-4 px-3">
                      <span className="text-[12px] font-bold text-[#6b87a8] bg-[#f0f7ff] border border-[#daeeff] px-2.5 py-1 rounded-lg">
                        {order.MaTK}
                      </span>
                    </td>

                    <td className="py-4 px-3">
                      <div className="flex flex-wrap gap-1">
                        {order.SanPhamItems.map((item, idx) => (
                          <span key={idx} className="text-[11px] font-bold text-[#4a6580] bg-[#f0f7ff] border border-[#d6eaff] px-2 py-0.5 rounded-md whitespace-nowrap">
                            {item.MaSP}<span className="text-[#82CAFA] ml-1">×{item.SoLuong}</span>
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-3">
                      <span className="text-[12px] font-semibold text-[#5a7898]">{order.NgayDatHang}</span>
                    </td>

                    <td className="py-4 px-3">
                      <span className="text-[12px] font-medium text-[#7a9ab5]">{order.DiaChiGiaoHang}</span>
                    </td>

                    <td className="py-4 px-3 text-right">
                      <span className="text-[14px] font-extrabold text-[#e8363a]">{fmt(order.TongTien)}</span>
                    </td>

                    <td className="py-4 px-3">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${s.pillCls} ${s.textCls}`}>
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.dot }} />
                        {s.label}
                      </span>
                    </td>

                    <td className="py-4 px-3 pr-7 text-right">
                      <span className="text-[11px] font-bold text-[#9eb3c8] bg-[#f5f8ff] border border-[#e8f0fc] px-2.5 py-1 rounded-lg">
                        {order.MaNV}
                      </span>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-[#8fa8c0] font-medium text-sm">Không có đơn hàng nào trong trạng thái này.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="p-16 text-center text-[#4a6580]">
          <p className="text-lg font-bold">Chức năng form đang phát triển...</p>
          <p className="text-sm text-[#7a9ab5] mt-2">Dữ liệu mẫu hiện tại: {formData.MaDH || 'none'}</p>
        </div>
      )}

      {/* Footer */}
        <div className="px-7 py-3.5 border-t border-[#eef2fa] flex items-center justify-between">
          <p className="text-[12px] text-[#9eb3c8] font-medium">
            Hiển thị <span className="font-bold text-[#4a6580]">{filtered.length}</span> / {orders.length} đơn hàng
          </p>
          <p className="text-[11px] text-[#b8cfe0] font-medium">Kỳ: 01/03/2025 – 10/03/2025</p>
        </div>
      </div>
    </div>
  );
}