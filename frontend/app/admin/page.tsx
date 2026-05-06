"use client";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("1");
  const router = useRouter();

  // Admin page-de handleAddProduct funksiýasyndaky baha bölegi:
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/products", {
        name,
        price: Number(price), // Hökman san bolmaly
        description,
        image_url: imageUrl,
        category_id: Number(categoryId), // Hökman san bolmaly
        stock_quantity: 10,
      });
      alert("Täze haryt goşuldy! 📦");
      router.push("/");
    } catch (error) {
      alert("Rugsat ýok ýa-da maglumatlar ýalňyş!");
    }
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-black mb-10">Admin Paneli ⚙️</h1>
      <form
        onSubmit={handleAddProduct}
        className="bg-white p-8 rounded-[32px] shadow-2xl border border-gray-100 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">Täze Haryt Goş</h2>

        <input
          type="text"
          placeholder="Harydyň ady"
          className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Bahasy ($)"
          className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          placeholder="Haryt barada maglumat..."
          className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Surat URL (Meselem: https://...)"
          className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-5 rounded-2xl font-black text-xl hover:bg-black transition-all shadow-lg shadow-blue-100"
        >
          Harydy Bazany Goş 🚀
        </button>
      </form>
    </div>
  );
}
