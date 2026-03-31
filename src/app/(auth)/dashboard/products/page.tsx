'use client';

import { useState } from 'react';
import { MOCK_PRODUCTS } from '@/data/mockProducts';
import type { Product } from '@/data/mockProducts';

const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setProducts(products.filter(p => p.MaSP !== id));
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-10 min-h-screen">
      <div className="flex items-center justify-between bg-white px-8 py-6 rounded-[32px] border border-[#e8f0fc] shadow-sm">
        <div>
          <h1 className="text-[28px] font-black text-[#0d1f3c]" style={{ fontFamily: 'Georgia, serif' }}>Quản lý sản phẩm</h1>
          <p className="text-[14px] text-[#7a9ab5] font-medium">Bạn có thể thêm, sửa, xóa và theo dõi tồn kho tại đây.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-[#82CAFA] text-white px-8 py-4 rounded-2xl font-bold text-[15px] hover:bg-[#6abdf8] transition-all shadow-xl shadow-[#82CAFA]/30 flex items-center gap-3 active:scale-95"
        >
          <span className="text-xl">+</span>
          Thêm sản phẩm mới
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-[#e8f0fc] shadow-sm overflow-hidden p-8">
        <div className="flex items-center gap-6 mb-10">
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a9ab5]" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input 
              placeholder="Tìm kiếm theo tên sản phẩm hoặc mã SP..." 
              className="w-full bg-[#f9fcff] border border-[#e8f2ff] rounded-2xl px-12 py-3.5 outline-none focus:border-[#82CAFA] focus:bg-white transition-all text-[14px]"
            />
          </div>
          <select className="bg-[#f9fcff] border border-[#e8f2ff] rounded-2xl px-6 py-3.5 outline-none focus:border-[#82CAFA] font-bold text-[13px] text-[#4a6580]">
            <option>Tất cả danh mục</option>
            <option>Chăm sóc da</option>
            <option>Trang điểm</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#f5f8ff] text-[12px] text-[#9eb3c8] font-extrabold uppercase tracking-widest bg-[#fcfdff]">
                <th className="py-5 pl-6">Sản phẩm</th>
                <th className="py-5">Mã SP</th>
                <th className="py-5">Giá bán</th>
                <th className="py-5">Tồn kho</th>
                <th className="py-5">Trạng thái</th>
                <th className="py-5 pr-6 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.MaSP} className="border-b border-[#fcfdff] hover:bg-[#f8faff] transition-colors rounded-2xl">
                  <td className="py-6 pl-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#f0f7ff] flex items-center justify-center text-3xl shadow-sm border border-transparent">
                        🧴
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-[#0d1f3c] line-clamp-1">{p.TenSP}</p>
                        <p className="text-[11px] text-[#9eb3c8] font-bold uppercase tracking-wider">Thương hiệu: Luxé</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 text-[13px] font-bold text-[#4a6580]">{p.MaSP}</td>
                  <td className="py-6 text-[15px] font-extrabold text-[#e8363a]">{fmt(p.GiaBanHienTai)}</td>
                  <td className="py-6">
                    <div className="flex items-center gap-3">
                      <span className={`w-2.5 h-2.5 rounded-full ${p.SoLuongConLai > 10 ? 'bg-[#10b981]' : 'bg-[#e8363a]'}`} />
                      <span className="text-[14px] font-bold text-[#4a6580]">{p.SoLuongConLai} đơn vị</span>
                    </div>
                  </td>
                  <td className="py-6">
                    <span className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#ecfdf5] text-[#10b981]">Đang bán</span>
                  </td>
                  <td className="py-6 pr-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => handleEdit(p)}
                        className="w-10 h-10 rounded-xl bg-[#f0f7ff] text-[#82CAFA] flex items-center justify-center hover:bg-[#82CAFA] hover:text-white transition-all shadow-sm active:scale-90"
                      >
                         ✎
                      </button>
                      <button 
                        onClick={() => handleDelete(p.MaSP)}
                        className="w-10 h-10 rounded-xl bg-[#fff5f5] text-[#e8363a] flex items-center justify-center hover:bg-[#e8363a] hover:text-white transition-all shadow-sm active:scale-90"
                      >
                         🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mock Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0d1f3c]/60 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl p-12 overflow-hidden relative animate-in fade-in slide-in-from-bottom-8 duration-300">
            <h2 className="text-3xl font-black text-[#0d1f3c] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              {editingProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}
            </h2>
            <p className="text-[14px] text-[#7a9ab5] mb-10 font-medium leading-relaxed">Vui lòng nhập đầy đủ thông tin để lưu thay đổi vào hệ thống.</p>
            
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div className="space-y-2">
                <label className="text-[12px] font-black text-[#4a6580] uppercase tracking-widest ml-1">Tên sản phẩm</label>
                <input 
                  defaultValue={editingProduct?.TenSP}
                  placeholder="Ví dụ: Serum dưỡng sáng da" 
                  className="w-full bg-[#f9fcff] border border-[#e8f2ff] rounded-2xl px-5 py-4 outline-none focus:border-[#82CAFA] focus:bg-white transition-all text-[15px]" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-black text-[#4a6580] uppercase tracking-widest ml-1">Mã sản phẩm</label>
                <input 
                  defaultValue={editingProduct?.MaSP}
                  disabled={!!editingProduct}
                  placeholder="Mã tự động phát sinh" 
                  className="w-full bg-[#f9fcff] border border-[#e8f2ff] rounded-2xl px-5 py-4 outline-none focus:border-[#82CAFA] focus:bg-white transition-all text-[15px] disabled:opacity-50" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-black text-[#4a6580] uppercase tracking-widest ml-1">Giá bán hiện tại</label>
                <input 
                  type="number"
                  defaultValue={editingProduct?.GiaBanHienTai}
                  placeholder="0đ" 
                  className="w-full bg-[#f9fcff] border border-[#e8f2ff] rounded-2xl px-5 py-4 outline-none focus:border-[#82CAFA] focus:bg-white transition-all text-[15px] font-extrabold text-[#e8363a]" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-black text-[#4a6580] uppercase tracking-widest ml-1">Số lượng tồn kho</label>
                <input 
                  type="number"
                  defaultValue={editingProduct?.SoLuongConLai}
                  placeholder="0" 
                  className="w-full bg-[#f9fcff] border border-[#e8f2ff] rounded-2xl px-5 py-4 outline-none focus:border-[#82CAFA] focus:bg-white transition-all text-[15px]" 
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-[#f5f8ff] text-[#4a6580] py-5 rounded-2xl font-bold text-[15px] hover:bg-[#e8f0fc] transition-all active:scale-95"
              >
                Hủy bỏ
              </button>
              <button 
                onClick={() => { setIsModalOpen(false); alert('Đã lưu thay đổi thành công!'); }}
                className="flex-1 bg-[#82CAFA] text-white py-5 rounded-2xl font-bold text-[15px] hover:bg-[#6abdf8] transition-all shadow-xl shadow-[#82CAFA]/20 active:scale-95"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
