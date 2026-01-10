import BalanceCard from "@/components/balancedCard";
import MonthlySummary from "@/components/ui/monthlySummaryCard";
import RecentActivity from "@/components/recentActivity";
import SpendingChart from "@/components/ui/sprendignChart";
import BudgetHealth from "@/components/budjectHealth";

export default function DashboardPage() {
  return (
    <div className=" min-h-screen p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="space-y-6 pt-10 ">
          <BalanceCard/>
          <RecentActivity />
          <BudgetHealth />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6 pt-10 ">
          <MonthlySummary />
          <SpendingChart />
        </div>

      </div>
    </div>
  );
}
