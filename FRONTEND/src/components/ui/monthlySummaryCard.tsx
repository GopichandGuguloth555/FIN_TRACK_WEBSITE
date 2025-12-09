interface SummaryProps {
  type: "income" | "expense";
}

export default function MonthlySummary({ type }: SummaryProps) {
  const isIncome = type === "income";

  return (
    <div className="space-y-1">
      <p className="text-sm text-[#3D3B47] font-medium">
        {isIncome ? "Total Income" : "Total Expenses"}
      </p>

      <h2 className={`text-3xl font-semibold ${isIncome ? "text-green-600" : "text-red-600"}`}>
        {isIncome ? "₹58,230" : "₹13,000"}
      </h2>

      <div className="text-sm mt-1">
        <p className="text-[#3D3B47]">Net Savings</p>
        <p className="text-green-600 font-semibold">₹45,230</p>

        <p className="mt-1 text-[#3D3B47]">Change from last month</p>
        <p className={`${isIncome ? "text-green-600" : "text-red-600"} font-semibold`}>
          +14%
        </p>
      </div>
    </div>
  );
}
