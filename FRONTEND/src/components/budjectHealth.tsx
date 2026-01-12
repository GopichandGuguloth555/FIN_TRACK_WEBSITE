import { useEffect, useState } from "react";

interface BudgetItem {
  label: string;
  percent: number;
  color: string;
}

const RADIUS = 16;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;


const getColor = (percent: number) => {
  if (percent >= 80) return "#5B2D8B"; 
  if (percent >= 50) return "#7C6BB2"; 
  return "#4E3B84";
};

export default function BudgetHealth() {
  const [items, setItems] = useState<BudgetItem[]>([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/budget/health", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();

        const formatted: BudgetItem[] = (json.items || []).map(
          (item: any) => ({
            label: item.label,
            percent: item.percent,
            color: getColor(item.percent),
          })
        );

        setItems(formatted);
      } catch (err) {
        console.error("Failed to fetch budget health", err);
      }
    };

    fetchBudgets();
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="p-16 rounded-2xl shadow-md border border-[#EAE7DF] w-full">
      <h2 className="text-[18px] font-semibold text-[#2F2D35] mb-6">
        Budget Health
      </h2>

      <div className="flex items-center justify-between">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="relative h-40 w-40 mb-3">
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
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={
                    CIRCUMFERENCE -
                    (item.percent / 100) * CIRCUMFERENCE
                  }
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[20px] font-semibold text-[#2F2D35]">
                  {item.percent}%
                </span>
              </div>
            </div>

            <p className="text-[14px] font-medium text-[#2F2D35] capitalize">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
