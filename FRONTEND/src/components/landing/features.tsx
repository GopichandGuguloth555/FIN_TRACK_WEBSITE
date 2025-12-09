import { Wallet, BarChart2, PieChart, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Smart Expense Tracking",
    desc: "Monitor your income and expenses with real-time updates.",
  },
  {
    icon: BarChart2,
    title: "Visual Analytics",
    desc: "Beautiful charts to understand your spending habits.",
  },
  {
    icon: PieChart,
    title: "Budget Management",
    desc: "Stay on track with monthly and category-based budgets.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    desc: "Your data is encrypted and stored securely.",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        
        <h2 className="text-3xl font-bold text-center text-brand-text">
          Everything you need to stay financially healthy
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((f, idx) => (
            <div key={idx} className="rounded-card p-6 bg-brand-card border shadow-soft text-center hover:shadow-card transition">
              <f.icon className="h-8 w-8 mx-auto text-brand-purpleDark mb-3" />
              <p className="font-semibold text-brand-text">{f.title}</p>
              <p className="text-sm text-brand-textMuted mt-2">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
