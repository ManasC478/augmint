import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const Navbar = () => {
  const navigate = useNavigate();
  const { tenant, logout } = useAuth();

  return (
    <header className="border-b border-border/50 sticky top-0 z-10 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <span className="text-xl font-semibold">AugMint Business</span>
            </div>
          </Link>
          {tenant ? (
            <div className="flex items-center gap-10">
              <div className="text-xs text-muted-foreground">
                Joined{" "}
                {new Date(tenant.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center gap-3">
                    <div>
                      <h1 className="text-sm font-medium">
                        {tenant.tenantName}
                      </h1>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => navigate({ to: "/dashboard" })}
                  >
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button
              className="bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={() => navigate({ to: "/login" })}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
