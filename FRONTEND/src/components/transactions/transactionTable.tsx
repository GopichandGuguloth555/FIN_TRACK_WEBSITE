import { Trash2, Pencil } from "lucide-react";
import EditTransactionDialog from "./editTransaction";

interface Props {
  data: any[];
  onDelete: (id: string) => void;
  refresh: () => void;
}

export default function TransactionTable({ data, onDelete, refresh }: Props) {
  return (
    <div className="rounded-card bg-white shadow-card border border-gray-200 overflow-hidden mt-4">

      {/* Header */}
      <div className="grid grid-cols-6 px-4 py-3 bg-purple-100 text-sm font-semibold">
        <p>Title</p>
        <p>Category</p>
        <p>Amount</p>
        <p>Date</p>
        <p>Description</p>
        <p>Actions</p>
      </div>

      <div className="divide-y">
        {data.map((item) => (
          <div key={item._id} className="grid grid-cols-6 px-4 py-3 text-sm">

            <p>{item.type}</p>
            <p>{item.category}</p>
            <p className={item.type === "expense" ? "text-red-500" : "text-green-600"}>
              {item.amount}
            </p>
            <p>{item.date?.substring(0, 10)}</p>
            <p>{item.description || "-"}</p>

            <div className="flex gap-3">
              {/* EDIT BUTTON */}
              <EditTransactionDialog transaction={item} onUpdated={refresh} />

              {/* DELETE BUTTON */}
              <button
                onClick={() => onDelete(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
