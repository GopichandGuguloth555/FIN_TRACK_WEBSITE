import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export default function Landing() {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-white overflow-hidden">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full bg-emerald-500/10 blur-[240px]" />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl text-3xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-black font-extrabold shadow-lg shadow-emerald-500/30">
            ₣
          </div>
          <span className="text-xl font-bold tracking-[0.25em]">
            FIN<span className="text-emerald-400">TRACK</span>
          </span>
        </div>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-white/10 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition"
          >
            Start Free
          </Link>
        </div>
      </nav>

      

      {/* HERO + SHOWCASE (GROUPED) */}
      <section className="relative z-10 mt-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold max-w-3xl mx-auto leading-tight">
            Track your money.
            <span className="block text-neutral-400">
              Understand your spending.
            </span>
          </h1>

          <p className="mt-6 text-neutral-400 max-w-xl mx-auto">
            FIN-TRACK gives you a clear view of your income,
            expenses, and trends — all in one powerful dashboard.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-neutral-200 transition"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-xl border border-white/15 hover:bg-white/10 transition"
            >
              Login
            </Link>
          </div>

          {/* Soft stage glow */}
          <div className="relative mt-24">
            <div className="absolute inset-x-0 -top-24 h-[420px] bg-gradient-to-b from-emerald-500/15 to-transparent blur-3xl -z-10" />
            <Showcase />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 mt-40 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Track Transactions",
              desc: "Log income and expenses with clarity and speed.",
            },
            {
              title: "Visual Insights",
              desc: "Beautiful charts that reveal spending patterns.",
            },
            {
              title: "Simple & Secure",
              desc: "Fast, private, and designed with care.",
            },
          ].map((f) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="
                rounded-2xl bg-white/5 backdrop-blur-md
                border border-white/10 p-6
              "
            >
              <h3 className="text-lg font-semibold mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-neutral-400">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mt-40 mb-28 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold">
            Take control of your finances
          </h2>
          <p className="mt-4 text-neutral-400">
            Start tracking smarter with FIN-TRACK today.
          </p>

          <Link
            to="/signup"
            className="
              inline-block mt-10 px-8 py-3 rounded-xl
              bg-gradient-to-br from-emerald-400 to-emerald-600
              text-black font-medium
              shadow-lg shadow-emerald-500/30
              hover:opacity-90 transition
            "
          >
            Create your account
          </Link>
        </div>
      </section>

            {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl text-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-black font-extrabold">
                ₣
              </div>
              <span className="text-lg font-bold tracking-[0.2em]">
                FIN<span className="text-emerald-400">TRACK</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-neutral-400 max-w-xs">
              A simple and secure way to track your income, expenses,
              and financial habits.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2 text-sm">
            <span className="text-neutral-300 font-medium mb-2">
              Product
            </span>
            <Link to="/login" className="text-neutral-400 hover:text-white transition">
              Login
            </Link>
            <Link to="/signup" className="text-neutral-400 hover:text-white transition">
              Get Started
            </Link>
            <Link to="#" className="text-neutral-400 hover:text-white transition">
              Features
            </Link>
          </div>

          {/* Meta */}
          <div className="flex flex-col gap-2 text-sm">
            <span className="text-neutral-300 font-medium mb-2">
              Legal
            </span>
            <Link to="#" className="text-neutral-400 hover:text-white transition">
              Privacy Policy
            </Link>
            <Link to="#" className="text-neutral-400 hover:text-white transition">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} FIN-TRACK. All rights reserved.
        </div>
      </footer>

    </div>
  );
}

/* ---------------- SHOWCASE ---------------- */

function Showcase() {
  const screens = [
    { img: "/previews/dashboard.png", label: "Dashboard Overview" },
    { img: "/previews/transactions.png", label: "Track Transactions" },
    { img: "/previews/insights.png", label: "Visual Insights" },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % screens.length);
    }, 3000); // 2s pause + animation time

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[360px] md:h-[460px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 160, scale: 0.9 }}
          animate={{
            opacity: 1,
            x: 0,
            scale: [1, 1.08],
            boxShadow: "0 0 70px rgba(16,185,129,0.55)",
          }}
          exit={{ opacity: 0, x: -160, scale: 0.9 }}
          transition={{
            duration: 0.5,
            scale: { delay: 0.4, duration: 0.6 },
            ease: "easeOut",
          }}
          className="
            absolute rounded-3xl overflow-hidden
            border border-emerald-400/50
            bg-neutral-900 shadow-2xl
          "
        >
          <img
            src={screens[index].img}
            alt=""
            className="w-[360px] md:w-[720px]"
          />
          <div className="px-5 py-3 text-sm text-neutral-300 border-t border-white/10 bg-black/40">
            {screens[index].label}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
