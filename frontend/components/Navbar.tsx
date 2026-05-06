"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Baş sahypa', href: '/' },
    { name: 'Sebet', href: '/cart' },
    { name: 'Login', href: '/login' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-blue-200">
              <span className="text-white text-xl">🛒</span>
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tighter">
              E-BUY<span className="text-blue-600">.</span>
            </span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-bold transition-all duration-200 hover:text-blue-600 ${
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {/* Action Button */}
            <Link 
              href="/cart" 
              className="relative bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-95"
            >
              Söwda Başla
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
