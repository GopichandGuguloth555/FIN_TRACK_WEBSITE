import { useState } from "react";
import CsvUploadBox from "../components/csv/csvUpload";
import CsvPreviewTable from "@/components/csv/csvPreview";
import CsvExportButton from "@/components/csv/csvExport";

interface CsvRow {
  date: string;
  title: string;
  amount: string;
  category: string;
}

export default function CsvPage() {
  const [rows, setRows] = useState<CsvRow[]>([]);

  function handleUpload(file: File) {
    // For now using dummy preview — actual parsing later
    const previewData: CsvRow[] = [
      { date: "2025-01-01", title: "Groceries", amount: "-1200", category: "Food" },
      { date: "2025-01-02", title: "Salary", amount: "45000", category: "Income" },
    ];

    setRows(previewData);
  }

  return (
    <div className="space-y-6">
      {/* Top Section: Upload + Export */}
      <div className="flex justify-between items-center">
        <CsvUploadBox onUpload={handleUpload} />
        <CsvExportButton />
      </div>

      {/* Preview */}
      <CsvPreviewTable rows={rows} />
    </div>
  );
}
