import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboardLayout";
import AlertBox from "@/components/ui/alert";
import AnalyticsHeader from "@/components/analytics/analyticsHeader";
import AnalyticsStats from "@/components/analytics/analyticsStats";
import ExpenseTrendChart from "@/components/analytics/analyticsExpenseTrendChat";
import ExpenseBreakdownChart from "@/components/analytics/analyticsBreakDownChart";
import MonthlyYearlyExpenseBar from "@/components/analytics/monthlyYearlyExpenseBar";
import MonthlyYearlyIncomeBar from "@/components/analytics/monthlyYearlyIncomeBar";

export default function Analytics() {
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);

  return (
    <DashboardLayout>
      {alert && (
        <AlertBox
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <AnalyticsHeader />

      <AnalyticsStats />

      {/* Existing charts: trend + category breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <ExpenseTrendChart />
        </div>

        <ExpenseBreakdownChart />
      </div>

      {/* New section: monthly vs yearly income/expense */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <MonthlyYearlyExpenseBar />
        <MonthlyYearlyIncomeBar />
      </div>
    </DashboardLayout>
  );
}