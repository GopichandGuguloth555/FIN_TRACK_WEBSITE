import Sidebar from "./Sidebar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-50 p-6 min-h-screen">
        {children}
      </div>
    </div>
  );
}
