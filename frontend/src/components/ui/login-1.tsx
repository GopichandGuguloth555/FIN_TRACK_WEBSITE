"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertBox from "@/components/ui/alert";
import logo from "/logo.png";

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

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<any>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setAlert({ message: "Login successful", type: "success" });
        setTimeout(() => navigate("/dashboard"), 900);
      } else {
        setAlert({ message: data.message, type: "error" });
      }
    } catch {
      setAlert({ message: "Server error", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {alert && (
        <AlertBox
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="min-h-screen w-full flex items-center justify-center bg-[#0b0f12] relative overflow-hidden">
        {/* GREEN AMBIENT GLOW */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[220px]" />
        </div>

        <div className="relative w-full max-w-5xl h-[560px] flex overflow-hidden rounded-xl bg-[#0f1418] border border-white/10 shadow-2xl">
          
          {/* LEFT FORM */}
          <div className="w-full lg:w-1/2 h-full flex items-center justify-center px-12">
            <form
              onSubmit={handleLogin}
              className="w-full max-w-sm flex flex-col gap-5 text-center"
            >
              <h1 className="text-4xl font-semibold text-white">Sign In</h1>

{/* GOOGLE LOGIN */}
<button
  type="button"
  onClick={() => alert("Google login coming soon")}
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
  {/* Google Icon */}
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8.1 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 18.9 12 24 12c3.1 0 5.9 1.2 8.1 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4c-7.7 0-14.4 4.3-17.7 10.7z"/>
    <path fill="#4CAF50" d="M24 44c5.1 0 9.9-1.9 13.5-5.1l-6.2-5.2C29.4 35.7 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.4 39.7 16.2 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.4 5.4-6.3 6.9l6.2 5.2C38.6 36.7 44 31.3 44 24c0-1.3-.1-2.7-.4-3.5z"/>
  </svg>

  Continue with Google
</button>

{/* DIVIDER */}
<div className="flex items-center gap-3 my-2">
  <div className="h-px flex-1 bg-white/10" />
  <span className="text-xs text-neutral-500">OR</span>
  <div className="h-px flex-1 bg-white/10" />
</div>
<span className="text-neutral-400">or use your account</span>


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
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <p className="text-sm text-neutral-400">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="text-emerald-400 cursor-pointer hover:underline"
                >
                  Sign Up
                </span>
              </p>
            </form>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden lg:block w-1/2 h-full relative">
            <img
              src={logo}
              alt="Fintrack"
              className="w-full h-full object-cover"
            />

            {/* GREEN OVERLAY */}
            <div className="absolute inset-0 bg-emerald-950/30 mix-blend-overlay" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        </div>
      </div>
    </>
  );
}
