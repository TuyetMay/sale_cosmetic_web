'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, type UserRole } from '@/contexts/AuthContext';

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [role, setRole] = useState<UserRole>('customer');
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

  const switchRole = (r: UserRole) => {
    setRole(r);
    setEmail('');
    setPassword('');
    setErrors({ email: '', password: '' });
  };

  const validate = () => {
    const e = { email: '', password: '' };
    if (!email) e.email = 'Vui lòng nhập địa chỉ email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Email không đúng định dạng';
    if (!password) e.password = 'Vui lòng nhập mật khẩu';
    setErrors(e);
    return !e.email && !e.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const result = await login(email, password, role);
    setLoading(false);

    if (result.success) {
      showToast(result.message);
      setTimeout(() => router.push(role === 'customer' ? '/' : '/dashboard'), 800);
    } else {
      setErrors({ email: result.message, password: result.message });
    }
  };

  const inputCls = (hasError: boolean) =>
    `w-full px-4 py-3 border-[1.5px] rounded-[9px] text-sm text-[#0d1f3c] outline-none transition-colors ${
      hasError ? 'border-[#f09595] bg-[#fff8f8]' : 'border-[#dde9f7] focus:border-[#82CAFA] bg-white'
    }`;

  return (
    <div className="flex min-h-screen bg-white">

      {/* LEFT BRAND PANEL */}
      <div className="relative hidden lg:flex flex-col justify-between w-[52%] p-12 overflow-hidden"
        style={{ background: '#82CAFA' }}>
        <div className="absolute w-[420px] h-[420px] rounded-full -top-28 -right-20"
          style={{ background: 'rgba(255,255,255,0.12)' }} />
        <div className="absolute w-[280px] h-[280px] rounded-full -bottom-12 -left-14"
          style={{ background: 'rgba(255,255,255,0.08)' }} />

        {/* Brand mark */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full flex items-center justify-center border border-white/50"
            style={{ background: 'rgba(255,255,255,0.25)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C9.2 2 7 4.2 7 7c0 1.8.9 3.4 2.3 4.4C6.8 12.5 5 14.9 5 17.7V20h14v-2.3c0-2.8-1.8-5.2-4.3-6.3C16.1 10.4 17 8.8 17 7c0-2.8-2.2-5-5-5z" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <div>
            <p className="text-white text-xl font-semibold tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>Luxé Beauty</p>
            <p className="text-white/70 text-[11px] tracking-[2px] uppercase mt-0.5">Mỹ phẩm chính hãng</p>
          </div>
        </div>

        {/* Hero */}
        <div className="relative z-10">
          <span className="inline-block text-[11.5px] font-medium tracking-[1.8px] uppercase text-white border border-white/35 px-4 py-1.5 rounded-full mb-6"
            style={{ background: 'rgba(255,255,255,0.18)' }}>
            Hệ thống bán hàng trực tuyến
          </span>
          <h1 className="text-white text-5xl font-semibold leading-[1.18] mb-5"
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.5px' }}>
            Vẻ đẹp<br/>của <em className="italic font-medium">bạn</em>,<br/>sứ mệnh<br/>của chúng tôi.
          </h1>
          <p className="text-white/80 text-[15px] leading-relaxed font-light max-w-[360px]">
            Khám phá hàng ngàn sản phẩm mỹ phẩm chính hãng, giao hàng tận nơi, trải nghiệm mua sắm đẳng cấp.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 flex items-center gap-9">
          {[
            { num: '2.400+', label: 'Sản phẩm' },
            { num: '18k', label: 'Khách hàng' },
            { num: '99%', label: 'Hàng chính hãng' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-9">
              <div>
                <p className="text-white text-2xl font-semibold" style={{ fontFamily: 'Georgia, serif' }}>{s.num}</p>
                <p className="text-white/65 text-xs mt-0.5 font-light">{s.label}</p>
              </div>
              {i < 2 && <div className="w-px self-stretch bg-white/25" />}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-[400px]">

          <div className="mb-8">
            <h2 className="text-[#0d1f3c] text-3xl font-semibold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Đăng nhập
            </h2>
            <p className="text-[#7a9ab5] text-[14.5px] font-light">
              Chào mừng trở lại! Vui lòng nhập thông tin để tiếp tục.
            </p>
          </div>

          {/* Role tabs */}
          <div className="flex bg-[#f0f7ff] rounded-[10px] p-1 mb-7 gap-1">
            {(['customer', 'seller'] as UserRole[]).map((r) => (
              <button key={r} onClick={() => switchRole(r)}
                className={`flex-1 py-2.5 rounded-[7px] text-[13.5px] transition-all ${
                  role === r
                    ? 'bg-white text-[#0d1f3c] font-medium border border-[#d6eaff]'
                    : 'text-[#7a9ab5] font-normal hover:text-[#4a6580]'
                }`}>
                {r === 'customer' ? 'Khách hàng' : 'Nhân viên'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-[12.5px] font-medium text-[#4a6580] mb-1.5">Tên đăng nhập</label>
              <input type="email" value={email} placeholder="example@email.com"
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
                className={inputCls(!!errors.email)} />
              {errors.email && <p className="text-xs text-[#d85a30] mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-[12.5px] font-medium text-[#4a6580] mb-1.5">Mật khẩu</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password} placeholder="Nhập mật khẩu"
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); }}
                  className={`${inputCls(!!errors.password)} pr-11`} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a0bcd5] hover:text-[#82CAFA] transition-colors flex items-center">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {showPw
                      ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>
                      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                    }
                  </svg>
                </button>
              </div>
              {errors.password && <p className="text-xs text-[#d85a30] mt-1">{errors.password}</p>}
            </div>

            {/* Options */}
            <div className="flex justify-between items-center mb-5">
              <label className="flex items-center gap-2 text-[13px] text-[#7a9ab5] cursor-pointer">
                <input type="checkbox" className="accent-[#82CAFA] w-3.5 h-3.5" />
                Ghi nhớ đăng nhập
              </label>
              <button type="button" className="text-[13px] text-[#82CAFA] font-medium hover:text-[#5db8f5] transition-colors">
                Quên mật khẩu?
              </button>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full py-3.5 text-white text-[15px] font-medium rounded-[10px] transition-all hover:opacity-90 active:scale-[0.985] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ background: '#82CAFA' }}>
              {loading
                ? <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Đang đăng nhập...</>
                : 'Đăng nhập'
              }
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#e8f2ff]" />
            <span className="text-xs text-[#b0cce0]">hoặc</span>
            <div className="flex-1 h-px bg-[#e8f2ff]" />
          </div>

          {role === 'customer' && (
            <p className="text-center text-[13.5px] text-[#7a9ab5]">
              Chưa có tài khoản?{' '}
              <button onClick={() => router.push('/register')}
                className="text-[#82CAFA] font-medium hover:text-[#5db8f5] transition-colors">
                Đăng ký ngay
              </button>
            </p>
          )}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-7 left-1/2 -translate-x-1/2 bg-[#0d1f3c] text-white text-[13.5px] px-6 py-3 rounded-[10px] whitespace-nowrap z-50">
          {toast}
        </div>
      )}
    </div>
  );
}