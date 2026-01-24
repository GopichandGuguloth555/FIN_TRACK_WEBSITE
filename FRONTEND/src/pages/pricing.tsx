import { useState } from "react";

export default function PricingPage() {
  const [showPayment, setShowPayment] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F6FF] to-white px-6 py-16">

     
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-900">
          Choose Your Plan
        </h1>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Upgrade to Premium to unlock powerful analytics, unlimited budgets,
          and complete financial insights.
        </p>
      </div>

     
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

       
        <div className="bg-white rounded-2xl border p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">Free</h2>
          <p className="text-gray-500 mb-6">
            Perfect to get started
          </p>

          <div className="text-3xl font-bold mb-6">
            ₹0<span className="text-base font-medium text-gray-500"> / month</span>
          </div>

          <ul className="space-y-3 text-gray-700 mb-8">
            <li>✔ Up to 5 transactions</li>
            <li>✔ Up to 2 budgets</li>
            <li className="text-gray-400">✖ Analytics & insights</li>
            <li className="text-gray-400">✖ Spending charts</li>
          </ul>

          <button
            disabled
            className="w-full py-3 rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed"
          >
            Current Plan
          </button>
        </div>


        <div className="relative bg-white rounded-2xl border-2 border-violet-900 p-8 shadow-lg">


          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-900 text-white text-sm px-4 py-1 rounded-full">
            Most Popular
          </div>

          <h2 className="text-2xl font-semibold mb-2 text-violet-900">
            Premium
          </h2>
          <p className="text-gray-500 mb-6">
            For full financial control
          </p>

          <div className="text-3xl font-bold mb-6">
            ₹199
            <span className="text-base font-medium text-gray-500">
              {" "}
              / month
            </span>
          </div>

          <ul className="space-y-3 text-gray-700 mb-8">
            <li>✔ Unlimited transactions</li>
            <li>✔ Unlimited budgets</li>
            <li>✔ Analytics & insights</li>
            <li>✔ Spending charts</li>
          </ul>

          <button
            onClick={() => setShowPayment(true)}
            className="w-full py-3 rounded-lg bg-violet-900 text-white font-semibold hover:bg-purple-800 transition"
          >
            Upgrade to Premium
          </button>
        </div>
      </div>

     
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[360px]">

            <h3 className="text-xl font-semibold mb-2">
              Complete Payment
            </h3>
            <p className="text-gray-600 mb-6">
              Premium Plan – ₹199 / month
            </p>

            <div className="space-y-3">
              <button className="w-full border rounded-lg px-3 py-2 hover:bg-gray-50">
                Pay via UPI
              </button>
              <button className="w-full border rounded-lg px-3 py-2 hover:bg-gray-50">
                Pay via Card
              </button>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPayment(false)}
                className="flex-1 border rounded-lg py-2"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("token");

                    await fetch("http://localhost:5000/users/upgrade", {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    });

                    alert("🎉 You are now a Premium user!");
                    setShowPayment(false);

                  } catch (err) {
                    alert("Upgrade failed. Try again.");
                  }
                }}
                className="flex-1 bg-purple-700 text-white rounded-lg py-2"
              >
                Confirm
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
