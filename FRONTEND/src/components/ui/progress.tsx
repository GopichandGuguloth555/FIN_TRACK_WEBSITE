import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
}

export function Progress({ value }: ProgressProps) {
  return (
    <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
      <div
        className={cn(
          "h-full rounded-full transition-all duration-300",
          value > 80 ? "bg-red-500" : "bg-emerald-500"
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
