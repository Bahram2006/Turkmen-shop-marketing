"use client";
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 p-4 flex justify-between items-center px-6 md:px-12 sticky top-0 z-50">
      <Link href="/" className="text-2xl font-black text-blue-600 tracking-tighter">
        E-BUY <span className="text-gray-900">🛒</span>
      </Link>
      
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-gray-600 hover:text-blue-600 font-semibold transition">
          Baş sahypa
        </Link>
        <Link href="/login" className="text-gray-600 hover:text-blue-600 font-semibold transition">
          Giriş
        </Link>
        <Link href="/cart" className="bg-blue-600 text-white px-5 py-2.5 rounded-2xl font-bold hover:bg-black transition-all shadow-md shadow-blue-100">
          Sebet
        </Link>
      </div>
    </nav>
  );
}
