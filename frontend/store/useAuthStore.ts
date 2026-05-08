import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Ulanyjynyň maglumat gurluşy
interface User {
  id: number;
  full_name: string;
  email: string;
  role: 'admin' | 'customer';
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      // Ulanyjyny we tokeni ýatda saklaýarys (awtomatiki localStorage-a hem ýazýar)
      setAuth: (user, token) => set({ user, token }),

      // Ulgamdan çykyş
      logout: () => {
        set({ user: null, token: null });
      },

      // Admin barlagy funksiýasy
      isAdmin: () => get().user?.role === 'admin',
    }),
    {
      name: 'auth-storage', // LocalStorage-daky açar ady
    }
  )
);
