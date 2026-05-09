import Navbar from '@/components/Navbar';
import './globals.css';
import { Header } from '@/components/layout/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tk">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
