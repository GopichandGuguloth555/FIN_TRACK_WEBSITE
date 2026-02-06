"use client";

import { useEffect, useState } from "react";
import axios from "@/api/axios";
import DashboardLayout from "@/components/layout/dashboardLayout";
import AlertBox from "@/components/ui/alert";
import {
  IconWallet,
  IconArrowUpRight,
  IconArrowDownRight,
  IconReceipt,
} from "@tabler/icons-react";
import RecentTransactions from "@/components/dashboard/recentTransaction";
import IncomeExpenseChart from "@/components/dashboard/incomeExpenseChart";
import IncomeExpenseRings from "@/components/dashboard/expenseRingChart";

type Summary = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

export default function Dashboard() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [txCount, setTxCount] = useState(0);
  const [,setLoading] = useState(true);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const [summaryRes, txRes] = await Promise.all([
          axios.get("/analytics/summary", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/transactions", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setSummary(summaryRes.data);
        setTxCount(txRes.data.transactions.length);
      } catch {
        setAlert({ message: "Failed to load dashboard data", type: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout>
      {alert && (
        <AlertBox
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-neutral-400">
          Welcome back. Here's what's happening today.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Balance */}
        <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/10">
          <div className="flex items-center justify-between">
            <p className="text-neutral-400 text-sm">Total Balance</p>
            <IconWallet className="text-white/70" />
          </div>
          <h2 className="text-2xl font-semibold mt-4">
            ₹{(summary?.balance ?? 0).toLocaleString()}
          </h2>
        </div>

        {/* Income */}
        <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/10">
          <div className="flex items-center justify-between">
            <p className="text-neutral-400 text-sm">Income</p>
            <IconArrowUpRight className="text-green-400" />
          </div>
          <h2 className="text-2xl font-semibold mt-4">
            ₹{(summary?.totalIncome ?? 0).toLocaleString()}
          </h2>
        </div>

        {/* Expense */}
        <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/10">
          <div className="flex items-center justify-between">
            <p className="text-neutral-400 text-sm">Expenses</p>
            <IconArrowDownRight className="text-red-400" />
          </div>
          <h2 className="text-2xl font-semibold mt-4">
            ₹{(summary?.totalExpense ?? 0).toLocaleString()}
          </h2>
        </div>

        {/* Transactions */}
        <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/10">
          <div className="flex items-center justify-between">
            <p className="text-neutral-400 text-sm">Transactions</p>
            <IconReceipt className="text-white/70" />
          </div>
          <h2 className="text-2xl font-semibold mt-4">{txCount}</h2>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* LEFT */}
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <IncomeExpenseChart />
          <IncomeExpenseRings />
        </div>
      </div>
    </DashboardLayout>
  );
}