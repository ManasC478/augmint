export const Logout = async (): Promise<void> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout/`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to logout");
  }
};
