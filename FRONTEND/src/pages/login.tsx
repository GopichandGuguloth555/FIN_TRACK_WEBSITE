import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative">

      
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#4E3B84] rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 bg-[#1e293b] shadow-xl rounded-3xl p-10 w-full max-w-md border border-white/10">

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
            className="rounded-full px-4 py-2 bg-white"
          />

          <Input
            placeholder="Password"
            type="password"
            className="rounded-full px-4 py-2 bg-white"
          />

          <div className="flex items-center justify-between text-gray-300 text-xs">
            <label className="flex items-center gap-1">
              <input type="checkbox" className="accent-blue-600" />
              Remember me
            </label>

            <Link to="/forgot-password" className="hover:underline">
              Forgot Password?
            </Link>
          </div>

          <Button className="w-full rounded-full bg-[#2563eb] hover:bg-[#1e4fc8] text-white py-2 text-sm">
            Sign In
          </Button>
        </div>

        <p className="text-center text-gray-300 text-sm mt-6">
          Don't have your account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}
