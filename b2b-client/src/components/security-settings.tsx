import { Label } from "@radix-ui/react-label";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import type { Security } from "@/types";
import { UpdateCorsOrigins } from "@/api/me";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

export interface ISecuritySettingsProps {
  security: Security;
}

const SecuritySettings = ({
  security: securityProp,
}: ISecuritySettingsProps) => {
  const [security, setSecurity] = useState<Security>(securityProp);
  const [newOrigin, setNewOrigin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddOrigin = () => {
    setSecurity({
      ...security,
      allowedOrigins: [...security.allowedOrigins, newOrigin],
    });
    setNewOrigin("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    UpdateCorsOrigins(security)
      .then(() => {
        toast.success("Security settings updated");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update security settings");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section>
      <h2 className="text-lg font-medium mb-6">Security Settings</h2>
      <form
        className="bg-card border border-border/50 rounded-lg p-6 space-y-6 shadow-card hover:shadow-card-hover transition-shadow"
        onSubmit={handleSubmit}
      >
        <div className="space-y-3">
          <Label className="text-xs text-muted-foreground">
            Allowed Origins (CORS)
          </Label>
          <div className="space-y-2">
            {security.allowedOrigins.map((origin) => (
              <div
                key={origin}
                className="flex items-center gap-2 p-3 bg-background border border-border/50 rounded-lg shadow-sm hover:shadow-card transition-shadow"
              >
                <code className="flex-1 text-sm font-mono">{origin}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all"
                  onClick={() =>
                    setSecurity({
                      ...security,
                      allowedOrigins: security.allowedOrigins.filter(
                        (o) => o !== origin,
                      ),
                    })
                  }
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="https://example.com"
              value={newOrigin}
              onChange={(e) => setNewOrigin(e.target.value)}
              className="bg-background focus:border-glow transition-all"
            />
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="hover:bg-muted/50 transition-all bg-transparent"
              onClick={handleAddOrigin}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Only requests from these origins will be allowed to access your API.
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            size="sm"
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 shadow-glow-primary hover:shadow-glow-primary-strong transition-all"
          >
            {isLoading && <Spinner />}
            Save Security Settings
          </Button>
        </div>
      </form>
    </section>
  );
};

export default SecuritySettings;
