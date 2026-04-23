import { ReactNode } from "react";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

// Force dynamic rendering for all admin routes so Firebase client SDK
// is never invoked at build/prerender time (requires live credentials).
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminAuthGuard>{children}</AdminAuthGuard>;
}
