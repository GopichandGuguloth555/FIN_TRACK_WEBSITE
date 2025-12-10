import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function login() {
    if (!email.includes("@")) {
      alert("Enter a valid email");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });

      console.log("Login Success:", response.data);
      
      //@ts-ignore
      localStorage.setItem("token", response.data.token);

      alert("Login Successful!");

      navigate("/dashboard");

    } catch (err) {
      const error = err as any;

      console.error("Login Error:", error.response?.data || error.message);

      alert(error.response?.data?.message || "Login failed. Try again.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative">

      {/* Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#4E3B84] rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 bg-[#1e293b] shadow-xl rounded-3xl p-10 w-full max-w-md border border-white/10">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/src/assets/logo.png"
            alt="FinTrack Logo"
            className="w-28 h-auto object-contain"
          />
        </div>

        <h1 className="text-3xl font-semibold text-center text-white mb-1">
          Welcome Back
        </h1>
        <p className="text-sm text-center text-gray-300 mb-8">
          Secure Access to Your Financial Hub
        </p>

        <div className="space-y-4">

          <Input
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-full px-4 py-2 bg-white"
          />

          {/* Password */}
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-full px-4 py-2 bg-white"
          />

          <div className="flex items-center justify-between text-gray-300 text-xs">
            <Link to="/forgot-password" className="hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            onClick={login}
            disabled={loading}
            className="w-full rounded-full bg-[#2563eb] hover:bg-[#1e4fc8] text-white py-2 text-sm"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </div>

        {/* Signup Link */}
        <p className="text-center text-gray-300 text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}
