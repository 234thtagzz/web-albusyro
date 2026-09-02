import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createBerita } from "../actions";
import { redirect } from "next/navigation";
import { ImageField } from "@/components/admin/image-field";

export default async function NewBeritaPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  async function action(formData: FormData) {
    "use server";
    const res = await createBerita(formData);
    if (res?.error) {
      redirect(`/admin/berita/new?error=${encodeURIComponent(res.error)}`);
    }
    redirect("/admin/berita");
  }

  return (
    <div className="max-w-3xl space-y-6">
      <Button variant="ghost" render={<Link href="/admin/berita" />} nativeButton={false} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Kembali
      </Button>
      <h1 className="font-display text-2xl font-bold text-stone-900">Tambah Berita</h1>
      {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{decodeURIComponent(error)}</div>}
      <Card className="rounded-2xl border-stone-200 bg-white">
        <CardContent className="p-6">
          <form action={action} className="space-y-4" encType="multipart/form-data">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="title">Judul *</Label>
                <Input id="title" name="title" required placeholder="Pembukaan PPDB 2026/2027" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="slug">Slug (opsional, auto dari judul)</Label>
                <Input id="slug" name="slug" placeholder="pembukaan-ppdb-2026-2027" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="category">Kategori</Label>
                <Select id="category" name="category" defaultValue="Berita">
                  <option value="Berita">Berita</option>
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="Prestasi">Prestasi</option>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="author">Author</Label>
                <Input id="author" name="author" placeholder="Panitia PPDB" />
              </div>
              <div className="sm:col-span-2">
                <ImageField labelUrl="Gambar Berita" labelFile="Upload gambar berita" />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="image_alt">Image Alt (deskripsi gambar untuk aksesibilitas)</Label>
                <Input id="image_alt" name="image_alt" placeholder="Suasana gedung STTD Al-Busyro" />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" name="excerpt" placeholder="Ringkasan singkat..." rows={2} />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="content">Content *</Label>
                <Textarea id="content" name="content" required placeholder="Isi lengkap berita..." rows={8} />
              </div>
            </div>
            <div className="flex gap-3">
              <Button type="submit" className="rounded-full bg-primary-1 text-white">Simpan</Button>
              <Button variant="outline" render={<Link href="/admin/berita" />} nativeButton={false}>Batal</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
