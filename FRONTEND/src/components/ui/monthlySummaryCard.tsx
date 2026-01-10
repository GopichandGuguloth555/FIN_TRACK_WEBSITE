import { useEffect, useState } from "react";

interface SummaryResponse {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export default function MonthlySummary() {
  const [data, setData] = useState<SummaryResponse | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/analytics/summary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      setData(json);
    };

    fetchSummary();
  }, []);

  if (!data) return null;

  return (
    <div className="w-full rounded-2xl p-6 bg-white border border-[#EAE7DF] shadow-md">
      <h2 className="text-2xl font-bold text-[#2F2D35] mb-6">
        Monthly Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-[#5F6F52]">Total Income</span>
          <span className="font-semibold text-green-600">
            +₹{data.totalIncome.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#5F6F52]">Net Savings</span>
          <span className="font-semibold text-green-700">
            ₹{data.balance.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
