import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Account } from "@/types";

interface AccountInfoProps {
  account: Account;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ account }) => {
  return (
    <section>
      <h2 className="text-lg font-medium mb-6">Account Information</h2>
      <div className="bg-card border border-border/50 rounded-lg p-6 space-y-6 shadow-card hover:shadow-card-hover transition-shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label
              htmlFor="businessName"
              className="text-xs text-muted-foreground"
            >
              Name
            </Label>
            <Input
              id="businessName"
              defaultValue={account.name}
              readOnly
              className="bg-background focus:border-glow transition-all"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs text-muted-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue={account.email}
              readOnly
              className="bg-background focus:border-glow transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountInfo;
