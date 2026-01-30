"use client";

import {
  IconArrowUpRight,
  IconArrowDownRight,
  IconTrash,
  IconEdit,
} from "@tabler/icons-react";

const transactions = [
  {
    id: "TXN001",
    title: "Salary",
    date: "Jan 28, 2026",
    type: "income",
    amount: 25000,
  },
  {
    id: "TXN002",
    title: "Groceries",
    date: "Jan 27, 2026",
    type: "expense",
    amount: 1200,
  },
  {
    id: "TXN003",
    title: "Netflix",
    date: "Jan 26, 2026",
    type: "expense",
    amount: 499,
  },
  {
    id: "TXN004",
    title: "Freelance",
    date: "Jan 25, 2026",
    type: "income",
    amount: 8000,
  },
];

export default function TransactionsTable() {
  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <button className="text-sm text-neutral-400 hover:text-white transition">
          View all
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-neutral-400 border-b border-white/10">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-right">Amount</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="px-6 py-4 font-medium">{tx.title}</td>

                <td className="px-6 py-4 text-neutral-400">{tx.date}</td>

                <td className="px-6 py-4">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
                    ${
                      tx.type === "income"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {tx.type === "income" ? (
                      <IconArrowUpRight size={14} />
                    ) : (
                      <IconArrowDownRight size={14} />
                    )}
                    {tx.type}
                  </div>
                </td>

                <td
                  className={`px-6 py-4 text-right font-semibold
                  ${
                    tx.type === "income"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"}₹{tx.amount.toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-3">
                    <button className="text-neutral-400 hover:text-blue-400 transition">
                      <IconEdit size={18} />
                    </button>
                    <button className="text-neutral-400 hover:text-red-400 transition">
                      <IconTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
