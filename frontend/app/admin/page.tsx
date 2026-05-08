"use client";
import { useState, useEffect } from "react";
import api from "@/services/api";
import { Trash2, Edit, PackagePlus, Loader2, X } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number | string;
  stock_quantity: number;
  image_url: string;
  category_id: number;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
    category_id: 1,
    stock_quantity: 10
  });

  // 1. ESLint säwligini aýyrmak üçin fetch logikasyny useEffect-iň içine salýarys
  useEffect(() => {
    const getProducts = async () => {
      setFetching(true);
      try {
        const res = await api.get("/products");
        const data = res.data.products || res.data;
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Harytlar ýüklenmedi", err);
      } finally {
        setFetching(false);
      }
    };
    getProducts();
  }, []);

  // 2. Täzelemek üçin kömekçi funksiýa
  const refreshData = async () => {
    try {
      const res = await api.get("/products");
      const data = res.data.products || res.data;
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Täzeläp bolmady", err);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/products", formData);
      alert("Haryt üstünlikli goşuldy! 📦");
      setFormData({ name: "", price: "", description: "", image_url: "", category_id: 1, stock_quantity: 10 });
      refreshData();
    } catch (err) {
      alert("Haryt goşup bolmady!");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setLoading(true);
    try {
      await api.put(`/products/${editingProduct.id}`, editingProduct);
      alert("Haryt täzelendi! ✅");
      setEditingProduct(null);
      refreshData();
    } catch (err) {
      alert("Täzeläp bolmady!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hakykatdan hem öçürmek isleýärsiňizmi?")) return;
    try {
      await api.delete(`/products/${id}`);
      refreshData(); 
    } catch (err) {
      alert("Harydy öçürip bolmady!");
    }
  };

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
        Harytlar Dolandyryşy <PackagePlus className="text-blue-600" />
      </h1>

      <form onSubmit={handleAddProduct} className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-50 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Täze Haryt Goş</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input required value={formData.name} placeholder="Harydyň ady" className="p-4 bg-gray-50 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input required value={formData.price} type="number" placeholder="Bahasy ($)" className="p-4 bg-gray-50 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all" onChange={(e) => setFormData({...formData, price: e.target.value})} />
        </div>
        <button disabled={loading} className="w-full bg-blue-600 text-white p-5 rounded-3xl font-black text-xl hover:bg-black transition-all shadow-xl disabled:bg-gray-400">
          {loading ? <Loader2 className="animate-spin mx-auto" /> : "Harydy Goş 🚀"}
        </button>
      </form>

      <div className="bg-white rounded-[40px] shadow-xl border border-gray-50 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-6 font-black text-gray-600 uppercase text-[10px] tracking-widest">Haryt</th>
              <th className="p-6 font-black text-gray-600 uppercase text-[10px] tracking-widest">Baha</th>
              <th className="p-6 font-black text-gray-600 uppercase text-[10px] tracking-widest text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {fetching ? (
              <tr><td colSpan={3} className="p-20 text-center text-gray-400 font-bold italic animate-pulse">Ýüklenýär...</td></tr>
            ) : products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50/50 transition-all group">
                <td className="p-6 font-bold text-gray-800">{p.name}</td>
                <td className="p-6 font-black text-blue-600">${Number(p.price).toFixed(2)}</td>
                <td className="p-6 text-right space-x-2">
                  <button onClick={() => setEditingProduct(p)} className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(p.id)} className="p-3 bg-gray-100 text-gray-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden relative">
            <button onClick={() => setEditingProduct(null)} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition-all"><X size={24} /></button>
            <form onSubmit={handleUpdateProduct} className="p-10 space-y-6">
              <h2 className="text-3xl font-black text-gray-900 mb-8">Harydy Düzet</h2>
              <div className="space-y-4">
                <input required value={editingProduct.name} className="w-full p-5 bg-gray-50 border-none rounded-2xl outline-none focus:ring-4 focus:ring-blue-100" onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} />
                <input required type="number" value={editingProduct.price} className="w-full p-5 bg-gray-50 border-none rounded-2xl outline-none focus:ring-4 focus:ring-blue-100" onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} />
                <textarea value={editingProduct.description} className="w-full p-5 bg-gray-50 border-none rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 min-h-[120px]" onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})} />
              </div>
              <button disabled={loading} className="w-full bg-blue-600 text-white p-5 rounded-3xl font-black text-xl hover:bg-black transition-all">
                {loading ? "Täzelenýär..." : "Üýtgeşmeleri Ýatda Sakla ✅"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
