import DashboardLayout from "@/components/layout/dashboardLayout";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-neutral-400">
          Manage your personal information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Profile Card */}
        <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-6">
          <div className="flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center text-2xl font-semibold">
              G
            </div>

            <h2 className="mt-4 text-lg font-semibold">Gopichand</h2>
            <p className="text-sm text-neutral-400">
              gopichand@email.com
            </p>

            <button className="mt-4 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 transition text-sm">
              Change Avatar
            </button>
          </div>
        </div>

        {/* Right: Profile Form */}
        <div className="lg:col-span-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold mb-6">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="text-sm text-neutral-400">Full Name</label>
              <input
                type="text"
                defaultValue="Gopichand"
                className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2 outline-none focus:border-white/30"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-neutral-400">Email</label>
              <input
                type="email"
                defaultValue="gopichand@email.com"
                className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2 outline-none focus:border-white/30"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm text-neutral-400">Phone</label>
              <input
                type="text"
                placeholder="+91 XXXXX XXXXX"
                className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2 outline-none focus:border-white/30"
              />
            </div>

            {/* Currency */}
            <div>
              <label className="text-sm text-neutral-400">
                Preferred Currency
              </label>
              <select className="mt-1 w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2">
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-end gap-4">
            <button className="px-4 py-2 rounded-xl text-sm text-neutral-400 hover:text-white transition">
              Cancel
            </button>
            <button className="px-5 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition text-sm font-medium">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-10 rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
        <h3 className="text-lg font-semibold text-red-400 mb-2">
          Danger Zone
        </h3>
        <p className="text-sm text-red-300 mb-4">
          Logging out will end your current session.
        </p>
        <button className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 transition text-sm">
          Logout
        </button>
      </div>
    </DashboardLayout>
  );
}
