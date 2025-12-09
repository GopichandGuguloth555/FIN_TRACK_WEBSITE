import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function TransactionFilters() {
  return (
    <div className="bg-white rounded-card shadow-soft border border-brand-borderLight p-4 flex flex-wrap gap-4 items-center">

      <Input
        placeholder="Search transactions..."
        className="w-full sm:w-60"
      />

      <Select>
        <SelectTrigger className="w-40 bg-white border-brand-borderLight">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="food">Food</SelectItem>
          <SelectItem value="travel">Travel</SelectItem>
          <SelectItem value="shopping">Shopping</SelectItem>
          <SelectItem value="bills">Bills</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-40 bg-white border-brand-borderLight">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="income">Income</SelectItem>
          <SelectItem value="expense">Expense</SelectItem>
        </SelectContent>
      </Select>

      <Select>
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
