'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, updateProfile, isLoading } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/sign-in');
    }
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || ''
      });
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    const result = await updateProfile(formData);
    setUpdating(false);
    setMessage(result.message);
    setTimeout(() => setMessage(''), 3000);
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8faff]">
        <div className="w-12 h-12 border-4 border-[#82CAFA]/30 border-t-[#82CAFA] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#f8faff] min-h-screen py-20">
      <div className="max-w-[800px] mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-[#0d1f3c] mb-12" style={{ fontFamily: 'Georgia, serif' }}>Thông tin cá nhân</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Sidebar / Avatar */}
          <div className="bg-white rounded-3xl p-8 border border-[#e8f0fc] shadow-sm flex flex-col items-center gap-6 h-fit">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#82CAFA] to-[#6abdf8] flex items-center justify-center text-5xl font-black text-white shadow-xl shadow-[#82CAFA]/20 border-4 border-white">
              {user.firstName[0]}
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#0d1f3c] mb-1">{user.firstName} {user.lastName}</h3>
              <p className="text-[13px] text-[#9eb3c8] font-bold uppercase tracking-wider">{user.role === 'customer' ? 'Khách hàng thân thiết' : 'Nhân viên'}</p>
            </div>
            <div className="w-full h-px bg-[#f5f8ff]" />
            <div className="w-full space-y-4">
              <button className="w-full text-left px-4 py-3 rounded-xl bg-[#f0f7ff] text-[#82CAFA] font-bold text-[14px]">Hồ sơ của tôi</button>
              <button onClick={() => router.push('/orders')} className="w-full text-left px-4 py-3 rounded-xl text-[#4a6580] hover:bg-[#f5f8ff] transition-all font-bold text-[14px]">Đơn hàng đã đặt</button>
              <button className="w-full text-left px-4 py-3 rounded-xl text-[#4a6580] hover:bg-[#f5f8ff] transition-all font-bold text-[14px]">Thông báo</button>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 space-y-8">
            <form onSubmit={handleSubmit} className="bg-white rounded-[32px] p-8 border border-[#e8f0fc] shadow-sm flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-[#4a6580] ml-1">Họ</label>
                  <input 
                    required
                    value={formData.lastName}
                    onChange={e => setFormData({...formData, lastName: e.target.value})}
                    placeholder="Họ" 
                    className="w-full bg-[#f9fcff] border border-[#e8f2ff] rounded-xl px-4 py-3.5 outline-none focus:border-[#82CAFA] focus:bg-white transition-all text-[14px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-[#4a6580] ml-1">Tên</label>
                  <input 
                    required
                    value={formData.firstName}
                    onChange={e => setFormData({...formData, firstName: e.target.value})}
                    placeholder="Tên" 
                    className="w-full bg-[#f9fcff] border border-[#e8f2ff] rounded-xl px-4 py-3.5 outline-none focus:border-[#82CAFA] focus:bg-white transition-all text-[14px]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#4a6580] ml-1">Địa chỉ Email</label>
                <input 
                  required
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="email@example.com" 
                  className="w-full bg-[#f9fcff] border border-[#e8f2ff] rounded-xl px-4 py-3.5 outline-none focus:border-[#82CAFA] focus:bg-white transition-all text-[14px]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#4a6580] ml-1">Số điện thoại</label>
                <input 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  placeholder="091 xxx xxxx" 
                  className="w-full bg-[#f9fcff] border border-[#e8f2ff] rounded-xl px-4 py-3.5 outline-none focus:border-[#82CAFA] focus:bg-white transition-all text-[14px]"
                />
              </div>

              <div className="pt-4">
                <button 
                  disabled={updating}
                  className="w-full bg-[#82CAFA] text-white py-4 rounded-2xl font-bold text-[15px] hover:bg-[#6abdf8] transition-all shadow-xl shadow-[#82CAFA]/20 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {updating ? (
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : 'Lưu thay đổi'}
                </button>
              </div>
            </form>

            {message && (
              <div className="bg-[#0d1f3c] text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </div>
                <p className="font-bold text-[14px]">{message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
