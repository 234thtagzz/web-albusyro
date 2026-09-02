import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { updateGaleri } from "../../actions";

export default async function EditGaleriPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("galeri").select("*").eq("id", id).single();
  if (!data) notFound();

  async function action(formData: FormData) {
    "use server";
    const res = await updateGaleri(id, formData);
    if (res?.error) redirect(`/admin/galeri/${id}/edit?error=${encodeURIComponent(res.error)}`);
    redirect("/admin/galeri");
  }

  return (
    <div className="max-w-3xl space-y-6">
      <Button variant="ghost" render={<Link href="/admin/galeri" />} nativeButton={false} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Kembali
      </Button>
      <h1 className="font-display text-2xl font-bold text-stone-900">Edit Galeri</h1>
      <Card className="rounded-2xl border-stone-200 bg-white">
        <CardContent className="p-6">
          <form action={action} className="space-y-4" encType="multipart/form-data">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="title">Judul *</Label>
                <Input id="title" name="title" required defaultValue={data.title} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="category">Kategori</Label>
                <Select id="category" name="category" defaultValue={data.category}>
                  <option value="Pembelajaran">Pembelajaran</option>
                  <option value="Tahfiz">Tahfiz</option>
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="Prestasi">Prestasi</option>
                  <option value="Lingkungan">Lingkungan</option>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="image_url">Image URL</Label>
                <Input id="image_url" name="image_url" defaultValue={data.image_url ?? ""} />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="file">Ganti file (opsional)</Label>
                <Input id="file" name="file" type="file" accept="image/*" />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="alt">Alt text</Label>
                <Input id="alt" name="alt" defaultValue={data.alt ?? ""} />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea id="description" name="description" rows={3} defaultValue={data.description ?? ""} />
              </div>
            </div>
            <div className="flex gap-3">
              <Button type="submit" className="rounded-full bg-primary-1 text-white">Update</Button>
              <Button variant="outline" render={<Link href="/admin/galeri" />} nativeButton={false}>Batal</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
