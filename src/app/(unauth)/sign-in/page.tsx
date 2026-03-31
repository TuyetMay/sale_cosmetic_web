'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Role = 'customer' | 'seller';

const MOCK_CREDENTIALS = {
  customer: { email: 'khach@luxebeauty.vn', password: 'khach123' },
  seller: { email: 'nhanvien@luxebeauty.vn', password: 'nv2024' },
};

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const validate = () => {
    const newErrors = { email: '', password: '' };
    if (!email) newErrors.email = 'Vui lòng nhập địa chỉ email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Email không đúng định dạng';
    if (!password) newErrors.password = 'Vui lòng nhập mật khẩu';
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);

    await new Promise((r) => setTimeout(r, 900));

    const cred = MOCK_CREDENTIALS[role];
    if (email === cred.email && password === cred.password) {
      showToast(`Đăng nhập thành công! Chào mừng ${role === 'customer' ? 'Khách hàng' : 'Nhân viên'}`);
      setTimeout(() => {
        router.push(role === 'customer' ? '/' : '/dashboard');
      }, 1200);
    } else {
      setErrors({ email: 'Email hoặc mật khẩu không chính xác', password: 'Email hoặc mật khẩu không chính xác' });
    }
    setLoading(false);
  };

  const switchRole = (r: Role) => {
    setRole(r);
    setEmail('');
    setPassword('');
    setErrors({ email: '', password: '' });
  };

  return (
    <div className="min-h-screen flex bg-white font-[DM_Sans,sans-serif] w-full">
      {/* Cột trái: Phần thương hiệu (Ẩn trên mobile, hiển thị trên Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#f0f7ff] relative overflow-hidden items-center justify-center p-12">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#82CAFA] rounded-full mix-blend-multiply filter blur-[100px] opacity-30"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#b8d9f7] rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
        </div>

        <div className="relative z-10 text-center max-w-lg">
          <div className="w-20 h-20 rounded-full bg-[#82CAFA] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#82CAFA]/20">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C9.2 2 7 4.2 7 7c0 1.8.9 3.4 2.3 4.4C6.8 12.5 5 14.9 5 17.7V20h14v-2.3c0-2.8-1.8-5.2-4.3-6.3C16.1 10.4 17 8.8 17 7c0-2.8-2.2-5-5-5z" fill="white" opacity="0.9"/>
              <ellipse cx="12" cy="6.5" rx="2" ry="2.5" fill="#82CAFA"/>
            </svg>
          </div>
          <h1 className="font-serif text-5xl font-bold text-[#0d1f3c] tracking-wide mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Luxé Beauty
          </h1>
          <p className="text-lg text-[#4a6580] leading-relaxed">
            Khám phá vẻ đẹp đích thực của bạn với bộ sưu tập mỹ phẩm chính hãng cao cấp từ những thương hiệu hàng đầu thế giới.
          </p>
        </div>
      </div>

      {/* Cột phải: Phần Form đăng nhập */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Header (Hiển thị Logo trên Mobile) */}
          <div className="lg:hidden text-center mb-10">
            <div className="w-14 h-14 rounded-full bg-[#82CAFA] flex items-center justify-center mx-auto mb-3">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C9.2 2 7 4.2 7 7c0 1.8.9 3.4 2.3 4.4C6.8 12.5 5 14.9 5 17.7V20h14v-2.3c0-2.8-1.8-5.2-4.3-6.3C16.1 10.4 17 8.8 17 7c0-2.8-2.2-5-5-5z" fill="white" opacity="0.9"/>
                <ellipse cx="12" cy="6.5" rx="2" ry="2.5" fill="#82CAFA"/>
              </svg>
            </div>
            <h1 className="font-serif text-3xl font-semibold text-[#0d1f3c]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Luxé Beauty
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0d1f3c] mb-2">Chào mừng trở lại! 👋</h2>
            <p className="text-[#7a9ab5]">Vui lòng nhập thông tin đăng nhập của bạn.</p>
          </div>

          {/* Role Tabs */}
          <div className="flex bg-[#f0f7ff] rounded-xl p-1.5 mb-8 gap-1 border border-[#e8f2ff]">
            {(['customer', 'seller'] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => switchRole(r)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  role === r
                    ? 'bg-white text-[#82CAFA] shadow-sm'
                    : 'text-[#7a9ab5] hover:text-[#4a6580]'
                }`}
              >
                {r === 'customer' ? 'Khách hàng' : 'Nhân viên'}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-[#4a6580] mb-2">
                Tên đăng nhập
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: '' })); }}
                placeholder="example@email.com"
                className={`w-full px-4 py-3.5 border-2 rounded-xl text-sm text-[#0d1f3c] bg-[#f9fcff] outline-none transition-all ${
                  errors.email ? 'border-[#f09595] bg-[#fff5f5]' : 'border-transparent focus:border-[#82CAFA] focus:bg-white'
                }`}
              />
              {errors.email && <p className="text-xs text-[#d85a30] mt-1.5 font-medium">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#4a6580] mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: '' })); }}
                  placeholder="Nhập mật khẩu"
                  className={`w-full px-4 py-3.5 pr-12 border-2 rounded-xl text-sm text-[#0d1f3c] bg-[#f9fcff] outline-none transition-all ${
                    errors.password ? 'border-[#f09595] bg-[#fff5f5]' : 'border-transparent focus:border-[#82CAFA] focus:bg-white'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a0bcd5] hover:text-[#82CAFA] transition-colors focus:outline-none"
                >
                  {/* SVG Icons không đổi */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {showPw ? (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </>
                    )}
                  </svg>
                </button>
              </div>
              {errors.password && <p className="text-xs text-[#d85a30] mt-1.5 font-medium">{errors.password}</p>}
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center mb-8">
              <label className="flex items-center gap-2 text-sm text-[#7a9ab5] cursor-pointer hover:text-[#4a6580] transition-colors">
                <input type="checkbox" className="accent-[#82CAFA] w-4 h-4 rounded" />
                Ghi nhớ tài khoản
              </label>
              <button type="button" className="text-sm text-[#82CAFA] font-semibold hover:text-[#5db8f5] transition-colors">
                Quên mật khẩu?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#82CAFA] text-white rounded-xl text-base font-semibold shadow-lg shadow-[#82CAFA]/30 transition-all hover:bg-[#6abdf8] hover:shadow-[#82CAFA]/50 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang đăng nhập...
                </span>
              ) : 'Đăng nhập'}
            </button>
          </form>

          {/* Register */}
          {role === 'customer' && (
            <div className="mt-8 text-center">
              <p className="text-sm text-[#7a9ab5]">
                Chưa có tài khoản?{' '}
                <button
                  onClick={() => router.push('/register')}
                  className="text-[#82CAFA] font-bold hover:text-[#5db8f5] transition-colors"
                >
                  Đăng ký ngay
                </button>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 bg-[#0d1f3c] text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 animate-fade-in-down">
          <svg className="w-5 h-5 text-[#82CAFA]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          <span className="font-medium text-sm">{toast}</span>
        </div>
      )}
    </div>
  );
}