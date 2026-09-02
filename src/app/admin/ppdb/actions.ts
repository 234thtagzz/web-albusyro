"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Json } from "@/types/database";

export async function createPpdb(formData: FormData) {
  const tahun_ajaran = String(formData.get("tahun_ajaran") ?? "").trim();
  const jadwal = String(formData.get("jadwal") ?? "").trim() || null;
  const persyaratan = String(formData.get("persyaratan") ?? "").trim() || null;
  const biaya = String(formData.get("biaya") ?? "").trim() || null;
  const kontak = String(formData.get("kontak") ?? "").trim() || null;
  const is_active = formData.get("is_active") === "on";
  let faq: Json = [];
  try {
    const raw = String(formData.get("faq") ?? "[]").trim();
    faq = raw ? (JSON.parse(raw) as Json) : [];
  } catch { return { error: "FAQ harus JSON valid, contoh: [{\"q\":\"Apa syarat?\",\"a\":\"...\"}]" }; }

  if (!tahun_ajaran) return { error: "Tahun ajaran wajib" };

  const supabase = await createClient();
  // jika aktif, nonaktifkan yang lain
  if (is_active) {
    await supabase.from("ppdb_info").update({ is_active: false }).eq("is_active", true);
  }
  const { error } = await supabase.from("ppdb_info").insert({
    tahun_ajaran, jadwal, persyaratan, biaya, faq, kontak, is_active,
  });
  if (error) return { error: error.message };
  revalidatePath("/ppdb");
  revalidatePath("/admin/ppdb");
  return { ok: true };
}

export async function updatePpdb(id: string, formData: FormData) {
  const tahun_ajaran = String(formData.get("tahun_ajaran") ?? "").trim();
  const jadwal = String(formData.get("jadwal") ?? "").trim() || null;
  const persyaratan = String(formData.get("persyaratan") ?? "").trim() || null;
  const biaya = String(formData.get("biaya") ?? "").trim() || null;
  const kontak = String(formData.get("kontak") ?? "").trim() || null;
  const is_active = formData.get("is_active") === "on";
  let faq: Json = [];
  try {
    const raw = String(formData.get("faq") ?? "[]").trim();
    faq = raw ? (JSON.parse(raw) as Json) : [];
  } catch { return { error: "FAQ harus JSON valid" }; }

  if (!tahun_ajaran) return { error: "Tahun ajaran wajib" };

  const supabase = await createClient();
  if (is_active) {
    await supabase.from("ppdb_info").update({ is_active: false }).neq("id", id);
  }
  const { error } = await supabase.from("ppdb_info").update({
    tahun_ajaran, jadwal, persyaratan, biaya, faq, kontak, is_active,
  }).eq("id", id);
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

export async function toggleActivePpdb(id: string, is_active: boolean) {
  const supabase = await createClient();
  if (is_active) {
    await supabase.from("ppdb_info").update({ is_active: false }).neq("id", id);
  }
  const { error } = await supabase.from("ppdb_info").update({ is_active }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/ppdb");
  revalidatePath("/admin/ppdb");
  return { ok: true };
}
