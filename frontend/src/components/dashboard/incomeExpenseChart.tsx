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

export default function IncomeExpenseBarChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchMonthly = async () => {
      const res = await axios.get("/analytics/monthly", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setData(
        res.data.map((d: any) => ({
          month: d.month,
          value: d.income, // dashboard shows income trend
        }))
      );
    };

    fetchMonthly();
  }, []);

  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-6">
      <h3 className="text-sm font-medium text-neutral-300 mb-4">
        Income Overview
      </h3>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#737373", fontSize: 12 }}
            />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#2563eb"
              radius={[6, 6, 6, 6]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
