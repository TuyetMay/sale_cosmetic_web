import '@/styles/global.css';
import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';


export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}