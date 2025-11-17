import { GetMe } from "@/api/me";
import AccountInfo from "@/components/ui/account-info";
import type { User } from "@/types";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/dashboard/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    GetMe()
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error || !user) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="space-y-8">
        <AccountInfo
          account={{
            name: user.name,
            email: user.email,
          }}
        />
      </div>
    </div>
  );
}
