'use client';

import { useState } from 'react';

/* ─── 1. TYPES & MOCK DATA (Từ SQL INSERT) ───────────────────────────────── */
type Product = {
  MaSP: string;
  TenSP: string;
  MoTaSP: string;
  GiaBanHienTai: number;
  SoLuongConLai: number;
  MaNV: string;
};

// 10 Sản phẩm được lấy chính xác từ câu lệnh SQL của bạn
const MOCK_PRODUCTS: Product[] = [
  { MaSP: 'SP01', TenSP: 'Sua rua mat Cetaphil 125ml', MoTaSP: 'Lam sach da nhay cam', GiaBanHienTai: 185000, SoLuongConLai: 6, MaNV: 'NV03' },
  { MaSP: 'SP02', TenSP: 'Sua rua mat Senka Perfect Whip', MoTaSP: 'Lam sach sau', GiaBanHienTai: 95000, SoLuongConLai: 107, MaNV: 'NV03' },
  { MaSP: 'SP03', TenSP: 'Nuoc tay trang Bioderma 500ml', MoTaSP: 'Danh cho da nhay cam', GiaBanHienTai: 420000, SoLuongConLai: 69, MaNV: 'NV03' },
  { MaSP: 'SP04', TenSP: 'Nuoc tay trang Garnier 400ml', MoTaSP: 'Lam sach trang diem', GiaBanHienTai: 165000, SoLuongConLai: 84, MaNV: 'NV03' },
  { MaSP: 'SP05', TenSP: 'Kem duong am Nivea Soft', MoTaSP: 'Duong am da mat', GiaBanHienTai: 89000, SoLuongConLai: 135, MaNV: 'NV03' },
  { MaSP: 'SP06', TenSP: 'Kem duong da Laneige Water Bank', MoTaSP: 'Cap am sau', GiaBanHienTai: 750000, SoLuongConLai: 44, MaNV: 'NV03' },
  { MaSP: 'SP07', TenSP: 'Serum Vitamin C The Ordinary', MoTaSP: 'Sang da', GiaBanHienTai: 320000, SoLuongConLai: 63, MaNV: 'NV03' },
  { MaSP: 'SP08', TenSP: 'Serum Niacinamide 10% The Ordinary', MoTaSP: 'Kiem dau', GiaBanHienTai: 310000, SoLuongConLai: 57, MaNV: 'NV03' },
  { MaSP: 'SP09', TenSP: 'Kem chong nang Anessa SPF50+', MoTaSP: 'Bao ve da', GiaBanHienTai: 520000, SoLuongConLai: 8, MaNV: 'NV03' },
  { MaSP: 'SP10', TenSP: 'Kem chong nang Sunplay SPF50+', MoTaSP: 'Chong nang hang ngay', GiaBanHienTai: 135000, SoLuongConLai: 99, MaNV: 'NV03' },
];

const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';

