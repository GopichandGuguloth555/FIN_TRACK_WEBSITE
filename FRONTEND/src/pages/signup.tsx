import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef2f7] relative">

      <div className="absolute top-0 left-0 w-72 h-72 bg-[#4E3B84] rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 bg-white shadow-xl border border-gray-200 rounded-2xl p-10 w-full max-w-md">

        <div className="flex justify-center mb-6">
          <img 
            src="/src/assets/logo.png"
            alt="FinTrack Logo"
            className="w-28 h-auto object-contain"
          />
        </div>

        <h1 className="text-2xl font-semibold text-center text-[#1f1f1f] mb-1">
          Create Your Account
        </h1>
        <p className="text-sm text-center text-gray-500 mb-8">
          Start your managing to financial clarity.
        </p>

        {/* Form */}
        <div className="space-y-4">

          {/* First + Last Name Row */}
          <div className="flex gap-4">
            <Input placeholder="Your Name" />
          </div>

          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />

          <Button className="w-full bg-[#4E3B84] hover:bg-[#3c2f6a] text-white py-2">
            Sign Up
          </Button>
        </div>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#4E3B84] font-medium hover:underline">
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
}
