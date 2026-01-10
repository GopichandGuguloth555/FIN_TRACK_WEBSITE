import { useEffect, useState } from "react";
import { Wallet, ShoppingBag, Home, Briefcase } from "lucide-react";

interface Activity {
  _id: string;
  label: string;
  amount: number;
  type: "income" | "expense";
  category: string;
}

const iconMap: Record<string, any> = {
  salary: Wallet,
  groceries: ShoppingBag,
  rent: Home,
  freelance: Briefcase,
};

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();

      const recent = (json.data || []).slice(0, 5).map((t: any) => ({
        _id: t._id,
        label: t.description || t.category,
        amount: t.amount,
        type: t.type,
        category: t.category,
      }));

      setActivities(recent);
    };

    fetchRecentActivity();
  }, []);

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-6 border border-[#E8E5D8]">
      <p className="text-lg font-semibold mb-4">Recent Activity</p>

      <div className="space-y-4">
        {activities.map((item) => {
          const Icon = iconMap[item.category] || Wallet;
          const positive = item.type === "income";

          return (
            <div key={item._id} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#EFEAFB] flex items-center justify-center text-[#4E3B84]">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm">{item.label}</span>
              </div>

              <span
                className={`text-sm font-semibold ${
                  positive ? "text-green-600" : "text-red-500"
                }`}
              >
                {positive ? "+" : "-"}₹{item.amount.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
