import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface ChartItem {
  name: string;
  value: number;
}

interface CategoryResponse {
  category: string;
  total: number;
}

export default function SpendingChart() {
  const [data, setData] = useState<ChartItem[]>([]);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const fetchSpending = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:5000/analytics/category?type=expense",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // 🔒 Free user
        if (res.status === 403) {
          setIsLocked(true);
          return;
        }

        if (res.status !== 200) return;

        const json = await res.json();

        const chartData: ChartItem[] = (json.data || []).map(
          (item: CategoryResponse) => ({
            name:
              item.category.charAt(0).toUpperCase() +
              item.category.slice(1),
            value: item.total,
          })
        );

        setData(chartData);
      } catch (error) {
        console.error("Failed to fetch spending data", error);
      }
    };

    fetchSpending();
  }, []);

  if (isLocked) {
    return (
      <div className="rounded-2xl bg-white border border-[#E8E5D8] shadow p-6 text-center">
        <p className="text-lg font-semibold text-[#3D3B47] mb-2">
          Spending Breakdown
        </p>
        <p className="text-gray-500">
          Upgrade to Premium to view spending insights
        </p>
      </div>
    );
  }

  if (data.length === 0) return null;

  return (
    <div className="rounded-2xl bg-white border border-[#E8E5D8] shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-6">
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
              fill="#4C1D95"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
