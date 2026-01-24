import { useEffect, useState } from "react";
import axios from "axios";

import AddTransactionDialog from "../components/transactions/transactionDialog";
import TransactionFilters, {FilterState,} from "../components/transactions/transactionFilters";
import TransactionTable from "../components/transactions/transactionTable";

import { Transaction } from "@/types/transactions";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    type: "",
    sort: "",
  });

  async function fetchData() {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data as { data: Transaction[] };
      setTransactions(data.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  }

  async function deleteTransaction(id: string) {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchData();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  }


  const handleLimitReached = () => {
    window.location.href = "/pricing";
  };

  const filteredData = transactions.filter((t) => {
    return (
      (filters.search === "" ||
        t.category.toLowerCase().includes(filters.search.toLowerCase()) ||
        (t.description || "")
          .toLowerCase()
          .includes(filters.search.toLowerCase())) &&
      (filters.category === "" || t.category === filters.category) &&
      (filters.type === "" || t.type === filters.type)
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (filters.sort === "amountHigh") return b.amount - a.amount;
    if (filters.sort === "amountLow") return a.amount - b.amount;
    if (filters.sort === "latest")
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    return 0;
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <TransactionFilters
          search={filters.search}
          onSearch={(v) => setFilters({ ...filters, search: v })}
          onCategory={(v) => setFilters({ ...filters, category: v })}
          onType={(v) => setFilters({ ...filters, type: v })}
          onSort={(v) => setFilters({ ...filters, sort: v })}
        />

        {/* 🔒 pass limit handler */}
        <AddTransactionDialog
          onAdded={fetchData}
          onLimitReached={handleLimitReached}
        />
      </div>

      <TransactionTable
        data={sortedData}
        onDelete={deleteTransaction}
        refresh={fetchData}
      />
    </div>
  );
}
