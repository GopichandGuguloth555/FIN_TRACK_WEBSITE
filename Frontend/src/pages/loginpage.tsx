import React from "react";

export default function ExpenseTrackerLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1b4d1b] p-5">
      <div className="w-full max-w-5xl bg-[#1d5f1f] bg-gradient-to-br from-green-700 to-green-500 rounded-3xl p-10 shadow-2xl border border-green-300">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT SIDE — Illustrated Chart */}
          <div className="relative text-white flex items-center justify-center">

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')]"></div>

            <div className="relative w-full max-w-sm">
              {/* Bars */}
              <div className="flex items-end gap-3 mt-10">
                <div className="w-6 h-16 bg-green-900 rounded-md"></div>
                <div className="w-6 h-24 bg-green-800 rounded-md"></div>
                <div className="w-6 h-32 bg-green-700 rounded-md"></div>
                <div className="w-6 h-40 bg-green-600 rounded-md"></div>
              </div>

              {/* Growing arrow */}
              <svg
                className="absolute -top-10 left-5 w-full"
                viewBox="0 0 300 150"
                fill="none"
                stroke="#a7ffac"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 120 L80 80 L150 100 L220 40 L280 60" />
                <polyline points="260,20 280,60 230,55" fill="#a7ffac" />
              </svg>

              {/* Coins */}
              <div className="flex gap-2 mt-6">
                <div className="w-10 h-10 bg-yellow-400 rounded-full shadow-lg"></div>
                <div className="w-10 h-10 bg-yellow-500 rounded-full shadow-lg"></div>
                <div className="w-10 h-10 bg-yellow-300 rounded-full shadow-lg"></div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — Login */}
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 shadow-xl">

            <h1 className="text-3xl md:text-4xl font-extrabold text-white">
              EXPENSE TRACKER <span className="text-green-200">PRO</span>
            </h1>

            <p className="text-white text-lg mt-2 mb-8">Welcome Back!</p>

            {/* FORM */}
            <form className="space-y-5">

              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-white text-gray-700 rounded-lg shadow focus:ring-2 focus:ring-green-300 outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-white text-gray-700 rounded-lg shadow focus:ring-2 focus:ring-green-300 outline-none"
              />

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-green-700 to-green-500 rounded-lg text-white font-semibold shadow-lg hover:opacity-90 transition"
              >
                LOG IN
              </button>
            </form>

            {/* Links */}
            <div className="flex justify-between text-white text-sm mt-4">
              <a href="#" className="hover:underline">Forgot Password?</a>
              <a href="#" className="hover:underline">Sign Up</a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
