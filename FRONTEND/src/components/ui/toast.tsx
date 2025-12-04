import { cn } from "@/lib/utils"

export function Toast({ title, description }: { title?: string; description?: string }) {
  return (
    <div className={cn(
      "fixed bottom-5 right-5 bg-black text-white p-4 rounded-xl shadow-lg animate-in fade-in duration-300"
    )}>
      {title && <p className="font-semibold">{title}</p>}
      {description && <p className="text-sm">{description}</p>}
    </div>
  )
}
