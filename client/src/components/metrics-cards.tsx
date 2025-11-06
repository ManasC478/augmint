interface Job {
  status: string
  latencyMs: number | null
  fileSizeBytes: number
}

interface MetricsCardsProps {
  jobs: Job[]
}

export function MetricsCards({ jobs }: MetricsCardsProps) {
  // Calculate metrics from jobs
  const totalJobs = jobs.length
  const successJobs = jobs.filter((j) => j.status === "SUCCESS").length
  const failedJobs = jobs.filter((j) => j.status === "FAILED").length
  const processingJobs = jobs.filter((j) => j.status === "PROCESSING").length
  const pendingJobs = jobs.filter((j) => j.status === "PENDING").length

  const completedJobs = jobs.filter((j) => j.latencyMs !== null)
  const avgLatencyMs =
    completedJobs.length > 0 ? completedJobs.reduce((sum, j) => sum + (j.latencyMs || 0), 0) / completedJobs.length : 0

  const totalStorageBytes = jobs.reduce((sum, j) => sum + j.fileSizeBytes, 0)
  const totalStorageMB = (totalStorageBytes / (1024 * 1024)).toFixed(2)

  const metrics = [
    { label: "Total", value: totalJobs },
    { label: "Success", value: successJobs, color: "text-emerald-400" },
    { label: "Failed", value: failedJobs, color: "text-red-400" },
    { label: "Processing", value: processingJobs, color: "text-blue-400" },
    { label: "Pending", value: pendingJobs, color: "text-amber-400" },
    { label: "Avg Latency", value: `${(avgLatencyMs / 1000).toFixed(2)}s` },
    { label: "Storage", value: `${totalStorageMB} MB` },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium mb-1">Metrics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 rounded-lg bg-card border border-border">
            <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
            <div className={`text-2xl font-semibold tabular-nums ${metric.color || "text-foreground"}`}>
              {metric.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

