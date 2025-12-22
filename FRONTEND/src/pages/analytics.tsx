import { useEffect, useState } from "react";

import AnalyticsSummary from "../components/analytics/summaryCards";
import CategoryPieChart from "../components/analytics/piechart";
import ExpenseTrendChart from "../components/analytics/expensesTrendChart";
import InsightsBox from "../components/analytics/insights";

export default function AnalyticsPage() {
  const [summary, setSummary] = useState<any>(null);
  const [activeMonth, setActiveMonth] = useState<string>("");

  useEffect(() => {
    detectLatestMonth();
  }, []);

  const detectLatestMonth = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/analytics/stats/monthly",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();

      if (!json.stats || json.stats.length === 0) return;

      const latestMonth = json.stats[json.stats.length - 1]._id;
      setActiveMonth(latestMonth);

      fetchSummary(latestMonth);
    } catch (error) {
      console.error("Failed to detect latest month", error);
    }
  };

  // 2️⃣ Fetch summary for that month
  const fetchSummary = async (month: string) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/analytics/summary?month=${month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();
      setSummary(json);
    } catch (error) {
      console.error("Failed to fetch summary", error);
    }
  };

  if (!summary) {
    return <p className="text-center">Loading analytics...</p>;
  }

  return (
    <div className="space-y-6">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AnalyticsSummary
          label={`Total Expenses (${activeMonth})`}
          value={summary.totalExpense}
          highlight
        />
        <AnalyticsSummary
          label={`Total Income (${activeMonth})`}
          value={summary.totalIncome}
        />
        <AnalyticsSummary
          label={`Balance (${activeMonth})`}
          value={summary.balance}
          showSign
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ExpenseTrendChart />
        </div>

        <div>
          <CategoryPieChart month={activeMonth} />
        </div>
      </div>

      {/* Insights */}
      <InsightsBox />
    </div>
  );
}
