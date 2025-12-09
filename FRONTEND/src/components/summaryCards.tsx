interface SummaryCardProps {
  label: string;
  value: string;
  trend: string;
  negative?: boolean;
}

export default function SummaryCard({
  label,
  value,
  trend,
  negative,
}: SummaryCardProps) {
  return (
    <div className="rounded-card bg-white shadow-card border border-brand-borderLight px-4 py-3 flex flex-col gap-1">
      <p className="text-xs text-brand-textMuted">{label}</p>
      <p className="text-xl font-semibold text-brand-text">{value}</p>
      <p
        className={
          "text-xs font-medium " +
          (negative ? "text-red-500" : "text-brand-green")
        }
      >
        {trend} this month
      </p>
    </div>
  );
}
