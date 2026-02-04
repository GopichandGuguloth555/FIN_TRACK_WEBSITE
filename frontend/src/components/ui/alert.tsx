type AlertBoxProps = {
  message: string;
  type?: "success" | "error";
  onClose?: () => void;
};

const AlertBox = ({
  message,
  type = "success",
  onClose,
}: AlertBoxProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div
        className={`
          min-w-[320px] max-w-[420px]
          px-6 py-5
          rounded-2xl
          border
          shadow-2xl
          text-sm text-white
          flex items-start justify-between gap-4
          transform transition-all duration-300
          animate-bounce
          ${
            type === "success"
              ? "bg-emerald-500/20 border-emerald-500/40"
              : "bg-red-500/20 border-red-500/40"
          }
        `}
      >
        <span className="leading-relaxed">{message}</span>

        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 text-white/70 hover:text-white text-lg leading-none"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertBox;