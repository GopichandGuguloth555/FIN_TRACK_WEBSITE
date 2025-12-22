import { useEffect, useState } from "react";

interface User {
  userName: string;
  email: string;
}

export default function ProfileCard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setUser(data.user);
        setUserName(data.user.userName);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const avatar =
    preview ||
    `https://ui-avatars.com/api/?name=${user?.userName}&background=6D28D9&color=fff&size=200`;

  if (loading) {
    return <div className="bg-white rounded-xl p-6 shadow">Loading...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border shadow p-6">
    
      <div className="flex items-center  gap-6 pb-6 border-b">
        <div className="relative">
          <img
            src={avatar}
            className="h-28 w-28 rounded-full object-cover  border"
          />
          <label className="absolute bottom-0 right-0 bg-[#4E3B84] text-white text-xs px-2 py-1 rounded cursor-pointer">
            Change
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                e.target.files &&
                setPreview(URL.createObjectURL(e.target.files[0]))
              }
            />
          </label>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{user?.userName}</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <span className="inline-block mt-2 text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
            Free User
          </span>
        </div>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        
        <div>
          <h3 className="font-semibold mb-3">Personal Information</h3>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mb-3"
            placeholder="Username"
          />
          <input
            value={user?.email}
            disabled
            className="w-full border rounded-lg px-3 py-2 bg-gray-100"
          />
          <button className="mt-3 bg-[#4E3B84] text-white px-4 py-2 rounded-lg">
            Update Profile
          </button>
        </div>

      
        <div>
          <h3 className="font-semibold mb-3">Security</h3>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mb-3"
          />
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
