import ProfileCard from "../components/profile/profileCard";
import AccountSettings from "../components/profile/accountSettings";
import SecuritySettings from "../components/profile/sequrity";
import ThemeSettings from "../components/profile/themeSettings";

export default function ProfilePage() {
  return (
    <div className="space-y-6">

      {/* Profile Card */}
      <ProfileCard />

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AccountSettings />
        <SecuritySettings />
      </div>

      {/* Theme Section */}
      <ThemeSettings />

    </div>
  );
}
