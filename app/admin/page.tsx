"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SchedulingTab from "@/components/admin/SchedulingTab";
import QuotesTab from "@/components/admin/QuotesTab";
import PaymentsTab from "@/components/admin/PaymentsTab";

type TabId = "scheduling" | "quotes" | "payments";

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: "scheduling", label: "Scheduling", icon: "📅" },
  { id: "quotes", label: "Quote Requests", icon: "📋" },
  { id: "payments", label: "Payment History", icon: "💰" },
];

function AdminConsole() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawTab = searchParams.get("tab") ?? "scheduling";
  const activeTab: TabId = (["scheduling", "quotes", "payments"].includes(rawTab)
    ? rawTab
    : "scheduling") as TabId;

  function setTab(tab: TabId) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`/admin?${params.toString()}`);
  }

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-gray-200 mb-6">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-colors
              ${activeTab === t.id
                ? "border-[#2D6A4F] text-[#2D6A4F] bg-[#f0faf5]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "scheduling" && <SchedulingTab />}
      {activeTab === "quotes" && <QuotesTab />}
      {activeTab === "payments" && <PaymentsTab />}
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="text-gray-500 text-sm py-8 text-center">Loading…</div>}>
      <AdminConsole />
    </Suspense>
  );
}
