"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function savePpdbSettings(formData: FormData) {
  const tahun_ajaran = String(formData.get("tahun_ajaran") ?? "").trim();
  const nama_admin = String(formData.get("nama_admin") ?? "").trim();
  const no_hp = String(formData.get("no_hp") ?? "").trim();
  const biaya = String(formData.get("biaya") ?? "").trim() || null;
  const jadwal = String(formData.get("jadwal") ?? "").trim() || null;
  const persyaratan = String(formData.get("persyaratan") ?? "").trim() || null;
  const is_active = formData.get("is_active") === "on";

  // Gabungkan no_hp dan nama_admin ke dalam format kontak yang rapi
  let kontak: string | null = null;
  if (no_hp && nama_admin) {
    kontak = `${no_hp} (${nama_admin})`;
  } else if (no_hp) {
    kontak = no_hp;
  } else if (nama_admin) {
    kontak = nama_admin;
  }

  if (!tahun_ajaran) {
    return { error: "Tahun ajaran baru wajib diisi (contoh: 2026/2027)" };
  }

  const supabase = await createClient();

  // Cari data PPDB yang sudah ada (hanya boleh ada 1 data)
  const { data: existingRows } = await supabase
    .from("ppdb_info")
    .select("id")
    .order("created_at", { ascending: false });

  let primaryId: string | null = null;

  if (existingRows && existingRows.length > 0) {
    primaryId = existingRows[0].id;
    // Update data utama
    const { error: updateError } = await supabase
      .from("ppdb_info")
      .update({
        tahun_ajaran,
        nama_admin,
        no_hp,
        biaya,
        jadwal,
        persyaratan,
        kontak,
        is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", primaryId);

    if (updateError) return { error: updateError.message };

    // Jika ada data duplikat/sisa sebelumnya, hapus agar hanya tersisa tepat 1 data master
    if (existingRows.length > 1) {
      const duplicateIds = existingRows.slice(1).map((r) => r.id);
      await supabase.from("ppdb_info").delete().in("id", duplicateIds);
    }
  } else {
    // Jika belum ada data sama sekali, insert 1 data master baru
    const { data: inserted, error: insertError } = await supabase
      .from("ppdb_info")
      .insert({
        tahun_ajaran,
        nama_admin,
        no_hp,
        biaya,
        jadwal,
        persyaratan,
        kontak,
        is_active,
      })
      .select("id")
      .single();

    if (insertError) return { error: insertError.message };
    primaryId = inserted.id;
  }

  // Revalidasi seluruh halaman publik dan admin yang menampilkan data PPDB
  revalidatePath("/");
  revalidatePath("/ppdb");
  revalidatePath("/kontak");
  revalidatePath("/kegiatan");
  revalidatePath("/admin/ppdb");
  revalidatePath("/", "layout");

  return { ok: true, id: primaryId };
}

export async function savePpdbAction(formData: FormData) {
  const res = await savePpdbSettings(formData);
  if (res?.error) {
    redirect(`/admin/ppdb?error=${encodeURIComponent(res.error)}`);
  }
  redirect("/admin/ppdb?success=1");
}

// Kompatibilitas legacy action jika masih terpanggil
export async function toggleActivePpdb(id: string, is_active: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("ppdb_info").update({ is_active }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/ppdb");
  revalidatePath("/admin/ppdb");
  return { ok: true };
}

export async function deletePpdb(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("ppdb_info").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/ppdb");
  revalidatePath("/admin/ppdb");
  return { ok: true };
}
