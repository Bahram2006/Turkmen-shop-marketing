"use client";
import { useState } from 'react';
import api from '../../services/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Tokeny ýatda saklaýarys
      alert("Giriş üstünlikli!");
      router.push('/'); // Esasy sahypa ugrat
    } catch (error) {
      alert("Email ýa-da parol ýalňyş!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-xl rounded-2xl w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Ulgama gir 🔑</h1>
        <input 
          type="email" placeholder="Email" 
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" placeholder="Parol" 
          className="w-full p-3 border rounded-lg mb-6"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
          Giriş
        </button>
      </form>
    </div>
  );
}
