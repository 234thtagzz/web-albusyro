import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminMobileHeader } from "@/components/admin/mobile-header";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/admin");

  async function signOut() {
    "use server";
    const s = await createClient();
    await s.auth.signOut();
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#FDF9F3] flex flex-col lg:flex-row">
      <div className="hidden lg:block shrink-0">
        <AdminSidebar onSignOut={signOut} />
      </div>
      <div className="flex-1 min-w-0 flex flex-col">
        {/* mobile topbar with drawer navigation */}
        <AdminMobileHeader onSignOut={signOut} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
