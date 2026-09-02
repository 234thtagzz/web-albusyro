import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Newspaper, Trophy, Images, GraduationCap, Users } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const [berita, prestasi, galeri, ppdb, pendaftar] = await Promise.all([
    supabase.from("berita").select("id", { count: "exact", head: true }),
    supabase.from("prestasi").select("id", { count: "exact", head: true }),
    supabase.from("galeri").select("id", { count: "exact", head: true }),
    supabase.from("ppdb_info").select("id", { count: "exact", head: true }),
    supabase.from("ppdb_registrations").select("id", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Berita", count: berita.count ?? 0, href: "/admin/berita", icon: Newspaper, color: "bg-primary-1" },
    { label: "Prestasi", count: prestasi.count ?? 0, href: "/admin/prestasi", icon: Trophy, color: "bg-secondary-1" },
    { label: "Galeri", count: galeri.count ?? 0, href: "/admin/galeri", icon: Images, color: "bg-primary-2" },
    { label: "PPDB Info", count: ppdb.count ?? 0, href: "/admin/ppdb", icon: GraduationCap, color: "bg-stone-700" },
    { label: "Pendaftar", count: pendaftar.count ?? 0, href: "/admin/pendaftar", icon: Users, color: "bg-emerald-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-stone-900">Dashboard</h1>
        <p className="text-sm text-stone-500">Kelola data Supabase yang tampil di page publik.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="rounded-2xl border-stone-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">
              <CardContent className="p-5">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-white ${s.color}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-2xl font-bold text-stone-900">{s.count}</p>
                <p className="text-sm font-medium text-stone-500">{s.label}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <Card className="rounded-2xl border-stone-200 bg-white">
        <CardContent className="p-6">
          <h3 className="font-semibold text-stone-900">Panduan cepat</h3>
          <ul className="mt-2 list-disc pl-5 text-sm text-stone-600 space-y-1">
            <li>Berita: Judul + slug + kategori + konten + gambar (upload ke bucket berita)</li>
            <li>Prestasi: Nama Prestasi + Kegiatan + Tahun + Tingkat + Peserta + gambar (bucket prestasi)</li>
            <li>Galeri: Judul + Kategori + gambar (bucket galeri) + deskripsi</li>
            <li>PPDB: hanya 1 yang <code>is_active=true</code> yang tampil di /ppdb — form publik otomatis masuk ke Pendaftar</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
