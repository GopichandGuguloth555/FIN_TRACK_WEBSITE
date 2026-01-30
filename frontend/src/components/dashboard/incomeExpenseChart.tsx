"use client";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", value: 4000 },
  { month: "Feb", value: 3000 },
  { month: "Mar", value: 5000 },
  { month: "Apr", value: 4500 },
  { month: "May", value: 6000 },
  { month: "Jun", value: 5200 },
];

export default function IncomeExpenseBarChart() {
  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-neutral-300">
            Income Overview
          </h3>
          <p className="text-xs text-neutral-500">Jan – Jun 2025</p>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400">
          +5.2%
        </span>
      </div>

      {/* Chart */}
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barCategoryGap={18}  
            barGap={6}           
          >
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#737373", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              contentStyle={{
                background: "#0a0a0a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#a3a3a3" }}
            />
            <Bar
              dataKey="value"
              fill="#2563eb"
              radius={[6, 6, 6, 6]} // rounded bars
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
