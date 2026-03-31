'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f0f7ff] rounded-bl-[120px] -z-10 hidden lg:block" />
        
        <div className="max-w-full mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#f0f7ff] border border-[#82CAFA]/20 px-4 py-2 rounded-full w-fit">
              <span className="flex h-2 w-2 rounded-full bg-[#82CAFA] animate-pulse" />
              <span className="text-[12px] font-bold text-[#82CAFA] uppercase tracking-wider">Bộ sưu tập Xuân 2024 đã ra mắt</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#0d1f3c] leading-[1.1]" style={{ fontFamily: 'Georgia, serif' }}>
              Vẻ đẹp <span className="text-[#82CAFA] italic">đích thực</span> từ thiên nhiên
            </h1>
            
            <p className="text-lg text-[#7a9ab5] leading-relaxed max-w-lg font-medium">
              Khám phá bí quyết chăm sóc da toàn diện với những sản phẩm được tinh lọc từ thiên nhiên, giúp bạn rạng rỡ và tự tin mỗi ngày.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/products" className="bg-[#82CAFA] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#6abdf8] transition-all shadow-xl shadow-[#82CAFA]/30 flex items-center justify-center gap-2 active:scale-95">
                Mua Sắm Ngay
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12h14m-7-7 7 7-7 7"/>
                </svg>
              </Link>
              <Link href="/about" className="bg-white text-[#4a6580] border-2 border-[#e8f0fc] px-10 py-5 rounded-2xl font-bold text-lg hover:border-[#82CAFA] hover:text-[#82CAFA] transition-all flex items-center justify-center active:scale-95">
                Tìm Hiểu Thêm
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-8 pt-8 border-t border-[#f5f8ff]">
              <div>
                <p className="text-3xl font-black text-[#0d1f3c]">2k+</p>
                <p className="text-[13px] text-[#9eb3c8] font-bold uppercase tracking-wide">Sản phẩm</p>
              </div>
              <div className="w-px h-10 bg-[#e8f0fc]" />
              <div>
                <p className="text-3xl font-black text-[#0d1f3c]">15k</p>
                <p className="text-[13px] text-[#9eb3c8] font-bold uppercase tracking-wide">Khách hàng</p>
              </div>
              <div className="w-px h-10 bg-[#e8f0fc]" />
              <div>
                <div className="flex text-yellow-400 text-xl">★★★★★</div>
                <p className="text-[13px] text-[#9eb3c8] font-bold uppercase tracking-wide">Xếp hạng 4.9/5</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:flex justify-center items-center">
            <div className="absolute w-[500px] h-[500px] bg-white border border-[#e8f0fc] rounded-full shadow-2xl -z-10" />
            <div className="text-[320px] drop-shadow-2xl animate-float">💄</div>
            
            <div className="absolute top-20 right-10 bg-white p-4 rounded-2xl shadow-xl border border-[#e8f0fc] flex items-center gap-4 animate-bounce-slow">
              <div className="w-12 h-12 bg-[#82CAFA] rounded-xl flex items-center justify-center text-white text-2xl">✨</div>
              <div>
                <p className="text-[14px] font-bold text-[#0d1f3c]">Bestseller</p>
                <p className="text-[11px] text-[#9eb3c8]">Serum dưỡng sáng</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-bold text-[#0d1f3c] mb-4" style={{ fontFamily: 'Georgia, serif' }}>Khám Phá Theo Danh Mục</h2>
            <p className="text-[#7a9ab5] max-w-lg mx-auto">Chúng tôi mang lại giải pháp làm đẹp toàn diện cho từng nhu cầu riêng biệt của bạn.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Chăm sóc da', icon: '🧴', color: '#f0f7ff' },
              { name: 'Trang điểm', icon: '💄', color: '#fff5f5' },
              { name: 'Chăm sóc tóc', icon: '💆‍♀️', color: '#f5f5ff' },
              { name: 'Nước hoa', icon: '🌸', color: '#fff9f0' },
            ].map((cat) => (
              <Link href="/products" key={cat.name} className="group flex flex-col items-center gap-6 p-10 rounded-[40px] transition-all hover:shadow-2xl hover:shadow-[#82CAFA]/10 border border-transparent hover:border-[#e8f0fc]" style={{ backgroundColor: cat.color }}>
                <div className="text-7xl group-hover:scale-110 transition-transform duration-500">{cat.icon}</div>
                <span className="text-xl font-bold text-[#0d1f3c] group-hover:text-[#82CAFA] transition-colors">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto bg-[#0d1f3c] rounded-[48px] p-12 lg:p-20 relative overflow-hidden text-center text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#82CAFA] rounded-full blur-[120px] opacity-20 -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#82CAFA] rounded-full blur-[120px] opacity-20 -ml-32 -mb-32" />
          
          <h2 className="text-4xl md:text-5xl font-bold mb-8 relative z-10" style={{ fontFamily: 'Georgia, serif' }}>Trở thành thành viên của gia đình Luxé Beauty</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10 relative z-10 leading-relaxed">
            Nhận ngay ưu đãi 20% cho đơn hàng đầu tiên và cập nhật những xu hướng làm đẹp mới nhất từ chúng tôi.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10">
            <input 
              placeholder="Email của bạn..." 
              className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 outline-none focus:bg-white/20 transition-all text-white placeholder-white/40"
            />
            <button className="bg-[#82CAFA] text-[#0d1f3c] px-8 py-4 rounded-2xl font-bold hover:bg-white transition-all active:scale-95">
              Đăng ký ngay
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}