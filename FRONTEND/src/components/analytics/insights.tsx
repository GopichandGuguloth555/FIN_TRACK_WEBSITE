export default function InsightsBox() {
  return (
    <div className="rounded-card bg-brand-purpleSoft border border-brand-borderLight shadow-card p-4">
      <p className="text-sm font-semibold text-brand-purpleDark mb-2">
        Smart Insights
      </p>

      <ul className="space-y-2 text-sm text-brand-textMuted">
        <li>• Shopping expenses increased by 12% vs last month.</li>
        <li>• You saved ₹4,500 more this month.</li>
        <li>• Travel spending is below your monthly average.</li>
      </ul>
    </div>
  );
}
