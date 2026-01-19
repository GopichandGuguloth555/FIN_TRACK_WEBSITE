import { useState } from "react";
import CsvUploadBox from "../components/csv/csvUpload";
import CsvExportButton from "../components/csv/csvExport";
import CsvPreviewTable from "../components/csv/csvPreview";

export default function CsvPage() {
  const [rows, setRows] = useState<any[]>([]);

  return (
    <div className="space-y-6">
      {/* Export button */}
      <div className="flex justify-end">
        <CsvExportButton />
      </div>

      {/* Upload CSV */}
      <CsvUploadBox onUploaded={setRows} />

      {/* Preview + Analyze */}
      {rows.length > 0 && <CsvPreviewTable rows={rows} />}
    </div>
  );
}
