import { useTenantStore } from "@/lib/store/tenantStore";

export function useAuth() {
  const { tenant, isLoading, error, isAuthenticated, fetchTenant, logout, clearError } = useTenantStore();

  return {
    tenant,
    isLoading,
    error,
    isAuthenticated,
    fetchTenant,
    logout,
    clearError,
  };
}

