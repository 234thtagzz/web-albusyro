import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { deletePpdb, toggleActivePpdb } from "./actions";

export default async function AdminPpdbPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("ppdb_info").select("*").order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-stone-900">PPDB Info</h1>
          <p className="text-sm text-stone-500">{data?.length ?? 0} data • hanya yang aktif tampil di /ppdb</p>
        </div>
        <Button render={<Link href="/admin/ppdb/new" />} nativeButton={false} className="rounded-full bg-primary-1 text-white">
          <Plus className="h-4 w-4" /> Tambah
        </Button>
      </div>

      <Card className="rounded-2xl border-stone-200 bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 text-left text-xs uppercase tracking-wider text-stone-500">
                <tr>
                  <th className="px-4 py-3">Tahun Ajaran</th>
                  <th className="px-4 py-3">Aktif</th>
                  <th className="px-4 py-3">Kontak</th>
                  <th className="px-4 py-3">Dibuat</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {data?.map((row) => (
                  <tr key={row.id} className="hover:bg-stone-50/50">
                    <td className="px-4 py-3 font-medium text-stone-900">{row.tahun_ajaran}</td>
                    <td className="px-4 py-3">
                      <form action={async () => { "use server"; await toggleActivePpdb(row.id, !row.is_active); }}>
                        <button type="submit">
                          <Badge className={row.is_active ? "bg-primary-1 text-white" : "bg-stone-200 text-stone-600"}>{row.is_active ? "Aktif" : "Nonaktif"}</Badge>
                        </button>
                      </form>
                    </td>
                    <td className="px-4 py-3 text-xs text-stone-500">{row.kontak ?? "-"}</td>
                    <td className="px-4 py-3 text-xs text-stone-500">{new Date(row.created_at).toLocaleDateString("id-ID")}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon-sm" render={<Link href={`/admin/ppdb/${row.id}/edit`} />} nativeButton={false}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <form action={async () => { "use server"; await deletePpdb(row.id); }}>
                          <Button variant="ghost" size="icon-sm" type="submit" className="text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
                {data?.length === 0 && <tr><td colSpan={5} className="px-4 py-12 text-center text-stone-400">Belum ada PPDB info</td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-stone-200 bg-amber-50">
        <CardContent className="p-4 text-sm text-stone-600">
          Tip: FAQ isi dengan JSON array, contoh: <code className="rounded bg-white px-1 py-0.5">{'[{"q":"Apa syarat?","a":"Fotokopi KK..."}]'}</code>. Jika tidak ada, isi <code>[]</code>.
        </CardContent>
      </Card>
    </div>
  );
}
