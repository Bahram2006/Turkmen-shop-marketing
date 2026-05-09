"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  Store,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const MENU_ITEMS = [
  { id: "dash", label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { id: "prod", label: "Harytlar", href: "/admin/products", icon: Package },
  { id: "ord", label: "Sargytlar", href: "/admin/orders", icon: ShoppingBag },
  { id: "cust", label: "Müşderiler", href: "/admin/users", icon: Users },
  { id: "sett", label: "Sazlamalar", href: "/admin/settings", icon: Settings },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-80 h-screen sticky top-0 bg-white border-r border-gray-50 flex flex-col p-8 transition-all duration-500">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-2 mb-16">
        <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-xl shadow-blue-100">
          <Store size={22} strokeWidth={2.5} />
        </div>
        <span className="text-2xl font-black tracking-tighter text-gray-900 uppercase italic">E-BUY.</span>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 space-y-2">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.id} href={item.href} className="relative group block">
              <div className={cn(
                "flex items-center justify-between px-6 py-5 rounded-[24px] font-bold transition-all duration-500",
                isActive 
                  ? "bg-blue-600 text-white shadow-2xl shadow-blue-200" 
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
              )}>
                <div className="flex items-center gap-4">
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[13px] tracking-tight">{item.label}</span>
                </div>
                {isActive && (
                  <motion.div layoutId="arrow">
                    <ChevronRight size={16} strokeWidth={3} />
                  </motion.div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile/Logout */}
      <div className="mt-auto pt-8 border-t border-gray-50 space-y-6">
        <div className="flex items-center gap-4 px-2">
          <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center font-black text-blue-600 text-lg border border-gray-50">
            A
          </div>
          <div>
            <h4 className="font-black text-gray-900 text-sm">Admin Panel</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Baş Dolandyryjy</p>
          </div>
        </div>
        
        <button className="w-full flex items-center gap-4 px-6 py-5 rounded-[24px] font-black text-xs uppercase tracking-[2px] text-red-400 hover:bg-red-50 hover:text-red-600 transition-all">
          <LogOut size={18} />
          Ulgamdan Çyk
        </button>
      </div>
    </aside>
  );
};
