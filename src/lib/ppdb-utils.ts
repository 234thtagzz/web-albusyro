import { school } from "@/data/school";

export interface PpdbData {
  id: string;
  tahun_ajaran: string;
  nama_admin: string;
  no_hp: string;
  clean_whatsapp: string;
  jadwal: string;
  persyaratan: string;
  biaya: string;
  kontak: string;
  is_active: boolean;
}

export function formatWaNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("62")) return cleaned;
  if (cleaned.startsWith("0")) return `62${cleaned.slice(1)}`;
  return cleaned;
}

export function createPpdbWaLink(
  ppdb?: PpdbData | null,
  customMessage?: string
): string {
  const adminName = ppdb?.nama_admin ?? school.phoneContact;
  const cleanPhone = ppdb?.clean_whatsapp ?? formatWaNumber(school.whatsapp || "085726216717");
  const tahunAjaran = ppdb?.tahun_ajaran ?? "2026/2027";

  const message =
    customMessage ??
    `Assalamualaikum ${adminName}, saya ingin bertanya tentang pendaftaran PPDB STTD Al-Busyro Tahun Ajaran ${tahunAjaran}.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
