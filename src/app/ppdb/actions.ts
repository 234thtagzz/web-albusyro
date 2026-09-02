"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

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

  if (!nama) return { error: "Nama calon santri wajib diisi" };
  if (!nama_wali) return { error: "Nama wali wajib diisi" };
  if (!wa_wali) return { error: "No WA wali wajib diisi" };
  if (!isValidWA(wa_wali)) return { error: "No WA tidak valid. Gunakan format 08xxxxxxxxxx atau 628xxxxxxxxxx (8-14 digit)" };
  if (nisn && !/^[0-9]{8,12}$/.test(nisn)) return { error: "NISN harus 8-12 digit angka" };

  const supabase = await createClient();
  const { error } = await supabase.from("ppdb_registrations").insert({
    nama,
    nisn,
    asal_sekolah,
    nama_wali,
    wa_wali,
    alamat,
    status: "pending",
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/pendaftar");
  return { ok: true };
}
