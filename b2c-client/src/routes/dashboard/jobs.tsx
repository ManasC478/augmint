import { JobsTable } from "@/components/generations-table";
import { MetricsCards } from "@/components/metrics-cards";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/jobs")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-5">
      <MetricsCards />
      <JobsTable />
    </div>
  );
}
