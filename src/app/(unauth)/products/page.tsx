'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

/* ─── 1. TYPES & MOCK DATA ───────────────────────────────── */
type Product = {
  MaSP: string;
  TenSP: string;
  MoTaSP: string;
  GiaBanHienTai: number;
  SoLuongConLai: number;
  MaNV: string;
};

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

/* ─── 2. PRODUCT CARD COMPONENT ───────────────────────────────── */
function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#82CAFA]/10 transition-all duration-300 border border-[#e8f0fc] flex flex-col h-full relative">
      <Link
        href={`/products/${product.MaSP}`}
        className="aspect-square w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#f8fbff] to-[#f0f7ff] relative overflow-hidden"
      >
        <span className="text-6xl group-hover:scale-110 transition-transform duration-500 opacity-80">📦</span>
        <div className="absolute inset-0 bg-[#82CAFA]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#4a6580] text-[10px] font-bold px-2.5 py-1 rounded-lg border border-[#e8f0fc] shadow-sm uppercase tracking-wider">
          {product.MaSP}
        </span>
      </Link>

      {/* Quick Add Button */}
      <button 
        onClick={(e) => { e.preventDefault(); addToCart(product); }}
        className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl border border-[#e8f0fc] flex items-center justify-center text-[#82CAFA] opacity-0 group-hover:opacity-100 transition-all hover:bg-[#82CAFA] hover:text-white shadow-sm active:scale-90"
        title="Thêm nhanh vào giỏ"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14"/>
        </svg>
      </button>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/products/${product.MaSP}`}>
          <h3 className="text-[14px] font-bold text-[#0d1f3c] leading-tight mb-2 group-hover:text-[#82CAFA] transition-colors line-clamp-2" title={product.TenSP}>
            {product.TenSP}
          </h3>
        </Link>
        
        <p className="text-[12px] text-[#7a9ab5] line-clamp-2 mb-4 flex-1 leading-relaxed">
          {product.MoTaSP || 'Khám phá bí quyết vẻ đẹp rạng ngời với sản phẩm cao cấp từ Luxé Beauty...'}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-[#f5f8ff] mt-auto">
          <span className="text-[#e8363a] text-[17px] font-extrabold">{fmt(product.GiaBanHienTai)}</span>
          <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-[#f0f7ff] text-[#82CAFA]">
            Còn {product.SoLuongConLai}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── 3. MAIN PAGE COMPONENT ───────────────────────────────── */
export default function ProductsPage() {

  return (
    <div className="bg-[#f8faff] min-h-screen py-10">
      <div className="max-w-full mx-auto px-10">
        
        {/* Page Title & Breadcrumbs */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-[12px] text-[#9eb3c8] font-medium mb-3">
            <Link href="/" className="hover:text-[#82CAFA] transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-[#4a6580]">Sản phẩm</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-[32px] font-bold text-[#0d1f3c] mb-2" style={{ fontFamily: 'Georgia, serif' }}>Tất cả sản phẩm</h1>
              <p className="text-[14px] text-[#7a9ab5]">Khám phá bộ sưu tập mỹ phẩm chính hãng chất lượng cao</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Vùng chọn công cụ bộ lọc hoặc sắp xếp (nếu cần trong tương lai) */}
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <main className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {MOCK_PRODUCTS.map((p) => (
              <ProductCard key={p.MaSP} product={p} />
            ))}
          </div>

          {/* Pagination Mock */}
          <div className="mt-16 flex justify-center items-center gap-2">
            {[1, 2, 3, '...', 12].map((page, i) => (
              <button 
                key={i}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-[14px] font-bold transition-all ${
                  page === 1 
                    ? 'bg-[#82CAFA] text-white shadow-lg shadow-[#82CAFA]/20' 
                    : 'bg-white text-[#4a6580] border border-[#e8f0fc] hover:border-[#82CAFA] hover:text-[#82CAFA]'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-5 h-10 rounded-xl bg-white text-[#4a6580] border border-[#e8f0fc] text-[14px] font-bold hover:border-[#82CAFA] hover:text-[#82CAFA] transition-all ml-2">
              Tiếp theo →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}