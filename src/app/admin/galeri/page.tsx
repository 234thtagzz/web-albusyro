import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { deleteGaleri } from "./actions";

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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((row) => (
          <Card key={row.id} className="overflow-hidden rounded-2xl border-stone-200 bg-white">
            <div className="relative aspect-[4/3] bg-stone-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={row.image_url} alt={row.alt ?? row.title} className="h-full w-full object-cover" />
              <Badge variant="outline" className="absolute left-2 top-2 rounded-full bg-white/90 text-xs">{row.category}</Badge>
            </div>
            <CardContent className="p-4">
              <p className="font-medium text-stone-900 line-clamp-1">{row.title}</p>
              <p className="text-xs text-stone-400 line-clamp-2">{row.description}</p>
              <div className="mt-3 flex justify-end gap-1">
                <Button variant="ghost" size="icon-sm" render={<Link href={`/admin/galeri/${row.id}/edit`} />} nativeButton={false}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <form action={async () => { "use server"; await deleteGaleri(row.id); }}>
                  <Button variant="ghost" size="icon-sm" type="submit" className="text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
        {data?.length === 0 && (
          <Card className="col-span-full rounded-2xl border-dashed bg-white p-12 text-center text-stone-400">Belum ada galeri</Card>
        )}
      </div>
    </div>
  );
}
