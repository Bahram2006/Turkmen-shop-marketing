"use client";
import { useEffect, useState } from 'react';
import api from '../services/api';

// 1. Harydyň görnüşini (Type) kesgitleýäris
interface Product {
  id: number;
  name: string;
  description: string;
  price: number | string;
  image_url: string;
}

export default function Home() {
  // 2. useState-e harytlaryň sanawydygyny (Product[]) aýdýarys
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Harytlary alyp bolmady", error);
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
            Iň täze Apple, Samsung we beýleki dünýä markalary indi siziň gapyňyzda. Arassa dizaýn, çalt eltip bermek.
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
      
      {/* Arka tarapdaky owadan gradiant tegelekler */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
    </section>

    {/* Harytlar Sanawy (Öňki grid-iň şu ýerde dowam eder) */}
    <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
       <h2 className="text-3xl font-black text-gray-900 mb-10">Meşhur Harytlar ✨</h2>
       {/* Öňki products.map dowam edýär... */}
    </section>
  </main>
);

}
