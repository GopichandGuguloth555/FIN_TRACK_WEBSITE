import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignupPage() {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function signup() {

    if (userName.length < 3) {
      alert("Username must be at least 3 characters long.");
      return;
    }

    if (!email.includes("@")) {
      alert("Enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/user/signup", {
        userName,
        email,
        password,
      });

      console.log("Signup Success:", response.data);
      alert("Signup successful! Please login.");
      navigate("/login");

    } catch (err) {
      const error = err as any;
      console.error("Signup Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed. Try again.");
    }

    setLoading(false);
  }

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
          Start your journey to financial clarity.
        </p>

        <div className="space-y-4">

          <Input
            placeholder="Choose a Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <Input
            placeholder="Email Address"
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

          <Button
            onClick={signup}
            disabled={loading}
            className="w-full bg-[#4E3B84] hover:bg-[#3c2f6a] text-white py-2"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </div>

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
