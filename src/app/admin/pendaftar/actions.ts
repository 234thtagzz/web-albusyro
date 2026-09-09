"use server";

import { revalidatePath } from "next/cache";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type RegistrationStatus = Database["public"]["Tables"]["ppdb_registrations"]["Row"]["status"];

async function getAdminClient() {
  try {
    return createServiceClient();
  } catch {
    return await createClient();
  }
}

export async function updateStatus(id: string, status: string) {
  const supabase = await getAdminClient();
  const { error } = await supabase.from("ppdb_registrations").update({ status: status as RegistrationStatus }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/pendaftar");
  return { ok: true };
}

export async function deletePendaftar(id: string) {
  const supabase = await getAdminClient();
  const { error } = await supabase.from("ppdb_registrations").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/pendaftar");
  return { ok: true };
}
