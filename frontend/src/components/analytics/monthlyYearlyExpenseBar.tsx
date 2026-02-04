"use client";

import { useEffect, useState } from "react";
import axios from "@/api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Item = {
  label: string;   // month name or "Year"
  expense: number; // amount
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg bg-neutral-900 border border-white/10 px-3 py-2 text-xs">
      <p className="text-neutral-400">{label}</p>
      <p className="text-red-400 font-semibold">
        ₹{payload[0].value.toLocaleString()}
      </p>
    </div>
  );
};

export default function MonthlyYearlyExpenseBar() {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const fetchMonthly = async () => {
      const res = await axios.get("/analytics/monthly", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const monthly: Item[] = res.data.map((d: any) => ({
        label: d.month,
        expense: d.expense,
      }));

      const yearlyTotal = res.data.reduce(
        (sum: number, d: any) => sum + (d.expense || 0),
        0
      );

      setData([
        ...monthly,
        { label: "Year total", expense: yearlyTotal },
      ]);
    };

    fetchMonthly();
  }, []);

  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-6">
      <h3 className="text-sm font-medium text-neutral-300 mb-4">
        Monthly & Yearly Expenses
      </h3>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#9ca3af",
                fontSize: 11,
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="expense"
              radius={[6, 6, 0, 0]}
              fill="url(#expenseGradient)"
            />
            <defs>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97373" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}