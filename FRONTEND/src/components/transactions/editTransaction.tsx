import { useState } from "react";
import axios from "axios";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Props {
  transaction: any;
  onUpdated: () => void;   // refresh function from parent
}

export default function EditTransactionDialog({ transaction, onUpdated }: Props) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    type: transaction.type,
    category: transaction.category,
    amount: transaction.amount,
    date: transaction.date?.substring(0, 10),
    description: transaction.description || "",
  });

  function updateField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  
  async function handleUpdate() {
    try {
      const token = localStorage.getItem("token");

      const payload = {
        type: form.type,
        category: form.category,
        amount: Number(form.amount),
        date: form.date,
        description: form.description,
      };

      console.log("Sending update payload:", payload);

      const res = await axios.put(
        `http://localhost:5000/transactions/${transaction._id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Update response:", res.data);

      alert("Transaction Updated Successfully ✔");
      onUpdated();  // refresh parent data
      setOpen(false);

    } catch (err: any) {
      console.error("Update Error:", err.response?.data || err);
      alert(err.response?.data?.message || "Update failed. Check console.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-blue-500 hover:text-blue-700">
          <Pencil size={18} />
        </button>
      </DialogTrigger>

      <DialogContent className="bg-white rounded-xl p-6 max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-3">

          {/* Type */}
          <Select
            defaultValue={form.type}
            onValueChange={(v) => updateField("type", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>

          {/* Category */}
          <Select
            defaultValue={form.category}
            onValueChange={(v) => updateField("category", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Travel">Travel</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
              <SelectItem value="Bills">Bills</SelectItem>
              <SelectItem value="Salary">Salary</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>

          {/* Amount */}
          <Input
            type="number"
            value={form.amount}
            onChange={(e) => updateField("amount", e.target.value)}
            placeholder="Amount"
          />

          {/* Date */}
          <Input
            type="date"
            value={form.date}
            onChange={(e) => updateField("date", e.target.value)}
          />

          {/* Description */}
          <Input
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Description"
          />

          {/* SAVE */}
          <Button className="w-full bg-purple-700 text-white" onClick={handleUpdate}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
