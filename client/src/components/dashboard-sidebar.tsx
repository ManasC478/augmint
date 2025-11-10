import { Link, useLocation, type LinkProps } from "@tanstack/react-router";
import clsx from "clsx";
import {
  Dock,
  GalleryVertical,
  PanelLeftClose,
  PanelLeftOpen,
  Settings2,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface IDashboardSidebarProps {
  children: React.ReactNode;
}

interface NavItem extends LinkProps {
  title: string;
  icon: LucideIcon;
}

const items: NavItem[] = [
  {
    title: "Jobs",
    to: "/dashboard/jobs",
    icon: GalleryVertical,
  },
  {
    title: "Settings",
    to: "/dashboard/settings",
    icon: Settings2,
  },
  {
    title: "Billing",
    to: "/dashboard/billing",
    icon: Dock,
  },
];

const DashboardSidebar: React.FC<IDashboardSidebarProps> = ({ children }) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(location.pathname);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex max-h-[2400px] flex-col md:flex-row">
      <div
        className={clsx(
          "relative flex flex-row md:flex-col border-b md:border-b-0 md:border-r bg-background transition-all duration-300",
          collapsed ? "w-full md:w-16" : "w-full md:w-44",
        )}
      >
        <div className="hidden md:flex items-center border-r md:border-r-0 md:border-b px-2 md:px-4 h-12 md:h-14">
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto hidden md:flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>

        <div className="flex-1 w-full p-2">
          <nav className="grid grid-cols-7 md:grid-cols-none md:grid-flow-row md:gap-1 w-full">
            {items.map((item) => (
              <Link
                key={item.title}
                {...item}
                className={clsx(
                  "flex items-center py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  "justify-center md:justify-center",
                  "md:h-12 md:px-3 md:rounded-md",
                  !collapsed && "md:justify-start",
                  activeSection === item.to &&
                  "bg-primary text-primary-foreground",
                )}
                onClick={() => setActiveSection(item.to || "")}
              >
                <div
                  className={clsx(
                    "flex items-center",
                    !collapsed && "md:w-full",
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="hidden md:block ml-3">{item.title}</span>
                  )}
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="flex-grow w-full overflow-auto px-10">{children}</div>
    </div>
  );
};

export default DashboardSidebar;
