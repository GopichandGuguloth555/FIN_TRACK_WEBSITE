import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AccountSettings() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = async () => {
    await fetch("http://localhost:5000/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ userName, password }),
    });

    alert("Profile updated successfully!");
  };

  return (
    <div className="rounded-card bg-white border shadow-card p-5 space-y-4">
      <p className="text-lg font-semibold">Account Settings</p>

      <Input
        placeholder="New Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <Input
        placeholder="New Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={handleSave}>
        Save Changes
      </Button>
    </div>
  );
}
