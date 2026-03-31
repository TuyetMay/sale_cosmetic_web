'use client';

import Link from 'next/link';

export default function OrderSuccessPage() {
  const orderNumber = 'LB-' + Math.random().toString(36).substring(2, 9).toUpperCase();
  
  return (
    <div className="bg-[#f8faff] min-h-[85vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-12">
        <div className="w-40 h-40 bg-[#f0f7ff] rounded-full flex items-center justify-center text-8xl animate-float">
          📦
        </div>
        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-3 rounded-full shadow-xl animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </div>
      </div>

      <h1 className="text-4xl font-extrabold text-[#0d1f3c] mb-6" style={{ fontFamily: 'Georgia, serif' }}>Đặt hàng thành công!</h1>
      <p className="text-[#4a6580] max-w-lg mb-10 leading-relaxed font-bold text-lg">
        Cảm ơn bạn đã tin tưởng Luxé Beauty. Mã đơn hàng của bạn là <span className="text-[#82CAFA] text-2xl tracking-widest">{orderNumber}</span>.
      </p>

      <div className="bg-white rounded-3xl p-8 border border-[#e8f0fc] shadow-sm mb-12 max-w-xl w-full text-left space-y-4">
        <div className="flex items-center gap-4 text-[14px]">
          <span className="w-8 h-8 rounded-full bg-[#f0f7ff] flex items-center justify-center text-[#82CAFA]">📧</span>
          <p className="text-[#4a6580]">Một email xác nhận đã được gửi đến địa chỉ của bạn.</p>
        </div>
        <div className="flex items-center gap-4 text-[14px]">
          <span className="w-8 h-8 rounded-full bg-[#f0f7ff] flex items-center justify-center text-[#82CAFA]">🚛</span>
          <p className="text-[#4a6580]">Chúng tôi sẽ xử lý đơn hàng và giao đến bạn trong vòng 2-4 ngày.</p>
        </div>
        <div className="flex items-center gap-4 text-[14px]">
          <span className="w-8 h-8 rounded-full bg-[#f0f7ff] flex items-center justify-center text-[#82CAFA]">📱</span>
          <p className="text-[#4a6580]">Bạn có thể theo dõi tình trạng đơn hàng trong phần <Link href="/orders" className="text-[#82CAFA] font-bold hover:underline">Quản lý đơn hàng</Link>.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/products" className="bg-[#82CAFA] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#6abdf8] transition-all shadow-xl shadow-[#82CAFA]/20 active:scale-95">
          Tiếp tục mua sắm
        </Link>
        <Link href="/" className="bg-[#fcfdff] text-[#4a6580] border border-[#e8f0fc] px-10 py-4 rounded-2xl font-bold hover:bg-white transition-all active:scale-95">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
