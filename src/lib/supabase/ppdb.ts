import { createClient } from "./server";
import { school } from "@/data/school";
import type { PpdbData } from "@/lib/ppdb-utils";
import { formatWaNumber } from "@/lib/ppdb-utils";

export type { PpdbData };
export { formatWaNumber };

export async function getPpdbInfo(): Promise<PpdbData> {
  const fallback: PpdbData = {
    id: "default-master",
    tahun_ajaran: "2026/2027",
    nama_admin: school.phoneContact || "Ust. Mihwar",
    no_hp: school.phone || "085726216717",
    clean_whatsapp: formatWaNumber(school.whatsapp || "085726216717"),
    jadwal: "Gelombang I: 1 Oktober – 31 Desember 2025. Gelombang II: 1 Januari – 31 Maret 2026. Buka setiap hari kerja pukul 08.00 – 14.00 WIB.",
    persyaratan: "1. Mengisi formulir pendaftaran\n2. Fotokopi KK 2 lembar\n3. Fotokopi Akta Kelahiran 2 lembar\n4. Pas foto santri 3x4 (3 lembar)\n5. Observasi calon santri & wawancara orang tua",
    biaya: "Biaya formulir pendaftaran: Rp 150.000. Rincian infaq pendidikan, seragam, dan SPP bulanan disampaikan saat observasi atau dapat dikonsultasikan langsung ke panitia.",
    kontak: `${school.phone} (${school.phoneContact})`,
    is_active: true,
  };

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("ppdb_info")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return fallback;
    }

    let nama_admin = data.nama_admin || "";
    let no_hp = data.no_hp || "";

    if (!no_hp && data.kontak) {
      const match = data.kontak.match(/^(.*?)\s*\((.*?)\)$/);
      if (match) {
        no_hp = match[1].trim();
        nama_admin = nama_admin || match[2].trim();
      } else {
        no_hp = data.kontak.trim();
      }
    }

    const resolvedNamaAdmin = nama_admin || fallback.nama_admin;
    const resolvedNoHp = no_hp || fallback.no_hp;

    return {
      id: data.id,
      tahun_ajaran: data.tahun_ajaran || fallback.tahun_ajaran,
      nama_admin: resolvedNamaAdmin,
      no_hp: resolvedNoHp,
      clean_whatsapp: formatWaNumber(resolvedNoHp),
      jadwal: data.jadwal || fallback.jadwal,
      persyaratan: data.persyaratan || fallback.persyaratan,
      biaya: data.biaya || fallback.biaya,
      kontak: data.kontak || `${resolvedNoHp} (${resolvedNamaAdmin})`,
      is_active: data.is_active,
    };
  } catch {
    return fallback;
  }
}
