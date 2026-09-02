"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("ppdb_registrations").update({ status: status as any }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/pendaftar");
  return { ok: true };
}

export async function deletePendaftar(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("ppdb_registrations").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/pendaftar");
  return { ok: true };
}
