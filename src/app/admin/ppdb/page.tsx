import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/admin/submit-button";
import { savePpdbAction } from "./actions";
import Link from "next/link";
import {
  GraduationCap,
  Phone,
  User,
  Wallet,
  Calendar,
  FileText,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";

function parseKontak(kontak: string | null) {
  if (!kontak) return { noHp: "", namaAdmin: "" };
  const match = kontak.match(/^(.*?)\s*\((.*?)\)$/);
  if (match) {
    return {
      noHp: match[1].trim(),
      namaAdmin: match[2].trim(),
    };
  }
  return { noHp: kontak.trim(), namaAdmin: "" };
}

export default async function AdminPpdbPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  // Ambil 1 data master PPDB
  const { data } = await supabase
    .from("ppdb_info")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const parsed = parseKontak(data?.kontak ?? null);
  const namaAdmin = data?.nama_admin || parsed.namaAdmin;
  const noHp = data?.no_hp || parsed.noHp;

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-display text-2xl font-bold text-stone-900">
              Pengaturan PPDB
            </h1>
            <Badge
              className={
                data?.is_active
                  ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                  : "bg-stone-100 text-stone-600 border-stone-200"
              }
            >
              {data?.is_active ? "Pendaftaran Buka" : "Pendaftaran Tutup"}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-stone-500">
            Kelola data master informasi PPDB yang tampil di halaman publik website.
          </p>
        </div>

        <Button
          variant="outline"
          render={<Link href="/ppdb" target="_blank" />}
          nativeButton={false}
          className="gap-2 rounded-full border-stone-300 text-xs text-stone-700 hover:bg-stone-50"
        >
          Lihat Halaman Publik <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Success / Error Alerts */}
      {params.success && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 shadow-xs">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          <span>Pengaturan PPDB berhasil disimpan dan langsung diperbarui di halaman publik.</span>
        </div>
      )}

      {params.error && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-xs">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
          <span>{decodeURIComponent(params.error)}</span>
        </div>
      )}

      {/* Main Single Form */}
      <form action={savePpdbAction} className="space-y-6">
        {/* 1. INFORMASI UTAMA & KONTAK */}
        <Card className="rounded-2xl border-stone-200 bg-white shadow-xs">
          <CardContent className="p-6 space-y-4">
            <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary-1" />
                <h2 className="font-display font-semibold text-stone-900">
                  1. Informasi Utama & Kontak Panitia
                </h2>
              </div>
              {data?.updated_at && (
                <span className="text-[11px] text-stone-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Terakhir diupdate: {new Date(data.updated_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="tahun_ajaran" className="text-sm font-medium text-stone-700">
                  Tahun Ajaran Baru <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="tahun_ajaran"
                  name="tahun_ajaran"
                  required
                  placeholder="Contoh: 2026/2027"
                  defaultValue={data?.tahun_ajaran ?? "2026/2027"}
                  className="bg-white"
                />
                <p className="text-xs text-stone-500">
                  Tahun ajaran ini akan muncul pada judul utama dan badge informasi PPDB.
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="nama_admin" className="text-sm font-medium text-stone-700 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-stone-400" />
                  Nama Admin / Panitia PPDB
                </Label>
                <Input
                  id="nama_admin"
                  name="nama_admin"
                  placeholder="Contoh: Ust. Mihwar"
                  defaultValue={namaAdmin || "Ust. Mihwar"}
                  className="bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="no_hp" className="text-sm font-medium text-stone-700 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-stone-400" />
                  Nomor HP / WhatsApp Admin
                </Label>
                <Input
                  id="no_hp"
                  name="no_hp"
                  placeholder="Contoh: 085726216717"
                  defaultValue={noHp || "085 726216717"}
                  className="bg-white"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <label className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50/70 p-3.5 cursor-pointer hover:bg-stone-50 transition">
                  <input
                    type="checkbox"
                    name="is_active"
                    defaultChecked={data ? data.is_active : true}
                    className="h-4 w-4 rounded border-stone-300 text-primary-1 focus:ring-primary-1"
                  />
                  <div>
                    <p className="text-sm font-semibold text-stone-900">
                      Buka Pendaftaran PPDB (Status Aktif)
                    </p>
                    <p className="text-xs text-stone-500">
                      Jika dicentang, informasi dan formulir pendaftaran akan aktif di halaman /ppdb.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. BIAYA PENDAFTARAN */}
        <Card className="rounded-2xl border-stone-200 bg-white shadow-xs">
          <CardContent className="p-6 space-y-4">
            <div className="border-b border-stone-100 pb-3 flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary-1" />
              <h2 className="font-display font-semibold text-stone-900">
                2. Biaya Pendaftaran & Rincian
              </h2>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="biaya" className="text-sm font-medium text-stone-700">
                Informasi & Rincian Biaya
              </Label>
              <Textarea
                id="biaya"
                name="biaya"
                rows={4}
                placeholder="Rincian biaya pendaftaran, biaya formulir, seragam, SPP bulanan, atau infaq gedung..."
                defaultValue={data?.biaya ?? "Informasi biaya akan diperbarui oleh pihak STTD Al-Busyro."}
                className="bg-white"
              />
              <p className="text-xs text-stone-500">
                Akan ditampilkan pada kartu informasi &quot;Biaya&quot; di halaman publik PPDB.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 3. JADWAL & PERSYARATAN */}
        <Card className="rounded-2xl border-stone-200 bg-white shadow-xs">
          <CardContent className="p-6 space-y-4">
            <div className="border-b border-stone-100 pb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary-1" />
              <h2 className="font-display font-semibold text-stone-900">
                3. Jadwal & Persyaratan Berkas
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="jadwal" className="text-sm font-medium text-stone-700 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-stone-400" />
                  Jadwal Pendaftaran
                </Label>
                <Textarea
                  id="jadwal"
                  name="jadwal"
                  rows={4}
                  placeholder="Contoh: Gelombang 1: 1 Januari - 28 Februari 2026. Tes seleksi dilaksanakan setiap hari Sabtu..."
                  defaultValue={data?.jadwal ?? "Informasi PPDB akan diperbarui oleh pihak STTD Al-Busyro."}
                  className="bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="persyaratan" className="text-sm font-medium text-stone-700 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-stone-400" />
                  Persyaratan Berkas
                </Label>
                <Textarea
                  id="persyaratan"
                  name="persyaratan"
                  rows={4}
                  placeholder="Contoh: Fotokopi KK, Akta Kelahiran, Pas foto 3x4 (3 lembar), mengisi formulir pendaftaran..."
                  defaultValue={data?.persyaratan ?? "Informasi persyaratan akan diperbarui oleh pihak STTD Al-Busyro."}
                  className="bg-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SUBMIT BUTTON */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-stone-400">
            Data tersimpan sebagai 1 konfigurasi master PPDB terpadu.
          </p>
          <SubmitButton
            className="rounded-full bg-primary-1 px-8 py-2.5 text-white shadow-sm hover:bg-primary-2"
            loadingText="Menyimpan Pengaturan..."
          >
            Simpan Pengaturan PPDB
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
