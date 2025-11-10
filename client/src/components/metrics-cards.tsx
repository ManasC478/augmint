import { GetJobsMetrics } from "@/api/jobs";
import type { JobMetrics } from "@/types";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function MetricsCards() {
  const [metrics, setMetrics] = useState<JobMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    GetJobsMetrics()
      .then((data) => {
        setMetrics(data);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const metricCards = [
    { label: "Total", value: metrics?.totalJobs, color: "text-foreground" },
    {
      label: "Success",
      value: metrics?.successJobs,
      color: "text-emerald-400",
    },
    { label: "Failed", value: metrics?.failedJobs, color: "text-red-400" },
    {
      label: "Processing",
      value: metrics?.processingJobs,
      color: "text-blue-400",
    },
    { label: "Pending", value: metrics?.pendingJobs, color: "text-amber-400" },
    {
      label: "Avg Latency",
      value: `${metrics?.avgLatencyS}s`,
    },
    { label: "Storage", value: `${metrics?.totalStorageMB} MB` },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium mb-1">Metrics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {metricCards.map((metric, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-card border border-border"
          >
            <div className="text-xs text-muted-foreground mb-1">
              {metric.label}
            </div>
            <div
              className={clsx(
                "text-2xl font-semibold tabular-nums",
                metric.color,
              )}
            >
              {metric ? metric.value : <Skeleton className="h-4 w-[200px]" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
