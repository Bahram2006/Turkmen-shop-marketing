"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight, Play } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-5 py-2 bg-blue-50 text-blue-600 rounded-full text-[11px] font-black uppercase tracking-[3px] mb-8 inline-block">
              Täze Nesil Söwda Tejribesi
            </span>
            <h1 className="text-[60px] md:text-[100px] leading-[0.9] font-black text-gray-900 tracking-tighter mb-10">
              Geljege <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Durnukly</span> Ädim.
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
              Innowasion tehnologiýalar we minimalist dizaýn bir ýerde. 
              Seniň durmuşyňy aňsatlaşdyrjak iň kämil önümler şu ýerde.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <Button size="xl" className="group h-[70px] px-12 rounded-[25px]">
              Söwda Başla 
              <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
            <button className="flex items-center gap-4 text-gray-900 font-black uppercase text-xs tracking-widest hover:text-blue-600 transition-colors p-4">
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-lg">
                <Play size={16} fill="currentColor" />
              </div>
              Wideony Gör
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
