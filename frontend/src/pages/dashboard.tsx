import DashboardLayout from "@/components/layout/dashboardLayout";
import {IconWallet,IconArrowUpRight,IconArrowDownRight,IconReceipt,} from "@tabler/icons-react";
import RecentTransactions from "@/components/dashboard/recentTransaction";
import IncomeExpenseChart from "@/components/dashboard/incomeExpenseChart";
import  IncomeExpenseRings from "@/components/dashboard/expenseRingChart"

export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-neutral-400">
          Welcome back. Here's what's happening today.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/15 transition">
          <div className="flex items-center justify-between">
            <p className="text-neutral-400 text-sm">Total Balance</p>
            <IconWallet className="text-white/70" />
          </div>
          <h2 className="text-2xl font-semibold mt-4">₹1,25,000</h2>
        </div>

        <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/15 transition">
          <div className="flex items-center justify-between">
            <p className="text-neutral-400 text-sm">Income</p>
            <IconArrowUpRight className="text-green-400" />
          </div>
          <h2 className="text-2xl font-semibold mt-4">₹85,000</h2>
        </div>

        <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/15 transition">
          <div className="flex items-center justify-between">
            <p className="text-neutral-400 text-sm">Expenses</p>
            <IconArrowDownRight className="text-red-400" />
          </div>
          <h2 className="text-2xl font-semibold mt-4">₹40,000</h2>
        </div>

        <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/15 transition">
          <div className="flex items-center justify-between">
            <p className="text-neutral-400 text-sm">Transactions</p>
            <IconReceipt className="text-white/70" />
          </div>
          <h2 className="text-2xl font-semibold mt-4">128</h2>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* LEFT */}
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>

        {/* RIGHT (charts next) */}
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl items-center justify-center text-neutral-400">
          <IncomeExpenseChart />
          <br />
           <IncomeExpenseRings />
        </div>
      </div>
    </DashboardLayout>
  );
}
