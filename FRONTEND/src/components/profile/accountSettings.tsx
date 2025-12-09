import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AccountSettings() {
  return (
    <div className="rounded-card bg-white border border-brand-borderLight shadow-card p-5 space-y-4">

      <p className="text-lg font-semibold text-brand-text">Account Settings</p>

      <Input placeholder="Full Name" defaultValue="Gopi Chand" />
      <Input placeholder="Email" defaultValue="gopichand@example.com" />

      <Button className="bg-brand-purpleDark hover:bg-brand-purpleDarker text-white">
        Save Changes
      </Button>

    </div>
  );
}
