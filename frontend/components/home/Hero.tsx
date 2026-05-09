"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "../ui/Button";

/**
 * @section Hero Component
 * @description Apple-style minimalist landing section with optimized animations and UX.
 */
export const Hero = () => {
  
  // 1. Söwda başla düwmesi üçin ýumşak skroll funksiýasy
  const scrollToProducts = () => {
    const section = document.getElementById("products-grid");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 2. Video Modal ýa-da Youtube linki üçin funksiýa
  const handleWatchVideo = () => {
    // Pro taslamada bura Modal açýan state goýulýar
    window.open("https://youtube.com", "_blank");
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white pt-20">
      
      {/* --- BACKGROUND DECOR (Luxury Ambient) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[140px] opacity-60" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-purple-100 rounded-full blur-[140px] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-12">
          
          {/* --- TEXT CONTENT (Animated) --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <span className="px-6 py-2.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[4px] mb-4 inline-block shadow-sm">
              Täze Nesil Söwda Tejribesi
            </span>
            
            <h1 className="text-[55px] md:text-[110px] leading-[0.85] font-black text-gray-900 tracking-tighter">
              Geljege <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Durnukly
              </span> Ädim.
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 font-medium leading-relaxed italic">
              Innowasion tehnologiýalar we minimalist dizaýn bir ýerde. 
              Seniň durmuşyňy aňsatlaşdyrjak iň kämil önümler şu ýerde.
            </p>
          </motion.div>

          {/* --- ACTION BUTTONS (Interactive) --- */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* Primary Action: Scroll to Shop */}
            <Button 
              size="xl" 
              onClick={scrollToProducts}
              className="group h-[75px] px-14 rounded-[30px] shadow-2xl shadow-blue-100 hover:shadow-blue-200 transition-all duration-500"
            >
              Söwda Başla 
              <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>

            {/* Secondary Action: Watch Video */}
            <button 
              onClick={handleWatchVideo}
              className="flex items-center gap-5 text-gray-900 font-black uppercase text-[11px] tracking-[2px] hover:text-blue-600 transition-all duration-300 p-2 group"
            >
              <div className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-xl group-hover:scale-110 group-hover:border-blue-100 transition-all duration-500">
                <Play size={18} fill="currentColor" className="ml-1" />
              </div>
              Wideony Gör
            </button>
          </motion.div>
          
        </div>
      </div>

      {/* --- SCROLL INDICATOR (Subtle Detail) --- */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-300 hidden md:block"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-200 to-transparent mx-auto" />
      </motion.div>

    </section>
  );
};
