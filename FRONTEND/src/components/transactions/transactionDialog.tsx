import { useState } from "react";
import axios from "axios";
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
  onAdded: () => void;
}

export default function AddTransactionDialog({ onAdded }: Props) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  async function handleAdd() {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/transactions",
        { type, category, amount, date, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onAdded();
      setOpen(false);
    } catch (err) {
      console.log("Add Transaction Error:", err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      
      {/* IMPORTANT: Button must be single — NO nested button */}
      <DialogTrigger asChild>
        <Button className="text-white hover:bg-purple-800">
          + Add Transaction
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white rounded-xl p-6 max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-3">

          <Select onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Travel">Travel</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
              <SelectItem value="Bills">Bills</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Amount"
          />

          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <Button className="w-full bg-purple-700 text-white" onClick={handleAdd}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
