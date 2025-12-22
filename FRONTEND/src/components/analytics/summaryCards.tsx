interface SummaryCardProps {
  label: string;
  value: number | string | null | undefined;
  highlight?: boolean;
  isCurrency?: boolean;
  showSign?: boolean;
}

export default function AnalyticsSummary({
  label,
  value,
  highlight = false,
  isCurrency = true,
  showSign = false,
}: SummaryCardProps) {
  const isNumber = typeof value === "number";

  let displayValue = "—";

  if (isNumber) {
    const sign =
      showSign && value !== 0 ? (value > 0 ? "+" : "−") : "";

    displayValue = isCurrency
      ? `${sign}₹${Math.abs(value).toLocaleString("en-IN")}`
      : `${sign}${value}`;
  } else if (typeof value === "string") {
    displayValue = value;
  }

  const valueColor =
    isNumber && value < 0
      ? "text-red-500"
      : isNumber && value > 0 && showSign
      ? "text-green-600"
      : "text-brand-text";

  return (
    <div
      className={`rounded-card border border-brand-borderLight shadow-card p-4
        ${highlight ? "bg-brand-purpleLight" : "bg-white"}`}
    >
      <p className="text-xs text-brand-textMuted">{label}</p>

      <p className={`text-xl font-semibold ${valueColor}`}>
        {displayValue}
      </p>
    </div>
  );
}
