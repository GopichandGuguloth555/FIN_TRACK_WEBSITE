import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AnalyticsSummary from "../components/analytics/summaryCards";
import CategoryPieChart from "../components/analytics/piechart";
import ExpenseTrendChart from "../components/analytics/expensesTrendChart";
import InsightsBox from "../components/analytics/insights";


export default function AnalyticsPage() {
  const [summary, setSummary] = useState<any>(null);
  const [activeMonth, setActiveMonth] = useState<string>("");
  const [isPremium, setIsPremium] = useState<boolean>(true);

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

      // 🔒 Premium check
      if (res.status === 403) {
        setIsPremium(false);
        return;
      }

      const json = await res.json();

      if (!json.stats || json.stats.length === 0) return;

      const latestMonth = json.stats[json.stats.length - 1]._id;
      setActiveMonth(latestMonth);

      fetchSummary(latestMonth);
    } catch (error) {
      console.error("Failed to detect latest month", error);
    }
  };

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

      if (res.status === 403) {
        setIsPremium(false);
        return;
      }

      const json = await res.json();
      setSummary(json);
    } catch (error) {
      console.error("Failed to fetch summary", error);
    }
  };

  // 🔒 Free user view
  if (!isPremium) {
    return (
      <div className="text-center space-y-4 mt-10">
        <p className="text-lg">Analytics is a Premium feature</p>
        <Link to="/pricing">
        <button
          onClick={handleUpgrade}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Upgrade to Premium
        </button>
        </Link>
      </div>
    );
  }

  // ⏳ Loading
  if (!summary || !activeMonth) {
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

      {/* Charts (render only when month exists) */}
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


const handleUpgrade = async () => {
  const token = localStorage.getItem("token");

  await fetch("http://localhost:5000/users/upgrade", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  window.location.reload();
};
