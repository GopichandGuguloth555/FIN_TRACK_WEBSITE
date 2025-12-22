import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ExpenseTrendChart({ data }: { data: any[] }) {
  const chartData = data.map((d) => ({
    month: d._id,
    expense: d.totalExpense,
  }));

  return (
    <div className="bg-white rounded-card p-4 shadow">
      <h3 className="font-semibold mb-4">Monthly Expense Trend</h3>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#4F3BA9"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
