import { useState } from "react";
import axios from "@/api/axios";
import { Upload, FileText, CheckCircle, Loader2 } from "lucide-react";

export default function UploadStatementCard({
  onClose,
}: {
  onClose: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    try {
      setStatus("uploading");

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/imports/upload", formData);
      const batchId = res.data.batchId;

      await axios.post(`/imports/parse/${batchId}`);

      setStatus("success");
      setMessage("Statement imported successfully 🎉");

      // auto close after short delay
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Failed to upload or parse statement");
    }
  };

  return (
    <div className="max-w-xl mx-auto mb-12">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-xl">
        <h2 className="text-xl font-semibold text-white mb-2">
          Upload Bank Statement
        </h2>
        <p className="text-sm text-neutral-400 mb-6">
          Upload your bank statement (PDF, CSV, Excel).
        </p>

        {/* Upload box */}
        <label className="flex flex-col items-center justify-center gap-3 border border-dashed border-neutral-700 rounded-xl p-8 cursor-pointer hover:border-neutral-500 transition">
          <Upload className="w-8 h-8 text-neutral-400" />
          <span className="text-neutral-300 text-sm">
            Click to upload or drag & drop
          </span>
          <span className="text-xs text-neutral-500">
            PDF, CSV, XLSX supported
          </span>

          <input
            type="file"
            className="hidden"
            accept=".pdf,.csv,.xlsx"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFile(e.target.files[0]);
                setStatus("idle");
              }
            }}
          />
        </label>

        {file && (
          <div className="mt-4 flex items-center gap-2 text-sm text-neutral-300">
            <FileText className="w-4 h-4" />
            {file.name}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || status === "uploading"}
          className="mt-6 w-full rounded-xl bg-white text-black py-3 font-medium hover:bg-neutral-200 transition disabled:opacity-50"
        >
          {status === "uploading" ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing…
            </span>
          ) : (
            "Upload & Import"
          )}
        </button>

        {status === "success" && (
          <div className="mt-4 flex items-center gap-2 text-green-400 text-sm">
            <CheckCircle className="w-4 h-4" />
            {message}
          </div>
        )}

        {status === "error" && (
          <div className="mt-4 text-red-400 text-sm">{message}</div>
        )}
      </div>
    </div>
  );
}
