"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProductCard } from "../ui/ProductCard";

/**
 * @data Dummy Products
 * @description Hakyky dizaýny barlamak üçin ýokary hilli suratlar we maglumatlar.
 */
const DUMMY_PRODUCTS = [
  { id: 1, name: "iPhone 15 Pro Max", price: 1399, category: "Telefonlar", image: "https://unsplash.com" },
  { id: 2, name: "MacBook Air M3", price: 1199, category: "Noutbuklar", image: "https://unsplash.com" },
  { id: 3, name: "AirPods Max", price: 549, category: "Aksesuar", image: "https://unsplash.com" },
  { id: 4, name: "iPad Pro 12.9", price: 1099, category: "Planşetler", image: "https://unsplash.com" },
];

/**
 * @section ProductSection
 * @description "Söwda Başla" düwmesi bilen baglanyşykly, dinamiki harytlar bölümi.
 */
export const ProductSection = () => {
  return (
    <section 
      id="products-grid" // HÖKMAN: Hero-daky "Söwda Başla" düwmesi şu ID-a görä işleýär!
      className="max-w-7xl mx-auto px-6 py-24 md:py-32 scroll-mt-24"
    >
      {/* --- SECTION HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-[40px] md:text-[60px] font-black text-gray-900 tracking-tighter leading-[0.9]">
            Saýlanan <br /> 
            <span className="text-blue-600">Önümler.</span>
          </h2>
          <p className="text-gray-400 font-medium max-w-sm text-sm md:text-base leading-relaxed">
            Iň täze tehnologiýalar we minimalist dizaýnyň kämil birleşmesi. 
            Siz üçin iň gowularyny saýladyk.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <button className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-[2px] px-10 py-5 border-2 border-gray-100 rounded-[22px] hover:border-blue-600 hover:text-blue-600 transition-all duration-500">
            Ählisini Gör 
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        {DUMMY_PRODUCTS.map((product, index) => (
          <ProductCard 
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            category={product.category}
          />
        ))}
      </div>

      {/* --- LUXURY DECOR (Optional) --- */}
      <div className="mt-20 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
    </section>
  );
};
