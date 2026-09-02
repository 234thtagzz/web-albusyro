import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { deletePrestasi } from "./actions";

export default async function AdminPrestasiPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("prestasi").select("*").order("year", { ascending: false });

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

      <Card className="rounded-2xl border-stone-200 bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 text-left text-xs uppercase tracking-wider text-stone-500">
                <tr>
                  <th className="px-4 py-3">Prestasi</th>
                  <th className="px-4 py-3">Kategori</th>
                  <th className="px-4 py-3">Tahun</th>
                  <th className="px-4 py-3">Tingkat</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {data?.map((row) => (
                  <tr key={row.id} className="hover:bg-stone-50/50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-stone-900 line-clamp-1">{row.title}</p>
                      <p className="text-xs text-stone-400 line-clamp-1">{row.competition} • {row.participant}</p>
                    </td>
                    <td className="px-4 py-3"><Badge variant="outline" className="rounded-full text-xs">{row.category}</Badge></td>
                    <td className="px-4 py-3 text-xs">{row.year}</td>
                    <td className="px-4 py-3 text-xs">{row.level}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon-sm" render={<Link href={`/admin/prestasi/${row.id}/edit`} />} nativeButton={false}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <form action={async () => { "use server"; await deletePrestasi(row.id); }}>
                          <Button variant="ghost" size="icon-sm" type="submit" className="text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
                {data?.length === 0 && <tr><td colSpan={5} className="px-4 py-12 text-center text-stone-400">Belum ada prestasi</td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
