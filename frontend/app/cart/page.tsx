"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// DUMMY DATA (Backend baglanmaga taýyn gurluş)
const INITIAL_CART = [
  { id: 1, name: "iPhone 15 Pro Max", price: 1399, quantity: 1, image: "https://unsplash.com" },
  { id: 2, name: "AirPods Max", price: 549, quantity: 1, image: "https://unsplash.com" },
];

export default function CartPage() {
  const [items, setItems] = useState(INITIAL_CART);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 space-y-4">
          <h1 className="text-[50px] md:text-[80px] font-black text-gray-900 tracking-tighter leading-none">
            Seniň <span className="text-blue-600">Sebediň.</span>
          </h1>
          <p className="text-gray-400 font-medium text-xl">Jemi {items.length} sany haryt saýlandy.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Harytlar Sanawy */}
          <div className="lg:col-span-8 space-y-10">
            <AnimatePresence>
              {items.length > 0 ? (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group flex flex-col md:flex-row items-center gap-10 pb-10 border-b border-gray-100"
                  >
                    {/* Haryt Suraty */}
                    <div className="w-full md:w-48 aspect-square bg-gray-50 rounded-[32px] overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>

                    {/* Haryt Maglumaty */}
                    <div className="flex-1 space-y-2 text-center md:text-left">
                      <h3 className="text-2xl font-black text-gray-900 tracking-tight">{item.name}</h3>
                      <p className="text-blue-600 font-black text-xl">${item.price.toFixed(2)}</p>
                    </div>

                    {/* Mukdar Dolandyryşy */}
                    <div className="flex items-center gap-6 bg-gray-50 p-2 rounded-2xl">
                      <button className="p-2 hover:bg-white rounded-xl transition-all"><Minus size={18} /></button>
                      <span className="font-black text-lg w-6 text-center">{item.quantity}</span>
                      <button className="p-2 hover:bg-white rounded-xl transition-all text-blue-600"><Plus size={18} /></button>
                    </div>

                    {/* Öçürmek */}
                    <button className="p-4 text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={24} />
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="py-20 text-center space-y-6">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                    <ShoppingBag size={40} />
                  </div>
                  <p className="text-gray-400 font-bold text-xl">Sebediňiz boş...</p>
                  <Button variant="outline" size="lg">Söwdany dowam et</Button>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Sargyt Jemlemesi (Sticky Sidebar) */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 p-10 rounded-[40px] sticky top-32 space-y-10">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Hasap.</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Haryt jemi</span>
                  <span className="text-gray-900 font-black">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Eltip bermek</span>
                  <span className="text-green-600 font-black italic">Mugt</span>
                </div>
                <div className="h-[1px] bg-gray-200 my-6" />
                <div className="flex justify-between items-end">
                  <span className="text-gray-500 font-medium text-lg">Umumy jemi</span>
                  <span className="text-4xl font-black text-gray-900 tracking-tighter">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 ml-2">Eltip bermeli salgy</label>
                <textarea 
                  placeholder="Doly salgyňyzy ýazyň..."
                  className="w-full p-6 bg-white rounded-3xl border-none outline-none focus:ring-4 focus:ring-blue-100 transition-all min-h-[120px] font-medium"
                />
              </div>

              <Button className="w-full h-20 rounded-[28px] text-xl shadow-2xl shadow-blue-100" size="xl">
                Tölege Geç <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
