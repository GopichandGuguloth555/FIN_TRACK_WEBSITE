import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-purpleLight relative">
      
      <div className="absolute top-0 left-0 w-72 h-72 bg-brand-purple rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 bg-white shadow-soft border border-brand-borderLight rounded-panel p-8 w-full max-w-sm">
        
        <h1 className="text-2xl font-semibold text-brand-text mb-1">Reset Password</h1>
        <p className="text-sm text-brand-textMuted mb-6">
          Enter your email and we will send a reset link
        </p>

        <div className="space-y-4">
          <Input placeholder="Email" type="email" />
          <Button className="w-full bg-brand-purpleDark hover:bg-brand-purpleDarker text-white">
            Send Reset Link
          </Button>
        </div>

        <p className="text-xs text-brand-textMuted text-center mt-6">
          Remember your password?{" "}
          <Link to="/login" className="text-brand-purpleDark font-medium hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
