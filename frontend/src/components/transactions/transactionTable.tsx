import { useEffect, useState } from "react";
import axios from "@/api/axios";
import {
  IconArrowUpRight,
  IconArrowDownRight,
} from "@tabler/icons-react";

type Tx = {
  _id: string;
  description: string;
  date: string;
  type: "income" | "expense";
  amount: number;
};

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTx = async () => {
      try {
        const res = await axios.get("/transactions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTransactions(res.data.transactions);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTx();
  }, []);

  if (loading) {
    return (
      <div className="text-neutral-400 text-sm mt-6">
        Loading transactions…
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-8xl mx-auto">
      <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 overflow-hidden shadow-lg">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
        </div>

        {/* Table */}
        <table className="w-full text-sm">
          <thead className="text-neutral-400">
            <tr>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx, index) => (
              <tr
                key={tx._id}
                style={{ animationDelay: `${index * 60}ms` }}
                className="
                  border-t border-white/5
                  hover:bg-white/5
                  transition-colors
                  animate-row
                "
              >
                {/* Description */}
                <td className="px-6 py-4 font-medium">
                  {tx.description || "—"}
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-neutral-400">
                  {new Date(tx.date).toDateString()}
                </td>

                {/* Type */}
                <td className="px-6 py-4">
                  <span
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
                  </span>
                </td>

                {/* Amount */}
                <td
                  className={`px-6 py-4 text-right font-semibold
                  ${
                    tx.type === "income"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"}₹
                  {tx.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Row animation */}
      <style>{`
        @keyframes rowFade {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-row {
          animation: rowFade 0.4s ease forwards;
        }
      `}</style>
    </div>
  );
}
