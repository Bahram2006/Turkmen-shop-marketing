"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User, Home, LayoutGrid } from 'lucide-react'; // Iconlary import edýäris

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo - Professional Icon bilen */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-xl shadow-blue-200">
              <ShoppingBag size={24} color="white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tighter">
              E-BUY<span className="text-blue-600">.</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/" className="flex items-center space-x-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition">
              <Home size={18} />
              <span>Baş sahypa</span>
            </Link>
            
            <Link href="/login" className="flex items-center space-x-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition">
              <User size={18} />
              <span>Giriş</span>
            </Link>

            {/* Cart Button with Count Badge */}
            <Link 
              href="/cart" 
              className="group relative bg-gray-900 text-white px-7 py-3.5 rounded-2xl font-bold text-sm flex items-center space-x-3 hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-200 transition-all active:scale-95"
            >
              <LayoutGrid size={18} className="group-hover:rotate-90 transition-transform duration-500" />
              <span>Söwda Başla</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
