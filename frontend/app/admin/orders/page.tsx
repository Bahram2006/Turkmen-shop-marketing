"use client";
import { motion } from "framer-motion";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  Search, 
  Filter, 
  Eye, 
  Download,
  CreditCard,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// DUMMY ORDERS (Sargytlar üçin)
const ORDERS = [
  { id: "EB-9942", user: "Aman Amanow", total: 1399.00, status: "pending", date: "12.05.2024", address: "Aşgabat, Magtymguly şaýoly 45" },
  { id: "EB-9941", user: "Merdan Berdiýew", total: 549.00, status: "shipping", date: "11.05.2024", address: "Mary, Bitaraplyk köçesi 12" },
  { id: "EB-9940", user: "Gurban Gurbanow", total: 2800.50, status: "delivered", date: "10.05.2024", address: "Türkmenabat, Garaşsyzlyk şaýoly 10" },
];

export default function AdminOrdersPage() {
  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Sargytlar.</h1>
          <p className="text-gray-400 font-medium italic text-sm">Gelen sargytlar we eltip bermek hyzmatyna gözegçilik.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="lg" className="rounded-2xl h-16">
            <Download size={18} className="mr-2" /> Hasabaty Al
          </Button>
        </div>
      </header>

      {/* Stats Preview (Quick Look) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Täze", count: 12, color: "bg-amber-50 text-amber-600", icon: Clock },
          { label: "Ýolda", count: 8, color: "bg-blue-50 text-blue-600", icon: Truck },
          { label: "Gowşuryldy", count: 145, color: "bg-emerald-50 text-emerald-600", icon: CheckCircle },
        ].map((stat, i) => (
          <div key={i} className={cn("p-6 rounded-[32px] flex items-center justify-between border border-transparent", stat.color)}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm"><stat.icon size={20} /></div>
              <span className="font-black uppercase text-[10px] tracking-widest">{stat.label}</span>
            </div>
            <span className="text-3xl font-black tracking-tighter">{stat.count}</span>
          </div>
        ))}
      </div>

      {/* Order List Table */}
      <div className="bg-white rounded-[40px] border border-gray-50 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between gap-6">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600" size={18} />
            <input 
              placeholder="Sargyt ID ýa-da at boýunça..."
              className="w-full p-5 pl-16 bg-gray-50 rounded-3xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-sm"
            />
          </div>
          <Button variant="ghost" className="rounded-2xl h-14 px-8 border border-gray-100">
            <Filter size={18} className="mr-2" /> Süzgüçler
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="p-8 font-black text-[10px] uppercase tracking-widest text-gray-400">Sargyt / Ulanyjy</th>
                <th className="p-8 font-black text-[10px] uppercase tracking-widest text-gray-400">Jemi Baha</th>
                <th className="p-8 font-black text-[10px] uppercase tracking-widest text-gray-400 text-center">Yagdayy</th>
                <th className="p-8 font-black text-[10px] uppercase tracking-widest text-gray-400">Salgy</th>
                <th className="p-8 font-black text-[10px] uppercase tracking-widest text-gray-400 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ORDERS.map((order) => (
                <motion.tr 
                  key={order.id} 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-gray-100 text-gray-400 group-hover:text-blue-600 transition-colors">
                        <Package size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{order.id}</h4>
                        <p className="text-xs text-gray-400 font-medium">{order.user}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-2 font-black text-gray-900">
                      <CreditCard size={14} className="text-gray-300" />
                      ${order.total.toFixed(2)}
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{order.date}</p>
                  </td>
                  <td className="p-8 text-center">
                    <span className={cn(
                      "px-4 py-1.5 rounded-full text-[10px] font-black uppercase border",
                      order.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      order.status === 'shipping' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      'bg-emerald-50 text-emerald-600 border-emerald-100'
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-8 max-w-[200px]">
                    <div className="flex items-start gap-2 text-xs text-gray-500 font-medium leading-relaxed">
                      <MapPin size={14} className="mt-0.5 text-gray-300 flex-shrink-0" />
                      <span className="truncate">{order.address}</span>
                    </div>
                  </td>
                  <td className="p-8 text-right space-x-2">
                    <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                      <Eye size={18} />
                    </button>
                    <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-black hover:text-white transition-all shadow-sm">
                      <Truck size={18} />
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
