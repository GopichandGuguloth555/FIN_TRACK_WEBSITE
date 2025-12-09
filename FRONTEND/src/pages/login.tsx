import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-purpleLight relative">
      
      {/* Purple Accent Circle */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-brand-purple rounded-full blur-3xl opacity-20" />

      {/* Card */}
      <div className="relative z-10 bg-white shadow-soft border border-brand-borderLight rounded-panel p-8 w-full max-w-sm">
        
        <h1 className="text-2xl font-semibold text-brand-text mb-1">Welcome Back</h1>
        <p className="text-sm text-brand-textMuted mb-6">Login to continue</p>

        <div className="space-y-4">
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-xs text-brand-purpleDark hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button className="w-full bg-brand-purpleDark hover:bg-brand-purpleDarker text-white">
            Login
          </Button>
        </div>

        <p className="text-xs text-brand-textMuted text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-brand-purpleDark font-medium hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}
