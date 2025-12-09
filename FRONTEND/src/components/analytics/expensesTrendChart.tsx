import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", amount: 12000 },
  { month: "Feb", amount: 13500 },
  { month: "Mar", amount: 11000 },
  { month: "Apr", amount: 15000 },
];

export default function ExpenseTrendChart() {
  return (
    <div className="rounded-card bg-white border border-brand-borderLight shadow-card p-4 h-[350px]">
      <p className="text-sm font-semibold text-brand-text mb-2">
        Monthly Expense Trend
      </p>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#4F3BA9"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
