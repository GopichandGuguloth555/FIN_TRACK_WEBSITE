import { Shield, LineChart, Wallet } from "lucide-react";

export default function LandingFeatures() {
  return (
    <section className="py-24 bg-[#F8F7FC]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#4E3B84] mb-12">
          Everything You Need for Smart Money Management
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Tracking */}
          <div className="
            p-8 bg-white rounded-2xl border shadow-sm text-center transition
            hover:shadow-xl hover:-translate-y-1 duration-300
          ">
            <LineChart className="h-12 w-12 mx-auto text-[#4E3B84] mb-5 drop-shadow-md" />
            <h3 className="text-xl font-semibold mb-2">Smart Tracking</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Monitor your income & expenses with real-time data insights.
            </p>
          </div>

          {/* Security */}
          <div className="
            p-8 bg-white rounded-2xl border shadow-sm text-center transition
            hover:shadow-xl hover:-translate-y-1 duration-300
          ">
            <Shield className="h-12 w-12 mx-auto text-[#4E3B84] mb-5 drop-shadow-md" />
            <h3 className="text-xl font-semibold mb-2">Top-Tier Security</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Bank-grade encryption keeps your financial data safe & private.
            </p>
          </div>

          {/* Insights */}
          <div className="
            p-8 bg-white rounded-2xl border shadow-sm text-center transition
            hover:shadow-xl hover:-translate-y-1 duration-300
          ">
            <Wallet className="h-12 w-12 mx-auto text-[#4E3B84] mb-5 drop-shadow-md" />
            <h3 className="text-xl font-semibold mb-2">Financial Insights</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Beautiful charts and summaries to understand your spending habits.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
