import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const transactions = [
  {
    title: "Food",
    subtitle: "Chicken Hell",
    date: "Today, 11:45 AM",
    amount: "-₹92",
    type: "out", // money spent
  },
  {
    title: "Payment for Shoes",
    subtitle: "Nike Air Jordan",
    date: "Yesterday, 09:15 PM",
    amount: "-₹80",
    type: "out",
  },
  {
    title: "Car Repair",
    subtitle: "Tesla Car Repair Service",
    date: "Today, 03:12 PM",
    amount: "-₹35",
    type: "out",
  },
  {
    title: "Salary",
    subtitle: "Monthly Salary Credited",
    date: "Dec 01, 09:00 AM",
    amount: "+₹1,20,000",
    type: "in", // money received
  },
];

export default function Transactions() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border h-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Transactions</h2>

      <div className="space-y-4">
        {transactions.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition"
          >
            {/* Left Side: Icon + Text */}
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl shadow-md ${
                  item.type === "out" ? "bg-red-100" : "bg-green-100"
                }`}
              >
                {item.type === "out" ? (
                  <ArrowDownRight className="w-5 h-5 text-red-600" />
                ) : (
                  <ArrowUpRight className="w-5 h-5 text-green-600" />
                )}
              </div>

              <div>
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-500">{item.subtitle}</p>
                <p className="text-xs text-gray-400">{item.date}</p>
              </div>
            </div>

            {/* Amount */}
            <p
              className={`font-semibold ${
                item.type === "out" ? "text-red-600" : "text-green-600"
              }`}
            >
              {item.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
