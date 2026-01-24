import { useEffect, useState } from "react";
import RecentActivity from "@/components/recentActivity";
import BudgetHealth from "@/components/budjectHealth";
import BalanceCard from "@/components/balancedCard";
import MonthlySummary from "@/components/ui/monthlySummaryCard";
import SpendingChart from "@/components/ui/sprendignChart";

export default function DashboardPage() {
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    fetchBalance();
    fetchUserStatus();
  }, []);

  const fetchUserStatus = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) return;

      const json = await res.json();
      setIsPremium(json.isPremium);
    } catch (error) {
      console.error("Failed to fetch user status", error);
    }
  };

  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/analytics/summary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) return;

      const json = await res.json();
      setBalance(json.balance);
    } catch (error) {
      console.error("Failed to fetch balance", error);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT COLUMN */}
        <div className="space-y-6 pt-10">
          {balance !== null && <BalanceCard balance={balance} />}
          <RecentActivity />
          <BudgetHealth />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6 pt-10">
          {isPremium ? (
            <>
              <MonthlySummary />
              <SpendingChart />
            </>
          ) : (
            <>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center">
                <h3 className="text-lg font-semibold mb-2">Monthly Summary</h3>
                <p className="text-gray-500">
                  Upgrade to Premium to view monthly summary
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center">
                <h3 className="text-lg font-semibold mb-2">Spending Chart</h3>
                <p className="text-gray-500">
                  Upgrade to Premium to view spending insights
                </p>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
