// TEMPORARY DATA
// Replace with official STTD Al-Busyro activity data.

export interface Activity {
  id: string;
  title: string;
  category: string;
  description: string;
}

export const activityCategories = [
  "Semua",
  "Pembelajaran",
  "Tahfiz",
  "Keagamaan",
  "Olahraga",
  "Sosial",
  "Perlombaan",
  "Kegiatan Sekolah",
] as const;

export type ActivityCategory = (typeof activityCategories)[number];

export const activities: Activity[] = [
  {
    id: "1",
    title: "Mabit",
    category: "Keagamaan",
    description: "Kegiatan bermalam di sekolah untuk memperkuat spiritualitas dan kebersamaan.",
  },
  {
    id: "2",
    title: "PBB",
    category: "Kegiatan Sekolah",
    description: "Pelatihan baris berbaris untuk membentuk kedisiplinan dan kerja sama.",
  },
  {
    id: "3",
    title: "Life Skill",
    category: "Kegiatan Sekolah",
    description: "Pengembangan keterampilan hidup untuk kemandirian peserta didik.",
  },
  {
    id: "4",
    title: "Outbond",
    category: "Olahraga",
    description: "Kegiatan di alam terbuka untuk membangun keberanian dan kerja sama.",
  },
  {
    id: "5",
    title: "Renang",
    category: "Olahraga",
    description: "Pembelajaran berenang sebagai life skill dan olahraga.",
  },
  {
    id: "6",
    title: "Berkuda",
    category: "Olahraga",
    description: "Pembelajaran berkuda sebagai bagian dari pengembangan potensi diri.",
  },
  {
    id: "7",
    title: "Public Speaking",
    category: "Kegiatan Sekolah",
    description: "Latihan berbicara di depan umum untuk membangun kepercayaan diri.",
  },
  {
    id: "8",
    title: "Memanah",
    category: "Olahraga",
    description: "Pembelajaran memanah sebagai sunah dan olahraga.",
  },
  {
    id: "9",
    title: "Tartil dan Tilawah",
    category: "Tahfiz",
    description: "Pembelajaran tajwid dan tilawah Al-Qur'an dengan bacaan yang benar.",
  },
  {
    id: "10",
    title: "Beladiri",
    category: "Olahraga",
    description: "Pembelajaran beladiri untuk menjaga diri dan olahraga.",
  },
  {
    id: "11",
    title: "Jurnalistik",
    category: "Kegiatan Sekolah",
    description: "Pengembangan keterampilan menulis dan berita.",
  },
];
