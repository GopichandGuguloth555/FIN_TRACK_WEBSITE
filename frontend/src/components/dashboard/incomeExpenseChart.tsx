"use client";

import { useEffect, useState } from "react";
import axios from "@/api/axios";
import {BarChart, Bar,XAxis,Tooltip,ResponsiveContainer,} from "recharts";
import PageLoader from "../ui/PageLoader";
import AlertBox from "../ui/alert";



const [loading, setLoading] = useState(false);
const [alert, setAlert] = useState<any>(null);

/* ---------- Custom Tooltip ---------- */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg bg-neutral-900 border border-white/10 px-3 py-2 text-xs">
      <p className="text-neutral-400">{label}</p>
      <p className="text-emerald-400 font-semibold">
        ₹{payload[0].value.toLocaleString()}
      </p>
    </div>
  );
};

export default function IncomeExpenseBarChart() {

    setLoading(true);

  const [data, setData] = useState<any[]>([]);

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
          value: d.income,
        }))
      
      );
      setLoading(false);
    };

    fetchMonthly();
  }, []);

  return (
   <>
   {loading && <PageLoader/>}
    {alert && (
        <AlertBox
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
    <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-6">
      <h3 className="text-sm font-medium text-neutral-300 mb-4">
        Income Overview
      </h3>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#9ca3af", // neutral-400
                fontSize: 12,
              }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
              fill="url(#incomeGradient)"
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
   </>
  );
}
