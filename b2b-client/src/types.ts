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

export type Tenant = {
  _id: string;
  picture: string;
  tenantName: string;
  contactName: string;
  email: string;
  apiKeyHash: string | null;
  description: string | null;
  createdAt: Date;
  settings: {
    callbackUrl: string | null;
    webhookSecret: string | null;
    allowedOrigins: string[];
  };
};

export type Account = Pick<
  Tenant,
  "tenantName" | "contactName" | "email" | "description"
>;

export type Webhook = Pick<Tenant["settings"], "callbackUrl" | "webhookSecret">;

export type Security = Pick<Tenant["settings"], "allowedOrigins">;
