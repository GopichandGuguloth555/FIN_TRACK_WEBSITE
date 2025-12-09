import BalanceCard from "@/components/balancedCard";
import MonthlySummary from "@/components/ui/monthlySummaryCard";
import RecentActivity from "@/components/recentActivity";
import SpendingChart from "@/components/ui/sprendignChart";
import BudgetHealth from "@/components/budjectHealth";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4">

      {/* LEFT SIDE — 2/3 width */}
      <div className="lg:col-span-2 space-y-6">

        {/* Balance Card */}
        <BalanceCard />

        {/* Recent Activity */}
        <div
          className="
            rounded-2xl 
            bg-[#FAF8F0]
            border border-[#E8E5D8]
            shadow-[0_4px_12px_rgba(0,0,0,0.06)]
            p-6
          "
        >
          <RecentActivity />
        </div>

        {/* Budget Health */}
        <div
          className="
            rounded-2xl 
            bg-[#FAF8F0]
            border border-[#E8E5D8]
            shadow-[0_4px_12px_rgba(0,0,0,0.06)]
            p-6
          "
        >
          <BudgetHealth />
        </div>

      </div>

      {/* RIGHT SIDE — 1/3 width */}
      <div className="space-y-6">

        {/* Income Summary */}
        <div
          className="
            rounded-2xl 
            bg-[#FAF8F0]
            border border-[#E8E5D8]
            shadow-[0_4px_12px_rgba(0,0,0,0.06)]
            p-6
          "
        >
          <MonthlySummary type="income" />
        </div>

        {/* Expense Summary */}
        <div
          className="
            rounded-2xl 
            bg-[#FAF8F0]
            border border-[#E8E5D8]
            shadow-[0_4px_12px_rgba(0,0,0,0.06)]
            p-6
          "
        >
          <MonthlySummary type="expense" />
        </div>

        {/* Spending Chart */}
        <div
          className="
            rounded-2xl 
            bg-[#FAF8F0]
            border border-[#E8E5D8]
            shadow-[0_4px_12px_rgba(0,0,0,0.06)]
            p-6
          "
        >
          <SpendingChart />
        </div>

      </div>

    </div>
  );
}
