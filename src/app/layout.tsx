import type { Metadata } from 'next';
import '@/styles/global.css';
import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'Luxé Beauty — Mỹ phẩm chính hãng',
  description: 'Hệ thống bán mỹ phẩm trực tuyến chính hãng',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}