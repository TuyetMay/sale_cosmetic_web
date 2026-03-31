'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';

export default function CheckoutPage() {
  const { cart, totalPrice, totalItems, clearCart } = useCart();
  const router = useRouter();
  
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    note: '',
    paymentMethod: 'cod'
  });

  const [loading, setLoading] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="bg-[#f8faff] min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-[#0d1f3c] mb-6">Giỏ hàng của bạn đang trống</h1>
        <Link href="/products" className="bg-[#82CAFA] text-white px-8 py-3 rounded-xl font-bold">
          Mua sắm ngay
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(r => setTimeout(r, 2000));
    
    setLoading(false);
    clearCart();
    router.push('/orders/success');
  };

  return (
    <div className="bg-[#f8faff] min-h-screen py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-[#0d1f3c] mb-12" style={{ fontFamily: 'Georgia, serif' }}>Thanh toán</h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Shipping Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-[#e8f0fc] shadow-sm">
              <h2 className="text-xl font-bold text-[#0d1f3c] mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#f0f7ff] text-[#82CAFA] flex items-center justify-center text-sm">1</span>
                Thông tin giao hàng
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-[#4a6580] ml-1">Họ và tên</label>
                  <input 
                    required
                    value={form.fullName}
                    onChange={e => setForm({...form, fullName: e.target.value})}
                    placeholder="Nhập họ và tên" 
                    className="w-full bg-[#f9fcff] border border-[#e8f2ff] rounded-xl px-4 py-3.5 outline-none focus:border-[#82CAFA] focus:bg-white transition-all text-[14px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-[#4a6580] ml-1">Số điện thoại</label>
                  <input 
                    required
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                    placeholder="Nhập số điện thoại" 
                    className="w-full bg-[#f9fcff] border border-[#e8f2ff] rounded-xl px-4 py-3.5 outline-none focus:border-[#82CAFA] focus:bg-white transition-all text-[14px]"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[13px] font-bold text-[#4a6580] ml-1">Email</label>
                  <input 
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    placeholder="example@email.com" 
                    className="w-full bg-[#f9fcff] border border-[#e8f2ff] rounded-xl px-4 py-3.5 outline-none focus:border-[#82CAFA] focus:bg-white transition-all text-[14px]"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[13px] font-bold text-[#4a6580] ml-1">Địa chỉ nhận hàng</label>
                  <textarea 
                    required
                    value={form.address}
                    onChange={e => setForm({...form, address: e.target.value})}
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố" 
                    rows={3}
                    className="w-full bg-[#f9fcff] border border-[#e8f2ff] rounded-xl px-4 py-3.5 outline-none focus:border-[#82CAFA] focus:bg-white transition-all text-[14px] resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#e8f0fc] shadow-sm">
              <h2 className="text-xl font-bold text-[#0d1f3c] mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#f0f7ff] text-[#82CAFA] flex items-center justify-center text-sm">2</span>
                Phương thức thanh toán
              </h2>
              
              <div className="space-y-4">
                {[
                  { id: 'cod', title: 'Thanh toán khi nhận hàng (COD)', icon: '💵' },
                  { id: 'bank', title: 'Chuyển khoản ngân hàng', icon: '🏦' },
                  { id: 'momo', title: 'Ví điện tử MoMo', icon: '📱' },
                ].map((method) => (
                  <label key={method.id} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${form.paymentMethod === method.id ? 'border-[#82CAFA] bg-[#f0f7ff]/30' : 'border-[#f5f8ff] hover:border-[#e8f2ff]'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      className="w-5 h-5 accent-[#82CAFA]" 
                      checked={form.paymentMethod === method.id}
                      onChange={() => setForm({...form, paymentMethod: method.id})}
                    />
                    <span className="text-2xl">{method.icon}</span>
                    <span className="text-[15px] font-bold text-[#4a6580]">{method.title}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="relative">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white rounded-[32px] p-8 border border-[#e8f0fc] shadow-lg shadow-[#82CAFA]/5">
                <h3 className="text-xl font-bold text-[#0d1f3c] mb-6 pb-4 border-b border-[#f5f8ff]">Sản phẩm ({totalItems})</h3>
                
                <div className="max-h-[300px] overflow-y-auto mb-6 pr-2 space-y-4 scrollbar-hide">
                  {cart.map(item => (
                    <div key={item.MaSP} className="flex gap-4">
                      <div className="w-16 h-16 bg-[#f5f8ff] rounded-lg flex-shrink-0 flex items-center justify-center text-3xl">🧴</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-[#0d1f3c] truncate">{item.TenSP}</p>
                        <p className="text-[12px] text-[#9eb3c8]">SL: {item.quantity} × {fmt(item.GiaBanHienTai)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-6 border-t border-[#f5f8ff]">
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[#9eb3c8] font-bold uppercase tracking-wider">Tạm tính</span>
                    <span className="text-[#0d1f3c] font-bold">{fmt(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[#9eb3c8] font-bold uppercase tracking-wider">Vận chuyển</span>
                    <span className="text-[#82CAFA] font-bold uppercase">Miễn phí</span>
                  </div>
                  <div className="h-px bg-[#f5f8ff] my-2" />
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-[#0d1f3c]">Tổng cộng</span>
                    <span className="text-3xl font-black text-[#e8363a]">{fmt(totalPrice)}</span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#82CAFA] text-white py-5 rounded-2xl font-bold text-[16px] mt-8 hover:bg-[#6abdf8] transition-all shadow-xl shadow-[#82CAFA]/30 active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Đặt hàng ngay
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12h14m-7-7 7 7-7 7"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-[12px] text-[#9eb3c8] font-medium leading-relaxed px-4">
                Bằng cách nhấn Đặt hàng, bạn đồng ý với các <span className="underline cursor-pointer">Điều khoản dịch vụ</span> và <span className="underline cursor-pointer">Bảo mật</span> của Luxé Beauty.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
