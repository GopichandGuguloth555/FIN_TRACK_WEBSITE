export default function TransactionFilters() {
  return (
    <div className="mb-6 flex flex-col md:flex-row gap-4">
      <input
        placeholder="Search transactions..."
        className="flex-1 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-2 text-sm outline-none focus:border-white/30"
      />

      <select className="rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-2 text-sm">
        <option>All</option>
        <option>Income</option>
        <option>Expense</option>
      </select>

      <input
        type="date"
        className="rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-2 text-sm"
      />
    </div>
  );
}
