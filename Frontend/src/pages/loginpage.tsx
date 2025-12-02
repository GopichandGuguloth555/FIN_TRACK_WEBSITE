export default function ExpenseTrackerLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e1a29] p-6">
      
      {/* Outer Gradient Card */}
      <div className="w-full max-w-6xl bg-gradient-to-br from-[#2d3e50] via-[#1e2b3a] to-[#131f2c] rounded-3xl p-10 shadow-2xl border border-white/10 relative">


        {/* Soft glow background dots */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.06] rounded-3xl"></div>


        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT — Line Chart Icon */}
          <div className="flex justify-center">
            <svg 
              width="220"
              height="220"
              viewBox="0 0 200 200"
              fill="none"
              stroke="#c8e8ff"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_12px_rgba(150,220,255,0.4)]"
            >
              <rect x="30" y="110" width="20" height="40" rx="5" />
              <rect x="70" y="90" width="20" height="60" rx="5" />
              <rect x="110" y="70" width="20" height="80" rx="5" />
              <rect x="150" y="50" width="20" height="100" rx="5" />

              <path d="M20 150 L60 100 L110 120 L160 70 L180 80" />
              <circle cx="180" cy="80" r="10" />
            </svg>
          </div>

          {/* RIGHT — Login Form */}
          <div className="text-white">
            <h1 className="text-3xl font-extrabold">EXPENSE TRACKER PRO</h1>
            <p className="text-gray-300 mt-2 mb-6">Welcome Back!</p>

            {/* Inputs */}
            <form className="space-y-5">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-white text-gray-700 rounded-full shadow focus:ring-2 focus:ring-cyan-300 outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-white text-gray-700 rounded-full shadow focus:ring-2 focus:ring-cyan-300 outline-none"
              />

              {/* Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-xl text-white font-semibold hover:opacity-90 transition"
              >
                LOG IN
              </button>
            </form>

            {/* Links */}
            <div className="flex justify-between text-gray-300 text-sm mt-4">
              <a href="#" className="hover:underline">Forgot Password?</a>
              <a href="#" className="hover:underline">Sign Up</a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
