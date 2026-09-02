import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createGaleri } from "../actions";
import { redirect } from "next/navigation";
import { ImageField } from "@/components/admin/image-field";

export default async function NewGaleriPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  async function action(formData: FormData) {
    "use server";
    const res = await createGaleri(formData);
    if (res?.error) redirect(`/admin/galeri/new?error=${encodeURIComponent(res.error)}`);
    redirect("/admin/galeri");
  }

  return (
    <div className="max-w-3xl space-y-6">
      <Button variant="ghost" render={<Link href="/admin/galeri" />} nativeButton={false} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Kembali
      </Button>
      <h1 className="font-display text-2xl font-bold text-stone-900">Tambah Galeri</h1>
      {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{decodeURIComponent(error)}</div>}
      <Card className="rounded-2xl border-stone-200 bg-white">
        <CardContent className="p-6">
          <form action={action} className="space-y-4" encType="multipart/form-data">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="title">Judul *</Label>
                <Input id="title" name="title" required placeholder="Halaqah Tahfizh Pagi" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="category">Kategori</Label>
                <Select id="category" name="category" defaultValue="Kegiatan">
                  <option value="Pembelajaran">Pembelajaran</option>
                  <option value="Tahfiz">Tahfiz</option>
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="Prestasi">Prestasi</option>
                  <option value="Lingkungan">Lingkungan</option>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="alt">Alt text</Label>
                <Input id="alt" name="alt" placeholder="Santri mengikuti halaqah" />
              </div>
              <div className="sm:col-span-2">
                <ImageField labelUrl="Gambar Galeri *" labelFile="Upload gambar galeri" required />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea id="description" name="description" rows={3} placeholder="Setoran hafalan santri..." />
              </div>
            </div>
            <div className="flex gap-3">
              <Button type="submit" className="rounded-full bg-primary-1 text-white">Simpan</Button>
              <Button variant="outline" render={<Link href="/admin/galeri" />} nativeButton={false}>Batal</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
