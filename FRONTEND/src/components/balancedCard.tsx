interface Props {
  balance?: number;
}

export default function BalanceCard({ balance }: Props) {
 
  if (balance == null) return null;

  return (
    <div className="w-full h-40 bg-violet-900 rounded-3xl p-6 text-white text-center">
      <p className="text-4xl font-bold mb-3">Current Balance</p>

      <h2 className="text-4xl font-semibold tracking-tight">
        ₹{balance.toLocaleString()}
      </h2>
    </div>
  );
}
