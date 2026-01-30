import DashboardLayout from "@/components/layout/dashboardLayout";
import AnalyticsHeader from "@/components/analytics/analyticsHeader";
import AnalyticsStats from "@/components/analytics/analyticsStats";
import ExpenseTrendChart from "@/components/analytics/analyticsExpenseTrendChat";
import ExpenseBreakdownChart from "@/components/analytics/analyticsBreakDownChart";

export default function Analytics() {
  return (
    <DashboardLayout>
      <AnalyticsHeader />

      <AnalyticsStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <ExpenseTrendChart />
        </div>

        <ExpenseBreakdownChart />
      </div>
    </DashboardLayout>
  );
}
