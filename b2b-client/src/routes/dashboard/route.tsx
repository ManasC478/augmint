import DashboardSidebar from "@/components/dashboard-sidebar";
import { ProtectedRoute } from "@/lib/ProtectedRoute";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoute>
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <DashboardSidebar>
          <Outlet />
        </DashboardSidebar>
      </main>
    </ProtectedRoute>
  );
}
