"use client";

import { useState } from "react";
import api from "../../services/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  // 1. State-ler (Üýtgeýjiler) hökman funksiýanyň başynda bolmaly
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });

      // Tokeny we ulanyjy maglumatlaryny saklaýarys
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      router.push("/"); // Esasy sahypa ugrat
      router.refresh();
      // 'any' ulanman, säwligi anyk görkezýäris
    } catch (error: unknown) {
      let message = "Email ýa-da parol ýalňyş!";

      // Säwligiň Axios-dan gelýändigini barlaýarys
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response: { data: { message: string } } };
        message = axiosError.response?.data?.message || message;
      }

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Hoş geldiňiz!
          </h1>
          <p className="text-gray-500 font-medium">
            Ulgama girip söwdaňyzy dowam ediň 🔑
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
              Email adresiňiz
            </label>
            <input
              required
              type="email"
              placeholder="mysal@mail.com"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
              Parolyňyz
            </label>
            <input
              required
              type="password"
              placeholder="••••••••"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none text-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold text-lg hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Girilýär..." : "Giriş"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600 font-medium">
            Hasabyňyz ýokmy?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:underline font-bold"
            >
              Registrasiýa boluň
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
