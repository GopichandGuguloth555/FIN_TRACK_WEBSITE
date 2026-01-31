
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
    <div
      className={`
        fixed top-6 right-6 z-50
        min-w-[320px] max-w-[420px]
        px-5 py-4
        rounded-xl
        border
        backdrop-blur-md
        shadow-2xl
        text-sm text-white
        flex items-start justify-between gap-4
        ${
          type === "success"
            ? "bg-emerald-500/15 border-emerald-500/30"
            : "bg-red-500/15 border-red-500/30"
        }
      `}
    >
      <span className="leading-relaxed">{message}</span>

      {onClose && (
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white text-lg leading-none"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default AlertBox;
