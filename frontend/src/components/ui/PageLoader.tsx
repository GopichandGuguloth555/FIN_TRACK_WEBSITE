export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-950/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-500 animate-spin"
            style={{ animationDuration: "0.8s" }}
          />
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-emerald-400 animate-spin"
            style={{ animationDuration: "1.2s", animationDirection: "reverse" }}
          />
        </div>
        <p className="text-sm text-neutral-400 animate-pulse">Loading…</p>
      </div>
    </div>
  );
}
