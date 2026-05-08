"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Settings, 
  LogOut, 
  Store 
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function AdminSidebar() {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Harytlar", href: "/admin/products", icon: Package },
    { name: "Sargytlar", href: "/admin/orders", icon: ShoppingCart },
    { name: "Sazlamalar", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="w-72 bg-white min-h-screen border-r border-gray-100 flex flex-col p-6 sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="bg-blue-600 p-2 rounded-xl text-white">
          <Store size={24} />
        </div>
        <span className="text-2xl font-black tracking-tighter text-gray-900">E-BUY.</span>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${
                isActive 
                  ? "bg-blue-50 text-blue-600 shadow-sm" 
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon size={22} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button 
        onClick={logout}
        className="flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-red-400 hover:bg-red-50 hover:text-red-600 transition-all mt-auto"
      >
        <LogOut size={22} />
        Ulgamdan çyk
      </button>
    </div>
  );
}
