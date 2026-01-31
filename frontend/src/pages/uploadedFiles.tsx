"use client";

import { useEffect, useState } from "react";
import axios from "@/api/axios";
import DashboardLayout from "@/components/layout/dashboardLayout";
import { IconTrash } from "@tabler/icons-react";

type Batch = {
  _id: string;
  fileName: string;
  source: "pdf" | "csv" | "excel";
  status: string;
  totalRows: number;
  successCount: number;
  failedCount: number;
  createdAt: string;
};

export default function UploadedFiles() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchBatches = async () => {
    const res = await axios.get("/imports/batches");
    setBatches(res.data.batches);
    setLoading(false);
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);
      await axios.delete(`/imports/batch/${deleteId}`);
      setMessage("File deleted successfully");
      setDeleteId(null);
      fetchBatches();
    } catch {
      setMessage("Failed to delete file");
    } finally {
      setDeleting(false);
      setTimeout(() => setMessage(null), 2500);
    }
  };

  return (
    <DashboardLayout>
      {/* TOAST MESSAGE */}
      {message && (
        <div className="fixed top-6 right-6 z-50 rounded-xl bg-black/80 border border-white/10 px-5 py-3 text-sm text-white">
          {message}
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-neutral-900 border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-2">
              Delete uploaded file?
            </h3>

            <p className="text-sm text-neutral-400 mb-6">
              All related transactions will be permanently removed.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="px-4 py-2 rounded-lg text-sm bg-white/10 hover:bg-white/20 transition"
              >
                No
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600 transition"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Uploaded Files</h1>
        <p className="text-neutral-400">
          Manage your uploaded bank statements
        </p>
      </div>

      {loading ? (
        <p className="text-neutral-400">Loading files…</p>
      ) : batches.length === 0 ? (
        <p className="text-neutral-400">No files uploaded yet.</p>
      ) : (
        <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-neutral-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-3 text-left">File</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Uploaded</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {batches.map((b) => (
                <tr
                  key={b._id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  {/* FILE */}
                  <td className="px-6 py-4 font-medium">
                    {b.fileName}
                  </td>

                  {/* TYPE */}
                  <td className="px-6 py-4 uppercase text-neutral-300">
                    {b.source}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          b.status === "completed"
                            ? "bg-green-500/10 text-green-400"
                            : b.status === "failed"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }
                      `}
                    >
                      {b.status}
                    </span>
                  </td>

                  {/* UPLOADED DATE + TIME */}
                  <td className="px-6 py-4 text-neutral-400">
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm">
                        {new Date(b.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {new Date(b.createdAt).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setDeleteId(b._id)}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      <IconTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}
