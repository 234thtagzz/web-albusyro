"use server";

import { revalidatePath } from "next/cache";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type GaleriCategory = Database["public"]["Tables"]["galeri"]["Row"]["category"];

async function getStorageClient() {
  try {
    return { client: createServiceClient(), isService: true };
  } catch {
    return { client: await createClient(), isService: false };
  }
}

async function uploadIfNeeded(file: File | null, bucket: string) {
  if (!(file instanceof File) || file.size === 0) return null;
  if (file.size > 5 * 1024 * 1024) throw new Error("Ukuran file maksimal 5MB");
  if (!file.type.startsWith("image/")) throw new Error("File harus berupa gambar");
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const safeExt = ext.replace(/[^a-z0-9]/g, "") || "jpg";
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;
  const buffer = await file.arrayBuffer();
  const { client, isService } = await getStorageClient();
  const { error } = await client.storage.from(bucket).upload(name, buffer, {
    contentType: file.type || "image/jpeg",
    cacheControl: "3600",
    upsert: false,
  });
  if (error) {
    const hint = isService ? "" : " (anon). Jika RLS menolak, isi SUPABASE_SERVICE_ROLE_KEY di .env.local.";
    throw new Error(`${error.message}${hint} — Pastikan bucket '${bucket}' ada (jalankan supabase.sql).`);
  }
  const { data } = client.storage.from(bucket).getPublicUrl(name);
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
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Upload gagal" };
  }
  if (!image_url) return { error: "Image wajib (upload file atau isi URL)" };

  const supabase = await createClient();
  const { error } = await supabase.from("galeri").insert({
    title, category: category as GaleriCategory, description, image_url, alt,
  });
  if (error) return { error: error.message };
  revalidatePath("/galeri", "page");
  revalidatePath("/kegiatan", "page");
  revalidatePath("/admin/galeri", "page");
  revalidatePath("/", "layout");
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
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Upload gagal" };
  }
  if (!image_url) return { error: "Image wajib" };

  const supabase = await createClient();
  const { error } = await supabase.from("galeri").update({
    title, category: category as GaleriCategory, description, image_url, alt,
  }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/galeri", "page");
  revalidatePath("/kegiatan", "page");
  revalidatePath("/admin/galeri", "page");
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deleteGaleri(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("galeri").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/galeri", "page");
  revalidatePath("/kegiatan", "page");
  revalidatePath("/admin/galeri", "page");
  revalidatePath("/", "layout");
  return { ok: true };
}
