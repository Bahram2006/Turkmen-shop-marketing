"use client";
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Plus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

// 1. Harydyň görnüşini takyk kesgitleýäris
interface Product {
  id: number;
  name: string;
  description: string;
  price: number | string;
  image_url: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        
        // Backend-den gelýän täze structure: { success: true, products: [], pagination: {} }
        // Şonuň üçin 'response.data.products' ulanýarys
        const fetchedProducts = response.data.products || response.data;
        setProducts(Array.isArray(fetchedProducts) ? fetchedProducts : []);
      } catch (error) {
        console.error("Harytlary alyp bolmady", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block py-2 px-4 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest mb-6">
              Täze Nesil Tehnologiýalar 🚀
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-none">
              Geljege <span className="text-blue-600">Ädim</span> Ät.
            </h1>
            <p className="text-xl text-gray-500 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
              Iň täze Apple, Samsung we beýleki dünýä markalary indi siziň gapyňyzda.
              Arassa dizaýn, çalt eltip bermek.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button className="w-full md:w-auto bg-blue-600 text-white px-10 py-5 rounded-3xl font-black text-lg hover:bg-black transition-all shadow-2xl shadow-blue-200 active:scale-95">
                Harytlary Gör
              </button>
              <button className="w-full md:w-auto bg-white text-gray-900 border-2 border-gray-100 px-10 py-5 rounded-3xl font-black text-lg hover:bg-gray-50 transition-all">
                Biz Barada
              </button>
            </div>
          </div>
        </div>
        
        {/* Dekoratiw Gradiantlar */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
      </section>

      {/* Harytlar Sanawy */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">
              Meşhur Harytlar <span className="text-blue-600">✨</span>
            </h2>
            <p className="text-gray-400 font-bold mt-2">Iň köp satylýan harytlar</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 font-bold text-gray-400">Harytlar ýüklenýär... 🔄</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <div 
                  key={product.id} 
                  className="group bg-white rounded-[40px] p-4 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative"
                >
                  {/* Haryt Suraty */}
                  <div className="relative aspect-square overflow-hidden rounded-[32px] bg-gray-50 mb-6">
                    <img 
                      src={product.image_url || 'https://placeholder.com'} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Çalt Goş Düwmesi */}
                    <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-600 hover:text-white">
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Haryt Maglumaty */}
                  <div className="px-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-black text-blue-600">
                        ${Number(product.price).toFixed(2)}
                      </p>
                      <span className="text-[10px] font-black bg-gray-100 px-3 py-1 rounded-full uppercase tracking-tighter text-gray-500">
                        In Stock
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed">
                <p className="text-gray-400 font-bold">Haryt tapylmady. 📦</p>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
