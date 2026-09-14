"use client";

import { useState, useTransition, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitPpdbRegistration } from "@/app/ppdb/actions";
import { CheckCircle, AlertCircle, Send, Upload, FileText, X, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PpdbRegistrationForm() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [kkFileInfo, setKkFileInfo] = useState<{ name: string; size: string } | null>(null);
  const [aktaFileInfo, setAktaFileInfo] = useState<{ name: string; size: string } | null>(null);

  const kkInputRef = useRef<HTMLInputElement>(null);
  const aktaInputRef = useRef<HTMLInputElement>(null);

  function formatSize(bytes: number) {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  function handleKkChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setKkFileInfo(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "Ukuran Foto KK melebihi 5 MB. Harap pilih foto yang lebih kecil." });
      e.target.value = "";
      setKkFileInfo(null);
      return;
    }
    setMessage(null);
    setKkFileInfo({ name: file.name, size: formatSize(file.size) });
  }

  function handleAktaChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setAktaFileInfo(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "Ukuran Foto Akta melebihi 5 MB. Harap pilih foto yang lebih kecil." });
      e.target.value = "";
      setAktaFileInfo(null);
      return;
    }
    setMessage(null);
    setAktaFileInfo({ name: file.name, size: formatSize(file.size) });
  }

  function clearKk() {
    if (kkInputRef.current) kkInputRef.current.value = "";
    setKkFileInfo(null);
  }

  function clearAkta() {
    if (aktaInputRef.current) aktaInputRef.current.value = "";
    setAktaFileInfo(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setMessage(null);

    startTransition(async () => {
      const res = await submitPpdbRegistration(formData);
      if (res?.error) {
        setMessage({ type: "error", text: res.error });
      } else if (res?.ok) {
        setMessage({
          type: "success",
          text: "Alhamdulillah, pendaftaran dan berkas berhasil dikirim! Panitia PPDB akan segera memverifikasi dan menghubungi via WhatsApp.",
        });
        form.reset();
        setKkFileInfo(null);
        setAktaFileInfo(null);
      }
    });
  }

  return (
    <Card className="rounded-[24px] border-stone-200 bg-white shadow-sm">
      <CardContent className="p-6 sm:p-8">
        <div className="mb-6">
          <Badge variant="outline" className="mb-3 rounded-full border-primary-1/15 bg-primary-1/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary-1">
            Formulir Online
          </Badge>
          <h3 className="font-display text-xl font-bold tracking-tight text-primary-1">Form Pendaftaran PPDB</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-stone-600">
            Isi biodata calon santri serta lampirkan foto Kartu Keluarga dan Akta Kelahiran. Data akan langsung tersimpan aman dan diverifikasi oleh panitia PPDB.
          </p>
          <div className="mt-3 h-1 w-12 rounded-full bg-primary-1" />
        </div>

        {message && (
          <div
            className={`mb-5 flex gap-2.5 rounded-xl border p-4 text-sm ${
              message.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {message.type === "success" ? <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600" /> : <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />}
            <span className="leading-relaxed">{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="nama" className="text-sm font-medium text-stone-700">
                Nama Lengkap Calon Santri <span className="text-red-500">*</span>
              </Label>
              <Input id="nama" name="nama" required placeholder="Contoh: Ahmad Fauzan Al-Faruq" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="nisn" className="text-sm font-medium text-stone-700">
                NISN (opsional)
              </Label>
              <Input id="nisn" name="nisn" placeholder="0012345678" inputMode="numeric" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="asal_sekolah" className="text-sm font-medium text-stone-700">
                Asal Sekolah / TK (opsional)
              </Label>
              <Input id="asal_sekolah" name="asal_sekolah" placeholder="TK Islam / PAUD ... " />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="nama_wali" className="text-sm font-medium text-stone-700">
                Nama Orang Tua / Wali <span className="text-red-500">*</span>
              </Label>
              <Input id="nama_wali" name="nama_wali" required placeholder="Bapak / Ibu Abdullah" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="wa_wali" className="text-sm font-medium text-stone-700">
                Nomor WhatsApp Wali <span className="text-red-500">*</span>
              </Label>
              <Input id="wa_wali" name="wa_wali" required placeholder="08xxxxxxxxxx" inputMode="tel" />
              <p className="text-[11px] text-stone-500">Format 08... atau 628... (pastikan nomor WA aktif)</p>
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="alamat" className="text-sm font-medium text-stone-700">
                Alamat Domisili Santri (opsional)
              </Label>
              <Textarea id="alamat" name="alamat" rows={2} placeholder="Kuncen, Waru, Kec. Baki, Kabupaten Sukoharjo..." />
            </div>

            {/* UPLOAD FOTO KK */}
            <div className="space-y-1.5 sm:col-span-1">
              <Label htmlFor="foto_kk" className="text-sm font-medium text-stone-700 flex items-center justify-between">
                <span>Foto Kartu Keluarga (KK) <span className="text-red-500">*</span></span>
                <span className="text-[11px] text-stone-400">Maks. 5 MB</span>
              </Label>

              <div className="relative">
                <input
                  ref={kkInputRef}
                  id="foto_kk"
                  name="foto_kk"
                  type="file"
                  accept="image/*,application/pdf"
                  required
                  onChange={handleKkChange}
                  className="hidden"
                />

                {!kkFileInfo ? (
                  <label
                    htmlFor="foto_kk"
                    className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50/70 p-5 text-center transition hover:border-primary-1/30 hover:bg-stone-50 cursor-pointer"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-1/10 text-primary-1">
                      <Upload className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-primary-1">Pilih Foto / Dokumen KK</p>
                      <p className="mt-0.5 text-[11px] text-stone-400">JPG, PNG, WEBP, atau PDF</p>
                    </div>
                  </label>
                ) : (
                  <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
                        <ImageIcon className="h-4 w-4" />
                      </div>
                      <div className="truncate">
                        <p className="truncate text-xs font-semibold text-stone-800">{kkFileInfo.name}</p>
                        <p className="text-[10px] text-emerald-700">{kkFileInfo.size} • Siap diunggah</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clearKk}
                      className="ml-2 rounded-md p-1 text-stone-400 hover:bg-emerald-100 hover:text-stone-700"
                      title="Hapus / ganti foto"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* UPLOAD FOTO AKTA */}
            <div className="space-y-1.5 sm:col-span-1">
              <Label htmlFor="foto_akta" className="text-sm font-medium text-stone-700 flex items-center justify-between">
                <span>Foto Akta Kelahiran <span className="text-red-500">*</span></span>
                <span className="text-[11px] text-stone-400">Maks. 5 MB</span>
              </Label>

              <div className="relative">
                <input
                  ref={aktaInputRef}
                  id="foto_akta"
                  name="foto_akta"
                  type="file"
                  accept="image/*,application/pdf"
                  required
                  onChange={handleAktaChange}
                  className="hidden"
                />

                {!aktaFileInfo ? (
                  <label
                    htmlFor="foto_akta"
                    className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50/70 p-5 text-center transition hover:border-primary-1/30 hover:bg-stone-50 cursor-pointer"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-1/10 text-primary-1">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-primary-1">Pilih Foto / Dokumen Akta</p>
                      <p className="mt-0.5 text-[11px] text-stone-400">JPG, PNG, WEBP, atau PDF</p>
                    </div>
                  </label>
                ) : (
                  <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
                        <ImageIcon className="h-4 w-4" />
                      </div>
                      <div className="truncate">
                        <p className="truncate text-xs font-semibold text-stone-800">{aktaFileInfo.name}</p>
                        <p className="text-[10px] text-emerald-700">{aktaFileInfo.size} • Siap diunggah</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clearAkta}
                      className="ml-2 rounded-md p-1 text-stone-400 hover:bg-emerald-100 hover:text-stone-700"
                      title="Hapus / ganti foto"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:items-center">
            <Button
              type="submit"
              disabled={isPending}
              className="h-11 gap-2 rounded-full bg-primary-1 px-8 text-[13px] font-bold text-white shadow-md hover:bg-primary-2"
            >
              <Send className="h-4 w-4" />
              {isPending ? "Mengunggah Berkas & Mengirim..." : "Kirim Pendaftaran & Berkas"}
            </Button>
            <p className="text-xs text-stone-500">
              Berkas foto KK dan Akta tersimpan aman di sistem pendaftaran resmi STTD Al-Busyro.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
