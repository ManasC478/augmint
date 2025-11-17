import type { Account, Security, Tenant, Webhook } from "@/types";

export const GetMe = async (): Promise<Tenant> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/b2b/me/`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return await res.json();
};

export const UpdateAccount = async (account: Account): Promise<void> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/b2b/me/account/`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  });

  if (!res.ok) {
    throw new Error("Failed to update account");
  }
};

export const UpdateWebhook = async (webhook: Webhook): Promise<void> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/b2b/me/webhook/`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(webhook),
  });

  if (!res.ok) {
    throw new Error("Failed to update webhook");
  }
};

export const UpdateCorsOrigins = async (security: Security): Promise<void> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/b2b/me/cors-origins/`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(security),
  });

  if (!res.ok) {
    throw new Error("Failed to update cors origins");
  }
};

export const UpdateApiKey = async (apiKey: string): Promise<void> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/b2b/me/api-key/`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ apiKey }),
  });

  if (!res.ok) {
    throw new Error("Failed to update api key");
  }
};
