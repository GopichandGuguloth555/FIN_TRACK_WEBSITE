import { useEffect, useState } from "react";
import axios from "@/api/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Item = {
  month: string;
  expense: number;
};

export default function ExpenseTrendChart() {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const fetchMonthly = async () => {
      const res = await axios.get("/analytics/monthly", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setData(
        res.data.map((d: any) => ({
          month: d.month,
          expense: d.expense,
        }))
      );
    };

    fetchMonthly();
  }, []);

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
      <h3 className="font-semibold mb-4">Monthly Expense Trend</h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
