import TransactionFilters from "../components/transactions/transactionFilters";
import TransactionTable from "../components/transactions/transactionTable";
import AddTransactionDialog from "../components/transactions/transactionDialog";

export default function TransactionsPage() {
  return (
    <div className="space-y-4">
      
      {/* Filters + Add button */}
      <div className="flex justify-between items-center">
        <TransactionFilters />
        <AddTransactionDialog />
      </div>

      {/* Table */}
      <TransactionTable />
    </div>
  );
}
