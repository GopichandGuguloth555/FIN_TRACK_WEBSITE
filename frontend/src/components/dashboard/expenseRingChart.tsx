"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Income", value: 85000 },
  { name: "Expenses", value: 40000 },
];

const COLORS = ["#22c55e", "#ef4444"]; // green, red

export default function IncomeExpenseRings() {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-6">
      <h3 className="text-sm font-medium text-neutral-300 mb-4">
        Income vs Expense
      </h3>

      <div className="h-48 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={55}
              outerRadius={75}
              paddingAngle={6}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute text-center">
          <p className="text-xs text-neutral-400">Total</p>
          <p className="text-lg font-semibold">₹{total.toLocaleString()}</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-between mt-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-neutral-300">Income</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-neutral-300">Expenses</span>
        </div>
      </div>
    </div>
  );
}
