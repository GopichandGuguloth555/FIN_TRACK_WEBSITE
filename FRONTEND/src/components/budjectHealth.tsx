import { useEffect, useState } from "react";

interface BudgetResponse {
  category: string;
  amount: number;
  spent: number;
}

interface BudgetItem {
  label: string;
  percent: number;
  color: string;
}

const COLORS = ["#4E3B84", "#7C6BB2", "#C7BEE7"];

export default function BudgetHealth() {
  const [items, setItems] = useState<BudgetItem[]>([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/budget", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();

      const data: BudgetItem[] = (json.data || []).map(
        (b: BudgetResponse, i: number) => ({
          label: b.category,
          percent:
            b.amount > 0
              ? Math.min(Math.round((b.spent / b.amount) * 100), 100)
              : 0,
          color: COLORS[i % COLORS.length],
        })
      );

      setItems(data);
    };

    fetchBudgets();
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="  p-16 rounded-2xl shadow-md border border-[#EAE7DF] w-full">
      <h2 className="text-[18px] font-semibold text-[#2F2D35] mb-4 pb-5">
        <b>Budget Health</b>
      </h2>

      <div className="flex items-center justify-between">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="relative h-40 w-40 mb-2">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                <path
                  d="M18 2 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32"
                  fill="none"
                  stroke="#E4E2DC"
                  strokeWidth="3.5"
                />

                <path
                  d="M18 2 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32"
                  fill="none"
                  stroke={item.color}
                  strokeWidth="3.5"
                  strokeDasharray={`${item.percent}, 100`}
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[20px] font-semibold text-[#2F2D35]">
                  {item.percent}%
                </span>
              </div>
            </div>

            <p className="text-[14px] font-medium text-[#2F2D35]">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
