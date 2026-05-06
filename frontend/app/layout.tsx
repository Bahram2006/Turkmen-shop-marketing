import Navbar from '@/components/Navbar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tk">
      <body>
        <Navbar /> {/* Bu setiriň barlygyny barla */}
        {children}
      </body>
    </html>
  );
}
