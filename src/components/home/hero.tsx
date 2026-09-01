import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { school } from "@/data/school";
import { waLink } from "@/data/home";

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

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary-1">
      {/* bg image */}
      <div className="absolute inset-0">
        <Image
          src="/images/lanscape.JPG.webp"
          alt="STTD Al-Busyro — Lingkungan belajar tahfizh"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-1/85 via-primary-2/60 to-secondary-1/35" />
        <div className="absolute inset-0 bg-[#0f172a]/35" />
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

      <div className="relative flex min-h-[540px] flex-col items-center justify-center px-6 pb-20 pt-28 sm:min-h-[600px]">
        {/* top badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-secondary-3" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary-2" />
          </span>
          <span className="text-[11px] font-semibold tracking-[0.14em] text-white/90 uppercase">
            PPDB 2026/2027 · Sukoharjo — Jawa Tengah
          </span>
        </div>

        <h1 className="animate-fade-up animation-delay-150 mt-5 text-center font-display text-[30px] font-bold leading-[0.95] tracking-tight text-white sm:text-[44px] lg:text-[52px]">
          Membentuk
          <br />
          <span className="block">Generasi Qur&apos;ani</span>
          <span className="relative mt-1 inline-block">
            <span className="relative z-10 bg-gradient-to-r from-secondary-3 to-secondary-1 bg-clip-text text-transparent">
              dengan Adab & Ilmu
            </span>
            <span className="absolute bottom-1 left-0 h-[10px] w-full -rotate-1 bg-secondary-3/30 -z-0" />
          </span>
        </h1>

        <p className="animate-fade-up animation-delay-300 mt-4 max-w-2xl text-center text-[14px] leading-relaxed text-white/80 sm:text-[15px]">
          {school.tagline} — {school.description}
        </p>
        <p className="animate-fade-up animation-delay-300 mt-2 max-w-xl text-center text-[13px] leading-relaxed text-white/65">
          Pendidikan tahfizhul Qur&apos;an tingkat dasar yang memadukan hafalan mutqin, adab, dan kurikulum terpadu Kemenag.
        </p>

        {/* CTA row — sesuai RPD 9: Kenali + PPDB */}
        <div className="animate-fade-up animation-delay-500 mt-7 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/profil"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-[13px] font-bold text-primary-1 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
          >
            Kenali STTD Al-Busyro
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <Link
            href={waLink("Assalamualaikum, saya ingin mendaftarkan putra/putri saya ke STTD Al-Busyro.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-secondary-1 px-6 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-secondary-1/30 transition hover:-translate-y-0.5 hover:bg-secondary-2 hover:shadow-xl active:translate-y-0"
          >
            Informasi PPDB
            <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
          </Link>
        </div>

        {/* stats pill — sama seperti profil */}
        <div className="animate-scale-in animation-delay-700 mt-10 hidden items-center gap-6 rounded-2xl border border-white/15 bg-white/10 px-6 py-3 backdrop-blur-md sm:flex">
          {[
            { v: "6 thn", l: "Program SD" },
            { v: "10–15", l: "Juz Mutqin" },
            { v: "Adab", l: "Sebelum Ilmu" },
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
