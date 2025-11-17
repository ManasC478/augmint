import { UpdateAccount } from "@/api/me";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Account } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "./spinner";

interface AccountInfoProps {
  account: Account;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ account: accountProp }) => {
  const [account, setAccount] = useState<Account>(accountProp);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    UpdateAccount(account)
      .then(() => {
        toast.success("Account updated");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update account");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section>
      <h2 className="text-lg font-medium mb-6">Account Information</h2>
      <form
        className="bg-card border border-border/50 rounded-lg p-6 space-y-6 shadow-card hover:shadow-card-hover transition-shadow"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label
              htmlFor="businessName"
              className="text-xs text-muted-foreground"
            >
              Business Name
            </Label>
            <Input
              id="businessName"
              value={account.tenantName}
              onChange={(e) =>
                setAccount({ ...account, tenantName: e.target.value })
              }
              className="bg-background focus:border-glow transition-all"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs text-muted-foreground">
              Contact Name
            </Label>
            <Input
              id="name"
              value={account.contactName}
              onChange={(e) =>
                setAccount({ ...account, contactName: e.target.value })
              }
              className="bg-background focus:border-glow transition-all"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs text-muted-foreground">
              Contact Email
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue={account.email}
              readOnly
              className="bg-background focus:border-glow transition-all"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-xs text-muted-foreground"
            >
              Description
            </Label>
            <Input
              id="description"
              value={account.description || ""}
              onChange={(e) =>
                setAccount({ ...account, description: e.target.value })
              }
              className="bg-background focus:border-glow transition-all"
            />
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <Button
            size="sm"
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 shadow-glow-primary hover:shadow-glow-primary-strong transition-all"
          >
            {isLoading && <Spinner />}
            Save Changes
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AccountInfo;
