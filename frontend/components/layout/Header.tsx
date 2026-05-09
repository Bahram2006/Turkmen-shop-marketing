"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, User, Search, Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-gray-100 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform duration-500">
            <ShoppingBag size={22} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-gray-900">E-BUY.</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-10">
          {["Kolleksiýalar", "Täze Gelenler", "Meşhurlar"].map((item) => (
            <Link key={item} href="#" className="text-[13px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-600 transition-colors">
              {item}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-3 text-gray-500 hover:bg-gray-100 rounded-full transition-all">
            <Search size={20} />
          </button>
          <div className="h-6 w-[1px] bg-gray-200 mx-2 hidden md:block" />
          <Button variant="ghost" size="sm" className="hidden md:flex">Giriş</Button>
          <Button size="sm" className="relative px-6">
            Sebet
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">0</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
