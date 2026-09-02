"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type PrestasiCategory = Database["public"]["Tables"]["prestasi"]["Row"]["category"];
type PrestasiLevel = Database["public"]["Tables"]["prestasi"]["Row"]["level"];

export async function createPrestasi(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const competition = String(formData.get("competition") ?? "").trim();
  const category = String(formData.get("category") ?? "Lainnya");
  const year = String(formData.get("year") ?? "").trim();
  const level = String(formData.get("level") ?? "Sekolah");
  const participant = String(formData.get("participant") ?? "").trim() || null;
  const image_url = String(formData.get("image_url") ?? "").trim() || null;

  if (!title || !competition || !year) return { error: "Title, competition, year wajib" };

  const supabase = await createClient();
  const { error } = await supabase.from("prestasi").insert({
    title, competition, category: category as PrestasiCategory, year, level: level as PrestasiLevel, participant, image_url,
  });
  if (error) return { error: error.message };
  revalidatePath("/prestasi");
  revalidatePath("/admin/prestasi");
  return { ok: true };
}

export async function updatePrestasi(id: string, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const competition = String(formData.get("competition") ?? "").trim();
  const category = String(formData.get("category") ?? "Lainnya");
  const year = String(formData.get("year") ?? "").trim();
  const level = String(formData.get("level") ?? "Sekolah");
  const participant = String(formData.get("participant") ?? "").trim() || null;
  const image_url = String(formData.get("image_url") ?? "").trim() || null;

  if (!title || !competition || !year) return { error: "Title, competition, year wajib" };

  const supabase = await createClient();
  const { error } = await supabase.from("prestasi").update({
    title, competition, category: category as PrestasiCategory, year, level: level as PrestasiLevel, participant, image_url,
  }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/prestasi");
  revalidatePath("/admin/prestasi");
  return { ok: true };
}

export async function deletePrestasi(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("prestasi").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/prestasi");
  revalidatePath("/admin/prestasi");
  return { ok: true };
}
