import {
  Home,
  BarChart2,
  Wallet,
  User,
  Settings,
  Shield,
  HelpCircle,
  LucideIcon,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const location = useLocation(); // Detect current URL

  return (
    <div className="w-72 h-screen bg-white border-r shadow-md flex flex-col rounded-r-3xl">

      {/* Logo */}
      <div className="p-8 pb-4">
        <h1 className="text-3xl font-bold text-blue-700">FINTRACK</h1>
      </div>

      {/* Menu */}
      <div className="flex-1 px-4 space-y-1">
        <SidebarItem icon={Home} label="Dashboard" to="/" active={location.pathname === "/"} />
        <SidebarItem icon={BarChart2} label="Analytics" to="/analytics" active={location.pathname === "/analytics"} />
        <SidebarItem icon={Wallet} label="Wallet" to="/wallet" active={location.pathname === "/wallet"} />
        <SidebarItem icon={User} label="Accounts" to="/accounts" active={location.pathname === "/accounts"} />

        <div className="border-t my-4"></div>

        <SidebarItem icon={Settings} label="Settings" to="/settings" active={location.pathname === "/settings"} />
        <SidebarItem icon={Shield} label="Security" to="/security" active={location.pathname === "/security"} />
        <SidebarItem icon={HelpCircle} label="Help Centre" to="/help" active={location.pathname === "/help"} />
      </div>

      {/* User Section */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 m-4 rounded-2xl shadow">
        <div className="flex items-center gap-3">
          <img
            src="https://via.placeholder.com/40"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-gray-800">Maanvi S</p>
            <p className="text-xs text-gray-500">General Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Sidebar Item Component */
interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
  active?: boolean;
}

function SidebarItem({ icon: Icon, label, to, active = false }: SidebarItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition",
        active
          ? "bg-blue-600 text-white shadow"
          : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </Link>
  );
}
