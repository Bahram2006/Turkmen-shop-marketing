"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Çep tarap: Vizual bölümi */}
      <div className="hidden md:flex md:w-1/2 bg-gray-50 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-100 rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-100 rounded-full blur-[120px] opacity-50" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center space-y-6 p-12"
        >
          <h2 className="text-6xl font-black text-gray-900 tracking-tighter leading-none">
            Seniň dünýäňe <br /> <span className="text-blue-600">Giriş.</span>
          </h2>
          <p className="text-gray-400 font-medium max-w-sm mx-auto">
            Innowasion söwda ulgamyna hoş geldiňiz. Ähli sargytlaryňyz we sebediňiz bir ýerde.
          </p>
        </motion.div>
      </div>

      {/* Sag tarap: Form bölümi */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-24 relative">
        <Link href="/" className="absolute top-10 left-10 text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-2 font-black uppercase text-[10px] tracking-widest">
          <ArrowLeft size={16} /> Yzyna gaýt
        </Link>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-12"
        >
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Hoş geldiňiz!</h1>
            <p className="text-gray-500 font-medium">Ulgama girip, täze nesil söwdany dowam ediň.</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                  type="email" 
                  placeholder="Email adresiňiz"
                  className="w-full p-6 pl-14 bg-gray-50 border border-gray-50 rounded-[28px] outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all font-medium"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                  type="password" 
                  placeholder="Paroluňyz"
                  className="w-full p-6 pl-14 bg-gray-50 border border-gray-50 rounded-[28px] outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="#" className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600">
                Paroly ýatdan çykardyňyzmy?
              </Link>
            </div>

            <Button size="xl" className="w-full h-[70px] rounded-[28px]">
              Giriş Et <ArrowRight className="ml-2" />
            </Button>
          </form>

          <div className="text-center">
            <p className="text-gray-400 font-medium">
              Hasabyňyz ýokmy?{" "}
              <Link href="/register" className="text-blue-600 font-black hover:underline underline-offset-4">
                Hasap Açyň
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
