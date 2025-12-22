import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const MONTHS = [
  { label: "All Months", value: "all" },
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

const CATEGORIES = [
  { label: "All Categories", value: "all" },
  { label: "Food", value: "Food" },
  { label: "Travel", value: "Travel" },
  { label: "Shopping", value: "Shopping" },
  { label: "Bills", value: "Bills" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Others", value: "Others" },
];

export default function BudgetFilters({
  onChange,
}: {
  onChange?: (filters: { month: string; category: string }) => void;
}) {
  const [month, setMonth] = useState("all");
  const [category, setCategory] = useState("all");

  const handleMonthChange = (value: string) => {
    setMonth(value);
    onChange?.({ month: value, category });
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    onChange?.({ month, category: value });
  };

  return (
    <div className="bg-white rounded-card shadow-soft border border-brand-borderLight p-4 flex flex-wrap gap-4">

      <Select value={month} onValueChange={handleMonthChange}>
        <SelectTrigger className="w-48 bg-white border-brand-borderLight">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {MONTHS.map((m) => (
            <SelectItem key={m.value} value={m.value}>
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={category} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-48 bg-white border-brand-borderLight">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {CATEGORIES.map((c) => (
            <SelectItem key={c.value} value={c.value}>
              {c.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

    </div>
  );
}
