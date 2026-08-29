"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { school } from "@/data/school";
import { galleryItems } from "@/data/gallery";
import { iconMap, type IconName } from "@/lib/icons";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  BookOpen,
  Heart,
  GraduationCap,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

// ─── Hero: replica reference — full bleed museum hall, centered white title + breadcrumb
function HeroProfil() {
  return (
    <section className="relative overflow-hidden">
      {/* bg image + dark overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/lanscape.JPG.webp"
          alt="STTD Al-Busyro"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0f172a]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>

      {/* content centered like "Curiosity Welcome You" */}
      <div className="relative flex min-h-[380px] flex-col items-center justify-center px-6 pt-24 pb-16 sm:min-h-[420px] sm:pt-28">
        <p className="font-display text-center text-[28px] font-bold tracking-tight text-white sm:text-[36px] lg:text-[42px]">
          Profil Al-Busyro
        </p>
        <p className="mt-1 text-center text-[13px] font-medium tracking-[0.18em] text-white/80">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="mx-1.5 text-white/60">/</span>
          <span className="text-white">Profil</span>
        </p>
      </div>
    </section>
  );
}

// ─── Founder / Sejarah — replica "Alexandros Magnus" section
function SejarahSection() {
  const [idx, setIdx] = useState(0);
  const variants = school.method.variants;
  const current = variants[idx];

  const prev = () => setIdx((p) => (p === 0 ? variants.length - 1 : p - 1));
  const next = () => setIdx((p) => (p === variants.length - 1 ? 0 : p + 1));

  return (
    <section className="border-b border-stone-200 bg-white">
      <div className="container-custom py-10 sm:py-14 lg:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-6">
          {/* left text like Alexandros Magnus */}
          <div className="lg:col-span-7">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C2A36B]">
              Sang Pendiri
            </p>
            <h2 className="font-display mt-1 text-[22px] font-bold tracking-tight text-[#C2A36B] sm:text-[26px]">
              {school.method.founder}
            </h2>
            <p className="mt-3 text-[13px] leading-[1.85] text-stone-600 sm:text-[14px]">
              {school.method.description}
              {" — "}
              Lahir dari keprihatinan akan kebutuhan generasi yang{" "}
              <em className="font-medium text-stone-800">fasih bacaannya, mutqin hafalannya, baik adabnya</em>.
              Metode ini tidak sekadar menghafal, melainkan membentuk gambaran kuat di ingatan melalui pengulangan bacaan yang
              terukur, sehingga hafalan melekat kokoh dan tahan lama — telah terbukti cocok untuk anak-anak hingga dewasa.
            </p>

            {/* method variant card + controls like < > gold circles */}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="Sebelumnya"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C2A36B] text-white shadow-sm transition hover:bg-[#b3925a]"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <div className="flex-1 rounded-xl border border-amber-100 bg-amber-50/60 px-4 py-3">
                <p className="font-display text-[12px] font-bold tracking-wide text-[#8a6d2b]">
                  {current.name}{" "}
                  <span className="font-sans text-[12px] font-normal text-stone-600">— {current.detail}</span>
                </p>
              </div>
              <button
                onClick={next}
                aria-label="Berikutnya"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C2A36B] text-white shadow-sm transition hover:bg-[#b3925a]"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mt-2 text-right text-[11px] tracking-wide text-stone-400">
              {idx + 1} / {variants.length} — {school.method.name}
            </p>
          </div>

          {/* right bust — pill/arch shape like statue */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative">
              {/* subtle double shadow like reference */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-[170px] rounded-b-[32px] bg-stone-200/70 blur-[1px]" />
              <div className="relative h-[360px] w-[280px] overflow-hidden rounded-t-[170px] rounded-b-[32px] border-[7px] border-white bg-stone-100 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.35)] sm:h-[400px] sm:w-[300px]">
                <Image
                  src="/images/halaqoh quran.png"
                  alt="Halaqah Al-Qur'an STTD Al-Busyro"
                  fill
                  className="object-cover object-top"
                />
                {/* soft inner vignette */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
              </div>
              {/* floating badge like museum label */}
              <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-stone-200 bg-white px-3.5 py-1.5 shadow-md">
                <BookOpen className="h-3.5 w-3.5 text-[#C2A36B]" />
                <span className="text-[11px] font-semibold tracking-wide text-stone-700">Metode Al-Qosimi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery Archive — replica "Discover the extraordinary / From Our Gallery" + masonry
const archiveTabs = ["Semua", "Tahfiz", "Pembelajaran", "Kegiatan", "Lingkungan"] as const;
type ArchiveTab = (typeof archiveTabs)[number];

function ArchiveSection() {
  const [active, setActive] = useState<ArchiveTab>("Semua");

  const filtered =
    active === "Semua" ? galleryItems : galleryItems.filter((g) => g.category === active);

  return (
    <section className="bg-[#FDF9F3] sm:bg-white">
      <div className="container-custom py-10 sm:py-14">
        {/* header like reference: small gold + bold, tabs right */}
        <div className="flex flex-col gap-4 border-b border-stone-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display leading-none">
            <span className="block text-[12px] font-medium tracking-[0.14em] text-[#C2A36B]">Menelusuri Jejak</span>
            <span className="mt-1 block text-[20px] font-bold tracking-tight text-stone-900 sm:text-[22px]">
              Dari Arsip Al-Busyro
            </span>
          </h2>
          <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-[12px]">
            {archiveTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-2 py-1 font-medium transition-colors ${
                  active === tab ? "text-[#C2A36B]" : "text-stone-500 hover:text-stone-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* masonry — CSS columns like reference tight gaps */}
        <div className="mt-4 columns-1 gap-2 sm:columns-2 lg:columns-3">
          {filtered.map((item, i) => {
            // inject highlight card in middle (reference: white card over blue image)
            const isHighlight = i === 2 && active === "Semua";
            return (
              <div key={item.id} className="mb-2 break-inside-avoid">
                <div className="group relative overflow-hidden bg-stone-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    width={600}
                    height={400}
                    className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 transition group-hover:opacity-100">
                    <p className="text-[12px] font-semibold leading-tight text-white">{item.title}</p>
                    <p className="text-[11px] text-white/80">{item.category}</p>
                  </div>

                  {/* white overlay card — replica "Original oil painting. Modern Impression" */}
                  {isHighlight && (
                    <div className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-stone-200 bg-white/95 px-4 py-3 text-center shadow-lg backdrop-blur">
                      <MapPin className="mx-auto h-3.5 w-3.5 text-[#C2A36B]" />
                      <p className="mt-1 font-display text-[11px] font-semibold leading-tight text-stone-800">
                        Fasih Bacaan, Mutqin Hafalan
                      </p>
                      <p className="text-[11px] leading-tight text-stone-500">Jejak Metode Al-Qosimi</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* extra amber quote card when Semua — adds vintage museum text block */}
          {active === "Semua" && (
            <div className="mb-2 break-inside-avoid">
              <div className="border border-amber-200 bg-[#FFF8EC] p-5">
                <Sparkles className="h-4 w-4 text-[#C2A36B]" />
                <p className="font-display mt-3 text-[13px] font-bold leading-snug text-stone-900">
                  “Bersama Mencetak Generasi Qur&apos;ani”
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-stone-600">
                  Setiap langkah kecil hari ini menentukan masa depan mereka. Lingkungan Islami yang mendukung tumbuh kembang sesuai
                  fitrah.
                </p>
                <p className="mt-3 text-[11px] font-semibold tracking-wide text-[#C2A36B]">— {school.motto}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Visi Misi + 6 Pilar + Why Choose Us — museum beige band below gallery
function MuseumInfo() {
  const why = school.whyChooseUs;
  return (
    <section className="bg-[#F8F5F0] sm:bg-[#FDF9F3]">
      <div className="container-custom py-12 sm:py-16">
        {/* Visi Misi frame */}
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C2A36B]">Arah & Tujuan</p>
            <h3 className="font-display mt-1 text-[22px] font-bold tracking-tight text-stone-900">Visi & Misi</h3>
            <div className="mt-5 space-y-4">
              <div className="rounded-[4px] border border-stone-200 bg-white p-5 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C2A36B]">Visi</p>
                <p className="font-display mt-1 text-[14px] font-semibold leading-snug text-stone-900">{school.vision}</p>
              </div>
              <div className="rounded-[4px] border border-stone-200 bg-white p-5 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C2A36B]">Misi</p>
                <ul className="mt-2 space-y-1.5">
                  {school.mission.map((m, i) => (
                    <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-stone-600">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#C2A36B]" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C2A36B]">Kenapa Memilih Kami</p>
            <h3 className="font-display mt-1 text-[22px] font-bold tracking-tight text-stone-900">{why.headline}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-stone-600">{why.description}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {why.threeMainPoints.map((p) => (
                <div key={p.title} className="rounded-[4px] border border-stone-200 bg-white p-4 shadow-sm">
                  <h4 className="font-display text-[13px] font-bold text-stone-900">{p.title}</h4>
                  <p className="mt-0.5 text-[11px] font-medium text-[#C2A36B]">{p.subtitle}</p>
                  <ul className="mt-3 space-y-1">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-1.5 text-[11.5px] leading-snug text-stone-600">
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-stone-300" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* education values 3 pillars */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                school.educationValues.relationWithAllah,
                school.educationValues.relationWithHumans,
                school.educationValues.relationWithNature,
              ].map((v) => (
                <div key={v.title} className="rounded-[4px] bg-stone-900 px-4 py-4 text-white">
                  <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-300">{v.title}</p>
                  <ul className="mt-2 space-y-1">
                    {v.items.map((it) => (
                      <li key={it} className="text-[11.5px] leading-snug text-stone-200">
                        • {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6 pilar filosofi */}
        <div className="mt-10 border-t border-stone-200 pt-8">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C2A36B]">Filosofi Pendidikan</p>
          <h3 className="font-display mt-1 text-[18px] font-bold text-stone-900">Enam Pilar Pembentuk Generasi</h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {school.values.map((v) => {
              const Icon = iconMap[v.icon as IconName];
              return (
                <div key={v.title} className="flex gap-3 rounded-[4px] border border-stone-200 bg-white p-4 shadow-sm">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-amber-50 text-[#C2A36B]">
                    {Icon ? <Icon className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
                  </span>
                  <div>
                    <p className="font-display text-[13px] font-bold text-stone-900">{v.title}</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-stone-600">{v.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" id="main-content">
        <HeroProfil />
        <SejarahSection />
        <ArchiveSection />
        <MuseumInfo />
      </main>
      <Footer />
    </>
  );
}
