"use client";

import { useEffect, useState } from "react";
import { getQuotes, updateQuoteStatus, Quote, QuoteStatus } from "@/lib/firestore";

const STATUS_OPTIONS: QuoteStatus[] = ["New", "In Progress", "Quoted", "Closed"];

const STATUS_COLORS: Record<QuoteStatus, string> = {
  New: "bg-purple-100 text-purple-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Quoted: "bg-green-100 text-green-800",
  Closed: "bg-gray-100 text-gray-600",
};

export default function QuotesTab() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    getQuotes()
      .then(setQuotes)
      .finally(() => setLoading(false));
  }, []);

  async function handleStatusChange(id: string, status: QuoteStatus) {
    setUpdatingId(id);
    try {
      await updateQuoteStatus(id, status);
      setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return <div className="text-gray-500 text-sm py-8 text-center">Loading quotes…</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Quote Requests</h2>

      {quotes.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">📋</div>
          <p>No quote requests yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Customer", "Address", "Services", "Timeline", "Status", "Submitted"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quotes.map((q) => (
                  <>
                    <tr
                      key={q.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setExpanded(expanded === q.id ? null : q.id!)}
                    >
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                        {q.firstName} {q.lastName}
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {q.address.city}, {q.address.state}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{q.services.join(", ")}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {q.timeline || "—"}
                      </td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <select
                          className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer ${STATUS_COLORS[q.status]} disabled:opacity-50`}
                          value={q.status}
                          disabled={updatingId === q.id}
                          onChange={(e) => handleStatusChange(q.id!, e.target.value as QuoteStatus)}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap text-xs">
                        {q.submittedAt
                          ? new Date((q.submittedAt as unknown as { seconds: number }).seconds * 1000).toLocaleDateString()
                          : "—"}
                      </td>
                    </tr>
                    {expanded === q.id && (
                      <tr key={`${q.id}-details`} className="bg-[#f8fbf9]">
                        <td colSpan={6} className="px-6 py-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-semibold text-gray-700 mb-1">Full Address</p>
                              <p className="text-gray-600">
                                {q.address.street}<br />
                                {q.address.city}, {q.address.state} {q.address.zip}
                              </p>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-700 mb-1">Contact</p>
                              <p className="text-gray-600">{q.email}</p>
                              <p className="text-gray-600">{q.phone}</p>
                            </div>
                            {q.notes && (
                              <div className="sm:col-span-2">
                                <p className="font-semibold text-gray-700 mb-1">Notes</p>
                                <p className="text-gray-600 whitespace-pre-wrap">{q.notes}</p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
