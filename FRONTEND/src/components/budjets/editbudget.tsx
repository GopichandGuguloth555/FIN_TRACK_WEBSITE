import { useState, useEffect } from "react";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Entertainment",
  "Others",
];

interface EditBudgetDialogProps {
  open: boolean;
  onClose: () => void;
  budget: {
    _id: string;
    category: string;
    month: string;
    amount: number;
  } | null;
  onSuccess: () => void;
}

export default function EditBudgetDialog({
  open,
  onClose,
  budget,
  onSuccess,
}: EditBudgetDialogProps) {
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // 🔥 Prefill when budget changes
  useEffect(() => {
    if (budget) {
      setCategory(budget.category);
      setMonth(budget.month);
      setAmount(budget.amount);
    }
  }, [budget]);

  const handleUpdate = async () => {
    if (!budget) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/budget/${budget._id}`,
        { category, month, amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to update budget", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit Budget</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">

          {/* Category */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Month */}
          <Input
            value={month}
            disabled
            className="bg-gray-100 cursor-not-allowed"
          />

          {/* Amount */}
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update Budget"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
