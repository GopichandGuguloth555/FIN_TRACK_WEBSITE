import AnalyticsSummary from "../components/analytics/summaryCards";
import CategoryPieChart from "../components/analytics/piechart";
import ExpenseTrendChart from "../components/analytics/expensesTrendChart";
import InsightsBox from "../components/analytics/insights";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AnalyticsSummary label="Total Expenses" value="₹45,000" highlight />
        <AnalyticsSummary label="Avg. Monthly Spend" value="₹13,200" />
        <AnalyticsSummary label="Top Category" value="Shopping" />
      </div>

      {/* Charts + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ExpenseTrendChart />
        </div>

        <div>
          <CategoryPieChart />
        </div>
      </div>

      {/* Insights section */}
      <InsightsBox />
    </div>
  );
}
