interface BudgetCardProps {
  category: string;
  spent: number;
  limit: number;
  color?: string;
}

export default function BudgetCard({
  category,
  spent,
  limit,
  color = "#4F3BA9",
}: BudgetCardProps) {
  const percentage = Math.min((spent / limit) * 100, 100);
  const remaining = limit - spent;
  const isOver = spent > limit;

  return (
    <div className="rounded-card bg-white shadow-card border border-brand-borderLight p-4 space-y-3">

      <div className="flex justify-between items-center">
        <p className="font-medium text-brand-text">{category}</p>
        <p
          className={
            "text-sm font-semibold " +
            (isOver ? "text-red-500" : "text-brand-green")
          }
        >
          {isOver ? "Over" : "On Track"}
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full h-3 bg-brand-purpleLight/40 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${percentage}%`,
            background: color,
          }}
        />
      </div>

      {/* Amounts */}
      <div className="flex justify-between text-sm">
        <p className="text-brand-textMuted">Spent: ₹{spent}</p>
        <p className={isOver ? "text-red-500" : "text-brand-textMuted"}>
          Remaining: {remaining < 0 ? "-₹" + Math.abs(remaining) : "₹" + remaining}
        </p>
      </div>
    </div>
  );
}
