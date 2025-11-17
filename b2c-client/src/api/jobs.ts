import type { Job, JobMetrics } from "@/types";

export const GetJobs = async (): Promise<Job[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/b2c/jobs/`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return await res.json();
};

export const GetJobsMetrics = async (): Promise<JobMetrics> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/b2c/jobs/metrics/`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return await res.json();
};
