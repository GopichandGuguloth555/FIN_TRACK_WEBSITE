export default function WalletCard() {
  return (
    <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white p-6 rounded-3xl shadow-lg w-full md:w-[360px] h-[230px] flex flex-col justify-between">

      <div>
        <p className="text-sm opacity-70">Card Balance</p>
        <h2 className="text-3xl font-bold mt-1">₹ 7,42,000</h2>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div>
          <p className="text-xs opacity-80">Card Number</p>
          <p className="tracking-widest font-semibold mt-1">**** **** **** 9741</p>
        </div>

        <div className="text-right">
          <p className="text-xs opacity-80">Valid Thru</p>
          <p className="font-semibold mt-1">12/28</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button className="px-4 py-2 bg-white/20 rounded-xl font-medium hover:bg-white/30 transition">
          Transfer
        </button>
        <button className="px-4 py-2 bg-white/20 rounded-xl font-medium hover:bg-white/30 transition">
          Manage
        </button>
      </div>

    </div>
  );
}
