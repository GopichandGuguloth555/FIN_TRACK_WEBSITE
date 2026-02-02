"use client";

import { useEffect, useState } from "react";
import axios from "@/api/axios";
import DashboardLayout from "@/components/layout/dashboardLayout";
import { useNavigate } from "react-router-dom";
import {
  IconUser,
  IconMail,
  IconLock,
  IconLogout,
} from "@tabler/icons-react";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get("/user/profile");
      setUserName(res.data.user.userName);
      setEmail(res.data.user.email);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      await axios.put("/user/profile", {
        userName,
        ...(password && { password }),
      });
      setPassword("");
      setMessage("Profile updated successfully");
    } catch {
      setMessage("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await axios.post("/user/logout");
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-neutral-400">Loading profile…</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-neutral-400 mt-1">
          Manage your account settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT CARD */}
        <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-8 flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-xl" />
            <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-3xl font-bold text-black">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>

          <h2 className="mt-4 text-lg font-semibold">{userName}</h2>
          <p className="text-sm text-neutral-400">{email}</p>

          <button
            onClick={handleLogout}
            className="
              mt-8 flex items-center gap-2 px-4 py-2 rounded-xl
              bg-red-500/10 text-red-400
              hover:bg-red-500/20 transition text-sm
            "
          >
            <IconLogout size={16} />
            Logout
          </button>
        </div>

        {/* RIGHT FORM */}
        <div className="lg:col-span-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-8">
          <h3 className="text-lg font-semibold mb-6">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div>
              <label className="text-sm text-neutral-400">Username</label>
              <div className="relative mt-2">
                <IconUser
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
                />
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="
                    w-full pl-9 rounded-xl px-4 py-2
                    bg-black/40 border border-white/10
                    focus:outline-none focus:ring-2 focus:ring-emerald-500
                  "
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-neutral-400">Email</label>
              <div className="relative mt-2">
                <IconMail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
                />
                <input
                  value={email}
                  disabled
                  className="
                    w-full pl-9 rounded-xl px-4 py-2
                    bg-black/30 border border-white/10
                    text-neutral-400 cursor-not-allowed
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div className="md:col-span-2">
              <label className="text-sm text-neutral-400">
                New Password
              </label>
              <div className="relative mt-2">
                <IconLock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current password"
                  className="
                    w-full pl-9 rounded-xl px-4 py-2
                    bg-black/40 border border-white/10
                    placeholder:text-neutral-500
                    focus:outline-none focus:ring-2 focus:ring-emerald-500
                  "
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center">
            {message && (
              <span className="text-sm text-emerald-400">
                {message}
              </span>
            )}

            <button
              onClick={handleSave}
              disabled={saving}
              className="
                px-6 py-2 rounded-xl
                bg-emerald-500 text-black font-medium
                hover:bg-emerald-400 transition
                disabled:opacity-60
              "
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
