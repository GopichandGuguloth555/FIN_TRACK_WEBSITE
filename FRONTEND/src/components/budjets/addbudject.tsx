import { useState } from "react";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

const MONTHS = [
  { label: "January 2025", value: "2025-01" },
  { label: "February 2025", value: "2025-02" },
  { label: "March 2025", value: "2025-03" },
  { label: "April 2025", value: "2025-04" },
  { label: "May 2025", value: "2025-05" },
  { label: "June 2025", value: "2025-06" },
  { label: "July 2025", value: "2025-07" },
  { label: "August 2025", value: "2025-08" },
  { label: "September 2025", value: "2025-09" },
  { label: "October 2025", value: "2025-10" },
  { label: "November 2025", value: "2025-11" },
  { label: "December 2025", value: "2025-12" },
];

interface AddBudgetDialogProps {
  onSuccess?: () => void;
  onLimitReached: () => void;
}

export default function AddBudgetDialog({
  onSuccess,
  onLimitReached,
}: AddBudgetDialogProps) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!category || !month || !amount) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/budget",
        {
          category,
          month,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // reset
      setCategory("");
      setMonth("");
      setAmount("");
      setOpen(false);

      onSuccess?.();
    } catch (err: any) {
      // 🔒 Budget limit hit
      if (err.response?.status === 403) {
        setOpen(false);
        onLimitReached();
        return;
      }

      console.error("Failed to create budget", err);
      alert("Failed to create budget");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand-purpleDark hover:bg-brand-purpleDarker text-white">
          + Add Budget
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Budget</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Category */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
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
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger>
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Amount */}
          <Input
            type="number"
            placeholder="Monthly Limit (₹)"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          <Button
            onClick={handleSave}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Saving..." : "Save Budget"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
