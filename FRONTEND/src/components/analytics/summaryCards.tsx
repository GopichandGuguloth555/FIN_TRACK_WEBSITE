interface SummaryCardProps {
  label: string;
  value: string;
  highlight?: boolean;
}

export default function AnalyticsSummary({
  label,
  value,
  highlight,
}: SummaryCardProps) {
  return (
    <div
      className={`rounded-card border border-brand-borderLight shadow-card p-4 ${
        highlight ? "bg-brand-purpleLight" : "bg-white"
      }`}
    >
      <p className="text-xs text-brand-textMuted">{label}</p>
      <p className="text-xl font-semibold text-brand-text">{value}</p>
    </div>
  );
}
