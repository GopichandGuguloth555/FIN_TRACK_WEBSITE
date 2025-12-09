import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-brand-card">

      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <Header />

        <main className="mt-16 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
