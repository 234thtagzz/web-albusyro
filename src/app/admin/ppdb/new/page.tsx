import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createPpdb } from "../actions";
import { redirect } from "next/navigation";

export default async function NewPpdbPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  async function action(formData: FormData) {
    "use server";
    const res = await createPpdb(formData);
    if (res?.error) redirect(`/admin/ppdb/new?error=${encodeURIComponent(res.error)}`);
    redirect("/admin/ppdb");
  }

  return (
    <div className="max-w-3xl space-y-6">
      <Button variant="ghost" render={<Link href="/admin/ppdb" />} nativeButton={false} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Kembali
      </Button>
      <h1 className="font-display text-2xl font-bold text-stone-900">Tambah PPDB Info</h1>
      {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{decodeURIComponent(error)}</div>}
      <Card className="rounded-2xl border-stone-200 bg-white">
        <CardContent className="p-6">
          <form action={action} className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="tahun_ajaran">Tahun Ajaran *</Label>
                <Input id="tahun_ajaran" name="tahun_ajaran" required placeholder="2026/2027" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="jadwal">Jadwal</Label>
                <Textarea id="jadwal" name="jadwal" rows={3} placeholder="Informasi PPDB akan diperbarui..." />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="persyaratan">Persyaratan</Label>
                <Textarea id="persyaratan" name="persyaratan" rows={3} placeholder="Fotokopi KK, akta, pas foto..." />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="biaya">Biaya</Label>
                <Textarea id="biaya" name="biaya" rows={3} placeholder="Informasi biaya akan diperbarui..." />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="faq">FAQ (JSON array)</Label>
                <Textarea id="faq" name="faq" rows={4} placeholder='[{"q":"Apa syarat?","a":"..."}]' defaultValue="[]" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="kontak">Kontak</Label>
                <Input id="kontak" name="kontak" placeholder="085 726216717 (Ust Mihwar)" />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="is_active" defaultChecked className="h-4 w-4 rounded border-stone-300 text-primary-1" />
                Aktifkan (nonaktifkan yang lain)
              </label>
            </div>
            <div className="flex gap-3">
              <Button type="submit" className="rounded-full bg-primary-1 text-white">Simpan</Button>
              <Button variant="outline" render={<Link href="/admin/ppdb" />} nativeButton={false}>Batal</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
