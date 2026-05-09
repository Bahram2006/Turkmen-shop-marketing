"use client";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/Button";

// DUMMY DATA (Statistika üçin)
const STATS = [
  { id: 1, label: "Jemi Söwda", value: "$12,450.00", trend: "+12.5%", isUp: true, icon: DollarSign, color: "bg-blue-600" },
  { id: 2, label: "Sargytlar", value: "154", trend: "+3.2%", isUp: true, icon: ShoppingBag, color: "bg-purple-600" },
  { id: 3, label: "Müşderiler", value: "1,240", trend: "-1.5%", isUp: false, icon: Users, color: "bg-orange-600" },
  { id: 4, label: "Aýlyk Girdeji", value: "$3,200.00", trend: "+8.4%", isUp: true, icon: TrendingUp, color: "bg-emerald-600" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Dashboard.</h1>
          <p className="text-gray-400 font-medium italic text-sm">Dükanymyzyň häzirki ýagdaýy we görkezijileri.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="sm">Hasabat al</Button>
          <Button size="sm">Täze Haryt +</Button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-500 group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg shadow-gray-100 group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-black ${stat.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[2px] text-gray-400">{stat.label}</p>
              <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content: Recent Orders & Analytics Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Soňky Sargytlar (Clean Table) */}
        <div className="lg:col-span-8 bg-white rounded-[40px] border border-gray-50 shadow-sm overflow-hidden p-10">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Soňky Sargytlar.</h2>
            <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">Ählisini Gör</button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((order) => (
              <div key={order} className="flex items-center justify-between p-6 bg-gray-50/50 rounded-3xl border border-transparent hover:border-gray-100 hover:bg-white transition-all duration-300">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-gray-400 border border-gray-50 shadow-sm">
                    #{order}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Aman Amanow</h4>
                    <p className="text-xs text-gray-400 font-medium">iPhone 15 Pro Max • 12.05.2024</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-black text-gray-900">$1,399.00</p>
                  <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase border border-amber-100">Pending</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="lg:col-span-4 bg-gray-900 rounded-[40px] p-10 text-white shadow-2xl shadow-blue-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-[80px] opacity-20" />
          <h2 className="text-2xl font-black tracking-tight mb-10">Işjeňlik.</h2>
          <div className="space-y-8">
            {[
              { time: "2 sag öň", msg: "Täze ulanyjy hasaba durdy", icon: Clock },
              { time: "5 sag öň", msg: "Haryt stogy azaldy: AirPods", icon: ShoppingBag },
              { time: "8 sag öň", msg: "Sargyt #154 gowşuryldy", icon: TrendingUp },
            ].map((act, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <act.icon size={18} />
                  </div>
                  {i !== 2 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-white/10" />}
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-400">{act.time}</p>
                  <p className="text-sm font-bold text-gray-200">{act.msg}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-12 border-white/10 text-white hover:bg-white hover:text-gray-900">
            Loglary Gör
          </Button>
        </div>
      </div>
    </div>
  );
}
