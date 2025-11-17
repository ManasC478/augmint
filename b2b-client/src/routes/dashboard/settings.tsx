import { GetMe } from "@/api/me";
import ApiKey from "@/components/api-key";
import SecuritySettings from "@/components/security-settings";
import AccountInfo from "@/components/ui/account-info";
import WebhookConfig from "@/components/webhook-config";
import type { Tenant } from "@/types";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/dashboard/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    GetMe()
      .then((data) => {
        setTenant(data);
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
  if (error || !tenant) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="space-y-8">
        <AccountInfo
          account={{
            tenantName: tenant.tenantName,
            contactName: tenant.contactName,
            email: tenant.email,
            description: tenant.description,
          }}
        />
        <ApiKey />
        <WebhookConfig
          webhook={{
            callbackUrl: tenant.settings.callbackUrl,
            webhookSecret: tenant.settings.webhookSecret,
          }}
        />
        <SecuritySettings
          security={{
            allowedOrigins: tenant.settings.allowedOrigins,
          }}
        />
      </div>
    </div>
  );
}
