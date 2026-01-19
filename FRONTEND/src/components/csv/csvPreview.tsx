import { useState } from "react";

const sample = [
  { date: "2025-01-01", title: "Groceries", amount: "-1200", category: "Food" },
  { date: "2025-01-02", title: "Salary", amount: "45000", category: "Income" },
];

export default function CsvPreviewTable({ rows = sample }) {
  const [showAnalysis, setShowAnalysis] = useState(false);

  if (!rows.length) return null;

  const totalIncome = rows.reduce(
    (sum, row) => (Number(row.amount) > 0 ? sum + Number(row.amount) : sum),
    0
  );

  const totalExpense = rows.reduce(
    (sum, row) => (Number(row.amount) < 0 ? sum + Math.abs(Number(row.amount)) : sum),
    0
  );

  const balance = totalIncome - totalExpense;

  return (
    <div className="mt-4 space-y-4">

      <div className="rounded-card bg-white border border-brand-borderLight shadow-card overflow-hidden">
        <div className="grid grid-cols-4 px-4 py-3 bg-brand-purpleLight/40 text-sm font-medium">
          <p>Date</p>
          <p>Title</p>
          <p>Amount</p>
          <p>Category</p>
        </div>

        {rows.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-4 px-4 py-3 text-sm border-t hover:bg-brand-purpleSoft/40"
          >
            <p>{row.date}</p>
            <p>{row.title}</p>
            <p
              className={
                row.amount.startsWith("-")
                  ? "text-red-500"
                  : "text-green-600"
              }
            >
              {row.amount}
            </p>
            <p>{row.category}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setShowAnalysis(true)}
          className="px-4 py-2 bg-brand-purpleDark text-white rounded-md hover:bg-brand-purpleDarker"
        >
          Analyze
        </button>
      </div>

      {showAnalysis && (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-card bg-green-50 border">
            <p className="text-sm text-gray-500">Total Income</p>
            <p className="text-xl font-semibold text-green-600">
              ₹ {totalIncome}
            </p>
          </div>

          <div className="p-4 rounded-card bg-red-50 border">
            <p className="text-sm text-gray-500">Total Expense</p>
            <p className="text-xl font-semibold text-red-500">
              ₹ {totalExpense}
            </p>
          </div>

          <div className="p-4 rounded-card bg-blue-50 border">
            <p className="text-sm text-gray-500">Balance</p>
            <p
              className={`text-xl font-semibold ${
                balance >= 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              ₹ {balance}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
