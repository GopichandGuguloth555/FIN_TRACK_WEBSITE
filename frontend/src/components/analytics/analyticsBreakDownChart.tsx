import { useEffect, useState } from "react";
import axios from "@/api/axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#ec4899", "#a855f7"];

type Item = {
  category: string;
  total: number;
};

export default function ExpenseBreakdownChart() {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios.get("/analytics/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(res.data);
    };

    fetchCategory();
  }, []);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
      <h3 className="font-semibold mb-4">Expense Breakdown</h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="category"
              outerRadius={90}
              label
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
