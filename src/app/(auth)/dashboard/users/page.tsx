'use client';

import { useState } from 'react';

const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';

const MOCK_IMPORTS = [
  { MaDonNhap: 'DN01', NgayNhapHang: '2025-02-01', TongTienNhap: 6000000,  MaNV: 'NV01', MaSP: 'SP01', SoLuongSanPham: 50, GiaNhap: 120000 },
  { MaDonNhap: 'DN02', NgayNhapHang: '2025-02-02', TongTienNhap: 2800000,  MaNV: 'NV01', MaSP: 'SP02', SoLuongSanPham: 40, GiaNhap: 70000  },
  { MaDonNhap: 'DN03', NgayNhapHang: '2025-02-03', TongTienNhap: 9000000,  MaNV: 'NV01', MaSP: 'SP03', SoLuongSanPham: 30, GiaNhap: 300000 },
  { MaDonNhap: 'DN04', NgayNhapHang: '2025-02-04', TongTienNhap: 6600000,  MaNV: 'NV01', MaSP: 'SP04', SoLuongSanPham: 60, GiaNhap: 110000 },
  { MaDonNhap: 'DN05', NgayNhapHang: '2025-02-05', TongTienNhap: 2700000,  MaNV: 'NV01', MaSP: 'SP05', SoLuongSanPham: 45, GiaNhap: 60000  },
  { MaDonNhap: 'DN06', NgayNhapHang: '2025-02-06', TongTienNhap: 13750000, MaNV: 'NV01', MaSP: 'SP06', SoLuongSanPham: 25, GiaNhap: 550000 },
  { MaDonNhap: 'DN07', NgayNhapHang: '2025-02-07', TongTienNhap: 8400000,  MaNV: 'NV01', MaSP: 'SP07', SoLuongSanPham: 35, GiaNhap: 240000 },
  { MaDonNhap: 'DN08', NgayNhapHang: '2025-02-08', TongTienNhap: 9200000,  MaNV: 'NV01', MaSP: 'SP08', SoLuongSanPham: 40, GiaNhap: 230000 },
  { MaDonNhap: 'DN09', NgayNhapHang: '2025-02-09', TongTienNhap: 11400000, MaNV: 'NV01', MaSP: 'SP09', SoLuongSanPham: 30, GiaNhap: 380000 },
  { MaDonNhap: 'DN10', NgayNhapHang: '2025-02-10', TongTienNhap: 4750000,  MaNV: 'NV01', MaSP: 'SP10', SoLuongSanPham: 50, GiaNhap: 95000  },
];

