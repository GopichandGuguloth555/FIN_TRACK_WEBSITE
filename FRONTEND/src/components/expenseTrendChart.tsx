import { ChartWrapper } from "@/components/ui/sprendignChart";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", income: 3000, expense: 1800 },
  { month: "Feb", income: 3500, expense: 2100 },
  { month: "Mar", income: 4000, expense: 2500 },
  { month: "Apr", income: 3800, expense: 2600 },
];

export function ExpenseTrendChart() {
  return (
    <ChartWrapper>
      <h3 className="text-lg font-semibold mb-4">Expense Activity</h3>
      <div className="h-64">
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="income" stroke="#16A34A" strokeWidth={3} />
            <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartWrapper>
  );
}
