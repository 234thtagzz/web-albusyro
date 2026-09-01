"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { school } from "@/data/school";
import { galleryItems } from "@/data/gallery";
import { AktivitasSection } from "@/components/components/jadwal"
import { Badge } from "@/components/ui/badge";
import { Target, ArrowDown } from "lucide-react"

const UNIFIED_ICON = "bg-primary-1 text-white";
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

// ─── Hero Kegiatan ───────────────────────────────────────
function HeroKegiatan() {
  return (
    <section className="relative overflow-hidden bg-primary-1">
      <div className="absolute inset-0">
        <Image
          src="/images/lanscape.JPG.webp"
          alt="Kegiatan Santri STTD Al-Busyro"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-1/85 via-primary-2/65 to-secondary-1/35" />
        <div className="absolute inset-0 bg-[#0f172a]/30" />
      </div>

      <Blob className="h-[420px] w-[520px] -top-28 -left-24 bg-primary-4/50" />
      <Blob className="h-[360px] w-[460px] -bottom-24 -right-20 bg-secondary-3/40 animate-blob-delay" />
      <Blob className="h-[220px] w-[220px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 blur-2xl opacity-20 animate-float" />

      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative flex min-h-[520px] flex-col items-center justify-center px-6 pt-28 pb-20 sm:min-h-[560px]">
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-secondary-3" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary-2" />
          </span>
          <span className="text-[11px] font-semibold tracking-[0.14em] text-white/90 uppercase">
            Kurikulum & Aktivitas · Surakarta
          </span>
        </div>

        <h1 className="animate-fade-up animation-delay-150 mt-5 text-center font-display text-[34px] font-bold leading-[0.95] tracking-tight text-white sm:text-[46px] lg:text-[54px]">
          Kegiatan
          <span className="relative mx-2 inline-block">
            <span className="relative z-10 bg-gradient-to-r from-secondary-3 to-secondary-1 bg-clip-text text-transparent">
              Santri
            </span>
            <span className="absolute bottom-1 left-0 h-[10px] w-full -rotate-1 bg-secondary-3/30 -z-0" />
          </span>
        </h1>

        <p className="animate-fade-up animation-delay-300 mt-4 max-w-xl text-center text-[14px] leading-relaxed text-white/80 sm:text-[15px]">
          Beragam kegiatan membentuk karakter, keberanian, dan potensi — di luar kelas, di dalam adab.
        </p>

        <div className="animate-fade-up animation-delay-500 mt-7 flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-[12px] font-medium tracking-wide text-white/70">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold tracking-wide text-primary-1">
              Kegiatan
            </span>
          </div>
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          <a
            href="#aktivitas"
            className="group inline-flex items-center gap-2 rounded-full bg-secondary-1 px-5 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-secondary-1/30 transition hover:-translate-y-0.5 hover:bg-secondary-2 hover:shadow-xl active:translate-y-0"
          >
            Lihat Agenda
            <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
          </a>
        </div>

        <div className="animate-scale-in animation-delay-700 mt-10 hidden items-center gap-6 rounded-2xl border border-white/15 bg-white/10 px-6 py-3 backdrop-blur-md sm:flex">
          {[
            { v: "11", l: "Aktivitas" },
            { v: "4", l: "Kategori" },
            { v: "Mutqin", l: "Pembinaan" },
          ].map((s, i) => (
            <div key={s.l} className="flex items-center gap-6">
              {i !== 0 && <span className="h-8 w-px bg-white/15" />}
              <div className="text-center">
                <p className="font-display text-[16px] font-bold leading-none text-white">{s.v}</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">{s.l}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 leading-none">
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="h-[48px] w-full sm:h-[64px]">
          <path
            d="M0 32 Q 180 64 360 32 T 720 32 T 1080 32 T 1440 32 L 1440 64 L 0 64 Z"
            className="fill-white"
          />
          <path
            d="M0 36 Q 180 60 360 36 T 720 36 T 1080 36 T 1440 36"
            className="fill-secondary-3/20"
          />
        </svg>
      </div>
    </section>
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
    <section className="relative overflow-hidden border-b border-stone-200 bg-white">
      <Blob className="h-[420px] w-[420px] -top-24 right-0 bg-primary-4/15 blur-[70px]" />
      <Blob className="h-[360px] w-[360px] -bottom-20 left-0 bg-secondary-3/12 blur-[60px] animate-blob-delay" />

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
    <section className="relative overflow-hidden bg-[#FDF9F3]">
      <Blob className="h-[600px] w-[600px] -top-20 -right-20 bg-primary-4/15 blur-[80px]" />
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
        <HeroKegiatan />
        <AktivitasSection />
        <ArchiveSection />
        <KegiatanClosing />
      </main>
      <Footer />
    </>
  );
}
