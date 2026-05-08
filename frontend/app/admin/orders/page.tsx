"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { Package, Truck, CheckCircle, Clock, Loader2 } from "lucide-react";

interface Order {
  id: number;
  full_name: string;
  total_price: string;
  status: string;
  address: string;
  created_at: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Sahypa ýüklenende sargytlary çekmek (ESLint düzedişi)
  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const res = await api.get("/orders");
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Sargytlar ýüklenmedi", err);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  // 2. Status täzelenende sanawy täzelemek üçin kömekçi funksiýa
  const refreshOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Täzeläp bolmady", err);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      await api.patch(`/orders/${id}/status`, { status: newStatus });
      refreshOrders(); // Sanawy täzeleýäris
    } catch (err) {
      alert("Statusy üýtgedip bolmady!");
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'shipping': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'delivered': return 'bg-green-50 text-green-600 border-green-100';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="space-y-10 p-2">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
          Sargytlar Gözegçiligi <Package className="text-blue-600" />
        </h1>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-50 font-bold text-gray-400 uppercase text-[10px] tracking-widest">
          Jemi: {orders.length} sargyt
        </div>
      </div>

      <div className="bg-white rounded-[40px] shadow-xl border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-6 font-black text-gray-400 uppercase text-[10px] tracking-widest">Sargyt / Ulanyjy</th>
                <th className="p-6 font-black text-gray-400 uppercase text-[10px] tracking-widest">Jemi Baha</th>
                <th className="p-6 font-black text-gray-400 uppercase text-[10px] tracking-widest text-center">Yagdayy</th>
                <th className="p-6 font-black text-gray-400 uppercase text-[10px] tracking-widest text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-blue-600 w-10 h-10" />
                    <p className="mt-4 text-gray-400 font-bold italic">Sargytlar ýüklenýär...</p>
                  </td>
                </tr>
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-all group">
                    <td className="p-6">
                      <div className="font-bold text-gray-900">#{order.id}</div>
                      <div className="text-xs text-gray-400 font-medium">{order.full_name}</div>
                    </td>
                    <td className="p-6">
                      <div className="font-black text-gray-900">${Number(order.total_price).toFixed(2)}</div>
                      <div className="text-[10px] text-gray-300 truncate max-w-[150px]">{order.address}</div>
                    </td>
                    <td className="p-6 text-center">
                      <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase border ${getStatusStyle(order.status)}`}>
                        {order.status === 'pending' && <Clock size={10} className="inline mr-1 mb-0.5" />}
                        {order.status}
                      </span>
                    </td>
                    <td className="p-6 text-right space-x-2">
                      <button 
                        onClick={() => updateStatus(order.id, 'shipping')} 
                        className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        title="Yola cykdy"
                      >
                        <Truck size={16} />
                      </button>
                      <button 
                        onClick={() => updateStatus(order.id, 'delivered')} 
                        className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm"
                        title="Gowshuryldy"
                      >
                        <CheckCircle size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-20 text-center text-gray-400 font-bold italic">
                    Entek sargyt ýok. 📦
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
