"use client";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { ShoppingCart, User, LogOut, LayoutDashboard, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
            <ShoppingBag size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-gray-900">E-BUY.</span>
        </Link>

        {/* Links & Auth */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-bold text-gray-500 hover:text-blue-600 transition">Baş sahypa</Link>
          
          {user ? (
            <div className="flex items-center gap-4 border-l pl-6 border-gray-100">
              {/* Admin bolsa Dashboard linki */}
              {user.role === 'admin' && (
                <Link href="/admin" className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl text-xs font-black uppercase text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition">
                  <LayoutDashboard size={14} /> Admin
                </Link>
              )}

              {/* Sebet Linki */}
              <Link href="/cart" className="relative p-2 text-gray-400 hover:text-blue-600 transition">
                <ShoppingCart size={22} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">3</span>
              </Link>

              {/* Ulanyjy Ady we Logout */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                  {user.full_name[0]}
                </div>
                <span className="text-sm font-bold text-gray-700">{user.full_name.split(' ')[0]}</span>
                <button onClick={logout} className="ml-2 text-gray-300 hover:text-red-500 transition">
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          ) : (
            <Link href="/login" className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-black transition-all shadow-xl shadow-blue-100">
              Giriş 🚀
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
