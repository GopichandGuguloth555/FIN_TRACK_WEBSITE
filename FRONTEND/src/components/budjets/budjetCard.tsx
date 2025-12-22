import { Pencil, Trash2 } from "lucide-react";

interface BudgetCardProps {
  category: string;
  spent: number;
  limit: number;
  color?: string;
  onEdit: () => void;
  onDelete: () => void;
}

export default function BudgetCard({
  category,
  spent,
  limit,
  color = "#4F3BA9",
  onEdit,
  onDelete,
}: BudgetCardProps) {
  const percentage = Math.min((spent / limit) * 100, 100);
  const remaining = limit - spent;
  const isOver = spent > limit;

  return (
    <div className="rounded-card bg-white shadow-card border border-brand-borderLight p-4 space-y-3">

      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="font-medium text-brand-text">{category}</p>

        <div className="flex items-center gap-3">
          <Pencil
            size={16}
            className="cursor-pointer text-brand-purpleDark hover:text-brand-purpleDarker"
            onClick={onEdit}
          />
          <Trash2
            size={16}
            className="cursor-pointer text-red-500 hover:text-red-600"
            onClick={onDelete}
          />
        </div>
      </div>

      {/* Status */}
      <p
        className={
          "text-sm font-semibold " +
          (isOver ? "text-red-500" : "text-brand-green")
        }
      >
        {isOver ? "Over" : "On Track"}
      </p>

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
