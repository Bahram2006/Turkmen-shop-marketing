"use client";
import { useEffect, useState, useCallback } from 'react';
import api from '../services/api';
import { Plus, Search } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState(""); // Gözleg sözi

  // Harytlary çekmek funksiýasy (Gözleg sözüni hem alýar)
  const fetchProducts = useCallback(async (search = "") => {
    setLoading(true);
    try {
      // Backend-däki ?search=... parametrini ulanýarys
      const response = await api.get(`/products?search=${search}`);
      const fetchedProducts = response.data.products || response.data;
      setProducts(Array.isArray(fetchedProducts) ? fetchedProducts : []);
    } catch (error) {
      console.error("Harytlary alyp bolmady", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debouncing: Ulanyjy ýazyp bolandan 500ms soň gözleýär
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, fetchProducts]);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section (Öňki kod bilen birmeňzeş) */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
             <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter">
              Geljege <span className="text-blue-600">Ädim</span> Ät.
            </h1>
            
            {/* GÖZLEG MEÝDANÇASY (Täze goşuldy) */}
            <div className="max-w-2xl mx-auto relative mt-10">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input 
                type="text"
                placeholder="Haryt gözle... (Meselem: iPhone, Samsung)"
                className="w-full p-6 pl-16 bg-gray-50 border border-gray-100 rounded-[32px] outline-none focus:ring-4 focus:ring-blue-100 transition-all text-xl font-medium shadow-xl shadow-blue-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
        </div>
      </section>

      {/* Harytlar Sanawy */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <h2 className="text-3xl font-black text-gray-900 mb-10">
          {searchTerm ? `'${searchTerm}' boýunça netijeler` : "Meşhur Harytlar"}
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-gray-100 animate-pulse h-[400px] rounded-[40px]"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="group bg-white rounded-[40px] p-4 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative">
                  <div className="relative aspect-square overflow-hidden rounded-[32px] bg-gray-50 mb-6">
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="px-2 pb-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{product.name}</h3>
                    <p className="text-2xl font-black text-blue-600">${Number(product.price).toFixed(2)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-400 text-xl font-bold">Gözlegiňize görä haryt tapylmady. 📦</p>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
