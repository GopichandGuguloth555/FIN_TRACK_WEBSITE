import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  Wallet,
  BarChart2,
  User,
  Settings
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Transactions", icon: Receipt, to: "/transactions" },
  { label: "Budgets", icon: Wallet, to: "/budgets" },
  { label: "Analytics", icon: BarChart2, to: "/analytics" },
  { label: "Profile", icon: User, to: "/profile" },
];

export default function Sidebar() {
  return (
    <aside
      className="
        hidden lg:flex flex-col
        h-screen w-[240px]
        bg-[#D8D3E9]/90
        backdrop-blur-xl
        border-r border-white/40
        shadow-[4px_0_25px_rgba(0,0,0,0.08)]
        p-6
      "
    >
     
      <div className="flex items-center justify-center mb-10 pt-10 bg-transparent">
        <img
          src="/assets/FintrackLogo.png"
          alt="FinTrack Logo"
          className="w-40 h-auto object-contain bg-transparent mix-blend-multiply"
        />
      </div>

      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `
              flex items-center gap-4
              px-5 py-3
              my-[6px]
              rounded-xl
              text-[17px] font-medium
              transition-all duration-300 ease-in-out

              ${
                isActive
                  ? "bg-[#4E3B84] text-white shadow-lg scale-[1.02]"
                  : "text-[#3F3D56] hover:bg-white/50 hover:shadow-md hover:scale-[1.01]"
              }
            `
            }
          >
            <item.icon className="h-6 w-6" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      
      <div className="mt-auto">
        <div
          className="
            flex items-center gap-4 px-5 py-3
            rounded-xl text-[#3F3D56] hover:bg-white/50
            transition-all duration-300 cursor-pointer
          "
        >
          <Settings className="h-6 w-6 " />
          <span className="text-[17px] font-medium">Settings</span>
        </div>
      </div>
    </aside>
  );
}
