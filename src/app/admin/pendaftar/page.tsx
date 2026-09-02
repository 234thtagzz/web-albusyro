import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { deletePendaftar, updateStatus } from "./actions";
import { Select } from "@/components/ui/select";

export default async function PendaftarPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("ppdb_registrations").select("*").order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-stone-900">Pendaftar PPDB</h1>
        <p className="text-sm text-stone-500">{data?.length ?? 0} pendaftar • dari form publik (jika ada)</p>
      </div>

      <Card className="rounded-2xl border-stone-200 bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 text-left text-xs uppercase tracking-wider text-stone-500">
                <tr>
                  <th className="px-4 py-3">Nama</th>
                  <th className="px-4 py-3">Wali / WA</th>
                  <th className="px-4 py-3">Asal</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {data?.map((row) => (
                  <tr key={row.id} className="hover:bg-stone-50/50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-stone-900">{row.nama}</p>
                      <p className="text-xs text-stone-400">{row.nisn ?? "-"}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-stone-700">{row.nama_wali}</p>
                      <p className="text-xs text-stone-400">{row.wa_wali}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-stone-500">{row.asal_sekolah ?? "-"}<br />{row.alamat ?? ""}</td>
                    <td className="px-4 py-3">
                      <form action={async (formData: FormData) => { "use server"; const s = String(formData.get("status") ?? "pending"); await updateStatus(row.id, s); }}>
                        <select name="status" defaultValue={row.status} className="rounded-full border border-stone-200 bg-white px-2 py-1 text-xs" onChange={(e) => (e.target as HTMLSelectElement).form?.requestSubmit()}>
                          <option value="pending">pending</option>
                          <option value="wa_verified">wa_verified</option>
                          <option value="diterima">diterima</option>
                          <option value="ditolak">ditolak</option>
                        </select>
                      </form>
                    </td>
                    <td className="px-4 py-3 text-xs text-stone-500">{new Date(row.created_at).toLocaleDateString("id-ID")}</td>
                    <td className="px-4 py-3 text-right">
                      <form action={async () => { "use server"; await deletePendaftar(row.id); }}>
                        <Button variant="ghost" size="icon-sm" type="submit" className="text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </td>
                  </tr>
                ))}
                {data?.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center text-stone-400">Belum ada pendaftar</td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
