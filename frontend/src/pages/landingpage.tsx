import { Link } from "react-router-dom";
import { motion } from "motion/react";


export default function Landing() {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-white overflow-hidden">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full bg-emerald-500/10 blur-[220px]" />
      </div>

      {/* NAVBAR */}
      <nav className=" relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
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

      {/* HERO */}
      <section className="relative z-10 mt-28 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold max-w-3xl mx-auto leading-tight">
          Track your money.
          <span className="block text-neutral-400">
            Understand your spending.
          </span>
        </h1>

        <p className="mt-6 text-neutral-400 max-w-xl mx-auto">
          FIN-TRACK gives you a clear view of your income, expenses, and trends —
          all in one powerful dashboard.
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
      </section>

      {/* FEATURES */}
   {/* FEATURES */}
<section className="relative z-10 mt-32 px-6">
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    variants={{
      hidden: {},
      show: {
        transition: {
          staggerChildren: 0.15,
        },
      },
    }}
    className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
  >
    {[
      {
        title: "Track Transactions",
        desc: "Log and manage income & expenses with clarity.",
      },
      {
        title: "Visual Insights",
        desc: "Understand your finances with charts and trends.",
      },
      {
        title: "Simple & Secure",
        desc: "Designed for speed, privacy, and peace of mind.",
      },
    ].map((f) => (
      <motion.div
        key={f.title}
        variants={{
          hidden: { opacity: 0, y: 30 },
          show: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              ease: "easeOut",
            },
          },
        }}
        whileHover={{
          y: -6,
          scale: 1.02,
        }}
        className="
          rounded-2xl bg-white/10 backdrop-blur-xl
          border border-white/10 p-6
          hover:bg-white/15 transition
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
  </motion.div>
</section>


      {/* CTA */}
      <section className="relative z-10 mt-32 mb-24 text-center px-6">
        <h2 className="text-3xl font-semibold">
          Take control of your finances
        </h2>
        <p className="mt-4 text-neutral-400">
          Join FIN-TRACK and start tracking smarter today.
        </p>

        <Link
          to="/signup"
          className="
            inline-block mt-8 px-8 py-3 rounded-xl
            bg-gradient-to-br from-emerald-400 to-emerald-600
            text-black font-medium
            shadow-lg shadow-emerald-500/30
            hover:opacity-90 transition
          "
        >
          Create your account
        </Link>
      </section>
    </div>
  );
}
