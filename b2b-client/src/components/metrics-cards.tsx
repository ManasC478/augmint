import { GetJobsMetrics } from "@/api/jobs";
import type { JobMetrics } from "@/types";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function MetricsCards() {
  const [metrics, setMetrics] = useState<JobMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    GetJobsMetrics()
      .then((data) => {
        setMetrics(data);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  }, []);

  const metricCards = [
    {
      label: "Total",
      value: metrics ? metrics?.totalJobs : null,
      color: "text-foreground",
    },
    {
      label: "Success",
      value: metrics ? metrics?.successJobs : null,
      color: "text-emerald-400",
    },
    {
      label: "Failed",
      value: metrics ? metrics?.failedJobs : null,
      color: "text-red-400",
    },
    {
      label: "Processing",
      value: metrics ? metrics?.processingJobs : null,
      color: "text-blue-400",
    },
    {
      label: "Pending",
      value: metrics ? metrics?.pendingJobs : null,
      color: "text-amber-400",
    },
    {
      label: "Avg Latency",
      value: metrics ? `${metrics?.avgLatencyS}s` : null,
    },
    {
      label: "Storage",
      value: metrics ? `${metrics?.totalStorageMB} MB` : null,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium mb-1">Metrics</h2>
      {error ? (
        <p className="text-red-400 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {metricCards.map((metric, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-card border border-border"
            >
              <h3 className="text-xs text-muted-foreground mb-1">
                {metric.label}
              </h3>
              {metric.value != null ? (
                <p
                  className={clsx(
                    "text-2xl font-semibold tabular-nums",
                    metric.color,
                  )}
                >
                  {metric.value}
                </p>
              ) : (
                <Skeleton className="h-4 w-full" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
