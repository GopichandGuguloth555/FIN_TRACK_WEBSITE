import { Wallet, ShoppingBag, Home, Briefcase } from "lucide-react";

const activityData = [
  { label: "Salary Deposit", amount: "+₹2,100.00", positive: true, icon: Wallet },
  { label: "Groceries", amount: "+₹120.50", positive: true, icon: ShoppingBag },
  { label: "Rent", amount: "-₹1,500.00", positive: false, icon: Home },
  { label: "Freelance Payment", amount: "+₹350.00", positive: true, icon: Briefcase },
];

export default function RecentActivity() {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-[0_4px_15px_rgba(0,0,0,0.06)]
        p-6
        border border-[#E8E5D8]
      "
    >
      <p className="text-lg font-semibold text-[#3D3B47] mb-4">
        Recent Activity
      </p>

      <div className="space-y-4">
        {activityData.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg"
            >
              {/* LEFT SIDE */}
              <div className="flex items-center gap-3">
                <div
                  className="
                    h-10 w-10 rounded-full
                    bg-[#EFEAFB]
                    flex items-center justify-center
                    text-[#4E3B84]
                  "
                >
                  <Icon className="h-5 w-5" />
                </div>

                <p className="text-sm text-[#3D3B47]">{item.label}</p>
              </div>

              {/* RIGHT SIDE */}
              <p
                className={
                  "text-sm font-semibold " +
                  (item.positive ? "text-green-600" : "text-red-500")
                }
              >
                {item.amount}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
