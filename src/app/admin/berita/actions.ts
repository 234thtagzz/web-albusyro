"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function createBerita(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;
  const content = String(formData.get("content") ?? "").trim();
  const category = String(formData.get("category") ?? "Berita");
  const author = String(formData.get("author") ?? "").trim() || null;
  const image_url = String(formData.get("image_url") ?? "").trim() || null;
  const image_alt = String(formData.get("image_alt") ?? "").trim() || null;

  if (!title || !content) return { error: "Title dan content wajib" };
  const slug = slugRaw ? slugify(slugRaw) : slugify(title);
  if (!/^[a-z0-9-]+$/.test(slug)) return { error: "Slug tidak valid" };

  const supabase = await createClient();
  const { error } = await supabase.from("berita").insert({
    slug, title, excerpt, content, category: category as any, author, image_url, image_alt,
  });
  if (error) return { error: error.message };
  revalidatePath("/berita");
  revalidatePath("/admin/berita");
  return { ok: true };
}

export async function updateBerita(id: string, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;
  const content = String(formData.get("content") ?? "").trim();
  const category = String(formData.get("category") ?? "Berita");
  const author = String(formData.get("author") ?? "").trim() || null;
  const image_url = String(formData.get("image_url") ?? "").trim() || null;
  const image_alt = String(formData.get("image_alt") ?? "").trim() || null;

  if (!title || !content) return { error: "Title dan content wajib" };
  const slug = slugify(slugRaw || title);

  const supabase = await createClient();
  const { error } = await supabase.from("berita").update({
    slug, title, excerpt, content, category: category as any, author, image_url, image_alt,
  }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/berita");
  revalidatePath(`/berita/${slug}`);
  revalidatePath("/admin/berita");
  return { ok: true };
}

export async function deleteBerita(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("berita").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/berita");
  revalidatePath("/admin/berita");
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
