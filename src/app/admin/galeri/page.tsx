import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminGaleriTable } from "@/components/admin/galeri-table";

export default async function AdminGaleriPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("galeri").select("*").order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-stone-900">Galeri</h1>
          <p className="text-sm text-stone-500">{data?.length ?? 0} foto • tampil di /galeri & /kegiatan</p>
        </div>
        <Button render={<Link href="/admin/galeri/new" />} nativeButton={false} className="rounded-full bg-primary-1 text-white">
          <Plus className="h-4 w-4" /> Tambah
        </Button>
      </div>

      <AdminGaleriTable initialData={data ?? []} />
    </div>
  );
}