export default function AdminImportsPage() {
  const [imports, setImports] = useState(MOCK_IMPORTS);
  const [searchQuery, setSearchQuery] = useState('');
  
  // States cho Form/Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    MaDonNhap: '', NgayNhapHang: '', MaSP: '', SoLuongSanPham: 0, GiaNhap: 0, MaNV: 'NV01'
  });

  const filtered = imports.filter(i =>
    i.MaDonNhap.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.MaSP.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // Mở Form
  const handleOpenForm = () => {
    setFormData({ MaDonNhap: '', NgayNhapHang: '', MaSP: '', SoLuongSanPham: 0, GiaNhap: 0, MaNV: 'NV01' });
    setIsModalOpen(true);
  };

  // Lưu Đơn Nhập
  const handleSave = () => {
    if (!formData.MaDonNhap || !formData.MaSP) {
      alert('Vui lòng nhập Mã đơn nhập và Mã Sản Phẩm!');
      return;
    }
    if (imports.some(i => i.MaDonNhap === formData.MaDonNhap)) {
      alert('Mã đơn nhập này đã tồn tại!');
      return;
    }

    const newImport = {
      ...formData,
      TongTienNhap: formData.SoLuongSanPham * formData.GiaNhap
    };

    setImports([newImport, ...imports]);
    setIsModalOpen(false);
    alert('Thêm đơn nhập thành công!');
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-8 font-sans space-y-7 relative">

      {/* ── HEADER ── */}
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Stats có thể thêm ở đây sau này */}
        </div>
      </div>

      {/* ── TABLE CARD ── */}
      <div className="bg-white rounded-[28px] border border-[#e4ecf7] shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-[#eef2fa] flex items-center justify-between gap-4">
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9eb3c8]" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tìm theo mã đơn hoặc mã SP..."
              className="w-72 pl-10 pr-4 py-2.5 bg-[#f8faff] border border-[#e4ecf7] rounded-xl text-sm outline-none focus:border-[#82CAFA] focus:bg-white transition-colors text-[#0d1f3c] placeholder-[#b0c4d8]"
            />
          </div>
          <button 
            onClick={handleOpenForm}
            className="bg-[#82CAFA] hover:bg-[#5db8f5] text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all shadow-md shadow-[#82CAFA]/20 flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
            Tạo đơn nhập
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] text-[#9eb3c8] font-extrabold uppercase tracking-[0.12em] bg-[#fafcff] border-b border-[#eef2fa]">
                <th className="py-4 pl-7 pr-3 w-[120px]">Mã đơn</th>
                <th className="py-4 px-3 w-[100px]">Mã SP</th>
                <th className="py-4 px-3 w-[110px]">Ngày nhập</th>
                <th className="py-4 px-3 w-[100px] text-right">Số lượng</th>
                <th className="py-4 px-3 w-[130px] text-right">Giá nhập</th>
                <th className="py-4 px-3 w-[150px] text-right">Tổng tiền</th>
                <th className="py-4 px-3 pr-7 w-[110px] text-right">Nhân viên</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((item) => (
                <tr key={item.MaDonNhap} className="border-b border-[#f3f7fc] hover:bg-[#f8fbff] transition-colors">
                  <td className="py-4 pl-7 pr-3">
                    <span className="text-[13px] font-black text-[#82CAFA] tracking-wide">{item.MaDonNhap}</span>
                  </td>
                  <td className="py-4 px-3">
                    <span className="text-[12px] font-bold text-[#6b87a8] bg-[#f0f7ff] border border-[#daeeff] px-2.5 py-1 rounded-lg">
                      {item.MaSP}
                    </span>
                  </td>
                  <td className="py-4 px-3">
                    <span className="text-[12px] font-semibold text-[#5a7898]">{item.NgayNhapHang}</span>
                  </td>
                  <td className="py-4 px-3 text-right">
                    <span className="text-[13px] font-bold text-[#0d1f3c]">{item.SoLuongSanPham}</span>
                    <span className="text-[11px] text-[#9eb3c8] ml-1"></span>
                  </td>
                  <td className="py-4 px-3 text-right">
                    <span className="text-[12px] font-semibold text-[#5a7898]">{fmt(item.GiaNhap)}</span>
                  </td>
                  <td className="py-4 px-3 text-right">
                    <span className="text-[14px] font-extrabold text-[#e8363a]">{fmt(item.TongTienNhap)}</span>
                  </td>
                  <td className="py-4 px-3 pr-7 text-right">
                    <span className="text-[11px] font-bold text-[#9eb3c8] bg-[#f5f8ff] border border-[#e8f0fc] px-2.5 py-1 rounded-lg">
                      {item.MaNV}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-[#8fa8c0] font-medium text-sm">
                    Không tìm thấy đơn nhập nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-7 py-3.5 border-t border-[#eef2fa] flex items-center justify-between">
          <p className="text-[12px] text-[#9eb3c8] font-medium">
            Hiển thị <span className="font-bold text-[#4a6580]">{filtered.length}</span> / {imports.length} đơn nhập
          </p>
          <p className="text-[11px] text-[#b8cfe0] font-medium">Kỳ: 01/02/2025 – 10/02/2025</p>
        </div>
      </div>

      {/* ── FORM MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0d1f3c]/50 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
          <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl p-10 overflow-hidden relative animate-in fade-in slide-in-from-bottom-8 duration-300">
            
            <h2 className="text-2xl font-black text-[#0d1f3c] mb-2" style={{ fontFamily: 'Georgia, serif' }}>Tạo Đơn Nhập Kho</h2>
            <p className="text-[13px] text-[#8fa8c0] mb-8 font-medium">Tổng tiền sẽ được hệ thống tính tự động dựa trên Số lượng và Giá nhập.</p>
            
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 mb-8">
              
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-[#5a7898] uppercase tracking-widest ml-1">Mã đơn nhập</label>
                <input 
                  value={formData.MaDonNhap}
                  onChange={e => setFormData({ ...formData, MaDonNhap: e.target.value })}
                  placeholder="VD: DN11" 
                  className="w-full bg-[#f8faff] border border-[#e4ecf7] rounded-xl px-4 py-3 outline-none focus:border-[#82CAFA] transition-all text-[14px] text-[#0d1f3c] font-bold" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-[#5a7898] uppercase tracking-widest ml-1">Ngày nhập hàng</label>
                <input 
                  type="date"
                  value={formData.NgayNhapHang}
                  onChange={e => setFormData({ ...formData, NgayNhapHang: e.target.value })}
                  className="w-full bg-[#f8faff] border border-[#e4ecf7] rounded-xl px-4 py-3 outline-none focus:border-[#82CAFA] transition-all text-[14px] text-[#0d1f3c]" 
                />
              </div>

              <div className="space-y-1.5 col-span-2">
                <label className="text-[11px] font-black text-[#5a7898] uppercase tracking-widest ml-1">Mã sản phẩm</label>
                <input 
                  value={formData.MaSP}
                  onChange={e => setFormData({ ...formData, MaSP: e.target.value })}
                  placeholder="VD: SP01" 
                  className="w-full bg-[#f8faff] border border-[#e4ecf7] rounded-xl px-4 py-3 outline-none focus:border-[#82CAFA] transition-all text-[14px] text-[#0d1f3c] font-bold" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-[#5a7898] uppercase tracking-widest ml-1">Số lượng nhập</label>
                <input 
                  type="number"
                  value={formData.SoLuongSanPham}
                  onChange={e => setFormData({ ...formData, SoLuongSanPham: Number(e.target.value) })}
                  placeholder="0" 
                  className="w-full bg-[#f8faff] border border-[#e4ecf7] rounded-xl px-4 py-3 outline-none focus:border-[#82CAFA] transition-all text-[14px] text-[#0d1f3c]" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-[#5a7898] uppercase tracking-widest ml-1">Giá nhập (VNĐ)</label>
                <input 
                  type="number"
                  value={formData.GiaNhap}
                  onChange={e => setFormData({ ...formData, GiaNhap: Number(e.target.value) })}
                  placeholder="0đ" 
                  className="w-full bg-[#f8faff] border border-[#e4ecf7] rounded-xl px-4 py-3 outline-none focus:border-[#82CAFA] transition-all text-[14px] font-bold text-[#e8363a]" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-[#5a7898] uppercase tracking-widest ml-1">Nhân viên phụ trách</label>
                <input 
                  value={formData.MaNV}
                  onChange={e => setFormData({ ...formData, MaNV: e.target.value })}
                  placeholder="VD: NV01" 
                  className="w-full bg-[#f8faff] border border-[#e4ecf7] rounded-xl px-4 py-3 outline-none focus:border-[#82CAFA] transition-all text-[14px] text-[#0d1f3c]" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-[#e8363a] uppercase tracking-widest ml-1">Tổng tiền </label>
                <div className="w-full bg-[#fffafa] border border-[#ffe0e0] rounded-xl px-4 py-3 text-[14px] font-black text-[#e8363a]">
                  {fmt(formData.SoLuongSanPham * formData.GiaNhap)}
                </div>
              </div>

            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-[#f4f7fb] text-[#5a7898] py-4 rounded-xl font-bold text-[14px] hover:bg-[#e4ecf7] transition-all active:scale-95 border border-[#e4ecf7]"
              >
                Hủy bỏ
              </button>
              <button 
                onClick={handleSave}
                className="flex-1 bg-[#82CAFA] text-white py-4 rounded-xl font-bold text-[14px] hover:bg-[#5db8f5] transition-all shadow-lg shadow-[#82CAFA]/20 active:scale-95"
              >
                Lưu đơn nhập
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}