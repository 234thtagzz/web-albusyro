"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Stagger } from "@/components/motion/reveal";
import { EmptyState } from "@/components/ui/empty-state";
import { CategoryFilter } from "@/components/ui/category-filter";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Database } from "@/types/database";

type Row = Database["public"]["Tables"]["galeri"]["Row"];
const cats = ["Semua","Pembelajaran","Tahfiz","Kegiatan","Prestasi","Lingkungan"] as const;

export function GaleriClient({ items, fallback = false }: { items: Row[]; fallback?: boolean }) {
  const [active, setActive] = useState("Semua");
  const [idx, setIdx] = useState<number | null>(null);

  const filtered = active === "Semua" ? items : items.filter((i) => i.category === active);
  const open = (i: number) => setIdx(i);
  const close = useCallback(() => setIdx(null), []);
  const prev = useCallback(() => setIdx((p) => (p !== null && p > 0 ? p - 1 : p)), []);
  const next = useCallback(() => setIdx((p) => (p !== null && p < filtered.length - 1 ? p + 1 : p)), [filtered.length]);

  useEffect(() => {
    if (idx === null) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [idx, close, prev, next]);

  return (
    <>
      <CategoryFilter categories={[...cats]} active={active} onChange={(c) => setActive(c)} />
      {fallback && <p className="mt-3 text-xs text-amber-600">Menampilkan data sementara — kelola via /admin/galeri</p>}
      {filtered.length === 0 ? (
        <EmptyState title="Belum ada dokumentasi yang tersedia." description="Galeri akan diperbarui oleh pihak STTD Al-Busyro." />
      ) : (
        <Stagger className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item, index) => (
            <button
              key={item.id}
              onClick={() => open(index)}
              aria-label={`Lihat gambar: ${item.title}`}
              className="group relative aspect-square overflow-hidden rounded-[16px] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-primary-1/15 hover:shadow-md"
            >
              <Image
                src={item.image_url}
                alt={item.alt ?? item.title}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform group-hover:scale-105"
                unoptimized={item.image_url.includes("supabase.co")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-1/60 via-primary-1/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-sm font-bold text-white drop-shadow">{item.title}</p>
                <p className="text-xs font-medium text-white/80">{item.category}</p>
              </div>
            </button>
          ))}
        </Stagger>
      )}

      <Dialog open={idx !== null} onOpenChange={(o) => !o && close()}>
        <DialogContent showCloseButton={false} className="sm:max-w-4xl bg-black/95 border-0 p-6">
          <DialogTitle className="sr-only">Tampilan gambar galeri</DialogTitle>
          <DialogDescription className="sr-only">{idx !== null ? filtered[idx]?.title : ""}</DialogDescription>
          {idx !== null && filtered.length > 0 && (
            <>
              <button onClick={close} className="absolute top-4 right-4 text-white/70 hover:text-white z-10" aria-label="Tutup">✕</button>
              {idx > 0 && (
                <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10" aria-label="Gambar sebelumnya">
                  <ChevronLeft className="h-8 w-8" />
                </button>
              )}
              {idx < filtered.length - 1 && (
                <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10" aria-label="Gambar selanjutnya">
                  <ChevronRight className="h-8 w-8" />
                </button>
              )}
              <div className="flex flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={filtered[idx].image_url} alt={filtered[idx].alt ?? filtered[idx].title} className="h-auto max-h-[70vh] w-auto rounded-[16px] object-contain" />
                <p className="mt-3 text-center text-sm text-white/70">
                  {idx + 1} / {filtered.length} — {filtered[idx].title}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
