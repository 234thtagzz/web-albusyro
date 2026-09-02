import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { updatePrestasi } from "../../actions";
import { ImageField } from "@/components/admin/image-field";

export default async function EditPrestasiPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error: errParam } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.from("prestasi").select("*").eq("id", id).single();
  if (!data) notFound();

  async function action(formData: FormData) {
    "use server";
    const res = await updatePrestasi(id, formData);
    if (res?.error) redirect(`/admin/prestasi/${id}/edit?error=${encodeURIComponent(res.error)}`);
    redirect("/admin/prestasi");
  }

  return (
    <div className="max-w-3xl space-y-6">
      <Button variant="ghost" render={<Link href="/admin/prestasi" />} nativeButton={false} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Kembali
      </Button>
      <h1 className="font-display text-2xl font-bold text-stone-900">Edit Prestasi</h1>
      {errParam && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{decodeURIComponent(errParam)}</div>}
      <Card className="rounded-2xl border-stone-200 bg-white">
        <CardContent className="p-6">
          <form action={action} className="space-y-4" encType="multipart/form-data">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="title">Nama Prestasi *</Label>
                <Input id="title" name="title" required defaultValue={data.title} />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="competition">Nama Kegiatan *</Label>
                <Input id="competition" name="competition" required defaultValue={data.competition} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="category">Kategori</Label>
                <Select id="category" name="category" defaultValue={data.category}>
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
                <Input id="year" name="year" required defaultValue={data.year} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="level">Tingkat</Label>
                <Select id="level" name="level" defaultValue={data.level}>
                  <option value="Sekolah">Sekolah</option>
                  <option value="Kota/Kabupaten">Kota/Kabupaten</option>
                  <option value="Provinsi">Provinsi</option>
                  <option value="Nasional">Nasional</option>
                  <option value="Internasional">Internasional</option>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="participant">Peserta</Label>
                <Input id="participant" name="participant" defaultValue={data.participant ?? ""} />
              </div>
              <div className="sm:col-span-2">
                <ImageField imageUrl={data.image_url} labelUrl="Gambar Prestasi" labelFile="Ganti gambar (opsional)" />
              </div>
            </div>
            <div className="flex gap-3">
              <Button type="submit" className="rounded-full bg-primary-1 text-white">Update</Button>
              <Button variant="outline" render={<Link href="/admin/prestasi" />} nativeButton={false}>Batal</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
