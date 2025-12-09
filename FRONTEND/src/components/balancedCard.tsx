export default function BalanceCard() {
  return (
    <div
      className="
        w-full
        bg-[#4E3B84]
        rounded-3xl
        p-8
        text-white
        shadow-[0_8px_22px_rgba(78,59,132,0.35)]
      "
    >
      {/* Title */}
      <p className="text-lg opacity-90 mb-1">Current Balance</p>

      {/* Balance Amount */}
      <h2 className="text-4xl font-semibold tracking-tight mb-6">
        ₹45,230.75
      </h2>

      {/* Stats Row */}
      <div className="flex justify-between">
        
        <div>
          <p className="text-sm opacity-80">Income</p>
          <p className="text-xl font-semibold mt-1">₹58,230</p>
        </div>

        <div>
          <p className="text-sm opacity-80">Expenses</p>
          <p className="text-xl font-semibold mt-1">₹13,000</p>
        </div>

        <div>
          <p className="text-sm opacity-80">Savings Rate</p>
          <p className="text-xl font-semibold mt-1">78%</p>
        </div>

      </div>
    </div>
  );
}
