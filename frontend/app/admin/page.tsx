"use client";
import { useState, useEffect } from "react";
import api from "@/services/api";
import { Trash2, Edit, PackagePlus, Loader2 } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number | string;
  stock_quantity: number;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
    category_id: 1,
    stock_quantity: 10
  });

  // 1. ESLint Säwligini aýyrmak üçin funksiýany useEffect-iň içine salýarys
  useEffect(() => {
    const loadProducts = async () => {
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

    loadProducts();
  }, []); // Diňe sahypa açylanda 1 gezek işlär

  // 2. Täze haryt goşandan soň sanawy täzelemek üçin aýratyn funksiýa
  const refreshProducts = async () => {
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
      refreshProducts(); // Täzelemek
    } catch (err) {
      alert("Haryt goşup bolmady!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hakykatdan hem öçürmek isleýärsiňizmi?")) return;
    try {
      await api.delete(`/products/${id}`);
      refreshProducts(); 
    } catch (err) {
      alert("Harydy öçürip bolmady!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 p-6">
      <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
        Admin Dashboard <PackagePlus className="text-blue-600" />
      </h1>

      {/* FORM BÖLÜMI */}
      <form onSubmit={handleAddProduct} className="bg-white p-10 rounded-[40px] shadow-2xl border border-gray-50 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Täze Haryt Goş</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input required value={formData.name} placeholder="Harydyň ady" className="p-4 bg-gray-50 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input required value={formData.price} type="number" placeholder="Bahasy ($)" className="p-4 bg-gray-50 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all" onChange={(e) => setFormData({...formData, price: e.target.value})} />
        </div>
        <textarea value={formData.description} placeholder="Haryt barada maglumat..." className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all min-h-[100px]" onChange={(e) => setFormData({...formData, description: e.target.value})} />
        <input value={formData.image_url} placeholder="Surat URL" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all" onChange={(e) => setFormData({...formData, image_url: e.target.value})} />
        
        <button disabled={loading} className="w-full bg-blue-600 text-white p-5 rounded-3xl font-black text-xl hover:bg-black transition-all shadow-xl disabled:bg-gray-400">
          {loading ? <Loader2 className="animate-spin mx-auto" /> : "Harydy Goş 🚀"}
        </button>
      </form>

      {/* TABLISA BÖLÜMI */}
      <div className="bg-white rounded-[40px] shadow-xl border border-gray-50 overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-2xl font-bold text-gray-800">Harytlar Sanawy</h2>
          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase">Jemi: {products.length}</span>
        </div>
        
        <div className="overflow-x-auto">
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
                <tr><td colSpan={3} className="p-20 text-center text-gray-400 font-bold italic animate-pulse">Maglumatlar çekilýär...</td></tr>
              ) : products.length > 0 ? (
                products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-all group">
                    <td className="p-6 font-bold text-gray-800">{p.name}</td>
                    <td className="p-6 font-black text-blue-600">${Number(p.price).toFixed(2)}</td>
                    <td className="p-6 text-right space-x-2">
                      <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={3} className="p-20 text-center text-gray-400 font-bold italic">Entek haryt ýok.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
