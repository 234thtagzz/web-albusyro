import Link from "next/link";
import { GraduationCap, Home, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger } from "@/components/motion/reveal";
import { school } from "@/data/school";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const UNIFIED_ICON = "bg-primary-1 text-white";
const UNIFIED_BADGE = "border-primary-1/15 bg-primary-1/10 text-primary-1";
const extracurriculars = school.activities.slice(0, 8);
const remaining = school.activities.length - extracurriculars.length;
const legalityPoints = school.whyChooseUs.threeMainPoints[2].items;

export function ProgramsBento() {
  return (
    <section className="relative overflow-hidden border-t border-stone-200 bg-white">
      <div className="pointer-events-none absolute -top-20 right-0 h-[420px] w-[460px] rounded-full bg-primary-4/15 blur-[70px]" aria-hidden />
      <div className="container-custom section-spacing relative">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <SectionHeading
            badge="Program & Keunggulan"
            title="Program yang menumbuhkan — bukan sekadar menghafal"
            className="lg:col-span-7"
          />
          <RevealLink />
        </div>

        <Stagger className="mt-12 grid gap-4 lg:grid-cols-3" stagger={0.08}>
          {/* Kartu dominan — gradient primary, tetap satu palet */}
          <Card className="flex flex-col rounded-[24px] border-0 bg-primary-1 p-7 text-white shadow-md sm:p-9 lg:col-span-2 lg:row-span-2">
            <CardContent className="flex flex-col p-0">
              <Badge variant="outline" className="w-fit rounded-full border-white/20 bg-white/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
                Program Unggulan
              </Badge>
              <h3 className="font-display mt-5 text-2xl leading-tight sm:text-[2rem]">
                Tahfizhul Qur&apos;an Intensif dengan Metode Al&#8209;Qosimi
              </h3>
              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/80">
                Santri membaca ayat berulang hingga terbentuk gambaran kuat di ingatan, kemudian menghafalnya — metode
                yang diciptakan langsung oleh pendiri sekolah dan terbukti cocok untuk anak-anak hingga dewasa.
              </p>

              <ul className="mt-8 space-y-3">
                {school.method.variants.map((variant) => (
                  <li
                    key={variant.name}
                    className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur transition hover:bg-white/15 sm:flex-row sm:items-center sm:gap-5"
                  >
                    <Badge variant="outline" className="w-fit shrink-0 rounded-full border-white/20 bg-white px-3 py-1 text-[11px] font-bold tracking-wide text-primary-1">
                      {variant.name}
                    </Badge>
                    <span className="text-sm leading-relaxed text-white/90">{variant.detail}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-2.5 pt-8">
                <Badge className="rounded-full bg-white px-4 py-2 text-xs font-bold text-primary-1">
                  Target {school.programs.targetNonAsrama}
                </Badge>
                <Badge variant="outline" className="rounded-full border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white">
                  Asrama: {school.programs.targetAsrama}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Sekolah — satu palet */}
          <Card className="group flex flex-col rounded-[24px] border-stone-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:border-primary-1/20">
            <CardContent className="flex flex-1 flex-col p-0">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-sm transition group-hover:scale-105 ${UNIFIED_ICON}`}>
                <GraduationCap className="h-5 w-5" />
              </span>
              <h3 className="font-display mt-5 text-lg tracking-tight text-primary-1">{school.programs.sekolah.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">
                Pelajaran umum menunjang pengetahuan dan persiapan ujian kenegaraan, diseimbangkan dengan pendidikan agama.
              </p>
              <p className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-primary-1">
                Ijazah resmi Kemenag
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </p>
            </CardContent>
          </Card>

          {/* Asrama — satu palet */}
          <Card className="group flex flex-col rounded-[24px] border-stone-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:border-primary-1/20">
            <CardContent className="flex flex-1 flex-col p-0">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-sm transition group-hover:scale-105 ${UNIFIED_ICON}`}>
                <Home className="h-5 w-5" />
              </span>
              <h3 className="font-display mt-5 text-lg tracking-tight text-primary-1">{school.programs.asrama.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">
                Pembinaan intensif di bawah pengasuh untuk menambah kapasitas hafalan sekaligus melatih kemandirian santri.
              </p>
              <p className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-primary-1">
                Hingga 30 juz
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </p>
            </CardContent>
          </Card>

          {/* Ekstrakurikuler — Badge satu palet */}
          <Card className="rounded-[24px] border-stone-200 bg-white p-7 shadow-sm sm:p-9 lg:col-span-2">
            <CardContent className="p-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-sm ${UNIFIED_ICON}`}>
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <h3 className="font-display mt-5 text-lg tracking-tight text-primary-1">Ekstrakurikuler & Kegiatan</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-stone-600">
                    Pengembangan diri di luar kelas untuk membentuk santri yang percaya diri dan berkarakter.
                  </p>
                </div>
                <Button
                  nativeButton={false}
                  render={<Link href="/kegiatan" />}
                  variant="ghost"
                  className="hidden shrink-0 items-center gap-1.5 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-600 hover:border-primary-1/20 hover:text-primary-1 sm:inline-flex"
                >
                  Semua kegiatan
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {extracurriculars.map((activity) => (
                  <Badge key={activity} variant="outline" className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium ${UNIFIED_BADGE}`}>
                    {activity}
                  </Badge>
                ))}
                {remaining > 0 && (
                  <Badge variant="outline" className="rounded-full border-primary-1 bg-primary-1 px-3.5 py-1.5 text-[13px] font-bold text-white">
                    +{remaining} lainnya
                  </Badge>
                )}
              </ul>
            </CardContent>
          </Card>

          {/* Legalitas — satu palet */}
          <Card className="flex flex-col rounded-[24px] border-primary-1/15 bg-primary-1/5 p-7">
            <CardContent className="flex flex-1 flex-col p-0">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-sm ${UNIFIED_ICON}`}>
                <ShieldCheck className="h-5 w-5" />
              </span>
              <h3 className="font-display mt-5 text-lg tracking-tight text-primary-1">Legal & Diakui</h3>
              <ul className="mt-4 space-y-2.5">
                {legalityPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-stone-700">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary-1" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Stagger>
      </div>
    </section>
  );
}

function RevealLink() {
  return (
    <div className="lg:col-span-5 lg:justify-self-end">
      <Button
        nativeButton={false}
        render={<Link href="/kegiatan" />}
        variant="ghost"
        className="group inline-flex items-center gap-2 rounded-full text-[14px] font-semibold text-primary-1 hover:bg-primary-1/10"
      >
        Lihat semua kegiatan
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </Button>
    </div>
  );
}
