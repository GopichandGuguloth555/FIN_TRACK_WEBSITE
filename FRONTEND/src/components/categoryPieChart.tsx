import { ChartWrapper } from "@/components/ui/sprendignChart";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Food", value: 400 },
  { name: "Rent", value: 1000 },
  { name: "Shopping", value: 300 },
  { name: "Bills", value: 500 },
];

const COLORS = ["#16A34A", "#86EFAC", "#34D399", "#059669"];

export function CategoryPieChart() {
  return (
    <ChartWrapper>
      <h3 className="text-lg font-semibold mb-4">Top Expense Categories</h3>
      <div className="h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={80}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartWrapper>
  );
}
