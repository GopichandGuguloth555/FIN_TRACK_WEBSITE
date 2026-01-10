import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-brand-card">
      
      {/* Sidebar */}
      <div className="w-70 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto px-6 py-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
