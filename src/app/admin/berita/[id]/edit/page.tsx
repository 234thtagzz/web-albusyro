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
import { updateBerita } from "../../actions";

export default async function EditBeritaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase.from("berita").select("*").eq("id", id).single();
  if (error || !data) notFound();

  async function action(formData: FormData) {
    "use server";
    const res = await updateBerita(id, formData);
    if (res?.error) redirect(`/admin/berita/${id}/edit?error=${encodeURIComponent(res.error)}`);
    redirect("/admin/berita");
  }

  return (
    <div className="max-w-3xl space-y-6">
      <Button variant="ghost" render={<Link href="/admin/berita" />} nativeButton={false} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Kembali
      </Button>
      <h1 className="font-display text-2xl font-bold text-stone-900">Edit Berita</h1>
      <Card className="rounded-2xl border-stone-200 bg-white">
        <CardContent className="p-6">
          <form action={action} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="title">Judul *</Label>
                <Input id="title" name="title" required defaultValue={data.title} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" name="slug" defaultValue={data.slug} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="category">Kategori</Label>
                <Select id="category" name="category" defaultValue={data.category}>
                  <option value="Berita">Berita</option>
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="Prestasi">Prestasi</option>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="author">Author</Label>
                <Input id="author" name="author" defaultValue={data.author ?? ""} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="image_url">Image URL</Label>
                <Input id="image_url" name="image_url" defaultValue={data.image_url ?? ""} />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="image_alt">Image Alt</Label>
                <Input id="image_alt" name="image_alt" defaultValue={data.image_alt ?? ""} />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" name="excerpt" rows={2} defaultValue={data.excerpt ?? ""} />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="content">Content *</Label>
                <Textarea id="content" name="content" required rows={8} defaultValue={data.content} />
              </div>
            </div>
            <div className="flex gap-3">
              <Button type="submit" className="rounded-full bg-primary-1 text-white">Update</Button>
              <Button variant="outline" render={<Link href="/admin/berita" />} nativeButton={false}>Batal</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
