"use client";

import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#22c55e", "#ef4444"];

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

      <div className="relative h-48 flex items-center justify-center">
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

        <div className="absolute text-center">
          <p className="text-xs text-neutral-400">Total</p>
          <p className="text-lg font-semibold">
            ₹{total.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
