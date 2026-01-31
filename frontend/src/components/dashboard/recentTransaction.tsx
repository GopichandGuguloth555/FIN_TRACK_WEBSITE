"use client";

import { useEffect, useState } from "react";
import axios from "@/api/axios";
import {
  IconArrowUpRight,
  IconArrowDownLeft,
} from "@tabler/icons-react";

export default function RecentTransactions() {
  const [txs, setTxs] = useState<any[]>([]);

  useEffect(() => {
    const fetchTx = async () => {
      const res = await axios.get("/transactions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTxs(res.data.transactions.slice(0, 7));
    };

    fetchTx();
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <span className="text-sm text-neutral-400">View all</span>
      </div>

      <div className="space-y-3">
        {txs.map((tx) => (
          <div
            key={tx._id}
            className="flex items-center justify-between rounded-xl p-3 hover:bg-white/5 transition"
          >
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
                <p className="font-medium">{tx.description || "—"}</p>
                <p className="text-xs text-neutral-400">
                  {new Date(tx.date).toDateString()}
                </p>
              </div>
            </div>

            <p
              className={`font-semibold ${
                tx.type === "income"
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {tx.type === "income" ? "+" : "-"}₹
              {tx.amount.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
