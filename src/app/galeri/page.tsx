"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Stagger } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { CategoryFilter } from "@/components/ui/category-filter";
import {
  galleryItems,
  galleryCategories,
  type GalleryCategory,
} from "@/data/gallery";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("Semua");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "Semua"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  }, []);
  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null && prev < filteredItems.length - 1 ? prev + 1 : prev
    );
  }, [filteredItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, goToPrev, goToNext]);

  return (
    <>
      <Navbar />
      <main className="flex-1" id="main-content">
        <section className="bg-slate-50 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="container-custom">
            <SectionHeading
              badge="Galeri"
              title="Dokumentasi Kegiatan"
              description="Momen-momen penting dalam kegiatan pendidikan di STTD Al-Busyro."
            />
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-custom">
            <CategoryFilter
              categories={galleryCategories}
              active={activeCategory}
              onChange={(c) => setActiveCategory(c as GalleryCategory)}
            />

            {filteredItems.length === 0 ? (
              <EmptyState
                title="Belum ada dokumentasi yang tersedia."
                description="Galeri akan diperbarui oleh pihak STTD Al-Busyro."
              />
            ) : (
              <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {filteredItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => openLightbox(index)}
                    aria-label={`Lihat gambar: ${item.title}`}
                    className="group relative aspect-square overflow-hidden rounded-[16px] bg-white"
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                      <p className="text-sm font-medium text-white">{item.title}</p>
                    </div>
                  </button>
                ))}
              </Stagger>
            )}
          </div>
        </section>

        {lightboxIndex !== null && filteredItems.length > 0 && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Tampilan gambar galeri"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/70 transition-colors hover:text-white"
              aria-label="Tutup"
            >
              <X className="h-6 w-6" />
            </button>

            {lightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                className="absolute left-4 text-white/70 transition-colors hover:text-white"
                aria-label="Gambar sebelumnya"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}

            {lightboxIndex < filteredItems.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 text-white/70 transition-colors hover:text-white"
                aria-label="Gambar selanjutnya"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}

            <div className="max-h-[80vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={filteredItems[lightboxIndex].imageUrl}
                alt={filteredItems[lightboxIndex].alt}
                width={1600}
                height={900}
                className="h-auto max-h-[80vh] w-auto max-w-[90vw] rounded-[16px] object-contain"
              />
              <p className="mt-3 text-center text-sm text-white/70">
                {lightboxIndex + 1} / {filteredItems.length} &mdash;{" "}
                {filteredItems[lightboxIndex].title}
              </p>
            </div>
          </div>
        )}
        </main>
        <Footer />
    </>
  );
}
