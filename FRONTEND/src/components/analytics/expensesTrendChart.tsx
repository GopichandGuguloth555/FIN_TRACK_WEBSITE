import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ExpenseTrendChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchTrend();
  }, []);

  const fetchTrend = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const res = await fetch(
        "http://localhost:5000/analytics/stats/monthly",
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (!res.ok) {
        throw new Error("Unauthorized");
      }

      const json = await res.json();

      const formatted = json.stats.map((item: any) => ({
        month: item._id,
        expense: item.totalExpense,
      }));

      setData(formatted);
    } catch (error) {
      console.error("Failed to fetch monthly stats", error);
    }
  };

  return (
    <div className="rounded-card bg-white border shadow-card p-4 h-[350px]">
      <p className="text-sm font-semibold mb-2">
        Monthly Expense Trend
      </p>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#4F3BA9"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
