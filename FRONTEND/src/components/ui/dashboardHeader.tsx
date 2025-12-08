import { Search } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl shadow mb-8 flex items-center justify-between">

      {/* Welcome Text */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back 👋</h2>
        <p className="text-gray-600 text-sm mt-1">Stay updated with what's happening</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search for anything..."
          className="w-72 px-4 py-2 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-500" />
      </div>

    </div>
  );
}
