"use client";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

interface ProductCardProps {
  name: string;
  price: number | string;
  image: string;
  category?: string;
}

export const ProductCard = ({ name, price, image, category }: ProductCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-[40px] p-5 border border-gray-100 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-700"
    >
      {/* Image Wrapper */}
      <div className="relative aspect-[1/1.1] overflow-hidden rounded-[32px] bg-gray-50 mb-8">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Quick Actions (Hoverda görünýär) */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          <button className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-blue-600 hover:text-white transition-colors">
            <Heart size={18} />
          </button>
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <Button className="w-full h-12 rounded-2xl shadow-lg" size="sm">
            Sebede Goş <Plus size={16} className="ml-1" />
          </Button>
        </div>
      </div>

      {/* Info Section */}
      <div className="space-y-3 px-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[2px] text-blue-600 mb-1">
              {category || "Täze Gelen"}
            </p>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
              {name}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-gray-900 tracking-tighter">
              ${Number(price).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
