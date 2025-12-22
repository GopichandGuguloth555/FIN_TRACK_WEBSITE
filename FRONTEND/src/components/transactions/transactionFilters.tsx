import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export type FilterState = {
  search: string;
  category: string;
  type: string;
  sort: string;
};

type Props = {
  search: string;
  onSearch: (value: string) => void;
  onCategory: (value: string) => void;
  onType: (value: string) => void;
  onSort: (value: string) => void;
};

export default function TransactionFilters({
  search,
  onSearch,
  onCategory,
  onType,
  onSort,
}: Props) {
  return (
    <div className="
      bg-white rounded-card shadow-soft border border-brand-borderLight 
      p-4 flex flex-wrap gap-4 items-center
    ">
      
      {/* Search */}
      <Input
        placeholder="Search transactions..."
        className="w-full sm:w-60"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      {/* Category Filter */}
      <Select onValueChange={onCategory}>
        <SelectTrigger className="w-40 bg-white border-brand-borderLight">
          <SelectValue placeholder="Category" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="Food">Food</SelectItem>
          <SelectItem value="Travel">Travel</SelectItem>
          <SelectItem value="Shopping">Shopping</SelectItem>
          <SelectItem value="Bills">Bills</SelectItem>
          <SelectItem value="Salary">Salary</SelectItem>
          <SelectItem value="Entertainment">Entertainment</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </SelectContent>
      </Select>

      {/* Type Filter */}
      <Select onValueChange={onType}>
        <SelectTrigger className="w-40 bg-white border-brand-borderLight">
          <SelectValue placeholder="Type" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="income">Income</SelectItem>
          <SelectItem value="expense">Expense</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort Filter */}
      <Select onValueChange={onSort}>
        <SelectTrigger className="w-40 bg-white border-brand-borderLight">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="amountHigh">Amount: High → Low</SelectItem>
          <SelectItem value="amountLow">Amount: Low → High</SelectItem>
        </SelectContent>
      </Select>

    </div>
  );
}
