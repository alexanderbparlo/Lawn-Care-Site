"use client";

import { useEffect, useState, FormEvent } from "react";
import {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
  Payment,
  ServiceType,
  PaymentMethod,
} from "@/lib/firestore";
import Button from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import ServiceCheckboxes from "@/components/ui/ServiceCheckboxes";

const PAYMENT_METHODS: PaymentMethod[] = ["Cash", "Venmo", "Zelle", "Other"];

const emptyForm = {
  customerName: "",
  serviceDate: "",
  services: [] as ServiceType[],
  amount: "",
  paymentMethod: "" as PaymentMethod | "",
  notes: "",
};

type PaymentFormErrors = Partial<Record<keyof typeof emptyForm, string>>;

function validatePayment(f: typeof emptyForm): PaymentFormErrors {
  const e: PaymentFormErrors = {};
  if (!f.customerName.trim()) e.customerName = "Customer name is required.";
  if (!f.serviceDate) e.serviceDate = "Service date is required.";
  if (f.services.length === 0) e.services = "Select at least one service.";
  if (!f.amount || isNaN(Number(f.amount)) || Number(f.amount) < 0)
    e.amount = "Enter a valid dollar amount.";
  if (!f.paymentMethod) e.paymentMethod = "Payment method is required.";
  return e;
}

function getMonthTotal(payments: Payment[]) {
  const now = new Date();
  return payments
    .filter((p) => {
      const d = new Date(p.serviceDate);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    })
    .reduce((sum, p) => sum + p.amount, 0);
}

function getAllTimeTotal(payments: Payment[]) {
  return payments.reduce((sum, p) => sum + p.amount, 0);
}

export default function PaymentsTab() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState<PaymentFormErrors>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    getPayments()
      .then(setPayments)
      .finally(() => setLoading(false));
  }, []);

  function setField(field: keyof typeof emptyForm, value: string | ServiceType[]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) setFormErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function startEdit(p: Payment) {
    setEditingId(p.id!);
    setForm({
      customerName: p.customerName,
      serviceDate: p.serviceDate,
      services: p.services,
      amount: String(p.amount),
      paymentMethod: p.paymentMethod,
      notes: p.notes,
    });
    setShowForm(true);
    setFormErrors({});
  }

  function cancelForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setFormErrors({});
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validatePayment(form);
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }
    setSaving(true);
    try {
      const data = {
        customerName: form.customerName.trim(),
        serviceDate: form.serviceDate,
        services: form.services,
        amount: parseFloat(form.amount),
        paymentMethod: form.paymentMethod as PaymentMethod,
        notes: form.notes.trim(),
      };
      if (editingId) {
        await updatePayment(editingId, data);
        setPayments((prev) => prev.map((p) => p.id === editingId ? { ...p, ...data } : p));
      } else {
        const ref = await createPayment(data);
        setPayments((prev) => [{ id: ref.id, ...data }, ...prev]);
      }
      cancelForm();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this payment record?")) return;
    setDeletingId(id);
    try {
      await deletePayment(id);
      setPayments((prev) => prev.filter((p) => p.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return <div className="text-gray-500 text-sm py-8 text-center">Loading payments…</div>;
  }

  const monthTotal = getMonthTotal(payments);
  const allTimeTotal = getAllTimeTotal(payments);

  return (
    <div>
      {/* Summary bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">This Month</p>
          <p className="text-3xl font-bold text-[#2D6A4F]">
            ${monthTotal.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">All Time</p>
          <p className="text-3xl font-bold text-gray-900">
            ${allTimeTotal.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Payment History</h2>
        {!showForm && (
          <Button variant="primary" size="sm" onClick={() => setShowForm(true)}>
            + Add Payment
          </Button>
        )}
      </div>

      {/* Add / Edit form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">
            {editingId ? "Edit Payment" : "New Payment"}
          </h3>
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="customerName"
                label="Customer Name"
                required
                value={form.customerName}
                onChange={(e) => setField("customerName", e.target.value)}
                error={formErrors.customerName}
              />
              <Input
                id="serviceDate"
                label="Service Date"
                type="date"
                required
                value={form.serviceDate}
                onChange={(e) => setField("serviceDate", e.target.value)}
                error={formErrors.serviceDate}
              />
            </div>
            <ServiceCheckboxes
              selected={form.services}
              onChange={(s) => setField("services", s)}
              error={formErrors.services}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="amount"
                label="Amount Collected ($)"
                type="number"
                min="0"
                step="0.01"
                required
                value={form.amount}
                onChange={(e) => setField("amount", e.target.value)}
                error={formErrors.amount}
              />
              <Select
                id="paymentMethod"
                label="Payment Method"
                required
                value={form.paymentMethod}
                onChange={(e) => setField("paymentMethod", e.target.value)}
                error={formErrors.paymentMethod}
              >
                <option value="">Select method…</option>
                {PAYMENT_METHODS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </Select>
            </div>
            <Textarea
              id="notes"
              label="Notes"
              value={form.notes}
              onChange={(e) => setField("notes", e.target.value)}
              rows={2}
            />
            <div className="flex gap-3 pt-2">
              <Button type="submit" size="sm" loading={saving}>
                {editingId ? "Save Changes" : "Add Payment"}
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={cancelForm}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      {payments.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">💰</div>
          <p>No payments recorded yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Customer", "Service Date", "Services", "Amount", "Method", "Notes", ""].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{p.customerName}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{p.serviceDate}</td>
                    <td className="px-4 py-3 text-gray-600">{p.services.join(", ")}</td>
                    <td className="px-4 py-3 font-semibold text-[#2D6A4F] whitespace-nowrap">
                      ${p.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{p.paymentMethod}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{p.notes || "—"}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(p)}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p.id!)}
                          disabled={deletingId === p.id}
                          className="text-xs text-red-500 hover:text-red-700 font-medium disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
