import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-purpleLight pt-24 pb-32">
      
      {/* Purple blur blob */}
      <div className="absolute -top-20 -left-20 h-80 w-80 bg-brand-purple rounded-full blur-[140px] opacity-25"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        <h1 className="text-4xl md:text-6xl font-bold text-brand-purpleDark leading-tight">
          Track Your Money.<br />Control Your Future.
        </h1>

        <p className="mt-4 text-brand-textMuted text-lg max-w-2xl mx-auto">
          FinTrack helps you manage expenses, budgets and insights with a clean and modern dashboard.
        </p>

        <Link to="/signup">
          <Button className="mt-6 px-8 h-12 bg-brand-purpleDark text-white text-lg rounded-lg hover:bg-brand-purpleDarker">
            Get Started
          </Button>
        </Link>

        {/* Dashboard mockup placeholder */}
        <div className="mt-12 mx-auto max-w-3xl h-64 rounded-2xl bg-white shadow-card border border-brand-border flex items-center justify-center text-brand-textMuted">
          Dashboard Preview Coming Soon
        </div>

      </div>
    </section>
  );
}
