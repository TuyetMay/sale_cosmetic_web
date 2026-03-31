'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/data/mockProducts';
import { useCart } from '@/contexts/CartContext';

const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const product = MOCK_PRODUCTS.find((p) => p.MaSP === params.id);
  
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, quantity);
    router.push('/cart');
  };

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <div className="text-8xl">🔍</div>
        <h2 className="text-2xl font-bold text-[#0d1f3c]">Sản phẩm không tồn tại</h2>
        <Link href="/products" className="bg-[#82CAFA] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#6abdf8] transition-all shadow-lg shadow-[#82CAFA]/20">
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  const relatedProducts = MOCK_PRODUCTS.filter(p => p.MaSP !== product.MaSP).slice(0, 4);

  return (
    <div className="bg-[#f8faff] min-h-screen py-12">
      <div className="max-w-full mx-auto px-10">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[13px] text-[#9eb3c8] font-medium mb-10">
          <Link href="/" className="hover:text-[#82CAFA] transition-colors">Trang chủ</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#82CAFA] transition-colors">Sản phẩm</Link>
          <span>/</span>
          <span className="text-[#4a6580] truncate max-w-[200px]">{product.TenSP}</span>
        </nav>

        <div className="bg-white rounded-[32px] border border-[#e8f0fc] shadow-sm overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Image Gallery Section */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-[#fcfdff] to-[#f5f8ff] flex flex-col gap-6 items-center">
              <div className="aspect-square w-full max-w-[440px] rounded-3xl bg-white border border-[#e8f0fc] shadow-xl shadow-[#82CAFA]/5 flex items-center justify-center text-[180px] relative overflow-hidden group">
                <span className="group-hover:scale-110 transition-transform duration-700">🧴</span>
                <div className="absolute top-4 left-4 bg-[#82CAFA]/10 text-[#82CAFA] text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md border border-[#82CAFA]/20">
                  CHÍNH HÃNG
                </div>
              </div>
              
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center text-3xl cursor-pointer transition-all ${i === 1 ? 'border-[#82CAFA] bg-white shadow-md' : 'border-transparent bg-[#f0f7ff] opacity-60 hover:opacity-100'}`}>
                    🧴
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="p-8 lg:p-12 flex flex-col">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 rounded-lg bg-[#f0f7ff] text-[#82CAFA] text-[12px] font-bold mb-4 tracking-wider uppercase">
                  Mã SP: {product.MaSP}
                </span>
                <h1 className="text-[32px] font-extrabold text-[#0d1f3c] leading-[1.2] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  {product.TenSP}
                </h1>
                <div className="flex items-center gap-4 text-[14px]">
                  <div className="flex text-yellow-400">★★★★★</div>
                  <span className="text-[#9eb3c8] font-medium border-l border-[#e8f0fc] pl-4">128 Đánh giá</span>
                  <span className="text-[#9eb3c8] font-medium border-l border-[#e8f0fc] pl-4">5.2k Đã bán</span>
                </div>
              </div>

              <div className="mb-10 bg-[#f9fcff] rounded-2xl p-6 border border-[#f0f7ff]">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-[36px] font-black text-[#e8363a]">{fmt(product.GiaBanHienTai)}</span>
                  <span className="text-[16px] text-[#9eb3c8] line-through">{fmt(product.GiaBanHienTai * 1.25)}</span>
                </div>
                <p className="text-[13px] text-[#7a9ab5] font-medium">Tiết kiệm: {fmt(product.GiaBanHienTai * 0.25)} (20%)</p>
              </div>

              <div className="space-y-8 mb-12">
                <div className="flex items-center gap-8">
                  <span className="text-[14px] font-bold text-[#4a6580] min-w-[80px]">Số lượng</span>
                  <div className="flex items-center bg-white border border-[#e8f2ff] rounded-xl overflow-hidden shadow-sm">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center text-[#4a6580] hover:bg-[#f5f8ff] transition-colors text-xl"
                    >
                      −
                    </button>
                    <span className="w-14 text-center font-bold text-[#0d1f3c]">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.SoLuongConLai, quantity + 1))}
                      className="w-12 h-12 flex items-center justify-center text-[#4a6580] hover:bg-[#f5f8ff] transition-colors text-xl"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[13px] text-[#9eb3c8]">{product.SoLuongConLai} sản phẩm có sẵn</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-white border-2 border-[#82CAFA] text-[#82CAFA] py-4 rounded-2xl font-bold text-[15px] hover:bg-[#f0f7ff] transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    Thêm vào giỏ
                  </button>
                  <button 
                    onClick={handleBuyNow}
                    className="flex-1 bg-[#82CAFA] text-white py-4 rounded-2xl font-bold text-[15px] hover:bg-[#6abdf8] transition-all shadow-lg shadow-[#82CAFA]/30 active:scale-[0.98]"
                  >
                    Mua ngay
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-[#f5f8ff] pt-8">
                {[
                  { icon: '🚚', title: 'Giao hàng nhanh', desc: 'Từ 2 - 4 ngày' },
                  { icon: '🛡️', title: 'Bảo hành 12 tháng', desc: 'Lỗi 1 đổi 1' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-[13px] font-bold text-[#0d1f3c]">{item.title}</p>
                      <p className="text-[11px] text-[#9eb3c8]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-[32px] border border-[#e8f0fc] shadow-sm overflow-hidden mb-20">
          <div className="flex border-b border-[#f5f8ff] bg-[#fcfdff]">
            {[
              { id: 'description', label: 'Mô tả chi tiết' },
              { id: 'ingredients', label: 'Thành phần' },
              { id: 'usage', label: 'Hướng dẫn sử dụng' },
              { id: 'reviews', label: 'Đánh giá (128)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-5 text-[14px] font-bold transition-all relative ${
                  activeTab === tab.id ? 'text-[#82CAFA]' : 'text-[#7a9ab5] hover:text-[#4a6580]'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#82CAFA]" />
                )}
              </button>
            ))}
          </div>
          <div className="p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              {activeTab === 'description' && (
                <div className="prose prose-blue">
                  <h3 className="text-xl font-bold text-[#0d1f3c] mb-6">Thông tin sản phẩm</h3>
                  <p className="text-[15px] text-[#4a6580] leading-relaxed mb-6">
                    {product.MoTaSP || 'Sản phẩm cao cấp được chiết xuất từ những thành phần tự nhiên tinh túy nhất, giúp mang lại vẻ đẹp rạng ngời và sức sống mới cho làn da của bạn. Với công thức độc quyền từ Luxé Beauty, chúng tôi cam kết mang lại trải nghiệm chăm sóc sắc đẹp đẳng cấp.'}
                  </p>
                  <ul className="space-y-4 list-none p-0">
                    {[
                      'Chiết xuất 100% từ thiên nhiên',
                      'Phù hợp với mọi loại da, kể cả da nhạy cảm',
                      'Đã được kiểm nghiệm da liễu nghiêm ngặt',
                      'Không chứa paraben và các chất độc hại'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-[14px] text-[#4a6580]">
                        <span className="text-[#82CAFA]">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab !== 'description' && (
                <div className="text-center py-10">
                  <p className="text-[#9eb3c8] italic">Đang cập nhật nội dung cho phần này...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[24px] font-bold text-[#0d1f3c]" style={{ fontFamily: 'Georgia, serif' }}>Sản phẩm tương tự</h2>
            <Link href="/products" className="text-[14px] font-bold text-[#82CAFA] hover:underline">Xem thêm</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <Link key={p.MaSP} href={`/products/${p.MaSP}`} className="group bg-white rounded-2xl p-4 border border-[#e8f0fc] hover:shadow-lg transition-all">
                <div className="aspect-square rounded-xl bg-[#f5f8ff] mb-4 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform">
                  🧴
                </div>
                <h4 className="text-[13px] font-bold text-[#0d1f3c] mb-2 line-clamp-1 group-hover:text-[#82CAFA] transition-colors">{p.TenSP}</h4>
                <p className="text-[#e8363a] font-extrabold text-[15px]">{fmt(p.GiaBanHienTai)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#0d1f3c] text-white px-8 py-4 rounded-2xl shadow-2xl z-[100] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="w-6 h-6 rounded-full bg-[#82CAFA] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          </div>
          <p className="font-bold text-[14px]">Đã thêm sản phẩm vào giỏ hàng!</p>
          <Link href="/cart" className="ml-4 text-[#82CAFA] font-bold underline">Xem giỏ hàng</Link>
        </div>
      )}
    </div>
  );
}
