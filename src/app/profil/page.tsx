import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { school } from "@/data/school";
import { iconMap, type IconName } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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

// satu kombinasi clean untuk badge + kotak icon di profil/kegiatan/beranda
const UNIFIED_ICON = "bg-primary-1 text-white";
const UNIFIED_BADGE =
  "border-primary-1/15 bg-primary-1/10 text-primary-1 hover:bg-primary-1/15";
const UNIFIED_DOT = "bg-primary-1";

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
    { year: "2014", label: "Berdiri" },
    { year: "2018", label: "Akreditasi" },
    { year: "2021", label: "Ekspansi" },
    { year: "2024", label: "Berkembang" },
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
            <Card className="group mx-auto mt-8 max-w-[360px] rounded-2xl border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md lg:mx-0">
              <CardContent className="p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg shadow-sm ${UNIFIED_ICON}`}>
                    <BookOpen className="h-4 w-4" />
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-1">Metode Pembelajaran</p>
                </div>
                <p className="text-[12.5px] leading-[1.75] text-stone-600">{school.method.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* right — teks + quote + story */}
          <div className="space-y-6 lg:col-span-7">
            {/* founder pill — satu palet */}
            <Card className="group rounded-2xl border-primary-1/10 bg-primary-1/[0.06] shadow-sm transition hover:border-primary-1/20 hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl shadow-md transition group-hover:scale-105 ${UNIFIED_ICON}`}>
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-1">Sang Pendiri</p>
                  <p className="font-display text-[16px] font-bold leading-tight text-primary-1">
                    {school.method.founder}
                  </p>
                  <p className="text-[11px] text-stone-500">Penggagas Metode Al-Qosimi</p>
                </div>
                <Sparkles className="ml-auto hidden h-5 w-5 text-primary-1/40 sm:block animate-float" />
              </CardContent>
            </Card>

            {/* pull quote — satu palet */}
            <Card className="relative overflow-hidden rounded-2xl border-primary-1/15 bg-primary-1/5">
              <CardContent className="relative p-6">
                <Blob className="h-20 w-20 -top-6 -right-6 bg-primary-1/10 blur-xl opacity-60" />
                <Quote className="absolute right-4 top-3 h-10 w-10 text-primary-1/10" />
                <p className="relative text-[14px] font-medium italic leading-relaxed text-primary-1 sm:text-[15px]">
                  &ldquo;Membumikan Al-Qur&apos;an — menjadikannya hidup dalam hafalan, bacaan, dan akhlaq setiap anak
                  didik.&rdquo;
                </p>
                <p className="relative mt-2 text-[11px] font-semibold tracking-wide text-primary-1">
                  — Ust. Abu Hurri Al-Qosimi Al-Hafidz
                </p>
              </CardContent>
            </Card>

            {/* story paragraphs — numbered accent */}
            <div className="space-y-3">
              {storyParagraphs.map((para, i) => (
                <Card key={i} className="group border-transparent bg-transparent shadow-none transition hover:border-stone-100 hover:bg-stone-50">
                  <CardContent className="flex gap-4 p-3">
                    <span className={`mt-1 hidden h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold sm:flex ${UNIFIED_ICON}`}>
                      {i + 1}
                    </span>
                    <p className="flex-1 text-[13.5px] leading-[1.85] text-stone-600 sm:text-[14px]">
                      {i === 0 && (
                        <span className="float-left mr-2 mt-0.5 font-display text-[36px] font-bold leading-none text-primary-1">
                          S
                        </span>
                      )}
                      {para}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* milestone — satu palet */}
        <div className="mt-14 grid gap-3 sm:grid-cols-4">
          {milestones.map((m) => (
            <Card
              key={m.year}
              className="group relative overflow-hidden rounded-2xl border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="absolute left-0 top-0 h-1 w-full bg-primary-1 transition group-hover:h-1.5" />
              <CardContent className="p-4">
                <p className="font-display text-[22px] font-bold leading-none text-primary-1">{m.year}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-1">{m.label}</p>
                <div className="mt-3 h-px w-full bg-stone-100" />
                <p className="mt-2 text-[11px] leading-snug text-stone-500">Jejak pengabdian yang terus bertumbuh.</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 3 highlight — satu palet */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: GraduationCap,
              title: "Tahfizh Intensif",
              desc: "Prioritas hafalan mutqin & fasih, bukan sekadar kuantitas.",
            },
            {
              icon: ShieldCheck,
              title: "Kurikulum Terpadu",
              desc: "Dipadukan dengan kurikulum Kementerian Agama (Madrasah).",
            },
            {
              icon: HeartHandshake,
              title: "Lingkungan Islami",
              desc: "Tumbuh kembang anak sesuai fitrah dan potensi dari Allah.",
            },
          ].map((item) => (
            <Card
              key={item.title}
              className="group rounded-2xl border-primary-1/15 bg-primary-1/5 shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:border-primary-1/30"
            >
              <CardContent className="flex gap-4 p-5">
                <div
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl shadow-sm transition group-hover:scale-105 ${UNIFIED_ICON}`}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-primary-1">{item.title}</p>
                  <p className="mt-1 text-[12px] leading-[1.65] text-stone-600">{item.desc}</p>
                </div>
              </CardContent>
            </Card>
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
          {/* Visi — satu palet */}
          <Card className="group relative overflow-hidden rounded-[24px] border-primary-1/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary-1/5 blur-xl transition group-hover:bg-primary-1/10" />
            <div className="absolute left-0 top-0 h-1 w-full bg-primary-1" />
            <CardContent className="p-7">
              <div className="flex items-center gap-3">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-md transition group-hover:scale-105 ${UNIFIED_ICON}`}>
                  <Eye className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-1">Visi</p>
                  <p className="font-display text-[15px] font-bold text-primary-1">Tujuan Utama Kami</p>
                </div>
              </div>
              <p className="relative mt-5 text-[14.5px] font-medium leading-[1.8] text-stone-700">
                {school.vision}
              </p>
              <Badge variant="outline" className={`mt-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${UNIFIED_BADGE}`}>
                <CheckCircle2 className="h-3.5 w-3.5" />
                Satu visi, satu langkah
              </Badge>
            </CardContent>
          </Card>

          {/* Misi — satu palet */}
          <Card className="group relative overflow-hidden rounded-[24px] border-primary-1/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary-1/5 blur-xl transition group-hover:bg-primary-1/10" />
            <div className="absolute left-0 top-0 h-1 w-full bg-primary-1" />
            <CardContent className="p-7">
              <div className="flex items-center gap-3">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-md transition group-hover:scale-105 ${UNIFIED_ICON}`}>
                  <Target className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-1">Misi</p>
                  <p className="font-display text-[15px] font-bold text-primary-1">Langkah Nyata Kami</p>
                </div>
              </div>
              <ol className="mt-5 space-y-3">
                {school.mission.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-transparent px-2 py-1.5 transition hover:border-stone-100 hover:bg-stone-50"
                  >
                    <span className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${UNIFIED_ICON}`}>
                      {i + 1}
                    </span>
                    <p className="text-[13px] leading-[1.7] text-stone-700">{item}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Kata Mutiara — kartu miring bervariasi */}
        <div>
          <div className="mx-auto max-w-xl text-center">
            <Badge variant="outline" className={`mx-auto rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${UNIFIED_BADGE}`}>
              Kata Mutiara
            </Badge>
            <h3 className="font-display mt-3 text-[22px] font-bold tracking-tight text-primary-1 sm:text-[26px]">
              Dari Sang Pendiri
            </h3>
            <p className="mt-1 text-[12px] text-stone-500">{school.method.founder}</p>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-primary-1" />
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {quotes.map((q, i) => (
              <Card
                key={i}
                className="group relative flex flex-col gap-4 rounded-[20px] border-primary-1/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <CardContent className="flex flex-1 flex-col gap-4 p-6">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-sm transition group-hover:scale-105 ${UNIFIED_ICON}`}>
                    <Quote className="h-4 w-4" />
                  </div>
                  <p className="flex-1 text-[13.5px] font-medium italic leading-[1.8] text-stone-700">
                    &ldquo;{q}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-stone-400">#{String(i + 1).padStart(2, "0")}</span>
                    <span className="h-1.5 w-8 rounded-full bg-primary-1/15" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MuseumInfo — Why Choose Us + pillars ─────────────────
function MuseumInfo() {
  const why = school.whyChooseUs;
  const relasi = [
    { data: school.educationValues.relationWithAllah, icon: Sparkles },
    { data: school.educationValues.relationWithHumans, icon: HeartHandshake },
    { data: school.educationValues.relationWithNature, icon: Leaf },
  ];
  const relasiStyles = [
    {
      wrap: "bg-primary-1/5 border-primary-1/15",
      badge: "bg-primary-1 text-white",
      dot: "bg-primary-1",
    },
    {
      wrap: "bg-primary-1/5 border-primary-1/15",
      badge: "bg-primary-1 text-white",
      dot: "bg-primary-1",
    },
    {
      wrap: "bg-primary-1/5 border-primary-1/15",
      badge: "bg-primary-1 text-white",
      dot: "bg-primary-1",
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
            <Badge variant="outline" className={`mx-auto rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${UNIFIED_BADGE}`}>
              Nilai Pendidikan
            </Badge>
            <h2 className="font-display mt-3 text-[24px] font-bold tracking-tight text-primary-1 sm:text-[28px]">
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
              return (
                <Card
                  key={v.title}
                  className="group rounded-[20px] border-primary-1/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:border-primary-1/20"
                >
                  <CardContent className="flex gap-4 p-5">
                    <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl shadow-sm transition group-hover:scale-105 ${UNIFIED_ICON}`}>
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
                  </CardContent>
                </Card>
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
        <MottoVisiMisiSection />
        <MuseumInfo />
      </main>
      <Footer />
    </>
  );
}
