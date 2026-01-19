import { useState } from "react";
import { UploadCloud } from "lucide-react";
import Papa from "papaparse";
import api from "@/lib/api";

interface Props {
  onUploaded: (rows: any[]) => void;
}

export default function CsvUploadBox({ onUploaded }: Props) {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    try {

      const formData = new FormData();
      formData.append("file", file);
      await api.post("/files/import", formData); 

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          onUploaded(result.data as any[]);
        },
      });

      alert("CSV imported successfully ✅");
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "CSV import failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-panel bg-violet-200 border shadow-soft p-6 flex flex-col items-center gap-4">
      <UploadCloud className="h-10 w-10 text-brand-purpleDark" />

      <p className="text-sm font-medium">Upload CSV file</p>

      <label className="px-4 py-2 bg-brand-purpleDark text-white rounded-md cursor-pointer">
        {loading ? "Uploading..." : "Choose File"}
        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFile}
          disabled={loading}
        />
      </label>

      {fileName && (
        <p className="text-xs text-gray-600">
          Selected: {fileName}
        </p>
      )}
    </div>
  );
}
