"use client";
import { useState } from "react";
import axios from "axios"; // Axios-y barlag üçin import edýäris
import api from "@/services/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      const { user, token } = response.data;

      setAuth(user, token);

      if (user.role === 'admin') {
        router.push("/admin");
      } else {
        router.push("/");
      }

      router.refresh();

    } catch (error: unknown) {
      // 1. ESLint 'any' säwligini aýyrmak üçin 'axios.isAxiosError' ulanýarys
      let message = "Email ýa-da parol ýalňyş!";

      if (axios.isAxiosError(error)) {
        // Eger säwlik API-dan gelýän bolsa, onuň message-yny alýarys
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        // Eger başga umumy säwlik bolsa
        message = error.message;
      }

      alert(message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-[40px] border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tighter">
            Hoş geldiňiz! 🔑
          </h1>
          <p className="text-gray-500 font-medium">Ulgama girip söwdaňyzy dowam ediň</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 uppercase tracking-widest text-[10px]">
              Email adresiňiz
            </label>
            <input 
              required 
              type="email" 
              placeholder="mysal@mail.com"
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 transition-all outline-none text-gray-800" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 uppercase tracking-widest text-[10px]">
              Parolyňyz
            </label>
            <input 
              required 
              type="password" 
              placeholder="••••••••"
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 transition-all outline-none text-gray-800" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            disabled={loading}
            className={`w-full p-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-blue-100
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-black active:scale-95'}`}
          >
            {loading ? "Girilýär... 🔄" : "Giriş 🚀"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 font-bold">
            Hasabyňyz ýokmy?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Registrasiýa boluň
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
