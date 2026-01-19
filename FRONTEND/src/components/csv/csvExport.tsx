import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

export default function CsvExportButton() {
  async function handleExport() {
    try {
      const res = await api.get("/files/export", {
        responseType: "blob",
      });
      
      //@ts-ignore
      const blob = new Blob([res.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "transactions.csv";
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      alert(error.response?.data?.message || "Export failed");
    }
  }

  return (
    <Button
      onClick={handleExport}
      className="bg-brand-purpleDark text-white flex gap-2"
    >
      <Download className="h-4 w-4" />
      Export CSV
    </Button>
  );
}
