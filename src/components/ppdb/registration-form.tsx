"use client";

import { useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitPpdbRegistration } from "@/app/ppdb/actions";
import { CheckCircle, AlertCircle, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PpdbRegistrationForm() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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
        setMessage({ type: "success", text: "Pendaftaran berhasil dikirim! Admin akan menghubungi via WhatsApp." });
        form.reset();
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
            Isi data calon santri dengan lengkap. Data akan langsung masuk ke dashboard admin dan dapat dilihat di <span className="font-medium text-primary-1">/admin/pendaftar</span>.
          </p>
          <div className="mt-3 h-1 w-12 rounded-full bg-primary-1" />
        </div>

        {message && (
          <div
            className={`mb-4 flex gap-2 rounded-xl border px-4 py-3 text-sm ${
              message.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {message.type === "success" ? <CheckCircle className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="nama">Nama Lengkap Calon Santri *</Label>
              <Input id="nama" name="nama" required placeholder="Ahmad Fauzan" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="nisn">NISN (opsional)</Label>
              <Input id="nisn" name="nisn" placeholder="0012345678" inputMode="numeric" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="asal_sekolah">Asal Sekolah / TK (opsional)</Label>
              <Input id="asal_sekolah" name="asal_sekolah" placeholder="TK Al-Busyro / SD ... " />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="nama_wali">Nama Wali / Orang Tua *</Label>
              <Input id="nama_wali" name="nama_wali" required placeholder="Bapak Abdullah" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="wa_wali">No WA Wali *</Label>
              <Input id="wa_wali" name="wa_wali" required placeholder="08xxxxxxxxxx" inputMode="tel" />
              <p className="text-xs text-stone-500">Format 08... atau 628... (WA aktif untuk konfirmasi)</p>
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="alamat">Alamat Lengkap (opsional)</Label>
              <Textarea id="alamat" name="alamat" rows={2} placeholder="Gentan, Kec. Baki, Kabupaten Sukoharjo..." />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <Button type="submit" disabled={isPending} className="h-11 gap-2 rounded-full bg-primary-1 px-6 text-[13px] font-bold text-white shadow-md hover:bg-primary-2">
              <Send className="h-4 w-4" />
              {isPending ? "Mengirim..." : "Kirim Pendaftaran"}
            </Button>
            <p className="text-xs text-stone-500">Admin melihat data di menu Pendaftar • status awal pending</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
