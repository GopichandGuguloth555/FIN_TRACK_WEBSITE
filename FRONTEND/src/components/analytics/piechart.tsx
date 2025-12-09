import { PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "Food", value: 3200, color: "#FF6B6B" },
  { name: "Travel", value: 800, color: "#4F3BA9" },
  { name: "Shopping", value: 5000, color: "#FFB347" },
  { name: "Bills", value: 2500, color: "#6BCB77" },
];

export default function CategoryPieChart() {
  return (
    <div className="rounded-card bg-white border border-brand-borderLight shadow-card p-4 h-[350px]">
      <p className="text-sm font-semibold text-brand-text mb-2">
        Category Breakdown
      </p>

      <PieChart width={300} height={260}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
          paddingAngle={3}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>

        <Legend />
      </PieChart>
    </div>
  );
}
