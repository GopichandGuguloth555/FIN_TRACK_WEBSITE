const sample = [
  { date: "2025-01-01", title: "Groceries", amount: "-1200", category: "Food" },
  { date: "2025-01-02", title: "Salary", amount: "45000", category: "Income" },
];

export default function CsvPreviewTable({ rows = sample }) {
  if (!rows.length) return null;

  return (
    <div className="rounded-card bg-white border border-brand-borderLight shadow-card mt-4 overflow-hidden">

      <div className="grid grid-cols-4 px-4 py-3 bg-brand-purpleLight/40 text-sm font-medium text-brand-text">
        <p>Date</p>
        <p>Title</p>
        <p>Amount</p>
        <p>Category</p>
      </div>

      {rows.map((row, i) => (
        <div
          key={i}
          className="grid grid-cols-4 px-4 py-3 text-sm border-t border-brand-borderLight hover:bg-brand-purpleSoft/40"
        >
          <p>{row.date}</p>
          <p>{row.title}</p>
          <p className={row.amount.startsWith("-") ? "text-red-500" : "text-brand-green"}>
            {row.amount}
          </p>
          <p>{row.category}</p>
        </div>
      ))}
    </div>
  );
}
