import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

      {/* Total Credit */}
      <div className="bg-blue-800 text-white p-6 rounded-2xl shadow-lg flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-xl">
            <ArrowUpRight className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold">Total Credit</h3>
        </div>

        <div className="flex items-end justify-between">
          <p className="text-3xl font-bold">₹ 9,42,000</p>

          <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
            +1.29%
          </span>
        </div>
      </div>

      {/* Total Debit */}
      <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-xl">
            <ArrowDownRight className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold">Total Debit</h3>
        </div>

        <div className="flex items-end justify-between">
          <p className="text-3xl font-bold">₹ 72,000</p>

          <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            -1.29%
          </span>
        </div>
      </div>

    </div>
  );
}
