import { Button } from "@/components/ui/button";

export default function Pricing() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold text-brand-text">Simple pricing</h2>
        <p className="text-brand-textMuted mt-2">Start free, upgrade anytime</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">

          {/* Free */}
          <div className="rounded-card border border-brand-borderLight p-8 shadow-soft bg-brand-card flex flex-col items-center">
            <h3 className="text-xl font-semibold text-brand-text">Free</h3>
            <p className="text-4xl font-bold mt-2">₹0</p>
            <p className="text-sm mt-2 text-brand-textMuted">Basic tracking</p>
            <Button className="mt-6 bg-brand-purpleDark text-white">
              Start Free
            </Button>
          </div>

          {/* Pro */}
          <div className="rounded-card border-2 border-brand-purpleDark p-8 shadow-card bg-white flex flex-col items-center">
            <h3 className="text-xl font-semibold text-brand-purpleDark">Pro</h3>
            <p className="text-4xl font-bold mt-2 text-brand-purpleDark">₹299/mo</p>
            <p className="text-sm mt-2 text-brand-textMuted">Everything included</p>
            <Button className="mt-6 bg-brand-purpleDark text-white hover:bg-brand-purpleDarker">
              Upgrade Now
            </Button>
          </div>

        </div>

      </div>
    </section>
  );
}
