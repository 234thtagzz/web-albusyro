// Konten khusus halaman depan (landing).
import { school } from "./school";

export const heroStats = [
  {
    value: "18–22",
    label: "Juz — target hafalan 6 tahun",
  },
  {
    value: "30",
    label: "Juz — capaian program asrama",
  },
  {
    value: "MI",
    label: "Ijazah resmi Kemenag + NISN",
  },
] as const;

export const admissionSteps = [
  {
    no: "01",
    title: "Pendaftaran Online",
    description:
      "Isi formulir pendaftaran dan lengkapi dokumen (kartu keluarga, akta kelahiran, dan pas foto) bersama panitia PPDB.",
    meta: "Dibuka setiap hari kerja",
  },
  {
    no: "02",
    title: "Seleksi & Wawancara",
    description:
      "Calon santri mengikuti tes baca Al-Qur'an, dilanjutkan wawancara bersama orang tua untuk menyamakan visi pendidikan.",
    meta: "Tanpa syarat hafalan awal",
  },
  {
    no: "03",
    title: "Daftar Ulang",
    description:
      "Pengumuman hasil seleksi, pelaksanaan daftar ulang, serta penjadwalan masa orientasi santri baru.",
    meta: "NISN & ijazah MI diproses sekolah",
  },
] as const;

export function waLink(message: string): string {
  return `https://wa.me/${school.whatsapp}?text=${encodeURIComponent(message)}`;
}
