import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import BudgetCard from "../components/budjets/budjetCard";
import BudgetFilters from "../components/budjets/budjetFilters";
import AddBudgetDialog from "../components/budjets/addbudject";
import EditBudgetDialog from "../components/budjets/editbudget";

interface Budget {
  _id: string;
  category: string;
  month: string;
  amount: number;
  spent: number;
}

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    month: "all",
    category: "all",
  });

  const [editOpen, setEditOpen] = useState(false);
  const [editBudget, setEditBudget] = useState<Budget | null>(null);

  const fetchBudgets = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/budget",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      //@ts-ignore
      setBudgets(res.data.data);
    } catch (error) {
      console.error("Failed to fetch budgets", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const filteredBudgets = useMemo(() => {
    return budgets.filter((b) => {
      const monthMatch =
        filters.month === "all" || b.month === filters.month;
      const categoryMatch =
        filters.category === "all" || b.category === filters.category;
      return monthMatch && categoryMatch;
    });
  }, [budgets, filters]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this budget?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/budget/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBudgets();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  if (loading) {
    return (
      <p className="text-center text-brand-textMuted">
        Loading budgets...
      </p>
    );
  }

  return (
    <div className="space-y-4">

      {/* Filters + Add */}
      <div className="flex justify-between items-center">
        <BudgetFilters onChange={setFilters} />
        <AddBudgetDialog onSuccess={fetchBudgets} />
      </div>

      {/* Budget Cards */}
      {filteredBudgets.length === 0 ? (
        <p className="text-center text-brand-textMuted">
          No budgets found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredBudgets.map((b) => (
            <BudgetCard
              key={b._id}
              category={b.category}
              spent={b.spent}
              limit={b.amount}
              onEdit={() => {
                setEditBudget(b);
                setEditOpen(true);
              }}
              onDelete={() => handleDelete(b._id)}
            />
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <EditBudgetDialog
        open={editOpen}
        budget={editBudget}
        onClose={() => setEditOpen(false)}
        onSuccess={fetchBudgets}
      />
    </div>
  );
}
