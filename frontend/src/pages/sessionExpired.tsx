"use client";

import { useNavigate } from "react-router-dom";

export default function SessionExpired() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f12]">
      <div className="text-center max-w-md px-6">
        <h1 className="text-5xl font-bold text-white mb-4">
          Session Expired
        </h1>

        <p className="text-neutral-400 text-lg mb-10">
          Your session has expired.  
          Please login again to continue.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="
            px-10 py-3 rounded-xl
            bg-white text-black
            font-medium text-lg
            hover:bg-neutral-200
            transition
          "
        >
          Login Again
        </button>
      </div>
    </div>
  );
}
