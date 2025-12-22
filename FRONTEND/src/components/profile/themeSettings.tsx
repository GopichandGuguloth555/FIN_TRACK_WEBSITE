import { useState } from "react";

export default function ThemeSettings() {
  const themes = [
    { name: "Purple Theme", color: "#4F3BA9" },
    { name: "Dark Mode", color: "#0F172A" },
  ];

  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  return (
    <div className="rounded-card bg-white border border-brand-borderLight shadow-card p-5">

      <p className="text-lg font-semibold text-brand-text mb-4">
        Theme
      </p>

      <div className="grid grid-cols-2 gap-4">
        {themes.map((theme) => (
          <div
            key={theme.name}
            onClick={() => setSelectedTheme(theme.name)}
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <div
              className={`h-12 w-12 rounded-full shadow-soft border
                ${
                  selectedTheme === theme.name
                    ? "ring-2 ring-brand-purpleDark"
                    : ""
                }
              `}
              style={{ backgroundColor: theme.color }}
            />

            <p className="text-xs text-brand-textMuted text-center">
              {theme.name}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
