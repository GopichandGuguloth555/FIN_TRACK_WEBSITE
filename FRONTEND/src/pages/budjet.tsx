import BudgetCard from "../components/budjets/budjetCard";
import BudgetFilters from "../components/budjets/budjetFilters";
import AddBudgetDialog from "../components/budjets/budjetDialog";

const dummy = [
  { category: "Food", spent: 3200, limit: 5000, color: "#FF6B6B" },
  { category: "Travel", spent: 800, limit: 3000, color: "#4F3BA9" },
  { category: "Shopping", spent: 5000, limit: 4000, color: "#FFB347" },
  { category: "Bills", spent: 2500, limit: 2500, color: "#6BCB77" },
];

export default function BudgetsPage() {
  return (
    <div className="space-y-4">

      {/* Filters + Add button */}
      <div className="flex justify-between items-center">
        <BudgetFilters />
        <AddBudgetDialog />
      </div>

      {/* Budget cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {dummy.map((b, i) => (
          <BudgetCard
            key={i}
            category={b.category}
            spent={b.spent}
            limit={b.limit}
            color={b.color}
          />
        ))}
      </div>

    </div>
  );
}
