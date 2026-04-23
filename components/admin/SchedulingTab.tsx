"use client";

import { useEffect, useState } from "react";
import { getBookings, updateBookingStatus, Booking, BookingStatus } from "@/lib/firestore";

const STATUS_OPTIONS: BookingStatus[] = ["Pending", "Confirmed", "Completed", "Cancelled"];

const STATUS_COLORS: Record<BookingStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function SchedulingTab() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    getBookings()
      .then(setBookings)
      .finally(() => setLoading(false));
  }, []);

  async function handleStatusChange(id: string, status: BookingStatus) {
    setUpdatingId(id);
    try {
      await updateBookingStatus(id, status);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } finally {
      setUpdatingId(null);
    }
  }

  const filtered = bookings.filter((b) => {
    if (filterStatus !== "all" && b.status !== filterStatus) return false;
    if (filterDateFrom && b.preferredDate < filterDateFrom) return false;
    if (filterDateTo && b.preferredDate > filterDateTo) return false;
    return true;
  });

  if (loading) {
    return <div className="text-gray-500 text-sm py-8 text-center">Loading bookings…</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end gap-3 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mr-auto">Scheduling</h2>

        {/* Filters */}
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            value={filterDateFrom}
            onChange={(e) => setFilterDateFrom(e.target.value)}
          />
          <span className="text-gray-400 text-sm">–</span>
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            value={filterDateTo}
            onChange={(e) => setFilterDateTo(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">📅</div>
          <p>No bookings found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Customer", "Address", "Services", "Date", "Time", "Status", "Submitted"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((b) => (
                  <>
                    <tr
                      key={b.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setExpanded(expanded === b.id ? null : b.id!)}
                    >
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                        {b.firstName} {b.lastName}
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {b.address.city}, {b.address.state}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {b.services.join(", ")}
                      </td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{b.preferredDate}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{b.preferredTime}</td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <select
                          className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer ${STATUS_COLORS[b.status]} disabled:opacity-50`}
                          value={b.status}
                          disabled={updatingId === b.id}
                          onChange={(e) => handleStatusChange(b.id!, e.target.value as BookingStatus)}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap text-xs">
                        {b.submittedAt
                          ? new Date((b.submittedAt as unknown as { seconds: number }).seconds * 1000).toLocaleDateString()
                          : "—"}
                      </td>
                    </tr>
                    {expanded === b.id && (
                      <tr key={`${b.id}-details`} className="bg-[#f8fbf9]">
                        <td colSpan={7} className="px-6 py-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-semibold text-gray-700 mb-1">Full Address</p>
                              <p className="text-gray-600">
                                {b.address.street}<br />
                                {b.address.city}, {b.address.state} {b.address.zip}
                              </p>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-700 mb-1">Contact</p>
                              <p className="text-gray-600">{b.email}</p>
                              <p className="text-gray-600">{b.phone}</p>
                            </div>
                            {b.notes && (
                              <div className="sm:col-span-2">
                                <p className="font-semibold text-gray-700 mb-1">Notes</p>
                                <p className="text-gray-600 whitespace-pre-wrap">{b.notes}</p>
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
