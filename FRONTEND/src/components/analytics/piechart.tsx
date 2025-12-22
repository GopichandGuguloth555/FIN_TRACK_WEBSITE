import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = [
  "#FF6B6B",
  "#FFB347",
  "#4F3BA9",
  "#6BCB77",
  "#4D96FF",
];

export default function CategoryPieChart({ month }: { month: string }) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (month) fetchCategory();
  }, [month]);

  const fetchCategory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/analytics/category?type=expense&month=${month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();
      setData(json.data);
    } catch (error) {
      console.error("Failed to fetch category", error);
    }
  };

  return (
    <div className="rounded-card bg-white border shadow-card p-4 h-[350px]">
      <p className="text-sm font-semibold mb-2">
        Category Breakdown
      </p>

      {data.length === 0 ? (
        <p className="text-sm text-gray-400">No data</p>
      ) : (
        <PieChart width={300} height={260}>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={80}
            paddingAngle={3}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
}
