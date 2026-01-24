import { useEffect, useState } from "react";

interface SummaryResponse {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export default function MonthlySummary() {
  const [data, setData] = useState<SummaryResponse | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/analytics/summary", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 403) {
          setIsLocked(true);
          return;
        }

        if (res.status !== 200) return;

        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch monthly summary", error);
      }
    };

    fetchSummary();
  }, []);

  // 🔒 Free user view
  if (isLocked) {
    return (
      <div className="w-full rounded-2xl p-6 bg-white border border-gray-200 shadow-sm text-center">
        <h3 className="text-lg font-semibold mb-2">Monthly Summary</h3>
        <p className="text-gray-500">
          Upgrade to Premium to view monthly summary
        </p>
      </div>
    );
  }

  // ⏳ Loading
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
