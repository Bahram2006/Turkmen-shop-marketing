"use client";
import { motion } from "framer-motion";
import { 
  Users, 
  UserCheck, 
  Mail, 
  ShieldCheck, 
  Search, 
  MoreHorizontal, 
  Star,
  ArrowUpRight,
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// DUMMY CUSTOMERS (Müşderiler üçin)
const CUSTOMERS = [
  { id: 1, name: "Aman Amanow", email: "aman@mail.com", orders: 12, total_spent: 4500.50, status: "VIP", role: "customer" },
  { id: 2, name: "Merdan Berdiýew", email: "merdan@mail.com", orders: 5, total_spent: 1200.00, status: "Active", role: "customer" },
  { id: 3, name: "Selbi Gurbanowa", email: "selbi@mail.com", orders: 28, total_spent: 8900.00, status: "VIP", role: "admin" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Müşderiler.</h1>
          <p className="text-gray-400 font-medium italic text-sm">Ähli ulanyjylar we olaryň söwda işjeňligi.</p>
        </div>
        <Button size="lg" className="rounded-2xl h-16 shadow-2xl shadow-blue-100">
          <UserPlus size={20} className="mr-2" /> Täze Ulanyjy
        </Button>
      </header>

      {/* CRM Stats Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Jemi Ulanyjy", count: "1,240", icon: Users, color: "text-blue-600 bg-blue-50" },
          { label: "VIP Müşderiler", count: "84", icon: Star, color: "text-amber-600 bg-amber-50" },
          { label: "Täze (Şu aý)", count: "+125", icon: ArrowUpRight, color: "text-emerald-600 bg-emerald-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-gray-50 flex items-center gap-6 shadow-sm">
            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", stat.color)}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{stat.count}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Luxury Users Table */}
      <div className="bg-white rounded-[40px] border border-gray-50 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 bg-gray-50/30">
          <div className="relative max-w-md group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input 
              placeholder="Müşderi ady ýa-da email..."
              className="w-full p-5 pl-16 bg-white rounded-3xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="p-8 font-black text-[10px] uppercase tracking-widest text-gray-400">Ulanyjy</th>
                <th className="p-8 font-black text-[10px] uppercase tracking-widest text-gray-400">Sargytlar</th>
                <th className="p-8 font-black text-[10px] uppercase tracking-widest text-gray-400">Jemi Töleg</th>
                <th className="p-8 font-black text-[10px] uppercase tracking-widest text-gray-400 text-center">Status</th>
                <th className="p-8 font-black text-[10px] uppercase tracking-widest text-gray-400 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {CUSTOMERS.map((user) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50/50 transition-all group"
                >
                  <td className="p-8">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center font-black text-blue-600 text-lg border border-gray-50 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                        {user.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 flex items-center gap-2">
                          {user.name}
                          {user.role === 'admin' && <ShieldCheck size={14} className="text-blue-600" />}
                        </h4>
                        <p className="text-xs text-gray-400 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-2 font-bold text-gray-700">
                      <UserCheck size={14} className="text-gray-300" />
                      {user.orders} sargyt
                    </div>
                  </td>
                  <td className="p-8">
                    <span className="font-black text-gray-900 text-lg tracking-tighter">
                      ${user.total_spent.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-8 text-center">
                    <span className={cn(
                      "px-4 py-1.5 rounded-full text-[10px] font-black uppercase border",
                      user.status === 'VIP' ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-blue-50 text-blue-600 border-blue-100"
                    )}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-8 text-right">
                    <button className="p-4 text-gray-300 hover:text-gray-900 hover:bg-white rounded-2xl transition-all shadow-sm">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
