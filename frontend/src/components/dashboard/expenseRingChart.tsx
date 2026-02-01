"use client";

import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = [
  "#10b981", // Income - emerald
  "#ffffff", // Expense - white
];

export default function IncomeExpenseRings() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await axios.get("/analytics/summary", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setIncome(res.data.totalIncome);
      setExpense(res.data.totalExpense);
    };

    fetchSummary();
  }, []);

  const data = [
    { name: "Income", value: income },
    { name: "Expenses", value: expense },
  ];

  const total = income + expense;

  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-6">
      <h3 className="text-sm font-medium text-neutral-300 mb-4">
        Income vs Expense
      </h3>

      <div className="relative h-52 flex flex-col items-center justify-center">
        {/* CHART */}
        <div className="relative h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={55}
                outerRadius={75}
                paddingAngle={6}
                dataKey="value"
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* CENTER TOTAL */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-xs text-neutral-400">Total</p>
            <p className="text-lg font-semibold">
              ₹{total.toLocaleString()}
            </p>
          </div>
        </div>

        {/* LEGEND */}
        <div className="mt-4 flex items-center gap-6 text-sm">
          {/* Income */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            <span className="text-neutral-300">
              Income
              <span className="ml-1 text-emerald-400 font-medium">
                ₹{income.toLocaleString()}
              </span>
            </span>
          </div>

          {/* Expense */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-white" />
            <span className="text-neutral-300">
              Expense
              <span className="ml-1 text-white font-medium">
                ₹{expense.toLocaleString()}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
