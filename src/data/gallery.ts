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
  // [DATA RESMI BELUM TERSEDIA]
  // Placeholder untuk galeri yang akan ditambahkan oleh developer.
];
