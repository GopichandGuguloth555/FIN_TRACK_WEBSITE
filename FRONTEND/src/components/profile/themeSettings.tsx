export default function ThemeSettings() {
  const themes = [
    { name: "Purple Theme", color: "#4F3BA9" },
    { name: "Light Mode", color: "#F9F9F9" },
    { name: "Dark Mode", color: "#0F172A" },
  ];

  return (
    <div className="rounded-card bg-white border border-brand-borderLight shadow-card p-5">

      <p className="text-lg font-semibold text-brand-text mb-4">Theme</p>

      <div className="grid grid-cols-3 gap-4">
        {themes.map((t) => (
          <div key={t.name} className="flex flex-col items-center gap-2">

            <div
              className="h-12 w-12 rounded-full shadow-soft border border-brand-border cursor-pointer"
              style={{ backgroundColor: t.color }}
            />

            <p className="text-xs text-brand-textMuted text-center">
              {t.name}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
