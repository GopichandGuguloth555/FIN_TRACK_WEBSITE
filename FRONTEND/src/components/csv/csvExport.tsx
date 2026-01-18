import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CsvExportButton() {
  function handleExport() {
   
    alert("Exporting CSV...");
  }

  return (
    <Button
      onClick={handleExport}
      className="bg-brand-purpleDark hover:bg-brand-purpleDarker text-white flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      Export CSV
    </Button>
  );
}
