import { type ReactNode, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  requireNoAuth?: boolean;
}

export function ProtectedRoute({
  children,
  requireNoAuth = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && requireNoAuth) {
        navigate({ to: "/dashboard" });
      } else if (!isAuthenticated && !requireNoAuth) {
        navigate({ to: "/login" });
      }
    }
  }, [
    isAuthenticated,
    isLoading,
    navigate,
    requireNoAuth,
  ]);

  if (isLoading) {
    return null;
  }

  if (
    (!requireNoAuth && !isAuthenticated) ||
    (isAuthenticated && requireNoAuth)
  ) {
    return null;
  }

  return <>{children}</>;
}
