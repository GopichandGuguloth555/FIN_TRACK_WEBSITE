const dummy = [
  { title: "Groceries", amount: -1200, category: "Food", date: "Today" },
  { title: "Salary", amount: 45000, category: "Income", date: "Yesterday" },
  { title: "Bus Ticket", amount: -50, category: "Travel", date: "2 days ago" },
];

export default function TransactionTable() {
  return (
    <div className="rounded-card bg-white shadow-card border border-brand-borderLight overflow-hidden mt-4">
      
      {/* Header */}
      <div className="grid grid-cols-4 px-4 py-3 bg-brand-purpleLight/40 text-sm font-medium text-brand-text">
        <p>Title</p>
        <p>Category</p>
        <p>Amount</p>
        <p>Date</p>
      </div>

      {/* Rows */}
      <div className="divide-y divide-brand-borderLight">
        {dummy.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-4 px-4 py-3 text-sm hover:bg-brand-purpleSoft/30 transition"
          >
            <p className="font-medium text-brand-text">{item.title}</p>
            <p className="text-brand-textMuted">{item.category}</p>
            <p
              className={
                item.amount < 0 ? "text-red-500" : "text-brand-green"
              }
            >
              {item.amount < 0 ? "-" : "+"}₹{Math.abs(item.amount)}
            </p>
            <p className="text-brand-textMuted">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
