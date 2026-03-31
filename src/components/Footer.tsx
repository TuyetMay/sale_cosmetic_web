
export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e8f0fc] pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand & Mission */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#82CAFA]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C9.2 2 7 4.2 7 7c0 1.8.9 3.4 2.3 4.4C6.8 12.5 5 14.9 5 17.7V20h14v-2.3c0-2.8-1.8-5.2-4.3-6.3C16.1 10.4 17 8.8 17 7c0-2.8-2.2-5-5-5z" fill="white" opacity="0.9"/>
              </svg>
            </div>
            <span className="text-[18px] font-bold text-[#0d1f3c]" style={{ fontFamily: 'Georgia, serif' }}>Luxé Beauty</span>
          </div>
          <p className="text-[14px] text-[#7a9ab5] leading-relaxed">
            Nâng tầm vẻ đẹp tự nhiên của bạn với những sản phẩm chăm sóc da và trang điểm cao cấp nhất. Cam kết 100% chính hãng.
          </p>
          <div className="flex gap-4">
            {['Fb', 'Ig', 'Tw', 'Yt'].map((social) => (
              <div key={social} className="w-8 h-8 rounded-full bg-[#f5f8ff] flex items-center justify-center text-[11px] font-bold text-[#82CAFA] cursor-pointer hover:bg-[#82CAFA] hover:text-white transition-all">
                {social}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-[15px] font-bold text-[#0d1f3c] mb-6">Mua Sắm</h4>
          <ul className="flex flex-col gap-3">
            {['Tất cả sản phẩm', 'Chăm sóc da', 'Trang điểm', 'Nước hoa', 'Khuyến mãi'].map((link) => (
              <li key={link} className="text-[14px] text-[#7a9ab5] hover:text-[#82CAFA] cursor-pointer transition-colors">{link}</li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-[15px] font-bold text-[#0d1f3c] mb-6">Hỗ Trợ</h4>
          <ul className="flex flex-col gap-3">
            {['Hướng dẫn mua hàng', 'Chính sách đổi trả', 'Vận chuyển', 'Câu hỏi thường gặp', 'Liên hệ'].map((link) => (
              <li key={link} className="text-[14px] text-[#7a9ab5] hover:text-[#82CAFA] cursor-pointer transition-colors">{link}</li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-[15px] font-bold text-[#0d1f3c] mb-6">Đăng Ký Bản Tin</h4>
          <p className="text-[13px] text-[#7a9ab5] mb-4">Nhận thông tin ưu đãi sớm nhất từ chúng tôi.</p>
          <div className="flex gap-2">
            <input 
              placeholder="Email của bạn" 
              className="flex-1 bg-[#f5f8ff] border border-[#e8f0fc] rounded-lg px-4 py-2 text-[13px] outline-none focus:border-[#82CAFA] transition-all"
            />
            <button className="bg-[#82CAFA] text-white px-4 py-2 rounded-lg text-[13px] font-bold hover:bg-[#6abdf8] transition-colors shadow-sm">Gửi</button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mt-16 pt-8 border-t border-[#f5f8ff] flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[12px] text-[#9eb3c8]">© 2024 Luxé Beauty. Tất cả bản quyền được bảo lưu.</p>
        <div className="flex gap-6">
          <span className="text-[12px] text-[#9eb3c8] hover:text-[#4a6580] cursor-pointer">Điều khoản</span>
          <span className="text-[12px] text-[#9eb3c8] hover:text-[#4a6580] cursor-pointer">Bảo mật</span>
        </div>
      </div>
    </footer>
  );
}
