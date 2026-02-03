import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboardLayout";
import TransactionsTable from "@/components/transactions/transactionTable";
import TransactionFilters from "@/components/transactions/transactionFilters";
import UploadStatementCard from "@/components/transactions/uploadFile";

export default function Transactions() {
  const [showUpload, setShowUpload] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshKey((k) => k + 1);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <p className="text-neutral-400">
          View and manage all your transactions
        </p>
      </div>

      {!showUpload ? (
        <button
          onClick={() => setShowUpload(true)}
          className="
            mx-auto mb-10 flex items-center justify-center
            rounded-xl bg-white/10 backdrop-blur-xl
            border border-white/10
            px-6 py-3 text-sm font-medium
            hover:bg-white/20 transition
          "
        >
          Upload Bank Statement
        </button>
      ) : (
        <UploadStatementCard
          onClose={() => setShowUpload(false)}
          onUploadSuccess={handleUploadSuccess}
        />
      )}

      <TransactionFilters />
      <TransactionsTable refreshKey={refreshKey} />
    </DashboardLayout>
  );
}