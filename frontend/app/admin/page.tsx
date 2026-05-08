"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Admin däl bolsa kowýarys
    if (!user || !isAdmin()) {
      router.push("/login");
    }
  }, [user, isAdmin, router]);

  if (user && isAdmin()) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        {/* Çep tarapda durnukly menýu */}
        <AdminSidebar />
        
        {/* Sag tarapda sahypanyň mazmuny */}
        <main className="flex-1 p-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    );
  }

  return null;
}
