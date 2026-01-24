import ProfileCard from "../components/profile/profileCard";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#F7F6FF] p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        My Profile
      </h1>

      <div className="space-y-6 max-w-4xl mx-auto">
        <ProfileCard />
      </div>
    </div>
  );
}
