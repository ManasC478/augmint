export type Job = {
  _id: string;
  tenantId: string;
  status: "SUCCESS" | "FAILED" | "PROCESSING" | "PENDING";
  createdAt: Date;
  startedAt: Date | null;
  completedAt: Date | null;
  latencyMs: number | null;
  personImageKey: string;
  garmentImageKey: string;
  resultKey: string | null;
  fileSizeBytes: number;
  error: string | null;
};

export type JobMetrics = {
  totalJobs: number;
  successJobs: number;
  failedJobs: number;
  pendingJobs: number;
  processingJobs: number;
  avgLatencyS: number;
  totalStorageMB: number;
};

export type User = {
  _id: string;
  picture: string;
  name: string;
  email: string;
  createdAt: Date;
  models: string[];
  garments: string[];
};

export type Account = Pick<User, "name" | "email">;
