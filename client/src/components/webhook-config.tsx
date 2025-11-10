import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import type { Webhook } from "@/types";
import { Spinner } from "./ui/spinner";
import { UpdateWebhook } from "@/api/me";
import { toast } from "sonner";

export interface IWebhookConfigProps {
  webhook: Webhook;
}

const WebhookConfig = ({ webhook: webhookProp }: IWebhookConfigProps) => {
  const [webhook, setWebhook] = useState<Webhook>(webhookProp);
  const [showWebhookSecret, setShowWebhookSecret] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateWebhookSecret = () => {
    const key = `web_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setWebhook({ ...webhook, webhookSecret: key });
    setShowWebhookSecret(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    UpdateWebhook(webhook)
      .then(() => {
        toast.success("Webhook updated");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update webhook");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section>
      <h2 className="text-lg font-medium mb-6">Webhook Configuration</h2>
      <form
        className="bg-card border border-border/50 rounded-lg p-6 space-y-6 shadow-card hover:shadow-card-hover transition-shadow"
        onSubmit={handleSubmit}
      >
        <div className="space-y-2">
          <Label
            htmlFor="callbackUrl"
            className="text-xs text-muted-foreground"
          >
            Callback URL
          </Label>
          <Input
            id="callbackUrl"
            type="url"
            placeholder="https://your-domain.com/api/webhook"
            value={webhook.callbackUrl || ""}
            onChange={(e) =>
              setWebhook({
                ...webhook,
                callbackUrl: e.target.value === "" ? null : e.target.value,
              })
            }
            className="bg-background focus:border-glow transition-all"
          />
          <p className="text-xs text-muted-foreground">
            We'll send POST requests to this URL when job status changes.
          </p>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="webhookSecret"
            className="text-xs text-muted-foreground"
          >
            Webhook Secret
          </Label>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Input
                id="webhookSecret"
                type={showWebhookSecret ? "text" : "password"}
                defaultValue={webhook.webhookSecret || ""}
                className="bg-background pr-10 focus:border-glow transition-all"
                readOnly
              />
              <button
                onClick={() => setShowWebhookSecret(!showWebhookSecret)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showWebhookSecret ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="hover:bg-muted/50 transition-all bg-transparent"
              onClick={generateWebhookSecret}
            >
              Regenerate
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Use this to verify webhook signatures.
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            size="sm"
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 shadow-glow-primary hover:shadow-glow-primary-strong transition-all"
          >
            {isLoading && <Spinner />}
            Save Webhook Settings
          </Button>
        </div>
      </form>
    </section>
  );
};

export default WebhookConfig;
