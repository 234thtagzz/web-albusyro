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
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Quote,
  Eye,
  Target,
  CheckCircle2,
  ArrowDown,
  Star,
  HeartHandshake,
  Leaf,
} from "lucide-react";

/* ────────────────────────────────────────────────
   Shared decorative blobs — reusable bercak hiasan
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

// ─── Hero ───────────────────────────────────────
function HeroProfil() {
  return (
    <section className="relative overflow-hidden bg-primary-1">
      {/* bg image */}
      <div className="absolute inset-0">
        <Image
          src="/images/lanscape.JPG.webp"
          alt="STTD Al-Busyro"
          fill
          priority
          className="object-cover"
        />
        {/* tinted overlay — emerald + amber mix */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-1/80 via-primary-2/60 to-secondary-1/35" />
        <div className="absolute inset-0 bg-[#0f172a]/35" />
      </div>

      {/* bercak hiasan — large blurred blobs */}
      <Blob className="h-[420px] w-[520px] -top-28 -left-24 bg-primary-4/50" />
      <Blob className="h-[360px] w-[460px] -bottom-24 -right-20 bg-secondary-3/40 animate-blob-delay" />
      <Blob className="h-[220px] w-[220px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 blur-2xl opacity-20 animate-float" />

      {/* subtle dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative flex min-h-[520px] flex-col items-center justify-center px-6 pt-28 pb-20 sm:min-h-[560px]">
        {/* top badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-secondary-3" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary-2" />
          </span>
          <span className="text-[11px] font-semibold tracking-[0.14em] text-white/90 uppercase">
            Sekolah Tahfizh · Surakarta
          </span>
        </div>

        <h1 className="animate-fade-up animation-delay-150 mt-5 text-center font-display text-[34px] font-bold leading-[0.95] tracking-tight text-white sm:text-[46px] lg:text-[54px]">
          Profil
          <span className="relative mx-2 inline-block">
            <span className="relative z-10 bg-gradient-to-r from-secondary-3 to-secondary-1 bg-clip-text text-transparent">
              Al-Busyro
            </span>
            {/* underline brush */}
            <span className="absolute bottom-1 left-0 h-[10px] w-full -rotate-1 bg-secondary-3/30 -z-0" />
          </span>
        </h1>

        <p className="animate-fade-up animation-delay-300 mt-4 max-w-xl text-center text-[14px] leading-relaxed text-white/80 sm:text-[15px]">
          Membumikan Al-Qur&apos;an — mencetak generasi qur&apos;ani yang fasih bacaannya,
          mutqin hafalannya, dan mulia adabnya.
        </p>

        {/* breadcrumb + cta row */}
        <div className="animate-fade-up animation-delay-500 mt-7 flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-[12px] font-medium tracking-wide text-white/70">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold tracking-wide text-primary-1">
              Profil
            </span>
          </div>
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          <a
            href="#sejarah"
            className="group inline-flex items-center gap-2 rounded-full bg-secondary-1 px-5 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-secondary-1/30 transition hover:-translate-y-0.5 hover:bg-secondary-2 hover:shadow-xl active:translate-y-0"
          >
            Jelajahi Kisah Kami
            <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
          </a>
        </div>

        {/* floating stats pill */}
        <div className="animate-scale-in animation-delay-700 mt-10 hidden items-center gap-6 rounded-2xl border border-white/15 bg-white/10 px-6 py-3 backdrop-blur-md sm:flex">
          {[
            { v: "6 thn", l: "Program SD" },
            { v: "18-22", l: "Juz target" },
            { v: "Mitqin", l: "Hafalan" },
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

      {/* wave divider bottom */}
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

// ─── Sejarah — tatanan asimetris + bercak ──────
function SejarahSection() {
  const storyParagraphs = [
    "Sekolah Tahfizhul Qur'an Tingkat Dasar, atau lebih dikenal dengan STTD Al-Busyro, merupakan lembaga pendidikan Islam yang didirikan sebagai salah satu wujud cita-cita dan harapan Ust. Abu Hurri Al-Qosimi dalam rangka membumikan Al-Qur'an.",
    "Sebagai pendiri STTD Al-Busyro sekaligus penggagas Metode Al-Qosimi, beliau mengembangkan pendidikan yang menempatkan Al-Qur'an sebagai prioritas utama dalam proses pembelajaran. STTD Al-Busyro merupakan sekolah setingkat SD yang memberikan perhatian khusus terhadap pendidikan Al-Qur'an.",
    "Kegiatan Tahfizh Al-Qur'an menjadi prioritas utama, dengan perhatian tidak hanya pada jumlah hafalan, tetapi juga pada kelancaran dan kemantapan hafalan (mutqin). Di samping pendidikan Al-Qur'an, STTD Al-Busyro tetap memberikan pembelajaran umum sebagai bekal bagi peserta didik.",
    "Dengan demikian, pendidikan di STTD Al-Busyro diarahkan untuk membentuk generasi yang tidak hanya memiliki hafalan Al-Qur'an, tetapi juga memiliki bacaan yang baik, adab yang mulia, wawasan yang memadai, dan kesiapan untuk bersaing di masa depan.",
  ];

  const milestones = [
    { year: "2014", label: "Berdiri", color: "bg-primary-1" },
    { year: "2018", label: "Akreditasi", color: "bg-primary-2" },
    { year: "2021", label: "Ekspansi", color: "bg-secondary-1" },
    { year: "2024", label: "Berkembang", color: "bg-secondary-2" },
  ];

  return (
    <section id="sejarah" className="relative overflow-hidden border-b border-stone-200 bg-white">
      {/* bercak hiasan background */}
      <Blob className="h-[500px] w-[600px] -top-32 -right-40 bg-primary-4/25 blur-[80px]" />
      <Blob className="h-[360px] w-[360px] -bottom-20 -left-28 bg-secondary-3/20 blur-[70px] animate-blob-delay" />
      <div
        aria-hidden
        className="pointer-events-none absolute right-10 top-24 hidden h-24 w-24 opacity-20 lg:block animate-float-slow"
      >
        <div className="h-full w-full rounded-[32px] rotate-12 border-2 border-dashed border-secondary-3" />
      </div>

      {/* header strip — diagonal accent */}
      <div className="relative overflow-hidden border-b border-stone-100 bg-gradient-to-r from-primary-1 via-primary-2 to-secondary-1/70">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[repeating-linear-gradient(135deg,transparent_0_12px,white_12px_13px)]" />
        </div>
        <Blob className="h-40 w-64 -top-10 right-10 bg-white/15 blur-2xl opacity-40" />
        <div className="container-custom relative py-7 sm:py-9">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 backdrop-blur">
            <Star className="h-3.5 w-3.5 text-secondary-3 fill-secondary-3" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">Profil & Sejarah</span>
          </div>
          <h2 className="font-display mt-3 text-[26px] font-bold tracking-tight text-white sm:text-[32px] lg:text-[38px]">
            Perjalanan STTD Al-Busyro
          </h2>
          <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-white/80">
            Dari mimpi membumikan Al-Qur&apos;an hingga menjadi sekolah rujukan tahfizh tingkat dasar.
          </p>
        </div>
      </div>

      <div className="container-custom relative py-12 sm:py-16 lg:py-20">
        {/* top: tatanan baru — image kiri (sticky) + teks kanan */}
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-10">
          {/* left — visual stack (asimetris) */}
          <div className="relative lg:col-span-5 lg:sticky lg:top-24">
            <div className="relative mx-auto w-full max-w-[360px] lg:mx-0">
              {/* decorative frame behind */}
              <div className="absolute -left-4 -top-4 h-full w-full rounded-[36px] border-2 border-secondary-3/30 bg-secondary-3/5 rotate-1" />
              <div className="absolute -right-3 -bottom-3 h-full w-full rounded-[36px] bg-primary-4/20 -rotate-1" />

              {/* main arch image */}
              <div className="relative overflow-hidden rounded-t-[160px] rounded-b-[28px] border-[6px] border-white bg-stone-100 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.3)]">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/images/halaqoh quran.png"
                    alt="Halaqah Al-Qur'an STTD Al-Busyro"
                    fill
                    className="object-cover object-top transition duration-700 hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-1/30 via-transparent to-transparent" />
                </div>
                {/* top accent bar */}
                <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-primary-1 via-secondary-1 to-primary-4" />
              </div>

              {/* floating badges — with transform on hover */}
              <div className="animate-float absolute -right-2 top-10 rounded-2xl border border-white bg-white px-3.5 py-2 shadow-xl">
                <p className="text-[10px] font-bold uppercase tracking-wide text-secondary-1">Metode</p>
                <p className="font-display text-[12px] font-bold leading-none text-primary-1">Al-Qosimi</p>
              </div>
              <div className="animate-float animation-delay-1000 absolute -left-3 bottom-16 rounded-2xl border border-white bg-primary-1 px-3.5 py-2.5 shadow-xl">
                <p className="text-[11px] font-bold leading-none text-white">Mutqin</p>
                <p className="text-[10px] font-medium text-white/70">Hafalan kuat</p>
              </div>
            </div>

            {/* method card below image */}
            <div className="group mx-auto mt-8 max-w-[360px] rounded-2xl border border-stone-200 bg-gradient-to-br from-white to-stone-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md lg:mx-0">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-1/10">
                  <BookOpen className="h-4 w-4 text-secondary-1" />
                </span>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-1">Metode Pembelajaran</p>
              </div>
              <p className="text-[12.5px] leading-[1.75] text-stone-600">{school.method.description}</p>
            </div>
          </div>

          {/* right — teks + quote + story */}
          <div className="space-y-6 lg:col-span-7">
            {/* founder pill — with secondary accent */}
            <div className="group flex items-center gap-4 rounded-2xl border border-primary-1/10 bg-gradient-to-r from-primary-1/[0.06] to-secondary-3/10 px-5 py-4 shadow-sm transition hover:border-secondary-3/30 hover:shadow-md">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-1 to-primary-2 text-white shadow-md transition group-hover:rotate-3">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-1">Sang Pendiri</p>
                <p className="font-display text-[16px] font-bold leading-tight text-primary-1">
                  {school.method.founder}
                </p>
                <p className="text-[11px] text-stone-500">Penggagas Metode Al-Qosimi</p>
              </div>
              <Sparkles className="ml-auto hidden h-5 w-5 text-secondary-3/50 sm:block animate-float" />
            </div>

            {/* pull quote — secondary left border + subtle secondary bercak */}
            <blockquote className="relative overflow-hidden rounded-2xl border border-secondary-3/20 bg-gradient-to-br from-secondary-3/10 via-primary-3/5 to-white px-6 py-5">
              <Blob className="h-20 w-20 -top-6 -right-6 bg-secondary-1/15 blur-xl opacity-60" />
              <Quote className="absolute right-4 top-3 h-10 w-10 text-secondary-3/15" />
              <p className="relative text-[14px] font-medium italic leading-relaxed text-primary-1 sm:text-[15px]">
                &ldquo;Membumikan Al-Qur&apos;an — menjadikannya hidup dalam hafalan, bacaan, dan akhlaq
                setiap anak didik.&rdquo;
              </p>
              <p className="relative mt-2 text-[11px] font-semibold tracking-wide text-secondary-1">
                — Ust. Abu Hurri Al-Qosimi Al-Hafidz
              </p>
            </blockquote>

            {/* story paragraphs — numbered accent */}
            <div className="space-y-4">
              {storyParagraphs.map((para, i) => (
                <div key={i} className="group flex gap-4">
                  <span className="mt-1 hidden h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-1 text-[11px] font-bold text-white sm:flex">
                    {i + 1}
                  </span>
                  <p className="flex-1 rounded-xl border border-transparent px-3 py-2 text-[13.5px] leading-[1.85] text-stone-600 transition group-hover:border-stone-100 group-hover:bg-stone-50 sm:text-[14px]">
                    {i === 0 && (
                      <span className="float-left mr-2 mt-0.5 font-display text-[36px] font-bold leading-none text-primary-1">
                        S
                      </span>
                    )}
                    {para}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* milestone — cards, not dots */}
        <div className="mt-14 grid gap-3 sm:grid-cols-4">
          {milestones.map((m, i) => (
            <div
              key={m.year}
              className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div
                className={`absolute left-0 top-0 h-1 w-full ${m.color} transition group-hover:h-1.5`}
              />
              <p className="font-display text-[22px] font-bold leading-none text-primary-1">{m.year}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-secondary-1">{m.label}</p>
              <div className="mt-3 h-px w-full bg-stone-100" />
              <p className="mt-2 text-[11px] leading-snug text-stone-500">Jejak pengabdian yang terus bertumbuh.</p>
            </div>
          ))}
        </div>

        {/* 3 highlight — warna variatif */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: GraduationCap,
              title: "Tahfizh Intensif",
              desc: "Prioritas hafalan mutqin & fasih, bukan sekadar kuantitas.",
              accent: "from-primary-1 to-primary-3",
              bg: "bg-primary-1/5 border-primary-1/15 hover:border-primary-1/30",
            },
            {
              icon: ShieldCheck,
              title: "Kurikulum Terpadu",
              desc: "Dipadukan dengan kurikulum Kementerian Agama (Madrasah).",
              accent: "from-secondary-1 to-secondary-3",
              bg: "bg-secondary-1/5 border-secondary-1/15 hover:border-secondary-1/30",
            },
            {
              icon: HeartHandshake,
              title: "Lingkungan Islami",
              desc: "Tumbuh kembang anak sesuai fitrah dan potensi dari Allah.",
              accent: "from-primary-2 to-primary-4",
              bg: "bg-primary-4/15 border-primary-4/30 hover:border-primary-4/50",
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`group flex gap-4 rounded-2xl border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${item.bg}`}
            >
              <div
                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm transition group-hover:scale-110 group-hover:rotate-3 ${item.accent}`}
              >
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-primary-1">{item.title}</p>
                <p className="mt-1 text-[12px] leading-[1.65] text-stone-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Motto · Visi · Misi · Kata Mutiara ─────────
function MottoVisiMisiSection() {
  const quotes = [
    "Al-Qur'an adalah cahaya yang menerangi setiap langkah kehidupan.",
    "Hafalan tanpa pemahaman adalah kulit tanpa isi; bekali keduanya.",
    "Didiklah anak dengan Al-Qur'an sebelum dunia mendidik mereka dengan selainnya.",
  ];

  return (
    <section className="relative overflow-hidden border-b border-stone-200 bg-[#FDF9F3]">
      <Blob className="h-[600px] w-[600px] -top-40 -left-40 bg-primary-4/20 blur-[90px]" />
      <Blob className="h-[500px] w-[500px] -bottom-40 -right-20 bg-secondary-3/15 blur-[80px] animate-blob-delay" />

      {/* Motto banner — gradient mesh */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-1 via-primary-2 to-secondary-1 px-6 py-14 sm:py-16 text-center">
        <Blob className="h-64 w-64 -top-10 left-10 bg-white/10 blur-2xl" />
        <Blob className="h-48 w-48 -bottom-6 right-10 bg-secondary-3/30 blur-2xl animate-blob-delay" />
        {/* pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1.5px, transparent 0)`,
            backgroundSize: "18px 18px",
          }}
        />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur">
            <Leaf className="h-3.5 w-3.5 text-secondary-3" />
            Motto Sekolah
          </span>
          <p className="font-display mx-auto mt-4 max-w-2xl text-[24px] font-bold leading-snug tracking-tight text-white sm:text-[32px] lg:text-[38px]">
            &ldquo;{school.motto}&rdquo;
          </p>
          <div className="mx-auto mt-6 flex max-w-xs items-center justify-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/30" />
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-primary-1">
              <Star className="h-3.5 w-3.5 fill-primary-1" />
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/30" />
          </div>
        </div>
      </div>

      <div className="container-custom relative py-12 sm:py-16 lg:py-20 space-y-14">
        {/* Visi + Misi — tatanan overlap */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Visi */}
          <div className="group relative overflow-hidden rounded-[24px] border border-primary-1/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary-3/10 blur-xl transition group-hover:bg-primary-3/15" />
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary-1 to-primary-4" />
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-1 to-primary-3 text-white shadow-md transition group-hover:rotate-6">
                <Eye className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-1">Visi</p>
                <p className="font-display text-[15px] font-bold text-primary-1">Tujuan Utama Kami</p>
              </div>
            </div>
            <p className="relative mt-5 text-[14.5px] font-medium leading-[1.8] text-stone-700">
              {school.vision}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary-1/5 px-3 py-1 text-[11px] font-semibold text-primary-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Satu visi, satu langkah
            </div>
          </div>

          {/* Misi */}
          <div className="group relative overflow-hidden rounded-[24px] border border-secondary-1/15 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-secondary-3/20 blur-xl transition group-hover:bg-secondary-3/30" />
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-secondary-1 to-secondary-3" />
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-secondary-1 to-secondary-2 text-white shadow-md transition group-hover:rotate-6">
                <Target className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-1">Misi</p>
                <p className="font-display text-[15px] font-bold text-primary-1">Langkah Nyata Kami</p>
              </div>
            </div>
            <ol className="mt-5 space-y-3">
              {school.mission.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-transparent px-2 py-1.5 transition hover:border-stone-100 hover:bg-stone-50"
                >
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-secondary-1 text-[11px] font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="text-[13px] leading-[1.7] text-stone-700">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Kata Mutiara — kartu miring bervariasi */}
        <div>
          <div className="mx-auto max-w-xl text-center">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-secondary-1">
              Kata Mutiara
            </p>
            <h3 className="font-display mt-1 text-[22px] font-bold tracking-tight text-primary-1 sm:text-[26px]">
              Dari Sang Pendiri
            </h3>
            <p className="mt-1 text-[12px] text-stone-500">{school.method.founder}</p>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-primary-1 to-secondary-1" />
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {quotes.map((q, i) => (
              <div
                key={i}
                className={`group relative flex flex-col gap-4 rounded-[20px] border bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-xl hover:rotate-[0.5deg] ${
                  i === 1
                    ? "border-secondary-1/15 bg-gradient-to-br from-secondary-3/5 to-white sm:-rotate-1 sm:translate-y-2"
                    : i === 0
                      ? "border-primary-1/10 sm:rotate-1"
                      : "border-primary-4/20 bg-primary-4/5 sm:rotate-[0.5deg]"
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-sm transition group-hover:scale-110 ${
                    i === 1 ? "bg-secondary-1" : "bg-primary-1"
                  }`}
                >
                  <Quote className="h-4 w-4" />
                </div>
                <p className="flex-1 text-[13.5px] font-medium italic leading-[1.8] text-stone-700">
                  &ldquo;{q}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-stone-400">#{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`h-1.5 w-8 rounded-full ${
                      i === 1 ? "bg-secondary-1/30" : "bg-primary-1/15"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Archive ────────────────────────────────────
const archiveTabs = ["Semua", "Tahfiz", "Pembelajaran", "Kegiatan", "Lingkungan"] as const;
type ArchiveTab = (typeof archiveTabs)[number];

const categoryColors: Record<string, string> = {
  Tahfiz: "bg-primary-1 text-white",
  Pembelajaran: "bg-secondary-1 text-white",
  Kegiatan: "bg-primary-4 text-primary-1 border border-primary-4",
  Prestasi: "bg-secondary-3 text-secondary-1 border border-secondary-3",
  Lingkungan: "bg-primary-2 text-white",
};

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
            <div className="absolute -left-4 -top-2 h-12 w-12 rounded-xl bg-secondary-3/15 rotate-6" />
            <p className="font-display relative text-[10px] font-bold uppercase tracking-[0.22em] text-secondary-1">
              Galeri & Arsip
            </p>
            <h2 className="font-display relative mt-1 text-[26px] font-bold tracking-tight text-primary-1 sm:text-[30px]">
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

        {/* bento-style grid — hover lift + rotate subtle */}
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
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-bold tracking-wide shadow-sm ${
                        categoryColors[item.category] ?? "bg-white text-stone-700"
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>
                  {/* numbered corner */}
                  <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[11px] font-bold text-primary-1 backdrop-blur">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <p className="font-display text-[15px] font-bold leading-snug text-white drop-shadow">
                      {item.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-white/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {active === "Semua" && (
            <div className="group flex flex-col justify-between rounded-[20px] border border-secondary-1/15 bg-gradient-to-br from-secondary-3/15 via-white to-primary-4/10 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-secondary-1 to-secondary-2 text-white shadow-md transition group-hover:rotate-6">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="font-display text-[16px] font-bold leading-snug text-primary-1">
                  &ldquo;{school.motto}&rdquo;
                </p>
                <p className="mt-3 text-[12.5px] leading-[1.75] text-stone-600">
                  Setiap langkah kecil hari ini menentukan masa depan mereka. Lingkungan Islami yang mendukung tumbuh
                  kembang sesuai fitrah.
                </p>
              </div>
              <p className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold tracking-wide text-secondary-1">
                STTD Al-Busyro — {school.city}
                <span className="h-px w-6 bg-secondary-1/30" />
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── MuseumInfo — Why Choose Us + pillars + activities ─────────────────
function MuseumInfo() {
  const why = school.whyChooseUs;
  const relasi = [
    { data: school.educationValues.relationWithAllah, icon: Sparkles },
    { data: school.educationValues.relationWithHumans, icon: HeartHandshake },
    { data: school.educationValues.relationWithNature, icon: Leaf },
  ];
  const relasiStyles = [
    {
      wrap: "bg-gradient-to-br from-primary-1/5 to-emerald-50 border-primary-1/15",
      badge: "bg-primary-1 text-white",
      dot: "bg-primary-1",
      iconBg: "bg-primary-1 text-white",
    },
    {
      wrap: "bg-gradient-to-br from-secondary-1/8 to-amber-50 border-secondary-1/15",
      badge: "bg-secondary-1 text-white",
      dot: "bg-secondary-1",
      iconBg: "bg-secondary-1 text-white",
    },
    {
      wrap: "bg-gradient-to-br from-primary-4/20 to-white border-primary-4/30",
      badge: "bg-primary-4 text-primary-1",
      dot: "bg-primary-4",
      iconBg: "bg-primary-4 text-primary-1",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#FDF9F3]">
      {/* bercak backdrop for whole section */}
      <Blob className="h-[700px] w-[700px] -top-40 left-1/2 -translate-x-1/2 bg-primary-4/12 blur-[90px]" />

      {/* Why Choose Us — band with diagonal + blobs */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-1 via-primary-2 to-primary-1 px-6 py-14 sm:py-18">
        <Blob className="h-72 w-72 -top-10 -left-10 bg-white/10 blur-2xl" />
        <Blob className="h-80 w-80 -bottom-16 -right-10 bg-secondary-3/20 blur-3xl animate-blob-delay" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient( -35deg, transparent 0 18px, white 18px 19px)`,
          }}
        />
        <div className="container-custom relative">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur">
              <Star className="h-3.5 w-3.5 fill-secondary-3 text-secondary-3" />
              Kenapa Kami
            </span>
            <h2 className="font-display mt-3 text-[26px] font-bold leading-tight tracking-tight text-white sm:text-[32px] lg:text-[36px]">
              {why.headline}
            </h2>
            <p className="mt-4 max-w-xl text-[14px] leading-[1.85] text-white/75">{why.description}</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {why.threeMainPoints.map((point, i) => (
              <div
                key={point.title}
                className="group relative overflow-hidden rounded-[20px] border border-white/10 bg-white/10 p-6 backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/15 hover:shadow-xl"
              >
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-secondary-3/20 blur-xl transition group-hover:bg-secondary-3/30" />
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[12px] font-bold text-primary-1 shadow-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-4 text-[16px] font-bold text-white">{point.title}</h3>
                <p className="mt-1 text-[11px] font-medium text-white/60">{point.subtitle}</p>
                <ul className="mt-4 space-y-2">
                  {point.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-secondary-3" />
                      <span className="text-[12.5px] leading-[1.65] text-white/85">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom relative space-y-16 py-14 sm:py-18">
        {/* 3 Pilar */}
        <div>
          <div className="mx-auto max-w-xl text-center">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-secondary-1">
              Nilai Pendidikan
            </p>
            <h2 className="font-display mt-1 text-[24px] font-bold tracking-tight text-primary-1 sm:text-[28px]">
              Tiga Pilar Relasi
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-[13px] leading-relaxed text-stone-500">
              Pendidikan holistik yang membentuk hubungan harmonis dengan Allah, sesama manusia, dan alam semesta.
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {relasi.map(({ data, icon: Icon }, i) => (
              <div
                key={data.title}
                className={`group relative overflow-hidden rounded-[20px] border p-6 shadow-sm transition hover:-translate-y-1.5 hover:shadow-lg ${relasiStyles[i].wrap}`}
              >
                <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/40 blur-xl" />
                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold ${relasiStyles[i].badge}`}>
                  <Icon className="h-3.5 w-3.5" />
                  Pilar {i + 1}
                </div>
                <h3 className="font-display mt-4 text-[14px] font-bold leading-snug text-primary-1">{data.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {data.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${relasiStyles[i].dot}`} />
                      <span className="text-[12.5px] text-stone-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Pilar */}
        <div>
          <div className="mx-auto max-w-xl text-center">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-secondary-1">
              Filosofi Pendidikan
            </p>
            <h2 className="font-display mt-1 text-[24px] font-bold tracking-tight text-primary-1 sm:text-[28px]">
              Enam Pilar Pembentuk Generasi
            </h2>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-secondary-1 to-primary-1" />
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {school.values.map((v, i) => {
              const Icon = iconMap[v.icon as IconName];
              const isSecondary = i % 2 === 1;
              return (
                <div
                  key={v.title}
                  className={`group flex gap-4 rounded-[20px] border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                    isSecondary ? "border-secondary-1/15 hover:border-secondary-1/30" : "border-primary-1/10 hover:border-primary-1/20"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl shadow-sm transition group-hover:scale-110 group-hover:rotate-3 ${
                      isSecondary
                        ? "bg-gradient-to-br from-secondary-1 to-secondary-2 text-white"
                        : "bg-gradient-to-br from-primary-1 to-primary-2 text-white"
                    }`}
                  >
                    {Icon ? <Icon className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-[11px] font-bold text-stone-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-display text-[14px] font-bold text-primary-1">{v.title}</p>
                    </div>
                    <p className="mt-1 text-[12px] leading-[1.7] text-stone-500">{v.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Aktivitas — tag cloud with varied colors */}
        <div className="relative overflow-hidden rounded-[24px] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <Blob className="h-40 w-40 -top-10 -right-10 bg-secondary-3/15 blur-2xl" />
          <Blob className="h-32 w-32 -bottom-6 -left-6 bg-primary-4/20 blur-xl animate-blob-delay" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
            <div className="sm:w-64 flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-1/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-secondary-1">
                <GraduationCap className="h-3.5 w-3.5" />
                Kegiatan
              </span>
              <h3 className="font-display mt-3 text-[20px] font-bold tracking-tight text-primary-1">
                Aktivitas Santri
              </h3>
              <p className="mt-2 text-[12.5px] leading-[1.7] text-stone-500">
                Beragam kegiatan membentuk karakter, keberanian, dan potensi di luar kelas.
              </p>
            </div>
            <div className="flex flex-1 flex-wrap gap-2">
              {school.activities.map((act, i) => {
                const variant =
                  i % 3 === 0
                    ? "border-primary-1/20 bg-primary-1/5 text-primary-1 hover:bg-primary-1 hover:text-white"
                    : i % 3 === 1
                      ? "border-secondary-1/20 bg-secondary-1/5 text-secondary-1 hover:bg-secondary-1 hover:text-white"
                      : "border-primary-4/30 bg-primary-4/15 text-primary-1 hover:bg-primary-1 hover:text-white";
                return (
                  <span
                    key={act}
                    className={`cursor-default rounded-full border px-4 py-1.5 text-[12px] font-bold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:rotate-[0.4deg] ${variant}`}
                  >
                    {act}
                  </span>
                );
              })}
            </div>
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
        <MottoVisiMisiSection />
        <ArchiveSection />
        <MuseumInfo />
      </main>
      <Footer />
    </>
  );
}
