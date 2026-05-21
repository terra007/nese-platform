import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminShell from "../AdminShell";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminId = process.env.ADMIN_USER_ID;
  if (!user || !adminId || user.id !== adminId) {
    redirect("/admin/login");
  }

  return <AdminShell email={user.email ?? ""}>{children}</AdminShell>;
}
