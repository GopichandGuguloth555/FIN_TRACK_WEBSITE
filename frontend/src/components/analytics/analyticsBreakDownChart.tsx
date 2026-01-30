import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Food", value: 25000 },
  { name: "Travel", value: 18000 },
  { name: "Bills", value: 14000 },
  { name: "Shopping", value: 12000 },
  { name: "Others", value: 9500 },
];

const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#ec4899", "#a855f7"];

export default function ExpenseBreakdownChart() {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
      <h3 className="font-semibold mb-4">Expense Breakdown</h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
