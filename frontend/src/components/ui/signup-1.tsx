"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertBox from "@/components/ui/alert";
import PageLoader from "@/components/ui/PageLoader";
import logo from "/logo.png";

/* ---------- Google Icon (same as login) ---------- */
const GoogleIcon = () => (
  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white">
    <svg viewBox="0 0 48 48" className="w-4 h-4">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.84-6.84C35.9 2.98 30.47 1 24 1 14.73 1 6.72 6.16 3 14.04l7.98 6.2C12.35 14.83 17.64 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24.5c0-1.62-.15-3.18-.44-4.68H24v9.09h12.7c-.55 2.96-2.23 5.48-4.76 7.17l7.43 5.78C43.9 38.16 46.5 31.83 46.5 24.5z"
      />
      <path
        fill="#FBBC05"
        d="M10.98 28.24A14.5 14.5 0 0 1 10.5 24c0-1.48.24-2.9.67-4.24l-7.98-6.2C1.8 16.2 1 19.02 1 22c0 2.98.8 5.8 2.19 8.44l7.79-6.2z"
      />
      <path
        fill="#34A853"
        d="M24 47c6.48 0 11.93-2.13 15.9-5.81l-7.43-5.78C30.8 36.94 27.7 38 24 38c-6.36 0-11.65-4.33-13.55-10.26l-7.98 6.2C6.72 41.84 14.73 47 24 47z"
      />
      <path fill="none" d="M1 1h46v46H1z" />
    </svg>
  </span>
);

/* ---------- Input ---------- */
const Input = ({
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="
      w-full h-12 px-4 rounded-md
      bg-[#0f1418]
      border border-[#262b30]
      text-sm text-white placeholder:text-neutral-400
      outline-none
      focus:border-emerald-400/50
      focus:ring-2 focus:ring-emerald-500/20
      transition
    "
  />
);

export default function SignupPage() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<any>(null);
  const demoEmail = "demouser123@gmail.com";
  const demoPassword = "demo@123";

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlert({ message: "Account created successfully", type: "success" });
        setTimeout(() => navigate("/login"), 800);
      } else {
        setAlert({ message: data.message || "Signup failed", type: "error" });
      }
    } catch {
      setAlert({ message: "Server error", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <PageLoader />}
      {alert && (
        <AlertBox
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="min-h-screen w-full flex items-center justify-center bg-[#0b0f12] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[220px]" />
        </div>

        <div className="relative w-full max-w-5xl h-[560px] flex overflow-hidden rounded-xl bg-[#0f1418] border border-white/10 shadow-2xl">
          {/* LEFT */}
          <div className="w-full lg:w-1/2 h-full flex items-center justify-center px-12">
            <form
              onSubmit={handleSignup}
              className="w-full max-w-sm flex flex-col gap-5 text-center"
            >
              <h1 className="text-4xl font-semibold text-white">
                Create Account
              </h1>

              {/* GOOGLE SIGNUP */}
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="
                  mt-4 h-11 w-full flex items-center justify-center gap-3
                  rounded-md
                  bg-[#0f1418]
                  border border-white/15
                  text-sm text-white
                  hover:border-emerald-400/40
                  hover:bg-white/5
                  transition
                "
              >
                <GoogleIcon />
                <span>Continue with Google</span>
              </button>

              {/* DIVIDER */}
              <div className="flex items-center gap-3 my-2">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs text-neutral-500">OR</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <Input
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />

              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                disabled={loading}
                className="
                  mt-2 h-11 rounded-md
                  bg-emerald-500 text-black font-medium
                  hover:bg-emerald-400
                  transition
                "
              >
                {loading ? "Creating..." : "Sign Up"}
              </button>

              <p className="text-sm text-neutral-400">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-emerald-400 cursor-pointer hover:underline"
                >
                  Sign In
                </span>
              </p>
            </form>
          </div>

          {/* RIGHT */}
          <div className="hidden lg:block w-1/2 h-full relative">
            <img
              src={logo}
              alt="Fintrack"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-emerald-950/30 mix-blend-overlay" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        </div>

        {/* DEMO CREDENTIALS POPUP (links to login) */}
        <div className="hidden md:flex flex-col gap-2 absolute top-1/2 right-10 -translate-y-1/2 w-[320px] rounded-2xl bg-black/80 border border-emerald-500/50 px-5 py-4 text-sm text-neutral-200 shadow-2xl">
          <p className="font-semibold text-emerald-400 mb-1">
            Try the demo account
          </p>
          <p>
            <span className="text-neutral-400">Email:</span> {demoEmail}
          </p>
          <p>
            <span className="text-neutral-400">Password:</span> {demoPassword}
          </p>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-2 inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-300 hover:bg-emerald-500/20"
          >
            Go to login and use demo
          </button>
        </div>
      </div>
    </>
  );
}