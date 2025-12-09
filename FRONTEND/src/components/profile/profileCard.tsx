export default function ProfileCard() {
  return (
    <div className="rounded-panel bg-white border border-brand-borderLight shadow-soft p-6 flex items-center gap-6">

      {/* Avatar */}
      <img
        src="https://i.pravatar.cc/200"
        alt="avatar"
        className="h-20 w-20 rounded-xl border border-brand-border shadow-sm"
      />

      {/* Details */}
      <div className="flex flex-col gap-1">
        <p className="text-lg font-semibold text-brand-text">Gopi Chand</p>
        <p className="text-sm text-brand-textMuted">gopichand@example.com</p>
        <p className="text-xs text-brand-purpleDark font-medium">
          Premium User
        </p>
      </div>

    </div>
  );
}
