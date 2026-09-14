import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminBeritaTable } from "@/components/admin/berita-table";

export default async function AdminBeritaPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("berita").select("*").order("published_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-stone-900">Berita</h1>
          <p className="text-sm text-stone-500">{data?.length ?? 0} artikel • tampil di /berita</p>
        </div>
        <Button render={<Link href="/admin/berita/new" />} nativeButton={false} className="rounded-full bg-primary-1 text-white">
          <Plus className="h-4 w-4" /> Tambah
        </Button>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error.message}
        </div>
      )}

      <AdminBeritaTable initialData={data ?? []} />
    </div>
  );
}
