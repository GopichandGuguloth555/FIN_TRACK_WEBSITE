interface AlertPopupProps {
  open: boolean;
  type?: "success" | "error" | "warning" | "info";
  message: string;
  onClose: () => void;
}

export default function AlertPopup({
  open,
  type = "info",
  message,
  onClose,
}: AlertPopupProps) {
  if (!open) return null;

  const colors = {
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-yellow-600",
    info: "text-blue-600",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <h3 className={`text-xl font-semibold mb-3 ${colors[type]}`}>
          {type.toUpperCase()}
        </h3>

        <p className="text-gray-700 mb-6">{message}</p>

        <button
          onClick={onClose}
          className="w-full rounded-lg bg-[#4E3B84] text-white py-2 hover:opacity-90"
        >
          OK
        </button>
      </div>
    </div>
  );
}
