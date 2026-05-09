"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Save, Eye, Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Elektronika",
    image: "https://unsplash.com",
  });

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin/products" className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all">
            <ArrowLeft size={20} className="text-gray-400" />
          </Link>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Täze Haryt.</h1>
            <p className="text-gray-400 font-medium text-sm">Dükan üçin täze önüm döredilişi.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">Garaşma (Draft)</Button>
          <Button className="px-10"><Save size={18} className="mr-2" /> Harydy Goş</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* ÇEP TARAP: FORM EDITING */}
        <div className="lg:col-span-7 space-y-10">
          <section className="bg-white p-10 rounded-[40px] border border-gray-50 shadow-sm space-y-8">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
              <Info className="text-blue-600" size={20} /> Esasy Maglumatlar
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Harydyň ady</label>
                <input 
                  type="text" 
                  placeholder="Meselem: iPhone 15 Pro Max"
                  className="w-full p-6 bg-gray-50 border-none rounded-[24px] outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Bahasy ($)</label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full p-6 bg-gray-50 border-none rounded-[24px] outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold"
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Kategoriýa</label>
                  <select className="w-full p-6 bg-gray-50 border-none rounded-[24px] outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold appearance-none">
                    <option>Elektronika</option>
                    <option>Noutbuklar</option>
                    <option>Aksesuar</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Haryt barada giňişleýin</label>
                <textarea 
                  placeholder="Harydyň aýratynlyklary..."
                  className="w-full p-6 bg-gray-50 border-none rounded-[24px] outline-none focus:ring-4 focus:ring-blue-100 transition-all font-medium min-h-[150px]"
                />
              </div>
            </div>
          </section>

          {/* Image Upload Area */}
          <section className="bg-white p-10 rounded-[40px] border border-gray-50 shadow-sm space-y-8">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
              <Upload className="text-blue-600" size={20} /> Haryt Suraty
            </h3>
            <div className="border-2 border-dashed border-gray-100 rounded-[32px] p-20 text-center hover:border-blue-200 transition-colors cursor-pointer">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                <Upload size={24} />
              </div>
              <p className="text-gray-400 font-bold">Suraty şu taýga süýşürip goýuň ýa-da saýlaň</p>
            </div>
          </section>
        </div>

        {/* SAG TARAP: LIVE PREVIEW (HARYT NÄHILI GÖRÜNER?) */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-32 space-y-8">
            <div className="flex items-center justify-between px-4">
              <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                <Eye className="text-blue-600" size={20} /> Göni Görkezme
              </h3>
              <span className="text-[10px] font-black uppercase text-gray-300">Live Preview</span>
            </div>
            
            {/* Biz öň döreden ProductCard komponentimizi şu taýda ulanýarys! */}
            <div className="max-w-[380px] mx-auto scale-110 mt-10">
              <ProductCard 
                name={formData.name || "Harydyň ady bura geler"} 
                price={formData.price || "0.00"} 
                image={formData.image} 
                category={formData.category}
              />
            </div>

            <div className="bg-blue-50 p-8 rounded-[32px] border border-blue-100">
              <p className="text-[11px] font-bold text-blue-600 leading-relaxed italic">
                * Bu sahypada harydyň müşderilere nähili görünjekdigini hakyky wagtda görüp bilersiňiz. Dizaýnyň kämil bolmagy üçin ýokary hilli surat ulanmagy ýatdan çykarmaň.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
