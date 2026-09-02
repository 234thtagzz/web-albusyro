import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { deleteBerita } from "./actions";
import { Badge } from "@/components/ui/badge";

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

      {error && <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error.message}</div>}

      <Card className="rounded-2xl border-stone-200 bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 text-left text-xs uppercase tracking-wider text-stone-500">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Published</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {data?.map((row) => (
                  <tr key={row.id} className="hover:bg-stone-50/50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-stone-900 line-clamp-1">{row.title}</p>
                      <p className="text-xs text-stone-400 line-clamp-1">{row.excerpt}</p>
                    </td>
                    <td className="px-4 py-3"><Badge variant="outline" className="rounded-full text-xs">{row.category}</Badge></td>
                    <td className="px-4 py-3 font-mono text-xs text-stone-500">{row.slug}</td>
                    <td className="px-4 py-3 text-xs text-stone-500">{new Date(row.published_at).toLocaleDateString("id-ID")}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon-sm" render={<Link href={`/admin/berita/${row.id}/edit`} />} nativeButton={false} aria-label="Edit">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <form action={async () => { "use server"; await deleteBerita(row.id); }}>
                          <Button variant="ghost" size="icon-sm" type="submit" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
                {data?.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-12 text-center text-stone-400">Belum ada berita</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
