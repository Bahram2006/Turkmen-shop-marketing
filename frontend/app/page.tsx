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
    <main className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        E-Buy Online Dükanymyz 🛒
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white border p-4 rounded-xl shadow-sm hover:shadow-md transition">
            <img 
              src={product.image_url || 'https://placeholder.com'} 
              alt={product.name} 
              className="w-full h-48 object-cover mb-4 rounded-lg" 
            />
            <h2 className="text-lg font-semibold truncate">{product.name}</h2>
            <p className="text-gray-500 text-sm my-2 line-clamp-2 h-10">{product.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-bold text-green-600">${product.price}</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                Sebete goş
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
