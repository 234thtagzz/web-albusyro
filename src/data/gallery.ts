// TEMPORARY DATA
// Replace with official STTD Al-Busyro gallery data.

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  alt: string;
}

export const galleryCategories = [
  "Semua",
  "Pembelajaran",
  "Tahfiz",
  "Kegiatan",
  "Prestasi",
  "Lingkungan",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export const galleryItems: GalleryItem[] = [
  // [DATA DUMMY] Ganti dengan data resmi STTD Al-Busyro.
  // Gambar placeholder ada di public/images/dummy/.
  {
    id: "1",
    title: "Halaqah Tahfizh Pagi",
    category: "Tahfiz",
    description:
      "Setoran hafalan santri di depan ustadz pembimbing sebelum pembelajaran dimulai.",
    imageUrl: "/images/dummy/gallery-1.png",
    alt: "Santri mengikuti halaqah tahfizh pagi",
  },
  {
    id: "2",
    title: "Pembelajaran Kelas MI",
    category: "Pembelajaran",
    description:
      "Suasana kelas pelajaran umum dengan kurikulum terpadu sekolah dan asrama.",
    imageUrl: "/images/dummy/gallery-2.png",
    alt: "Suasana pembelajaran di kelas",
  },
  {
    id: "3",
    title: "Latihan Berkuda Santri",
    category: "Kegiatan",
    description:
      "Ekstrakurikuler berkuda sebagai sarana pengembangan keberanian dan potensi diri.",
    imageUrl: "/images/dummy/gallery-3.png",
    alt: "Santri mengikuti latihan berkuda",
  },
  {
    id: "4",
    title: "Penyerahan Piagam Juara MTQ",
    category: "Prestasi",
    description:
      "Perwakilan sekolah menerima piagam juara pada MTQ tingkat Kota Surakarta.",
    imageUrl: "/images/dummy/gallery-4.png",
    alt: "Penyerahan piagam juara MTQ",
  },
  {
    id: "5",
    title: "Taman dan Masjid Sekolah",
    category: "Lingkungan",
    description:
      "Lingkungan hijau di area masjid yang menjadi ruang tadarus santri.",
    imageUrl: "/images/dummy/gallery-5.png",
    alt: "Taman hijau di lingkungan sekolah",
  },
  {
    id: "6",
    title: "Praktik Perbaikan Bacaan MMC",
    category: "Tahfiz",
    description:
      "Perbaikan makhraj dan sifat huruf melalui program Metode Al-Qosimi MMC.",
    imageUrl: "/images/dummy/gallery-6.png",
    alt: "Praktik perbaikan bacaan Al-Qur'an",
  },
  {
    id: "7",
    title: "Memanah di Lapangan Sekolah",
    category: "Kegiatan",
    description:
      "Ekstrakurikuler memanah untuk melatih fokus dan kesabaran santri.",
    imageUrl: "/images/dummy/gallery-7.png",
    alt: "Santri berlatih memanah",
  },
  {
    id: "8",
    title: "Belajar di Taman Literasi",
    category: "Lingkungan",
    description:
      "Momen belajar santai santri di taman literasi halaman belakang sekolah.",
    imageUrl: "/images/dummy/gallery-8.png",
    alt: "Santri membaca buku di taman literasi",
  },
];
