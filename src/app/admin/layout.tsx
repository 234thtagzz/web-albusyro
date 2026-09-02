import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/sidebar";

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
    <div className="min-h-screen bg-[#FDF9F3] flex">
      <div className="hidden lg:block shrink-0">
        <AdminSidebar onSignOut={signOut} />
      </div>
      <div className="flex-1 min-w-0">
        {/* mobile topbar */}
        <div className="lg:hidden flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3">
          <p className="font-display font-bold text-primary-1">Admin Al-Busyro</p>
          <form action={signOut}>
            <button className="text-sm text-stone-600">Keluar</button>
          </form>
        </div>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
