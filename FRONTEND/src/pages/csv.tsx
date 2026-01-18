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
  
  return (
    <div className="space-y-6">
       
       <div className="flex justify between items-center"> <CsvExportButton /></div>
      <div className="justify-between items-center">
          <br /><br />
        <CsvUploadBox />
      
      </div>
      {/* <CsvPreviewTable rows={rows} /> */}
    </div>
  );
}
