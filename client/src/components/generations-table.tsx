import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"

interface Job {
  _id: string
  jobId: string
  tenantId: string
  status: string
  createdAt: Date
  startedAt: Date | null
  completedAt: Date | null
  latencyMs: number | null
  personImageKey: string
  garmentImageKey: string
  resultKey: string | null
  fileSizeBytes: number
  error: string | null
}

interface JobsTableProps {
  jobs: Job[]
}

export function JobsTable({ jobs }: JobsTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Status filter
      if (statusFilter !== "all" && job.status !== statusFilter) {
        return false
      }

      // Date range filter
      if (startDate) {
        const start = new Date(startDate)
        if (job.createdAt < start) {
          return false
        }
      }

      if (endDate) {
        const end = new Date(endDate)
        end.setHours(23, 59, 59, 999) // Include the entire end date
        if (job.createdAt > end) {
          return false
        }
      }

      return true
    })
  }, [jobs, statusFilter, startDate, endDate])

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      SUCCESS: "text-emerald-400 bg-emerald-400/10",
      FAILED: "text-red-400 bg-red-400/10",
      PROCESSING: "text-blue-400 bg-blue-400/10",
      PENDING: "text-amber-400 bg-amber-400/10",
    }

    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${styles[status] || styles.PENDING}`}
      >
        {status.toLowerCase()}
      </span>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium mb-1">Generation Jobs</h2>
          <p className="text-sm text-muted-foreground">
            {filteredJobs.length} of {jobs.length} requests
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end gap-3">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px] border-border bg-card h-9">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="SUCCESS">Success</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
              <SelectItem value="PROCESSING">Processing</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start date"
            className="border-border bg-card h-9"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End date"
            className="border-border bg-card h-9"
          />
        </div>
      </div>

      <div className="rounded-lg border border-border overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">Job ID</TableHead>
              <TableHead className="text-muted-foreground font-medium">Status</TableHead>
              <TableHead className="text-muted-foreground font-medium">Created</TableHead>
              <TableHead className="text-muted-foreground font-medium">Latency</TableHead>
              <TableHead className="text-muted-foreground font-medium">Size</TableHead>
              <TableHead className="text-muted-foreground font-medium">Error</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-12">
                  No jobs found
                </TableCell>
              </TableRow>
            ) : (
              filteredJobs.map((job) => (
                <TableRow key={job._id} className="border-border hover:bg-muted/30">
                  <TableCell className="font-mono text-xs">{job.jobId.substring(0, 12)}...</TableCell>
                  <TableCell>{getStatusBadge(job.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {job.createdAt.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell className="text-sm tabular-nums">
                    {job.latencyMs ? `${(job.latencyMs / 1000).toFixed(2)}s` : "—"}
                  </TableCell>
                  <TableCell className="text-sm tabular-nums">
                    {job.fileSizeBytes > 0 ? `${(job.fileSizeBytes / (1024 * 1024)).toFixed(1)} MB` : "—"}
                  </TableCell>
                  <TableCell className="text-sm text-red-400">{job.error || "—"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

