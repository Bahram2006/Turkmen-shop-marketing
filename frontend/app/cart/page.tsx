"use client";

import { useEffect, useState, useCallback } from 'react';
import api from '../../services/api';
import { useRouter } from 'next/navigation';

interface CartItem {
  cart_id: number;
  name: string;
  price: string;
  quantity: number;
  total_item_price: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 1. fetchCart funksiýasyny useCallback bilen goraýarys
  const fetchCart = useCallback(async () => {
    try {
      const response = await api.get('/cart');
      // Backend-den gelýän maglumatyň items sanawydygyna göz ýetirýäris
      const items = response.data.items || response.data || [];
      setCartItems(items);
    } catch (error) {
      console.error("Sebeti alyp bolmady", error);
    }
  }, []);

  // 2. useEffect indi diňe bir gezek we ygtybarly işleýär
  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      if (isMounted) {
        await fetchCart();
      }
    };

    loadData();
    
    return () => {
      isMounted = false; // "Cascading renders" öňüni almak üçin tämizleýiş
    };
  }, [fetchCart]);

  const handleOrder = async () => {
    if (!address.trim()) return alert("Sargyt üçin salgyňyzy ýazyň! 🏠");
    setLoading(true);
    try {
      await api.post('/orders', { address });
      alert("Sargydyňyz kabul edildi! ✅");
      router.push('/');
      router.refresh();
    } catch (error) {
      alert("Sargyt etmekde säwlik boldy.");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id: number) => {
    if (!confirm("Bu harydy sebetden aýyrmak isleýärsiňizmi?")) return;
    try {
      await api.delete(`/cart/${id}`);
      await fetchCart(); // Sanawy täzele
    } catch (error) {
      alert("Harydy aýryp bolmady");
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.total_item_price), 0);

  return (
    <main className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-10 text-gray-900 tracking-tight">Seniň Sebediň 🛒</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.cart_id} className="bg-white p-6 rounded-[28px] shadow-sm flex justify-between items-center border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                    <p className="text-gray-500 font-medium">${item.price} x {item.quantity}</p>
                    <button 
                      onClick={() => removeItem(item.cart_id)}
                      className="text-red-500 text-sm font-bold mt-3 hover:text-red-700 transition w-fit"
                    >
                      Aýyr
                    </button>
                  </div>
                  <p className="text-2xl font-black text-blue-600">${Number(item.total_item_price).toFixed(2)}</p>
                </div>
              ))
            ) : (
              <div className="bg-white p-16 rounded-[40px] text-center border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-bold text-xl">Sebediňiz boş. Haryt saýlap başlaň! 😊</p>
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-[40px] shadow-2xl h-fit border border-gray-50 sticky top-24">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">Jemi Hasap</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500 font-bold">
                <span>Haryt sany:</span>
                <span>{cartItems.length} sany</span>
              </div>
              <div className="flex justify-between text-3xl font-black border-t pt-6 text-gray-900">
                <span>Jemi:</span>
                <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-black text-gray-700 mb-3 ml-1 uppercase tracking-wider">Eltip bermeli salgy</label>
              <textarea 
                placeholder="Meselem: Aşgabat ş., Magtymguly şaýoly..."
                className="w-full p-5 bg-gray-50 border border-gray-100 rounded-3xl outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all min-h-[120px] text-gray-700"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </div>
            
            <button 
              disabled={loading || cartItems.length === 0}
              onClick={handleOrder}
              className="w-full bg-blue-600 text-white p-5 rounded-[24px] font-black text-xl hover:bg-black transition-all active:scale-95 shadow-2xl shadow-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Girilýär..." : "Sargydy Tassyka 🚀"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
