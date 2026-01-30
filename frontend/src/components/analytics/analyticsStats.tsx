const stats = [
  { label: "Total Income", value: "₹1,20,000" },
  { label: "Total Expense", value: "₹78,500" },
  { label: "Net Balance", value: "₹41,500" },
  { label: "Transactions", value: "248" },
];

export default function AnalyticsStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item) => (
        <div
          key={item.label}
          className="bg-neutral-900 border border-neutral-800 rounded-xl p-5"
        >
          <p className="text-sm text-neutral-400">{item.label}</p>
          <p className="text-2xl font-semibold mt-1">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
