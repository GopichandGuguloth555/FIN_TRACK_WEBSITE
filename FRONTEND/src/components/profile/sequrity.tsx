import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SecuritySettings() {
  return (
    <div className="rounded-card bg-white border border-brand-borderLight shadow-card p-5 space-y-4">

      <p className="text-lg font-semibold text-brand-text">Security</p>

      <Input placeholder="Current Password" type="password" />
      <Input placeholder="New Password" type="password" />
      <Input placeholder="Confirm New Password" type="password" />

      <Button className="bg-brand-purpleDark hover:bg-brand-purpleDarker text-white">
        Update Password
      </Button>

    </div>
  );
}
