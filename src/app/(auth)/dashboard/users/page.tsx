'use client';

import { useState } from 'react';

const MOCK_USERS = [
  { id: 'u1', firstName: 'Hoa', lastName: 'Nguyễn', email: 'khach@luxebeauty.vn', phone: '0912345678', role: 'customer', status: 'active', joinDate: '2024-01-01' },
  { id: 'u2', firstName: 'Minh', lastName: 'Trần', email: 'nhanvien@luxebeauty.vn', phone: '0987654321', role: 'seller', status: 'active', joinDate: '2024-01-01' },
  { id: 'u3', firstName: 'Anh', lastName: 'Lê', email: 'anhle@gmail.com', phone: '0933445566', role: 'customer', status: 'inactive', joinDate: '2024-03-15' },
  { id: 'u4', firstName: 'Tuấn', lastName: 'Phạm', email: 'tuanp@gmail.com', phone: '0944556677', role: 'customer', status: 'active', joinDate: '2024-03-20' },
];

export default function AdminUsersPage() {
  const [users] = useState(MOCK_USERS);

  return (
    <div className="space-y-10 min-h-screen">
      <div className="flex items-center justify-between bg-white px-8 py-6 rounded-[32px] border border-[#e8f0fc] shadow-sm">
        <div>
          <h1 className="text-[28px] font-black text-[#0d1f3c]" style={{ fontFamily: 'Georgia, serif' }}>Quản lý người dùng</h1>
          <p className="text-[14px] text-[#7a9ab5] font-medium">Xem danh sách, phân quyền và quản lý tài khoản người dùng.</p>
        </div>
        <button className="bg-[#82CAFA] text-white px-8 py-4 rounded-2xl font-bold text-[15px] hover:bg-[#6abdf8] transition-all shadow-xl shadow-[#82CAFA]/20 flex items-center gap-3 active:scale-95">
          <span className="text-xl">+</span>
          Thêm người dùng mới
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-[#e8f0fc] shadow-sm overflow-hidden p-8">
        <div className="flex items-center gap-6 mb-10">
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a9ab5]" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input 
              placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..." 
              className="w-full bg-[#f9fcff] border border-[#e8f2ff] rounded-2xl px-12 py-3.5 outline-none focus:border-[#82CAFA] focus:bg-white transition-all text-[14px]"
            />
          </div>
          <select className="bg-[#f9fcff] border border-[#e8f2ff] rounded-2xl px-6 py-3.5 outline-none focus:border-[#82CAFA] font-bold text-[13px] text-[#4a6580]">
            <option>Tất cả vai trò</option>
            <option>Khách hàng</option>
            <option>Nhân viên</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#f5f8ff] text-[12px] text-[#9eb3c8] font-extrabold uppercase tracking-widest bg-[#fcfdff]">
                <th className="py-5 pl-6">Người dùng</th>
                <th className="py-5">Email & SĐT</th>
                <th className="py-5">Vai trò</th>
                <th className="py-5">Ngày tham gia</th>
                <th className="py-5">Trạng thái</th>
                <th className="py-5 pr-6 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-[#fcfdff] hover:bg-[#f8faff] transition-colors rounded-2xl">
                  <td className="py-6 pl-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#82CAFA] to-[#6abdf8] flex items-center justify-center font-bold text-white shadow-sm border border-white">
                        {u.firstName[0]}
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-[#0d1f3c]">{u.firstName} {u.lastName}</p>
                        <p className="text-[11px] text-[#9eb3c8] font-bold uppercase tracking-wider">ID: {u.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6">
                    <p className="text-[14px] font-bold text-[#4a6580] leading-none mb-1">{u.email}</p>
                    <p className="text-[12px] text-[#9eb3c8] font-medium">{u.phone}</p>
                  </td>
                  <td className="py-6">
                    <span className={`px-4 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider ${
                      u.role === 'seller' ? 'bg-[#f0f7ff] text-[#82CAFA]' : 'bg-[#f8faff] text-[#7a9ab5]'
                    }`}>
                      {u.role === 'seller' ? 'Nhân viên' : 'Khách hàng'}
                    </span>
                  </td>
                  <td className="py-6 text-[13px] font-bold text-[#4a6580]">{u.joinDate}</td>
                  <td className="py-6">
                    <span className={`flex items-center gap-2 text-[12px] font-bold ${u.status === 'active' ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                      <span className={`w-2 h-2 rounded-full ${u.status === 'active' ? 'bg-[#10b981]' : 'bg-[#ef4444]'}`} />
                      {u.status === 'active' ? 'Hoạt động' : 'Bị khóa'}
                    </span>
                  </td>
                  <td className="py-6 pr-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="w-10 h-10 rounded-xl bg-[#f0f7ff] text-[#82CAFA] flex items-center justify-center hover:bg-[#82CAFA] hover:text-white transition-all shadow-sm active:scale-90" title="Chỉnh sửa">
                         ✎
                      </button>
                      <button className="w-10 h-10 rounded-xl bg-[#f8faff] text-[#4a6580] flex items-center justify-center hover:bg-[#0d1f3c] hover:text-white transition-all shadow-sm active:scale-90" title="Phân quyền">
                         🔑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
