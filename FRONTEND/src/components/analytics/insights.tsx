import { useEffect, useState } from "react";

export default function InsightsBox() {
  const [insights, setInsights] = useState<any[]>([]);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/analytics/insights",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();
      setInsights(json.data);
    } catch (error) {
      console.error("Failed to fetch insights", error);
    }
  };

  return (
    <div className="rounded-card bg-brand-purpleSoft border shadow-card p-4">
      <p className="text-sm font-semibold mb-2">
        Smart Insights
      </p>

      {insights.length === 0 ? (
        <p className="text-sm text-gray-500">
          No insights available
        </p>
      ) : (
        <ul className="space-y-2 text-sm">
          {insights.map((i, idx) => {
            const diff = i.totalIncome - i.totalExpense;

            return (
              <li key={idx}>
                • {i.month}:{" "}
                {diff >= 0
                  ? `You saved ₹${diff}`
                  : `You overspent ₹${Math.abs(diff)}`}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
