import DashboardLayout from "@/components/layout/dashboardLayout";
import TransactionsTable from "@/components/transactions/transactionTable";
import TransactionFilters from "@/components/transactions/transactionFilters";
import UploadStatementCard from "@/components/transactions/uploadFile";

export default function Transactions() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <p className="text-neutral-400">
          View and manage all your transactions
        </p>
      </div>
       <UploadStatementCard></UploadStatementCard>
       <br />
      {/* Filters */}
      <TransactionFilters />

      {/* Table */}
      <TransactionsTable />
    </DashboardLayout>
  );
}
