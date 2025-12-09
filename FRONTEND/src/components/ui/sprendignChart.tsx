import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function SpendingChart() {
  const data = [
    { name: "Groceries", value: 400 },
    { name: "Entertainment", value: 600 },
    { name: "Utilities", value: 500 },
    { name: "Transport", value: 900 },
  ];

  return (
    <div
      className="
        rounded-2xl
        bg-white
        border border-[#E8E5D8]
        shadow-[0_4px_12px_rgba(0,0,0,0.06)]
        p-6
      "
    >
      <p className="text-lg font-semibold text-[#3D3B47] mb-4">
        Spending Breakdown
      </p>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={40}>
            <CartesianGrid stroke="#ebe7f1ff" vertical={false} />

            <XAxis
              dataKey="name"
              tick={{ fill: "#6B6A6F", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#6B6A6F", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#FFF",
                border: "1px solid #E8E5D8",
                borderRadius: "8px",
              }}
            />

            <Bar
              dataKey="value"
              radius={[10, 10, 10, 10]}
              fill="#A799D9"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
