import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function BudgetFilters() {
  return (
    <div className="bg-white rounded-card shadow-soft border border-brand-borderLight p-4 flex flex-wrap gap-4">
      
      <Select>
        <SelectTrigger className="w-48 bg-white border-brand-borderLight">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="jan">January</SelectItem>
          <SelectItem value="feb">February</SelectItem>
          <SelectItem value="mar">March</SelectItem>
          <SelectItem value="apr">April</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-48 bg-white border-brand-borderLight">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="food">Food</SelectItem>
          <SelectItem value="travel">Travel</SelectItem>
          <SelectItem value="shopping">Shopping</SelectItem>
          <SelectItem value="bills">Bills</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
