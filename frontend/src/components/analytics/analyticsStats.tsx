import { useEffect, useState } from "react";
import axios from "@/api/axios";

type Summary = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

export default function AnalyticsStats() {
  const [data, setData] = useState<Summary | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await axios.get("/analytics/summary", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(res.data);
    };

    fetchSummary();
  }, []);

  if (!data) return null;

  const stats = [
    { label: "Total Income", value: `₹${data.totalIncome.toLocaleString()}` },
    { label: "Total Expense", value: `₹${data.totalExpense.toLocaleString()}` },
    { label: "Net Balance", value: `₹${data.balance.toLocaleString()}` },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((item) => (
        <div
          key={item.label}
          className="bg-neutral-900 border border-neutral-800 rounded-xl p-5"
        >
          <p className="text-sm text-neutral-400">{item.label}</p>
          <p className="text-2xl font-semibold mt-1">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