/* ─── 2. MAIN COMPONENT ─────────────────────────────────────────────────── */
export default function AdminProductsPage() {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  
  // States cho Form Thêm/Sửa
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Product>({
    MaSP: '', TenSP: '', MoTaSP: '', GiaBanHienTai: 0, SoLuongConLai: 0, MaNV: 'NV03'
  });

  /* ─── HANDLERS ─── */
  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ MaSP: '', TenSP: '', MoTaSP: '', GiaBanHienTai: 0, SoLuongConLai: 0, MaNV: 'NV03' });
    setView('form');
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.MaSP);
    setFormData(product);
    setView('form');
  };

  const handleDelete = (MaSP: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm ${MaSP}?`)) {
      setProducts(products.filter(p => p.MaSP !== MaSP));
    }
  };

  const handleSave = () => {
    if (!formData.MaSP || !formData.TenSP) {
      alert('Vui lòng nhập Mã và Tên sản phẩm!');
      return;
    }

    if (editingId) {
      // Cập nhật
      setProducts(products.map(p => p.MaSP === editingId ? formData : p));
    } else {
      // Thêm mới
      if (products.some(p => p.MaSP === formData.MaSP)) {
        alert('Mã sản phẩm đã tồn tại!');
        return;
      }
      setProducts([formData, ...products]); // Đưa SP mới lên đầu
    }
    setView('list');
    alert('Đã lưu thay đổi thành công!');
  };

  const filteredProducts = products.filter(p => 
    p.TenSP.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.MaSP.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="min-h-screen flex bg-[#f5f8ff] font-[DM_Sans,sans-serif]">

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        
       

        {/* Workspace */}
        <div className="flex-1 p-8 overflow-y-auto">
          
          {view === 'list' ? (
            /* ─── DANH SÁCH SẢN PHẨM ─── */
            <div className="animate-fade-in-up">
              
              <div className="flex justify-between items-center mb-6">
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a9ab5]" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm sản phẩm..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="w-80 pl-11 pr-4 py-2.5 bg-white border border-[#d6eaff] rounded-xl text-sm outline-none focus:border-[#82CAFA] transition-colors shadow-sm" 
                  />
                </div>
                <button 
                  onClick={handleAddNew} 
                  className="bg-[#82CAFA] hover:bg-[#5db8f5] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md shadow-[#82CAFA]/20 flex items-center gap-2"
                >
                  <span className="text-lg leading-none">+</span> Thêm Sản Phẩm
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-[#e8f0fc] overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-[#f0f7ff] text-[#4a6580] text-[13px] uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4 font-semibold w-24">Mã SP</th>
                      <th className="px-6 py-4 font-semibold min-w-[200px]">Tên sản phẩm</th>
                      <th className="px-6 py-4 font-semibold min-w-[150px]">Mô tả</th>
                      <th className="px-6 py-4 font-semibold">Giá bán</th>
                      <th className="px-6 py-4 font-semibold">Tồn kho</th>
                      <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e8f0fc] text-sm text-[#0d1f3c]">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map(p => (
                        <tr key={p.MaSP} className="hover:bg-[#f9fcff] transition-colors">
                          <td className="px-6 py-4 font-bold text-[#82CAFA]">{p.MaSP}</td>
                          <td className="px-6 py-4 font-bold">{p.TenSP}</td>
                          <td className="px-6 py-4 text-[#7a9ab5] truncate max-w-[200px]" title={p.MoTaSP}>{p.MoTaSP}</td>
                          <td className="px-6 py-4 text-[#e8363a] font-bold">{fmt(p.GiaBanHienTai)}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-md font-bold text-xs ${p.SoLuongConLai > 10 ? 'bg-[#ecfdf5] text-[#10b981]' : 'bg-[#fff5f5] text-[#e8363a]'}`}>
                              {p.SoLuongConLai}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-3">
                            <button onClick={() => handleEdit(p)} className="text-[#4a6580] hover:text-[#82CAFA] font-medium bg-[#f0f7ff] px-3 py-1.5 rounded-lg transition-colors">Sửa</button>
                            <button onClick={() => handleDelete(p.MaSP)} className="text-[#e8363a] hover:text-white font-medium bg-[#fff5f5] hover:bg-[#e8363a] px-3 py-1.5 rounded-lg transition-colors">Xóa</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-[#7a9ab5]">Không tìm thấy sản phẩm nào!</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* ─── FORM THÊM / SỬA ─── */
            <div className="bg-white rounded-2xl border border-[#e8f0fc] p-8 shadow-sm max-w-3xl animate-fade-in-up mx-auto mt-4">
              <div className="flex justify-between items-center border-b border-[#e8f0fc] pb-4 mb-6">
                <h2 className="text-xl font-bold text-[#0d1f3c]">
                  {editingId ? 'Cập nhật Sản phẩm' : 'Thêm Sản phẩm mới'}
                </h2>
                <button onClick={() => setView('list')} className="text-[#7a9ab5] hover:text-[#0d1f3c] font-medium text-sm">
                  ← Quay lại
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-[#4a6580] mb-2">Tên Sản Phẩm</label>
                  <input 
                    value={formData.TenSP} 
                    onChange={(e) => setFormData({...formData, TenSP: e.target.value})}
                    className="w-full px-4 py-3 bg-[#f5f9ff] border border-[#d6eaff] rounded-xl text-sm outline-none focus:border-[#82CAFA] text-[#0d1f3c]" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#4a6580] mb-2">Mã Sản Phẩm</label>
                  <input 
                    value={formData.MaSP} 
                    disabled={!!editingId}
                    onChange={(e) => setFormData({...formData, MaSP: e.target.value})}
                    className="w-full px-4 py-3 bg-[#f5f9ff] border border-[#d6eaff] rounded-xl text-sm outline-none focus:border-[#82CAFA] text-[#0d1f3c] disabled:opacity-60" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#4a6580] mb-2">Mã Nhân Viên</label>
                  <input 
                    value={formData.MaNV} 
                    onChange={(e) => setFormData({...formData, MaNV: e.target.value})}
                    className="w-full px-4 py-3 bg-[#f5f9ff] border border-[#d6eaff] rounded-xl text-sm outline-none focus:border-[#82CAFA] text-[#0d1f3c]" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#4a6580] mb-2">Giá Bán Hiện Tại (VNĐ)</label>
                  <input 
                    type="number" 
                    value={formData.GiaBanHienTai} 
                    onChange={(e) => setFormData({...formData, GiaBanHienTai: Number(e.target.value)})}
                    className="w-full px-4 py-3 bg-[#f5f9ff] border border-[#d6eaff] rounded-xl text-sm outline-none focus:border-[#82CAFA] font-bold text-[#e8363a]" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#4a6580] mb-2">Số lượng tồn kho</label>
                  <input 
                    type="number" 
                    value={formData.SoLuongConLai} 
                    onChange={(e) => setFormData({...formData, SoLuongConLai: Number(e.target.value)})}
                    className="w-full px-4 py-3 bg-[#f5f9ff] border border-[#d6eaff] rounded-xl text-sm outline-none focus:border-[#82CAFA] text-[#0d1f3c]" 
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-bold text-[#4a6580] mb-2">Mô tả sản phẩm</label>
                  <textarea 
                    value={formData.MoTaSP} 
                    onChange={(e) => setFormData({...formData, MoTaSP: e.target.value})}
                    className="w-full px-4 py-3 bg-[#f5f9ff] border border-[#d6eaff] rounded-xl text-sm outline-none focus:border-[#82CAFA] text-[#0d1f3c] h-24 resize-y" 
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-[#e8f0fc]">
                <button 
                  onClick={handleSave} 
                  className="bg-[#0d1f3c] text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-[#1a2f50] transition-colors"
                >
                  Lưu thông tin
                </button>
                <button 
                  onClick={() => setView('list')} 
                  className="bg-[#f0f7ff] text-[#4a6580] px-8 py-3 rounded-xl font-bold hover:bg-[#e8f0fc] transition-colors"
                >
                  Hủy bỏ
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}