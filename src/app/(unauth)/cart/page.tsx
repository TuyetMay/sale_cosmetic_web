'use client';

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-[#f8faff] min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-32 h-32 bg-[#f0f7ff] rounded-full flex items-center justify-center text-6xl mb-8 animate-bounce-slow">
          🛒
        </div>
        <h1 className="text-3xl font-bold text-[#0d1f3c] mb-4" style={{ fontFamily: 'Georgia, serif' }}>Giỏ hàng của bạn đang trống</h1>
        <p className="text-[#7a9ab5] max-w-sm mb-10 leading-relaxed font-medium">Bạn chưa thêm bất kỳ sản phẩm nào vào giỏ hàng. Hãy khám phá và chọn cho mình những món đồ ưng ý nhất nhé!</p>
        <Link href="/products" className="bg-[#82CAFA] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#6abdf8] transition-all shadow-xl shadow-[#82CAFA]/20 active:scale-95">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f8faff] min-h-screen py-16">
      <div className="max-w-full mx-auto px-10">
        <div className="flex items-baseline gap-4 mb-10">
          <h1 className="text-4xl font-extrabold text-[#0d1f3c]" style={{ fontFamily: 'Georgia, serif' }}>Giỏ hàng</h1>
          <span className="text-lg text-[#9eb3c8] font-bold">({totalItems} sản phẩm)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cart.map((item) => (
              <div key={item.MaSP} className="bg-white rounded-3xl p-6 border border-[#e8f0fc] shadow-sm flex flex-col sm:flex-row items-center gap-6 group hover:border-[#82CAFA]/30 transition-all">
                <div className="w-32 h-32 bg-[#f5f8ff] rounded-2xl flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500">
                  🧴
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <Link href={`/products/${item.MaSP}`} className="text-lg font-bold text-[#0d1f3c] hover:text-[#82CAFA] transition-colors mb-2 block line-clamp-2">
                    {item.TenSP}
                  </Link>
                  <p className="text-[13px] text-[#9eb3c8] font-bold uppercase tracking-wider mb-4">Mã SP: {item.MaSP}</p>
                  
                  <div className="flex items-center justify-center sm:justify-start gap-6">
                    <div className="flex items-center bg-[#f9fcff] border border-[#e8f2ff] rounded-xl overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.MaSP, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center text-[#4a6580] hover:bg-[#82CAFA] hover:text-white transition-all text-xl"
                      >
                        −
                      </button>
                      <span className="w-10 text-center font-bold text-[#0d1f3c]">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.MaSP, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-[#4a6580] hover:bg-[#82CAFA] hover:text-white transition-all text-xl"
                      >
                        +
                      </button>
                    </div>
                    
                    <span className="text-xl font-extrabold text-[#e8363a]">{fmt(item.GiaBanHienTai)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => removeFromCart(item.MaSP)}
                  className="p-3 text-[#9eb3c8] hover:text-[#e8363a] hover:bg-[#fff5f5] rounded-xl transition-all"
                  title="Xóa khỏi giỏ"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            ))}
            
            <Link href="/products" className="text-[15px] font-bold text-[#82CAFA] hover:underline flex items-center gap-2 mt-4 ml-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Tiếp tục mua thêm sản phẩm khác
            </Link>
          </div>

          {/* Cart Summary */}
          <div className="relative">
            <div className="sticky top-32">
              <div className="bg-white rounded-[32px] p-8 border border-[#e8f0fc] shadow-lg shadow-[#82CAFA]/5 flex flex-col gap-8">
                <h3 className="text-2xl font-bold text-[#0d1f3c]" style={{ fontFamily: 'Georgia, serif' }}>Tóm tắt đơn hàng</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-[15px]">
                    <span className="text-[#9eb3c8] font-medium">Tạm tính ({totalItems} sản phẩm)</span>
                    <span className="text-[#0d1f3c] font-bold">{fmt(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-[15px]">
                    <span className="text-[#9eb3c8] font-medium">Phí vận chuyển</span>
                    <span className="text-[#0d1f3c] font-bold">Miễn phí</span>
                  </div>
                </div>

                <div className="h-px bg-[#f5f8ff]" />

                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-lg font-bold text-[#0d1f3c]">Tổng cộng</span>
                  <div className="text-right">
                    <p className="text-3xl font-black text-[#e8363a] leading-none mb-1">{fmt(totalPrice)}</p>
                    <p className="text-[12px] text-[#9eb3c8] font-medium">(Đã bao gồm VAT)</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-4">
                  <div className="bg-[#f0f7ff] rounded-2xl p-4 border border-[#82CAFA]/20 flex items-center gap-3">
                    <span className="text-2xl">🎟️</span>
                    <div className="flex-1">
                      <p className="text-[13px] font-bold text-[#0d1f3c]">Phiếu giảm giá Luxé</p>
                      <p className="text-[11px] text-[#82CAFA] font-bold uppercase tracking-wider underline cursor-pointer">Sử dụng ngay</p>
                    </div>
                  </div>

                  <Link href="/checkout" className="w-full bg-[#82CAFA] text-white py-5 rounded-2xl font-bold text-center text-[16px] hover:bg-[#6abdf8] transition-all shadow-xl shadow-[#82CAFA]/30 active:scale-95 flex items-center justify-center gap-2">
                    Tiến hành thanh toán
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 12h14m-7-7 7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="mt-8 px-8 py-6 bg-[#fcfdff] rounded-3xl border border-[#e8f0fc] flex items-center gap-4">
                <span className="text-3xl">🛡️</span>
                <div>
                  <p className="text-[13px] font-bold text-[#0d1f3c]">Thanh toán an toàn</p>
                  <p className="text-[11px] text-[#9eb3c8]">Cam kết bảo mật thông tin 100%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
