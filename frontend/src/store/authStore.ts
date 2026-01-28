import { create } from "zustand";
import type { User } from "../services/auth.api";
import { setAccessToken } from "../services/axios.instance";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hydrated: boolean;

  setAuth: (accessToken: string, user: User) => void;
  clearAuth: () => void;
  setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  hydrated: false,

  setAuth: (accessToken, user) => {
    setAccessToken(accessToken);
    set({
      user: { ...user, avatar: user.avatar ?? null },
      isAuthenticated: true,
    });
  },

  clearAuth: () => {
    setAccessToken(null);
    set({ user: null, isAuthenticated: false });
  },

  setHydrated: (value) => {
    set({ hydrated: value });
  },
}));
