'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface FormData {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

interface FormErrors {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

function getPasswordStrength(pw: string): { score: number; label: string; color: string } {
  if (!pw) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: '', color: '' },
    { label: 'Yếu', color: '#f09595' },
    { label: 'Trung bình', color: '#FAC775' },
    { label: 'Khá mạnh', color: '#82CAFA' },
    { label: 'Mạnh', color: '#1D9E75' },
  ];
  return { score, ...map[score]! };
}

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState<FormData>({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({
    lastName: '', firstName: '', email: '', phone: '', password: '', confirmPassword: '',
  });
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const e: FormErrors = { lastName: '', firstName: '', email: '', phone: '', password: '', confirmPassword: '' };
    if (!form.lastName.trim()) e.lastName = 'Vui lòng nhập họ';
    if (!form.firstName.trim()) e.firstName = 'Vui lòng nhập tên';
    if (!form.email) e.email = 'Vui lòng nhập tên đăng nhập';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email không đúng định dạng';
    if (form.phone && !/^(0[3-9])[0-9]{8}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Số điện thoại không hợp lệ (VD: 0912345678)';
    if (!form.password) e.password = 'Vui lòng nhập mật khẩu';
    else if (form.password.length < 8) e.password = 'Mật khẩu phải có ít nhất 8 ký tự';
    if (!form.confirmPassword) e.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Mật khẩu không khớp';
    setErrors(e);
    return Object.values(e).every((v) => !v);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.terms) { showToast('Vui lòng đồng ý với điều khoản dịch vụ'); return; }
    if (!validate()) return;

    setLoading(true);
    const result = await register({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      password: form.password,
    });
    setLoading(false);

    if (result.success) {
      setSuccess(true);
    } else {
      if (result.message.includes('Email')) {
        setErrors((prev) => ({ ...prev, email: result.message }));
      } else {
        showToast(result.message);
      }
    }
  };

  const strength = getPasswordStrength(form.password);

  const inputCls = (field: keyof FormErrors) =>
    `w-full px-4 py-3 border-[1.5px] rounded-[9px] text-sm text-[#0d1f3c] outline-none transition-colors ${
      errors[field] ? 'border-[#f09595] bg-[#fff8f8]' : 'border-[#dde9f7] focus:border-[#82CAFA] bg-white'
    }`;

  // ── Success screen ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-height-screen flex items-center justify-center min-h-screen bg-[#f5fbff] px-6">
        <div className="bg-white rounded-2xl p-10 max-w-sm w-full text-center border border-[#d6eaff]">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: '#e8f8f0' }}>
            <svg width="38" height="38" fill="none" stroke="#1D9E75" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-[#0d1f3c] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Đăng ký thành công!
          </h2>
          <p className="text-[#7a9ab5] text-sm leading-relaxed mb-6">
            Xin chào <span className="font-semibold text-[#0d1f3c]">{form.firstName} {form.lastName}</span>! 🎉<br/>
            Tài khoản của bạn đã được tạo thành công.<br/>
            Chào mừng bạn đến với <strong>Luxé Beauty</strong>.
          </p>
          <button
            onClick={() => router.push('/sign-in')}
            className="w-full py-3.5 text-white rounded-[10px] font-medium text-[15px] transition-all hover:opacity-90"
            style={{ background: '#82CAFA' }}
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>
    );
  }

  // ── Register form ───────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen bg-white">

      {/* LEFT */}
      <div className="hidden lg:flex flex-col justify-center items-center w-[42%] p-12 relative overflow-hidden"
        style={{ background: '#82CAFA' }}>
        <div className="absolute w-[380px] h-[380px] rounded-full -top-24 -right-20"
          style={{ background: 'rgba(255,255,255,0.12)' }} />
        <div className="absolute w-[260px] h-[260px] rounded-full -bottom-10 -left-16"
          style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-white/40"
            style={{ background: 'rgba(255,255,255,0.25)' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C9.2 2 7 4.2 7 7c0 1.8.9 3.4 2.3 4.4C6.8 12.5 5 14.9 5 17.7V20h14v-2.3c0-2.8-1.8-5.2-4.3-6.3C16.1 10.4 17 8.8 17 7c0-2.8-2.2-5-5-5z" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <p className="text-white text-2xl font-semibold mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Luxé Beauty
          </p>
          <p className="text-white/80 text-[14px] leading-relaxed max-w-[260px] mb-8 font-light">
            Tham gia cộng đồng làm đẹp và khám phá hàng ngàn sản phẩm chính hãng.
          </p>
          {[
            'Mua sắm hàng ngàn sản phẩm chính hãng',
            'Theo dõi đơn hàng theo thời gian thực',
            'Ưu đãi độc quyền cho thành viên',
          ].map((t) => (
            <div key={t} className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border border-white/40"
                style={{ background: 'rgba(255,255,255,0.2)' }}>
                <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              <span className="text-white/85 text-[13.5px]">{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 overflow-y-auto">
        <div className="w-full max-w-[440px]">
          <div className="mb-7">
            <h2 className="text-2xl font-semibold text-[#0d1f3c] mb-1.5" style={{ fontFamily: 'Georgia, serif' }}>
              Tạo tài khoản mới
            </h2>
            <p className="text-[14px] text-[#7a9ab5]">Điền thông tin bên dưới để bắt đầu mua sắm.</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-[12.5px] font-medium text-[#4a6580] mb-1.5">Họ</label>
                <input value={form.lastName} onChange={set('lastName')}
                  placeholder="Nguyễn" className={inputCls('lastName')} />
                {errors.lastName && <p className="text-xs text-[#d85a30] mt-1">{errors.lastName}</p>}
              </div>
              <div>
                <label className="block text-[12.5px] font-medium text-[#4a6580] mb-1.5">Tên</label>
                <input value={form.firstName} onChange={set('firstName')}
                  placeholder="Văn A" className={inputCls('firstName')} />
                {errors.firstName && <p className="text-xs text-[#d85a30] mt-1">{errors.firstName}</p>}
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-[12.5px] font-medium text-[#4a6580] mb-1.5">Tên đăng nhập</label>
              <input type="email" value={form.email} onChange={set('email')}
                placeholder="example@email.com" className={inputCls('email')} />
              {errors.email && <p className="text-xs text-[#d85a30] mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-[12.5px] font-medium text-[#4a6580] mb-1.5">
                Số điện thoại <span className="text-[#a0bcd5] font-normal"></span>
              </label>
              <input type="tel" value={form.phone} onChange={set('phone')}
                placeholder="0912 345 678" className={inputCls('phone')} />
              {errors.phone && <p className="text-xs text-[#d85a30] mt-1">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-[12.5px] font-medium text-[#4a6580] mb-1.5">Mật khẩu</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={form.password}
                  onChange={set('password')} placeholder="Ít nhất 8 ký tự"
                  className={`${inputCls('password')} pr-11`} />
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
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="flex-1 h-[3px] rounded-sm transition-all"
                        style={{ background: i <= strength.score ? strength.color : '#e8f2ff' }} />
                    ))}
                  </div>
                  {strength.label && (
                    <p className="text-[11px] mt-1" style={{ color: strength.color }}>{strength.label}</p>
                  )}
                </div>
              )}
              {errors.password && <p className="text-xs text-[#d85a30] mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="mb-5">
              <label className="block text-[12.5px] font-medium text-[#4a6580] mb-1.5">Xác nhận mật khẩu</label>
              <div className="relative">
                <input type={showPw2 ? 'text' : 'password'} value={form.confirmPassword}
                  onChange={set('confirmPassword')} placeholder="Nhập lại mật khẩu"
                  className={`${inputCls('confirmPassword')} pr-11`} />
                <button type="button" onClick={() => setShowPw2(!showPw2)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a0bcd5] hover:text-[#82CAFA] transition-colors flex items-center">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {showPw2
                      ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>
                      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                    }
                  </svg>
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-[#d85a30] mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 mb-6 cursor-pointer">
              <input type="checkbox" checked={form.terms}
                onChange={set('terms')} className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#82CAFA]" />
              <span className="text-[12.5px] text-[#7a9ab5] leading-relaxed">
                Tôi đồng ý với{' '}
                <span className="text-[#82CAFA] font-medium cursor-pointer hover:text-[#5db8f5]">Điều khoản dịch vụ</span>
                {' '}và{' '}
                <span className="text-[#82CAFA] font-medium cursor-pointer hover:text-[#5db8f5]">Chính sách bảo mật</span>
                {' '}của Luxé Beauty
              </span>
            </label>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full py-3.5 text-white rounded-[10px] text-[15px] font-medium transition-all hover:opacity-90 active:scale-[0.985] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ background: '#82CAFA' }}>
              {loading
                ? <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Đang tạo tài khoản...</>
                : 'Tạo tài khoản'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#e8f2ff]" />
            <span className="text-xs text-[#b0cce0]">hoặc</span>
            <div className="flex-1 h-px bg-[#e8f2ff]" />
          </div>

          <p className="text-center text-[13.5px] text-[#7a9ab5]">
            Đã có tài khoản?{' '}
            <button onClick={() => router.push('/sign-in')}
              className="text-[#82CAFA] font-medium hover:text-[#5db8f5] transition-colors">
              Đăng nhập ngay
            </button>
          </p>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0d1f3c] text-white text-[13.5px] px-6 py-3 rounded-[10px] whitespace-nowrap z-50">
          {toast}
        </div>
      )}
    </div>
  );
}