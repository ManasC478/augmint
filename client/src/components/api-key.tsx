import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, Eye, EyeOff } from "lucide-react";
import { UpdateApiKey } from "@/api/me";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

export default function ApiKey() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const key = `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(key);
    setShowApiKey(true);
    setIsLoading(true);

    UpdateApiKey(apiKey || "")
      .then(() => {
        toast.success("API key updated");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update API key");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section>
      <h2 className="text-lg font-medium mb-6">API Key</h2>
      <form
        className="bg-card border border-border/50 rounded-lg p-6 space-y-4 shadow-card hover:shadow-card-hover transition-shadow"
        onSubmit={handleSubmit}
      >
        <p className="text-sm text-muted-foreground">
          Your API key is used to authenticate requests to the API. Keep it
          secure and never share it publicly.
        </p>

        {apiKey ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-4 bg-primary/5 border border-primary/30 rounded-lg shadow-glow-primary">
              <code className="flex-1 text-sm font-mono text-foreground">
                {showApiKey ? apiKey : "sk_live_" + "•".repeat(32)}
              </code>
              <Button
                variant="ghost"
                type="button"
                size="sm"
                onClick={() => setShowApiKey(!showApiKey)}
                className="text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"
              >
                {showApiKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                type="button"
                size="sm"
                onClick={() => copyToClipboard(apiKey)}
                className="text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-amber-500">
              Make sure to copy your API key now. You won't be able to see it
              again!
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex-1 p-4 bg-muted/30 border border-border/50 rounded-lg shadow-sm">
              <code className="text-sm font-mono text-muted-foreground">
                sk_live_••••••••••••••••••••••••••••••••
              </code>
            </div>
            <Button
              size="sm"
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 shadow-glow-primary hover:shadow-glow-primary-strong transition-all"
            >
              {isLoading && <Spinner />}
              Generate New Key
            </Button>
          </div>
        )}
      </form>
    </section>
  );
}
