import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import AlertPopup from "@/components/alert";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] =
    useState<"success" | "error" | "warning" | "info">("info");

  const navigate = useNavigate();

  async function login() {
    if (!email.includes("@")) {
      setAlertType("warning");
      setAlertMessage("Enter a valid email address");
      setShowAlert(true);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        { email, password }
      );
      
      //@ts-ignore
      localStorage.setItem("token", response.data.token);

      setAlertType("success");
      setAlertMessage("Logged in successfully!");
      setShowAlert(true);
    } catch (err: any) {
      setAlertType("error");
      setAlertMessage(
        err.response?.data?.message || "Login failed. Try again."
      );
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    
    <div className="min-h-screen  flex items-center justify-center bg-gray-100 relative">
    
      <AlertPopup
        open={showAlert}
        type={alertType}
        message={alertMessage}
        onClose={() => {
          setShowAlert(false);
          if (alertType === "success") navigate("/dashboard");
        }}
      />

      <div className="relative z-10  bg-white shadow-xl rounded-3xl p-10 w-full max-w-md border border-white/10">
    
        <div className="flex justify-center mb-6">
          <img
            src="/assets/FintrackLogo.png"
            alt="FinTrack Logo"
            className="w-28 h-auto opacity-90 rounded-xl "
          />
        </div>

        <h1 className="text-3xl font-semibold text-center text-white mb-1">
          Welcome Back
        </h1>

        <p className="text-lg text-center  mb-8">
          Secure Access to Your Financial Hub
        </p>

        <div className="space-y-4">
          <Input
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-full bg-white"
          />

          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-full bg-white"
          />

          <Button
            onClick={login}
            disabled={loading}
            className="w-full rounded-full bg-[#2563eb] hover:bg-[#1e4fc8]"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </div>

        <p className="text-center text-gray-900 text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className=" text-violet-900 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>

    </div>
  );
}
