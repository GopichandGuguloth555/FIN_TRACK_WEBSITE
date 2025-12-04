import { Home, BarChart2, Wallet, Settings, PieChart, ChevronLeft, User, LucideIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "h-screen bg-white/70 backdrop-blur-xl border-r border-green-200 shadow-[6px_0_30px_rgba(34,197,94,0.12)] transition-all duration-500 flex flex-col",
        collapsed ? "w-20 p-4" : "w-72 p-6 rounded-r-3xl"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        {!collapsed ? (
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
            FinTrack
          </h1>
        ) : (
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-md">
            <Home className="w-5 h-5 text-white" />
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-xl bg-white/40 hover:bg-white/60 backdrop-blur-md transition-all duration-300 text-green-700"
        >
          <ChevronLeft
            className={cn(
              "w-5 h-5 transition-transform duration-300",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2">
        <SidebarItem icon={Home} label="Dashboard" active collapsed={collapsed} />
        <SidebarItem icon={Wallet} label="Expenses" collapsed={collapsed} />
        <SidebarItem icon={PieChart} label="Categories" collapsed={collapsed} />
        <SidebarItem icon={BarChart2} label="Analytics" collapsed={collapsed} />

        {!collapsed && (
          <div className="my-6 h-px bg-gradient-to-r from-transparent via-green-200 to-transparent" />
        )}

        <SidebarItem icon={User} label="Profile" collapsed={collapsed} />
        <SidebarItem icon={Settings} label="Settings" collapsed={collapsed} />
      </nav>

      {/* Profile Footer */}
      <div className="mt-auto pt-6 border-t border-green-100/30">
        <div
          className={cn(
            "flex items-center gap-3 p-4 rounded-2xl bg-white/40 backdrop-blur-md border border-green-100/50 hover:bg-white/60 transition-all duration-300 shadow-sm cursor-pointer",
            collapsed && "justify-center p-3"
          )}
        >
          {!collapsed && (
            <>
              <div className="w-10 h-10 rounded-2xl bg-green-500 flex items-center justify-center text-white font-bold shadow-md">
                JD
              </div>

              <div className="flex flex-col">
                <p className="text-sm font-semibold text-green-700">John Doe</p>
                <p className="text-xs text-gray-600">Premium User</p>
              </div>
            </>
          )}

          <div className="ml-auto w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md">
            <PieChart className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}

function SidebarItem({ icon: Icon, label, active = false, collapsed }: SidebarItemProps) {
  return (
    <button
      className={cn(
        "group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden",
        "text-gray-700 hover:bg-green-50 hover:text-green-700",

        active && "bg-green-100 text-green-700 font-semibold shadow-sm border border-green-200",

        collapsed && "justify-center px-3"
      )}
    >
      {/* Icon */}
      <Icon
        className={cn(
          "h-5 w-5 transition-all duration-300",
          active ? "text-green-600" : "text-gray-500 group-hover:text-green-600"
        )}
      />

      {/* Label */}
      {!collapsed && (
        <span className="font-medium tracking-wide">{label}</span>
      )}
    </button>
  );
}
