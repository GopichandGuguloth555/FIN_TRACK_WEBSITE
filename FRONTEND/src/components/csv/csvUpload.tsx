import { useState } from "react";
import { UploadCloud } from "lucide-react";

export default function CsvUploadBox({ onUpload }: any) {
  const [fileName, setFileName] = useState("");

  function handleFile(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    onUpload(file);
  }

  return (
    <div className="rounded-panel bg-white bg-violet-200 border border-brand-borderLight shadow-soft p-6 flex flex-col items-center justify-center gap-4 text-center">

      <UploadCloud className="h-10 w-10 text-brand-purpleDark" />

      <p className="text-brand-text font-medium text-sm">
        Upload CSV file
      </p>

      <label className="px-4 py-2 bg-brand-purpleDark text-white rounded-md text-sm cursor-pointer hover:bg-brand-purpleDarker">
        Choose File
        <input type="file" accept=".csv" className="hidden" onChange={handleFile} />
      </label>
 
      {fileName && (
        <p className="text-xs text-brand-textMuted">Selected: {fileName}</p>
      )}
    </div>
  );
}
