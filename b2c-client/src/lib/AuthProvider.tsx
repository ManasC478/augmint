import { type ReactNode, useEffect } from 'react';
import { useTenantStore } from './store/tenantStore';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { fetchTenant, isLoading } = useTenantStore();

  useEffect(() => {
    fetchTenant();
  }, [fetchTenant]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

