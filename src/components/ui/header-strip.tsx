"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface HeaderStripProps {
  /** Label kecil di atas judul, mis. "Tentang Sekolah" */
  badge?: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

/*
 * Header strip bernuansa editorial institusional.
 *
 * Sebelumnya semua strip pakai gradien multi-warna + blur blob + pola garis
 * berulang + kaca (backdrop-blur) — ciri khas desain generatif yang terasa
 * "AI slop". Ini diganti dengan:
 *  - blok warna solid primary-1 (tanpa gradien),
 *  - aksen garis solid secondary-1 (tegas, bukan bersinar),
 *  - badge segel solid bg-white (tanpa kaca/transparansi),
 *  - pembatas halus border-white/20 di bawah,
 *  - tanpa blob dan tanpa pola garis berulang.
 */
export function HeaderStrip({
  badge,
  title,
  description,
  className,
}: HeaderStripProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-stone-200 bg-primary-1",
        className
      )}
    >
      {/* Aksen horisontal solid — institutional, anti gradien-aneh */}
      <span className="absolute left-0 top-0 h-[3px] w-24 bg-secondary-1" />

      <div className="container-custom relative py-10 sm:py-12 lg:py-14">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            {badge && (
              <Badge
                className="rounded-lg bg-white text-primary-1 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] shadow-sm"
              >
                {badge}
              </Badge>
            )}
            <h2 className="font-display text-[28px] font-bold tracking-tight text-white sm:text-[36px] lg:text-[42px]">
              {title}
            </h2>
          </div>

          {description && (
            <p className="max-w-xl text-[13px] leading-[1.7] text-white/80">
              {description}
            </p>
          )}
        </div>

        <hr className="mt-6 border-white/20" />
      </div>
    </section>
  );
}
