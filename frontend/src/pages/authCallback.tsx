"use client";

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, params]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
      <p className="text-neutral-400">Signing you in…</p>
    </div>
  );
}
