import type { User } from "@/types";

export const GetMe = async (): Promise<User> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/b2c/me/`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return await res.json();
};
