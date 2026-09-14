import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminPrestasiTable } from "@/components/admin/prestasi-table";

export default async function AdminPrestasiPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("prestasi").select("*").order("year", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-stone-900">Prestasi</h1>
          <p className="text-sm text-stone-500">{data?.length ?? 0} data • tampil di /prestasi</p>
        </div>
        <Button render={<Link href="/admin/prestasi/new" />} nativeButton={false} className="rounded-full bg-primary-1 text-white">
          <Plus className="h-4 w-4" /> Tambah
        </Button>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error.message}
        </div>
      )}

      <AdminPrestasiTable initialData={data ?? []} />
    </div>
  );
}
