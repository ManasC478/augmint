import { Logout } from "@/api/auth";
import { GetMe } from "@/api/me";
import type { Tenant } from "@/types";
import { create } from "zustand";

interface TenantState {
  tenant: Tenant | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  fetchTenant: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useTenantStore = create<TenantState>((set) => ({
  tenant: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  fetchTenant: async () => {
    set({ isLoading: true });
    try {
      const tenant = await GetMe();
      set({ tenant, isLoading: false, error: null, isAuthenticated: true });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Uknown error",
        isAuthenticated: false,
      });
    }
  },
  logout: async () => {
    set({ isLoading: true });
    try {
      await Logout();
      set({
        tenant: null,
        isLoading: false,
        error: null,
        isAuthenticated: false,
      });
    } catch {
      set({
        tenant: null,
        isLoading: false,
        error: null,
        isAuthenticated: false,
      });
    }
  },
  clearError: () => {
    set({ error: null });
  },
}));
