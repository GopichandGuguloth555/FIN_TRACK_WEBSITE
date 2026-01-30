import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-white/10 blur-[200px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <h1 className="text-xl font-semibold">FIN-TRACK</h1>
        <div className="flex gap-4">
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 mt-24">
        <h2 className="text-4xl md:text-5xl font-bold max-w-3xl">
          Track your money.  
          <span className="text-neutral-400"> Understand your spending.</span>
        </h2>

        <p className="mt-6 text-neutral-400 max-w-xl">
          FIN-TRACK helps you manage income, expenses, and financial insights
          with a clean and modern dashboard.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            to="/signup"
            className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-neutral-200 transition"
          >
            Start Free
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 mt-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Track Transactions",
              desc: "Easily add and manage income and expenses.",
            },
            {
              title: "Visual Insights",
              desc: "Understand your spending with charts and summaries.",
            },
            {
              title: "Simple & Secure",
              desc: "Focused on clarity, speed, and privacy.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/15 transition"
            >
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-neutral-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mt-32 mb-24 text-center px-6">
        <h3 className="text-3xl font-semibold">
          Take control of your finances today
        </h3>
        <p className="mt-4 text-neutral-400">
          Start tracking smarter with FIN-TRACK.
        </p>
        <Link
          to="/signup"
          className="inline-block mt-8 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-neutral-200 transition"
        >
          Create your account
        </Link>
      </section>
    </div>
  );
}
