// TEMPORARY DATA
// Replace with official STTD Al-Busyro news data.

export interface News {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  imageUrl: string;
  imageAlt: string;
}

export const newsCategories = [
  "Semua",
  "Berita",
  "Pengumuman",
  "Kegiatan",
  "Prestasi",
] as const;

export type NewsCategory = (typeof newsCategories)[number];

export const newsItems: News[] = [
  // [DATA RESMI BELUM TERSEDIA]
  // Placeholder untuk berita yang akan ditambahkan oleh developer.
];
