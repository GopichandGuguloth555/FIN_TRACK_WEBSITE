import {
  IconArrowUpRight,
  IconArrowDownLeft,
} from "@tabler/icons-react";

const transactions = [
  {
    id: 1,
    title: "Salary",
    date: "Jan 28, 2026",
    amount: "+ ₹25,000",
    type: "income",
  },
  {
    id: 2,
    title: "Groceries",
    date: "Jan 27, 2026",
    amount: "- ₹1,200",
    type: "expense",
  },
  {
    id: 3,
    title: "Netflix",
    date: "Jan 26, 2026",
    amount: "- ₹499",
    type: "expense",
  },
  {
    id: 4,
    title: "Freelance",
    date: "Jan 25, 2026",
    amount: "+ ₹8,000",
    type: "income",
  },
  {
    id: 5,
    title: "Electricity Bill",
    date: "Jan 24, 2026",
    amount: "- ₹2,300",
    type: "expense",
  },
  {
    id: 6,
    title: "Electricity Bill",
    date: "Jan 24, 2026",
    amount: "- ₹2,300",
    type: "expense",
  },
  {
    id: 7,
    title: "Electricity Bill",
    date: "Jan 24, 2026",
    amount: "- ₹2,300",
    type: "expense",
  },
];

export default function RecentTransactions() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <span className="text-sm text-neutral-400 cursor-pointer hover:text-white transition">
          View all
        </span>
      </div>

      {/* Transactions */}
      <div className="space-y-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between rounded-xl p-3 hover:bg-white/5 transition group"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center
                ${
                  tx.type === "income"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {tx.type === "income" ? (
                  <IconArrowUpRight size={18} />
                ) : (
                  <IconArrowDownLeft size={18} />
                )}
              </div>

              <div>
                <p className="font-medium group-hover:text-white transition">
                  {tx.title}
                </p>
                <p className="text-xs text-neutral-400">{tx.date}</p>
              </div>
            </div>

            {/* Right */}
            <p
              className={`font-semibold ${
                tx.type === "income"
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {tx.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
