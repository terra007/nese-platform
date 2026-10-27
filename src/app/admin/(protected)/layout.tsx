import { requireAdmin } from "@/lib/admin/auth";
import AdminShell from "../AdminShell";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Requires the admin account AND a verified second factor (AAL2).
  const { user } = await requireAdmin();
  return <AdminShell email={user.email ?? ""}>{children}</AdminShell>;
}
