export default function Signuppage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e1a29] p-6">
      
      {/* Gradient Outer Card */}
      <div className="w-full max-w-4xl bg-gradient-to-br from-[#2d3e50] via-[#1e2b3a] to-[#131f2c] rounded-3xl p-10 shadow-2xl border border-white/10 relative">

        {/* Subtle dot pattern overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.06] rounded-3xl"></div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* LEFT — Icon / Art */}
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
              <circle cx="100" cy="60" r="40" />
              <path d="M40 160 C40 120, 160 120, 160 160" />
              <path d="M60 160 C60 140, 140 140, 140 160" />
            </svg>
          </div>

          {/* RIGHT — Signup Form */}
          <div className="text-white">
            <h1 className="text-3xl font-extrabold">CREATE ACCOUNT</h1>
            <p className="text-gray-300 mt-2 mb-6">Join Expense Tracker Pro</p>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 bg-white text-gray-700 rounded-full shadow focus:ring-2 focus:ring-cyan-300 outline-none"
              />

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

              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 bg-white text-gray-700 rounded-full shadow focus:ring-2 focus:ring-cyan-300 outline-none"
              />

              {/* Signup Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-xl text-white font-semibold hover:opacity-90 transition"
              >
                SIGN UP
              </button>
            </form>

            <div className="flex justify-between text-gray-300 text-sm mt-4">
              <span>Already have an account?</span>
              <a href="/login" className="hover:underline">Log In</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
