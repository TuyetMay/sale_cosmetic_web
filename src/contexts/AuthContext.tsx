'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────
export type UserRole = 'customer' | 'seller';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
    role: UserRole
  ) => Promise<{ success: boolean; message: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message: string }>;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
}

// ─── Hardcoded seed accounts ────────────────────────────────────────────────
const SEED_ACCOUNTS: Array<User & { password: string }> = [
  {
    id: 'u_customer_1',
    firstName: 'Hoa',
    lastName: 'Nguyễn',
    email: 'khach@luxebeauty.vn',
    phone: '0912345678',
    role: 'customer',
    password: 'khach123',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'u_seller_1',
    firstName: 'Minh',
    lastName: 'Trần',
    email: 'nhanvien@luxebeauty.vn',
    phone: '0987654321',
    role: 'seller',
    password: 'nv2024',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

// ─── Storage helpers ─────────────────────────────────────────────────────────
const STORAGE_KEYS = {
  currentUser: 'lb_current_user',
  users: 'lb_users',
} as const;

function getStoredUsers(): Array<User & { password: string }> {
  if (typeof window === 'undefined') return SEED_ACCOUNTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.users);
    if (!raw) return SEED_ACCOUNTS;
    const stored: Array<User & { password: string }> = JSON.parse(raw);
    // Merge: seed accounts always present (by id), add registered users
    const ids = new Set(SEED_ACCOUNTS.map((u) => u.id));
    const extra = stored.filter((u) => !ids.has(u.id));
    return [...SEED_ACCOUNTS, ...extra];
  } catch {
    return SEED_ACCOUNTS;
  }
}

function saveUsers(users: Array<User & { password: string }>) {
  if (typeof window === 'undefined') return;
  // Only save the non-seed users (no need to duplicate seeds)
  const seedIds = new Set(SEED_ACCOUNTS.map((u) => u.id));
  const extra = users.filter((u) => !seedIds.has(u.id));
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(extra));
}

function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.currentUser);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function saveCurrentUser(user: User | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(getStoredUser());
    setIsLoading(false);
  }, []);

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = async (
    email: string,
    password: string,
    role: UserRole
  ): Promise<{ success: boolean; message: string }> => {
    await new Promise((r) => setTimeout(r, 800)); // simulate network

    const allUsers = getStoredUsers();
    const found = allUsers.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password &&
        u.role === role
    );

    if (!found) {
      return { success: false, message: 'Email hoặc mật khẩu không chính xác' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw, ...safeUser } = found;
    setUser(safeUser);
    saveCurrentUser(safeUser);
    return { success: true, message: `Chào mừng ${safeUser.firstName}!` };
  };

  // ── Register ───────────────────────────────────────────────────────────────
  const register = async (
    data: RegisterData
  ): Promise<{ success: boolean; message: string }> => {
    await new Promise((r) => setTimeout(r, 1000)); // simulate network

    const allUsers = getStoredUsers();
    const exists = allUsers.some(
      (u) => u.email.toLowerCase() === data.email.toLowerCase()
    );

    if (exists) {
      return { success: false, message: 'Email này đã được sử dụng' };
    }

    const newUser: User & { password: string } = {
      id: `u_customer_${Date.now()}`,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      role: 'customer',
      password: data.password,
      createdAt: new Date().toISOString(),
    };

    saveUsers([...allUsers, newUser]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw, ...safeUser } = newUser;
    setUser(safeUser);
    saveCurrentUser(safeUser);
    return { success: true, message: 'Tài khoản được tạo thành công!' };
  };

  // ── Update Profile ────────────────────────────────────────────────────────
  const updateProfile = async (
    data: Partial<User>
  ): Promise<{ success: boolean; message: string }> => {
    await new Promise((r) => setTimeout(r, 800)); // simulate network

    if (!user) return { success: false, message: 'Bạn chưa đăng nhập' };

    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    saveCurrentUser(updatedUser);
    
    // Also update in users list if it was a registered user
    const allUsers = getStoredUsers();
    const userIndex = allUsers.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      allUsers[userIndex] = { ...allUsers[userIndex], ...data } as User & { password: string };
      saveUsers(allUsers);
    }
    
    return { success: true, message: 'Cập nhật thông tin thành công!' };
  };

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = () => {
    setUser(null);
    saveCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}