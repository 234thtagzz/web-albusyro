// Konten khusus halaman depan (landing).
import { school } from "./school";

export const heroStats = [
  {
    value: "10-15",
    label: "Juz - target hafalan Mutqin dan Fasih Bacaannya.",
  },
  {
    value: "Adab",
    label: "Ketika Beribadah, Bermajelis, Serta kepada Guru dan Orang Tua.",
  },
  {
    value: "Legalitas",
    label: "Kurikulum Terpadu Kemenag + NISN dan Ijazah MI (Kemenag).",
  },
] as const;

export const admissionSteps = [
  {
    no: "01",
    title: "Pendaftaran Online",
    description:
      "Isi formulir pendaftaran dan lengkapi dokumen kartu keluarga dan akta kelahiran.",
    meta: "Dibuka setiap hari kerja",
  },
  {
    no: "02",
    title: "Wawancara & Observasi",
    description:
      "Calon Wali santri melakukan wawancara untuk menyamakan visi pendidikan dilanjutkan observasi calon santri.",
    meta: "ONE DAY SERVICE",
  },
  {
    no: "03",
    title: "Daftar Ulang",
    description:
      "Calon wali santri melakukan daftar ulang sesuai jadwal yang telah ditentukan",
    meta: "Cash atau Transfer",
  },
] as const;

export function waLink(message: string): string {
  return `https://wa.me/${school.whatsapp}?text=${encodeURIComponent(message)}`;
}
