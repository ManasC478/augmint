import { ApiKeySection } from '@/components/api-key'
import { JobsTable } from '@/components/generations-table'
import { MetricsCards } from '@/components/metrics-cards'
import { Button } from '@/components/ui/button'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

const mockTenant = {
  _id: "507f1f77bcf86cd799439011",
  tenantId: "tenant-abc",
  name: "Retailer X",
  email: "contact@retailerx.com",
  plan: "pro",
  createdAt: "2025-11-05T00:00:00Z",
  lastUsedAt: "2025-11-05T03:15:00Z",
}

// Mock jobs data
const mockJobs = [
  {
    _id: "1",
    jobId: "job-uuid-001",
    tenantId: "tenant-abc",
    status: "SUCCESS",
    createdAt: new Date("2025-11-05T01:00:00Z"),
    startedAt: new Date("2025-11-05T01:01:00Z"),
    completedAt: new Date("2025-11-05T01:01:30Z"),
    latencyMs: 30000,
    personImageKey: "uploads/tenant-abc/person-001.jpg",
    garmentImageKey: "uploads/tenant-abc/garment-001.jpg",
    resultKey: "outputs/tenant-abc/job-uuid-001.jpg",
    fileSizeBytes: 4200000,
    error: null,
  },
  {
    _id: "2",
    jobId: "job-uuid-002",
    tenantId: "tenant-abc",
    status: "FAILED",
    createdAt: new Date("2025-11-04T14:30:00Z"),
    startedAt: new Date("2025-11-04T14:31:00Z"),
    completedAt: new Date("2025-11-04T14:31:15Z"),
    latencyMs: 15000,
    personImageKey: "uploads/tenant-abc/person-002.jpg",
    garmentImageKey: "uploads/tenant-abc/garment-002.jpg",
    resultKey: null,
    fileSizeBytes: 0,
    error: "Invalid image format",
  },
  {
    _id: "3",
    jobId: "job-uuid-003",
    tenantId: "tenant-abc",
    status: "PROCESSING",
    createdAt: new Date("2025-11-05T02:15:00Z"),
    startedAt: new Date("2025-11-05T02:16:00Z"),
    completedAt: null,
    latencyMs: null,
    personImageKey: "uploads/tenant-abc/person-003.jpg",
    garmentImageKey: "uploads/tenant-abc/garment-003.jpg",
    resultKey: null,
    fileSizeBytes: 0,
    error: null,
  },
  {
    _id: "4",
    jobId: "job-uuid-004",
    tenantId: "tenant-abc",
    status: "SUCCESS",
    createdAt: new Date("2025-11-03T09:20:00Z"),
    startedAt: new Date("2025-11-03T09:21:00Z"),
    completedAt: new Date("2025-11-03T09:21:45Z"),
    latencyMs: 45000,
    personImageKey: "uploads/tenant-abc/person-004.jpg",
    garmentImageKey: "uploads/tenant-abc/garment-004.jpg",
    resultKey: "outputs/tenant-abc/job-uuid-004.jpg",
    fileSizeBytes: 3800000,
    error: null,
  },
  {
    _id: "5",
    jobId: "job-uuid-005",
    tenantId: "tenant-abc",
    status: "PENDING",
    createdAt: new Date("2025-11-05T03:00:00Z"),
    startedAt: null,
    completedAt: null,
    latencyMs: null,
    personImageKey: "uploads/tenant-abc/person-005.jpg",
    garmentImageKey: "uploads/tenant-abc/garment-005.jpg",
    resultKey: null,
    fileSizeBytes: 0,
    error: null,
  },
  {
    _id: "6",
    jobId: "job-uuid-006",
    tenantId: "tenant-abc",
    status: "SUCCESS",
    createdAt: new Date("2025-11-02T16:45:00Z"),
    startedAt: new Date("2025-11-02T16:46:00Z"),
    completedAt: new Date("2025-11-02T16:46:25Z"),
    latencyMs: 25000,
    personImageKey: "uploads/tenant-abc/person-006.jpg",
    garmentImageKey: "uploads/tenant-abc/garment-006.jpg",
    resultKey: "outputs/tenant-abc/job-uuid-006.jpg",
    fileSizeBytes: 5100000,
    error: null,
  },
  {
    _id: "7",
    jobId: "job-uuid-007",
    tenantId: "tenant-abc",
    status: "SUCCESS",
    createdAt: new Date("2025-11-01T11:30:00Z"),
    startedAt: new Date("2025-11-01T11:31:00Z"),
    completedAt: new Date("2025-11-01T11:31:35Z"),
    latencyMs: 35000,
    personImageKey: "uploads/tenant-abc/person-007.jpg",
    garmentImageKey: "uploads/tenant-abc/garment-007.jpg",
    resultKey: "outputs/tenant-abc/job-uuid-007.jpg",
    fileSizeBytes: 4500000,
    error: null,
  },
  {
    _id: "8",
    jobId: "job-uuid-008",
    tenantId: "tenant-abc",
    status: "FAILED",
    createdAt: new Date("2025-10-31T08:15:00Z"),
    startedAt: new Date("2025-10-31T08:16:00Z"),
    completedAt: new Date("2025-10-31T08:16:10Z"),
    latencyMs: 10000,
    personImageKey: "uploads/tenant-abc/person-008.jpg",
    garmentImageKey: "uploads/tenant-abc/garment-008.jpg",
    resultKey: null,
    fileSizeBytes: 0,
    error: "Processing timeout",
  },
]

function RouteComponent() {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      navigate({ to: '/' })
    }
  }, [navigate])

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated")
    navigate({ to: '/' })
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 sticky top-0 z-10 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-sm font-medium">{mockTenant.name}</h1>
                  <p className="text-xs text-muted-foreground">{mockTenant.tenantId}</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-6 ml-8 text-xs text-muted-foreground">
                <div>
                  <span className="text-foreground font-medium capitalize">{mockTenant.plan}</span> plan
                </div>
                <div className="h-3 w-px bg-border" />
                <div>
                  Joined{" "}
                  {new Date(mockTenant.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-muted-foreground hover:text-foreground"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <ApiKeySection />
        <MetricsCards jobs={mockJobs} />
        <JobsTable jobs={mockJobs} />
      </main>
    </div>
  )
}
