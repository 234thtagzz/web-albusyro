"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function uploadIfNeeded(file: File | null, bucket: string) {
  if (!file || file.size === 0) return null;
  const supabase = await createClient();
  const ext = file.name.split(".").pop() ?? "jpg";
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(name, file, { contentType: file.type });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(bucket).getPublicUrl(name);
  return data.publicUrl;
}

export async function createGaleri(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "Kegiatan");
  const description = String(formData.get("description") ?? "").trim() || null;
  const alt = String(formData.get("alt") ?? "").trim() || null;
  let image_url = String(formData.get("image_url") ?? "").trim() || null;
  const file = formData.get("file") as File | null;

  if (!title) return { error: "Title wajib" };
  try {
    const uploaded = await uploadIfNeeded(file, "galeri");
    if (uploaded) image_url = uploaded;
  } catch (e: any) {
    return { error: e.message };
  }
  if (!image_url) return { error: "Image wajib (upload file atau isi URL)" };

  const supabase = await createClient();
  const { error } = await supabase.from("galeri").insert({
    title, category: category as any, description, image_url, alt,
  });
  if (error) return { error: error.message };
  revalidatePath("/galeri");
  revalidatePath("/kegiatan");
  revalidatePath("/admin/galeri");
  return { ok: true };
}

export async function updateGaleri(id: string, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "Kegiatan");
  const description = String(formData.get("description") ?? "").trim() || null;
  const alt = String(formData.get("alt") ?? "").trim() || null;
  let image_url = String(formData.get("image_url") ?? "").trim() || null;
  const file = formData.get("file") as File | null;

  if (!title) return { error: "Title wajib" };
  try {
    const uploaded = await uploadIfNeeded(file, "galeri");
    if (uploaded) image_url = uploaded;
  } catch (e: any) {
    return { error: e.message };
  }
  if (!image_url) return { error: "Image wajib" };

  const supabase = await createClient();
  const { error } = await supabase.from("galeri").update({
    title, category: category as any, description, image_url, alt,
  }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/galeri");
  revalidatePath("/kegiatan");
  revalidatePath("/admin/galeri");
  return { ok: true };
}

export async function deleteGaleri(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("galeri").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/galeri");
  revalidatePath("/kegiatan");
  revalidatePath("/admin/galeri");
  return { ok: true };
}
