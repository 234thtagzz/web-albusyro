"use server";

import { revalidatePath } from "next/cache";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type BeritaCategory = Database["public"]["Tables"]["berita"]["Row"]["category"];

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function getStorageClient() {
  try {
    // Prioritas service_role agar bypass RLS storage (bucket public read tetap)
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
    const hint = isService ? "" : " (anon). Jika RLS menolak, isi SUPABASE_SERVICE_ROLE_KEY di .env.local dan restart dev server.";
    // Bucket belum dibuat adalah penyebab umum: supabase.sql bagian 8 harus di-run
    throw new Error(`${error.message}${hint} — Pastikan bucket '${bucket}' ada (jalankan supabase.sql di SQL Editor).`);
  }
  const { data } = client.storage.from(bucket).getPublicUrl(name);
  return data.publicUrl;
}

export async function createBerita(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;
  const content = String(formData.get("content") ?? "").trim();
  const category = String(formData.get("category") ?? "Berita");
  const author = String(formData.get("author") ?? "").trim() || null;
  let image_url = String(formData.get("image_url") ?? "").trim() || null;
  const image_alt = String(formData.get("image_alt") ?? "").trim() || null;
  const file = formData.get("file") as File | null;

  if (!title || !content) return { error: "Title dan content wajib" };
  const slug = slugRaw ? slugify(slugRaw) : slugify(title);
  if (!/^[a-z0-9-]+$/.test(slug)) return { error: "Slug tidak valid" };

  try {
    const uploaded = await uploadIfNeeded(file, "berita");
    if (uploaded) image_url = uploaded;
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Upload gagal" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("berita").insert({
    slug, title, excerpt, content, category: category as BeritaCategory, author, image_url, image_alt,
  });
  if (error) return { error: error.message };
  revalidatePath("/berita", "page");
  revalidatePath("/admin/berita", "page");
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function updateBerita(id: string, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;
  const content = String(formData.get("content") ?? "").trim();
  const category = String(formData.get("category") ?? "Berita");
  const author = String(formData.get("author") ?? "").trim() || null;
  let image_url = String(formData.get("image_url") ?? "").trim() || null;
  const image_alt = String(formData.get("image_alt") ?? "").trim() || null;
  const file = formData.get("file") as File | null;

  if (!title || !content) return { error: "Title dan content wajib" };
  const slug = slugify(slugRaw || title);

  try {
    const uploaded = await uploadIfNeeded(file, "berita");
    if (uploaded) image_url = uploaded;
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Upload gagal" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("berita").update({
    slug, title, excerpt, content, category: category as BeritaCategory, author, image_url, image_alt,
  }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/berita", "page");
  revalidatePath(`/berita/${slug}`, "page");
  revalidatePath("/admin/berita", "page");
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deleteBerita(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("berita").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/berita", "page");
  revalidatePath("/admin/berita", "page");
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function uploadBeritaImage(formData: FormData) {
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return { error: "File kosong" };
  const supabase = await createClient();
  const ext = file.name.split(".").pop() ?? "jpg";
  const name = `${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;
  const { error } = await supabase.storage.from("berita").upload(name, file, { contentType: file.type });
  if (error) return { error: error.message };
  const { data } = supabase.storage.from("berita").getPublicUrl(name);
  return { url: data.publicUrl };
}
