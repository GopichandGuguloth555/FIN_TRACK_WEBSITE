import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", income: 40000, outcome: 24000 },
  { month: "Feb", income: 35000, outcome: 20000 },
  { month: "Mar", income: 50000, outcome: 30000 },
  { month: "Apr", income: 46000, outcome: 26000 },
  { month: "May", income: 52000, outcome: 32000 },
  { month: "Jun", income: 48000, outcome: 27000 },
];

export default function OverviewChart() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border">

      <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

          <XAxis dataKey="month" stroke="#555" tick={{ fontSize: 12 }} />
          <YAxis stroke="#555" tick={{ fontSize: 12 }} />

          <Tooltip />

          <Bar 
            dataKey="income" 
            fill="#3b82f6" 
            radius={[10, 10, 0, 0]}
            barSize={25}
          />

          <Bar 
            dataKey="outcome" 
            fill="#60a5fa" 
            radius={[10, 10, 0, 0]} 
            barSize={25}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}
