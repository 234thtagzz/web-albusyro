import { createClient } from "@/lib/supabase/server";
import { AdminPendaftarTable } from "@/components/admin/pendaftar-table";

export default async function PendaftarPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("ppdb_registrations").select("*").order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-stone-900">Pendaftar PPDB</h1>
        <p className="text-sm text-stone-500">{data?.length ?? 0} pendaftar • dari form publik (jika ada)</p>
      </div>

      <AdminPendaftarTable initialData={data ?? []} />
    </div>
  );
}
