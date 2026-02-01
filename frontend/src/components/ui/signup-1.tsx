"use client";

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

export default function SignupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<any>(null);

  /* 🔹 HANDLE GOOGLE REDIRECT */
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard", { replace: true });
    }
  }, []);

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
              <h1 className="text-4xl font-semibold text-white">Create Account</h1>

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
                Continue with Google
              </button>

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
                className="mt-2 h-11 rounded-md bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition"
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
            <img src={logo} alt="Fintrack" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-emerald-950/30 mix-blend-overlay" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        </div>
      </div>
    </>
  );
}
