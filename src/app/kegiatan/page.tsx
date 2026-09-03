"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/ui/page-hero";
import { galleryItems } from "@/data/gallery";
import { AktivitasSection } from "@/components/components/jadwal"
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react"

const UNIFIED_BADGE = "border-primary-1/15 bg-primary-1/10 text-primary-1 hover:bg-primary-1/15";


/* ────────────────────────────────────────────────
   Shared decorative blobs — sama seperti page profil
   ──────────────────────────────────────────────── */
function Blob({
  className,
  delay = "",
}: {
  className: string;
  delay?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-40 ${className} ${
        delay ? delay : "animate-blob"
      }`}
    />
  );
}




// ─── Arsip Foto — pindahan dari profil ─────────────────
const archiveTabs = ["Semua", "Tahfiz", "Pembelajaran", "Kegiatan", "Lingkungan"] as const;
type ArchiveTab = (typeof archiveTabs)[number];

// satu palet clean — semua badge kategori pakai shadcn Badge outline emerald
const categoryBadgeClass = `rounded-full px-3 py-1 text-[10px] font-bold tracking-wide border-primary-1/15 bg-primary-1/10 text-primary-1`;

function ArchiveSection() {
  const [active, setActive] = useState<ArchiveTab>("Semua");
  const filtered =
    active === "Semua" ? galleryItems : galleryItems.filter((g) => g.category === active);

  return (
    <section className="section-spacing relative overflow-hidden border-t border-stone-200 bg-white">
      <div className="pointer-events-none absolute -top-20 left-0 h-[400px] w-[500px] rounded-full bg-primary-4/10 blur-[80px]" aria-hidden />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-[360px] w-[360px] rounded-full bg-secondary-3/10 blur-[70px]" aria-hidden />

      <div className="container-custom relative py-12 sm:py-16">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="relative">
            <div className="absolute -left-4 -top-2 h-12 w-12 rounded-xl bg-primary-1/10 rotate-6" />
            <Badge variant="outline" className={`relative rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${UNIFIED_BADGE}`}>
              Galeri & Arsip
            </Badge>
            <h2 className="font-display relative mt-3 text-[26px] font-bold tracking-tight text-primary-1 sm:text-[30px]">
              Dari Arsip Al-Busyro
            </h2>
            <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-stone-500">
              Menelusuri jejak perjalanan santri — bingkai kecil dari keseharian yang penuh makna.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 rounded-full border border-stone-100 bg-stone-50 p-1.5">
            {archiveTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`rounded-full px-4 py-1.5 text-[12px] font-bold transition-all duration-200 ${
                  active === tab
                    ? "bg-primary-1 text-white shadow-md -translate-y-px"
                    : "text-stone-600 hover:bg-white hover:text-primary-1"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => {
            const isFeatured = i === 0 && active === "Semua";
            return (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-[20px] bg-stone-100 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:rotate-[0.3deg] ${
                  isFeatured ? "lg:col-span-2" : ""
                }`}
              >
                <div className={`relative w-full ${isFeatured ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-1/70 via-primary-1/10 to-transparent opacity-90 transition group-hover:from-primary-1/80" />
                  <div className="absolute left-3 top-3">
                    <Badge variant="outline" className={`rounded-full shadow-sm backdrop-blur ${categoryBadgeClass}`}>
                      {item.category}
                    </Badge>
                  </div>
                  <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[11px] font-bold text-primary-1 backdrop-blur">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <p className="font-display text-[15px] font-bold leading-snug text-white drop-shadow">
                      {item.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-white/80">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Penutup CTA kecil — konsisten dengan profil (Why Choose Us band) ───
function KegiatanClosing() {
  return (
    <section className="section-spacing relative overflow-hidden border-t border-stone-200 bg-white">
      <div className="pointer-events-none absolute -top-20 left-0 h-[400px] w-[500px] rounded-full bg-primary-4/10 blur-[80px]" aria-hidden />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-[360px] w-[360px] rounded-full bg-secondary-3/10 blur-[70px]" aria-hidden />
      <div className="container-custom relative py-12 sm:py-16">
        <div className="relative overflow-hidden rounded-[24px] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <Blob className="h-40 w-40 -top-10 -right-10 bg-secondary-3/15 blur-2xl" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Badge variant="outline" className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${UNIFIED_BADGE}`}>
                <Target className="h-3.5 w-3.5" />
                Mari Bergabung
              </Badge>
              <h3 className="font-display mt-3 text-[20px] font-bold tracking-tight text-primary-1">
                Setiap Langkah Kecil Hari Ini Menentukan Masa Depan
              </h3>
              <p className="mt-1.5 max-w-xl text-[13px] leading-[1.7] text-stone-500">
                Dampingi putra-putri Anda bertumbuh menjadi generasi yang mencintai Al-Qur&apos;an, beradab, dan
                berprestasi.
              </p>
            </div>
            <div className="flex flex-shrink-0 items-center gap-3">
              <Link
                href="/ppdb"
                className="inline-flex items-center justify-center rounded-full bg-primary-1 px-6 py-2.5 text-[13px] font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-primary-2 hover:shadow-lg"
              >
                Informasi PPDB
              </Link>
              <Link
                href="/kontak"
                className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white px-6 py-2.5 text-[13px] font-bold text-primary-1 transition hover:border-primary-1/20 hover:bg-stone-50"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function KegiatanPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" id="main-content">
        <PageHero
          badge="Kegiatan"
          title="Kegiatan Santri"
          description="Beragam kegiatan membentuk karakter, keberanian, dan potensi — di luar kelas, di dalam adab. Dari halaqah tahfizh hingga berkuda dan memanah."
        />
        <AktivitasSection />
        <ArchiveSection />
        <KegiatanClosing />
      </main>
      <Footer />
    </>
  );
}
