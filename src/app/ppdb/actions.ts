"use server";

import { revalidatePath } from "next/cache";
import { createClient, createServiceClient } from "@/lib/supabase/server";

function isValidWA(wa: string) {
  return /^08[0-9]{8,12}$/.test(wa) || /^628[0-9]{8,12}$/.test(wa);
}

export async function submitPpdbRegistration(formData: FormData) {
  const nama = String(formData.get("nama") ?? "").trim();
  const nisn = String(formData.get("nisn") ?? "").trim() || null;
  const asal_sekolah = String(formData.get("asal_sekolah") ?? "").trim() || null;
  const nama_wali = String(formData.get("nama_wali") ?? "").trim();
  const wa_wali = String(formData.get("wa_wali") ?? "").trim();
  const alamat = String(formData.get("alamat") ?? "").trim() || null;

  const fileKk = formData.get("foto_kk") as File | null;
  const fileAkta = formData.get("foto_akta") as File | null;

  if (!nama) return { error: "Nama calon santri wajib diisi" };
  if (!nama_wali) return { error: "Nama wali wajib diisi" };
  if (!wa_wali) return { error: "No WA wali wajib diisi" };
  if (!isValidWA(wa_wali)) {
    return { error: "No WA tidak valid. Gunakan format 08xxxxxxxxxx atau 628xxxxxxxxxx (8-14 digit)" };
  }
  if (nisn && !/^[0-9]{8,12}$/.test(nisn)) {
    return { error: "NISN harus 8-12 digit angka" };
  }

  if (!fileKk || fileKk.size === 0) {
    return { error: "Foto Kartu Keluarga (KK) wajib diunggah" };
  }
  if (!fileAkta || fileAkta.size === 0) {
    return { error: "Foto Akta Kelahiran wajib diunggah" };
  }

  // Maksimal 5MB per file
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  if (fileKk.size > MAX_FILE_SIZE) {
    return { error: "Ukuran Foto KK terlalu besar (maksimal 5 MB)" };
  }
  if (fileAkta.size > MAX_FILE_SIZE) {
    return { error: "Ukuran Foto Akta terlalu besar (maksimal 5 MB)" };
  }

  let supabase: Awaited<ReturnType<typeof createClient>>;
  try {
    // Prioritaskan service role agar insert publik tidak terhalang RLS
    supabase = createServiceClient() as unknown as Awaited<ReturnType<typeof createClient>>;
  } catch {
    supabase = await createClient();
  }

  // Helper untuk upload ke bucket storage 'pendaftar'
  async function uploadFile(file: File, folder: string): Promise<string> {
    const rawExt = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const ext = rawExt.replace(/[^a-z0-9]/g, "");
    const randomId = Math.random().toString(36).slice(2, 10);
    const filename = `${folder}/${Date.now()}-${randomId}.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from("pendaftar")
      .upload(filename, file, {
        contentType: file.type || "image/jpeg",
        upsert: false,
      });

    if (!uploadErr) {
      const { data } = supabase.storage.from("pendaftar").getPublicUrl(filename);
      if (data?.publicUrl) return data.publicUrl;
    }

    // Fallback: simpan sebagai data URL base64 jika bucket storage belum dibuat di Supabase
    // agar berkas tetap aman tersimpan dan langsung dapat dibuka oleh admin
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    return `data:${file.type || "image/jpeg"};base64,${base64}`;
  }

  let foto_kk: string;
  let foto_akta: string;

  try {
    foto_kk = await uploadFile(fileKk, "kk");
    foto_akta = await uploadFile(fileAkta, "akta");
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { error: `Gagal memproses unggahan berkas: ${errorMsg}` };
  }

  const { error } = await supabase.from("ppdb_registrations").insert({
    nama,
    nisn,
    asal_sekolah,
    nama_wali,
    wa_wali,
    alamat,
    foto_kk,
    foto_akta,
    status: "pending",
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/pendaftar");
  return { ok: true };
}
