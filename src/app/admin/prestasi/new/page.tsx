import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createPrestasi } from "../actions";
import { redirect } from "next/navigation";

export default function NewPrestasiPage() {
  async function action(formData: FormData) {
    "use server";
    const res = await createPrestasi(formData);
    if (res?.error) redirect(`/admin/prestasi/new?error=${encodeURIComponent(res.error)}`);
    redirect("/admin/prestasi");
  }

  return (
    <div className="max-w-3xl space-y-6">
      <Button variant="ghost" render={<Link href="/admin/prestasi" />} nativeButton={false} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Kembali
      </Button>
      <h1 className="font-display text-2xl font-bold text-stone-900">Tambah Prestasi</h1>
      <Card className="rounded-2xl border-stone-200 bg-white">
        <CardContent className="p-6">
          <form action={action} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="title">Nama Prestasi *</Label>
                <Input id="title" name="title" required placeholder="Juara 1 Tartil — MTQ Provinsi" />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="competition">Nama Kegiatan *</Label>
                <Input id="competition" name="competition" required placeholder="Musabaqah Tilawatil Qur'an Tingkat Provinsi" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="category">Kategori</Label>
                <Select id="category" name="category" defaultValue="Tahfizh">
                  <option value="Tilawah">Tilawah</option>
                  <option value="Tahfizh">Tahfizh</option>
                  <option value="Seni">Seni</option>
                  <option value="Adzan">Adzan</option>
                  <option value="Akademik">Akademik</option>
                  <option value="Lainnya">Lainnya</option>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="year">Tahun *</Label>
                <Input id="year" name="year" required placeholder="2026" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="level">Tingkat</Label>
                <Select id="level" name="level" defaultValue="Provinsi">
                  <option value="Sekolah">Sekolah</option>
                  <option value="Kota/Kabupaten">Kota/Kabupaten</option>
                  <option value="Provinsi">Provinsi</option>
                  <option value="Nasional">Nasional</option>
                  <option value="Internasional">Internasional</option>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="participant">Peserta</Label>
                <Input id="participant" name="participant" placeholder="Ahmad Fauzan (Kelas VI)" />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="image_url">Image URL (opsional)</Label>
                <Input id="image_url" name="image_url" placeholder="https://... atau /images/..." />
              </div>
            </div>
            <div className="flex gap-3">
              <Button type="submit" className="rounded-full bg-primary-1 text-white">Simpan</Button>
              <Button variant="outline" render={<Link href="/admin/prestasi" />} nativeButton={false}>Batal</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
