interface Transaction {
  date: string;
  amount: number;
  category: string;
  type: "income" | "expense";
}

interface AnalyticsViewProps {
  monthLabel: string;
  transactions: Transaction[];
}

export default function AnalyticsView({
  monthLabel,
  transactions,
}: AnalyticsViewProps) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      {/* summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>Total Expenses ({monthLabel}): ₹{totalExpense}</div>
        <div>Total Income ({monthLabel}): ₹{totalIncome}</div>
        <div>Balance ({monthLabel}): ₹{balance}</div>
      </div>
    </div>
  );
}
