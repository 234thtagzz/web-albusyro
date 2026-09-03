import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { school } from "@/data/school";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";

const UNIFIED_ICON = "bg-primary-1 text-white";
const UNIFIED_BADGE = "border-primary-1/15 bg-primary-1/10 text-primary-1";

const pillars = [
  {
    no: "01",
    title: "Al-Qur'an Berkualitas",
    description:
      "Bukan sekadar mengejar banyak hafalan — bacaan benar (Fasih), hafalan lancar 10–15 Juz mutqin, di bawah bimbingan Ust. Abu Hurri Al-Qosimi.",
  },
  {
    no: "02",
    title: "Adab",
    description:
      "Menghormati guru dan orang tua, menghormati majelis ilmu, dan disiplin beribadah — adab sebelum ilmu.",
  },
  {
    no: "03",
    title: "Legal Formal",
    description:
      "Ijazah resmi Kemenag (MI), memiliki NISN, dan kurikulum terpadu siap melanjutkan jenjang berikutnya.",
  },
];

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

export function Identity() {
  return (
    <section id="tentang" className="relative overflow-hidden border-b border-stone-200 bg-white">
      <Blob className="h-[500px] w-[600px] -top-32 -right-40 bg-primary-4/20 blur-[80px]" />
      <Blob className="h-[360px] w-[360px] -bottom-20 -left-28 bg-secondary-3/15 blur-[70px] animate-blob-delay" />

      {/* header strip — konsisten profil */}
      <div className="relative overflow-hidden border-b border-stone-100 bg-gradient-to-r from-primary-1 via-primary-2 to-secondary-1/70">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[repeating-linear-gradient(135deg,transparent_0_12px,white_12px_13px)]" />
        </div>
        <Blob className="h-40 w-64 -top-10 right-10 bg-white/15 blur-2xl opacity-40" />
        <div className="container-custom relative py-7 sm:py-9">
          <Badge variant="outline" className="inline-flex items-center gap-2 rounded-full border-white/20 bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur">
            Tentang Sekolah
          </Badge>
          <h2 className="font-display mt-3 text-[26px] font-bold tracking-tight text-white sm:text-[32px] lg:text-[38px]">
            Integrasi hafalan, adab, dan ilmu dalam satu madrasah
          </h2>
          <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-white/80">
            Awali langkah terbaik anak bersama Al-Qur&apos;an — mutqin hafalannya, baik adabnya, diakui legalitasnya.
          </p>
        </div>
      </div>

      <div className="container-custom relative py-12 sm:py-16 lg:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* narasi + pillars */}
          <div className="space-y-8 lg:col-span-7">
            <Reveal>
              <p className="text-[14px] leading-[1.85] text-stone-600">{school.longDescription}</p>
            </Reveal>

            <div className="space-y-3">
              {pillars.map((p) => (
                <Card key={p.no} className="group rounded-2xl border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:border-primary-1/20">
                  <CardContent className="flex gap-4 p-5">
                    <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-sm ${UNIFIED_ICON}`}>
                      {p.no}
                    </span>
                    <div>
                      <h3 className="font-display text-[15px] font-bold text-primary-1">{p.title}</h3>
                      <p className="mt-1 text-[13px] leading-[1.7] text-stone-600">{p.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button variant="outline" render={<Link href="/profil" />} className="rounded-full border-primary-1/15 bg-primary-1/5 text-primary-1 hover:bg-primary-1 hover:text-white">
              Selengkapnya tentang profil
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* visual stack — sama seperti profil */}
          <div className="relative lg:col-span-5">
            <Reveal delay={0.08} className="relative mx-auto w-full max-w-[360px] lg:mx-0">
              <div className="absolute -left-4 -top-4 h-full w-full rounded-[36px] border-2 border-primary-1/10 bg-primary-1/5 rotate-1" />
              <div className="absolute -right-3 -bottom-3 h-full w-full rounded-[36px] bg-primary-4/15 -rotate-1" />
              <div className="relative overflow-hidden rounded-t-[160px] rounded-b-[28px] border-[6px] border-white bg-stone-100 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.25)]">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/images/halaqoh quran.webp"
                    alt="Halaqah Al-Qur'an STTD Al-Busyro"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-1/20 via-transparent to-transparent" />
                </div>
                <div className="absolute left-0 right-0 top-0 h-1.5 bg-primary-1" />
              </div>
              <div className="animate-float absolute -right-2 top-10 rounded-2xl border border-white bg-white px-3.5 py-2 shadow-xl">
                <p className="text-[10px] font-bold uppercase tracking-wide text-primary-1">Metode</p>
                <p className="font-display text-[12px] font-bold leading-none text-primary-1">Al-Qosimi</p>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <Card className="relative z-10 mt-6 rounded-[20px] border-primary-1/10 bg-primary-1/5 shadow-sm">
                <CardContent className="p-6">
                  <Badge variant="outline" className={`mb-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${UNIFIED_BADGE}`}>
                    Visi Kami
                  </Badge>
                  <p className="font-display text-[14px] font-medium leading-[1.7] text-primary-1">{school.vision}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-lg shadow-sm ${UNIFIED_ICON}`}>
                      <BookOpen className="h-4 w-4" />
                    </span>
                    <span className="text-[11px] font-semibold text-stone-500">{school.method.founder} · {school.motto}</span>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
