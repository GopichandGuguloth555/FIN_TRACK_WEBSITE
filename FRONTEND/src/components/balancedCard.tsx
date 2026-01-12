import { useEffect, useState } from "react";
import axios from "axios";

interface SummaryResponse {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export default function BalanceCard() {
  const [data, setData] = useState<SummaryResponse | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get<SummaryResponse>(
        "http://localhost:5000/analytics/summary",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data);
    };

    fetchBalance();
  }, []);

  if (!data) return null;

  return (
    <div className="w-full h-40 bg-violet-900  rounded-3xl p-6 text-white text-center">
      <p className="text-4xl font-bold mb-3">Current Balance</p>

      <h2 className="text-4xl font-semibold tracking-tight">
        ₹{data.balance.toLocaleString()}
      </h2>
    </div>
  );
}
