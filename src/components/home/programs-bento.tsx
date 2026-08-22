import Link from "next/link";
import {
  GraduationCap,
  Home,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger } from "@/components/motion/reveal";
import { school } from "@/data/school";

const extracurriculars = school.activities.slice(0, 8);
const remaining = school.activities.length - extracurriculars.length;

const legalityPoints = school.whyChooseUs.threeMainPoints[2].items;

export function ProgramsBento() {
  return (
    <section className="border-t border-slate-200">
      <div className="container-custom section-spacing">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <SectionHeading
            badge="Program & Keunggulan"
            title="Program yang menumbuhkan — bukan sekadar menghafal"
            className="lg:col-span-7"
          />
          <RevealLink />
        </div>

        <Stagger className="mt-12 grid gap-4 lg:grid-cols-3" stagger={0.1}>
          {/* Kartu dominan */}
          <article className="flex flex-col rounded-[24px] bg-primary p-7 text-primary-foreground shadow-md sm:p-9 lg:col-span-2 lg:row-span-2">
            <span className="inline-flex w-fit items-center rounded-full border border-emerald-300/30 bg-emerald-700/40 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-50">
              Program Unggulan
            </span>
            <h3 className="font-display mt-5 text-2xl leading-tight sm:text-[2rem]">
              Tahfizhul Qur&rsquo;an Intensif dengan Metode Al&#8209;Qosimi
            </h3>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-emerald-100/85">
              Santri membaca ayat berulang hingga terbentuk gambaran kuat di
              ingatan, kemudian menghafalnya — metode yang diciptakan langsung
              oleh pendiri sekolah dan terbukti cocok untuk anak-anak hingga
              dewasa.
            </p>

            <ul className="mt-8 space-y-3">
              {school.method.variants.map((variant) => (
                <li
                  key={variant.name}
                  className="group flex flex-col gap-1 rounded-2xl border border-emerald-300/20 bg-emerald-900/25 p-4 transition-colors hover:bg-emerald-900/45 sm:flex-row sm:items-center sm:gap-5"
                >
                  <span className="font-display shrink-0 text-sm tracking-wide text-amber-300">
                    {variant.name}
                  </span>
                  <span className="text-sm leading-relaxed text-emerald-50/90">
                    {variant.detail}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-2.5 pt-8">
              <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-emerald-900">
                Target {school.programs.targetNonAsrama}
              </span>
              <span className="rounded-full border border-emerald-300/30 px-4 py-2 text-xs font-medium text-emerald-50">
                Asrama: {school.programs.targetAsrama}
              </span>
            </div>
          </article>

          {/* Sekolah */}
          <article className="group flex flex-col rounded-[24px] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md">
            <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-emerald-50 text-emerald-700">
              <GraduationCap className="h-5 w-5" />
            </span>
            <h3 className="font-display mt-5 text-lg tracking-tight text-slate-900">
              {school.programs.sekolah.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
              Pelajaran umum menunjang pengetahuan dan persiapan ujian
              kenegaraan, diseimbangkan dengan pendidikan agama.
            </p>
            <p className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-emerald-800">
              Ijazah resmi Kemenag
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </p>
          </article>

          {/* Asrama */}
          <article className="group flex flex-col rounded-[24px] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md">
            <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-emerald-50 text-emerald-700">
              <Home className="h-5 w-5" />
            </span>
            <h3 className="font-display mt-5 text-lg tracking-tight text-slate-900">
              {school.programs.asrama.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
              Pembinaan intensif di bawah pengasuh untuk menambah kapasitas
              hafalan sekaligus melatih kemandirian santri.
            </p>
            <p className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-emerald-800">
              Hingga 30 juz
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </p>
          </article>

          {/* Ekstrakurikuler */}
          <article className="rounded-[24px] border border-slate-200 bg-white p-7 shadow-sm sm:p-9 lg:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-emerald-50 text-emerald-700">
                  <Sparkles className="h-5 w-5" />
                </span>
                <h3 className="font-display mt-5 text-lg tracking-tight text-slate-900">
                  Ekstrakurikuler &amp; Kegiatan
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
                  Pengembangan diri di luar kelas untuk membentuk santri yang
                  percaya diri dan berkarakter.
                </p>
              </div>
              <Link
                href="/kegiatan"
                className="hidden shrink-0 items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900 sm:inline-flex"
              >
                Semua kegiatan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {extracurriculars.map((activity) => (
                <li
                  key={activity}
                  className="rounded-full bg-slate-100 px-3.5 py-1.5 text-[13px] font-medium text-slate-700"
                >
                  {activity}
                </li>
              ))}
              {remaining > 0 && (
                <li className="rounded-full bg-emerald-50 px-3.5 py-1.5 text-[13px] font-semibold text-emerald-800">
                  +{remaining} lainnya
                </li>
              )}
            </ul>
          </article>

          {/* Legalitas — aksen amber */}
          <article className="flex flex-col rounded-[24px] border border-amber-200 bg-amber-50 p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-amber-100 text-amber-700">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <h3 className="font-display mt-5 text-lg tracking-tight text-slate-900">
              Legal &amp; Diakui
            </h3>
            <ul className="mt-4 space-y-2.5">
              {legalityPoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-amber-950/80">
                  <span
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </Stagger>
      </div>
    </section>
  );
}

function RevealLink() {
  return (
    <div className="lg:col-span-5 lg:justify-self-end">
      <Link
        href="/pendidikan"
        className="group inline-flex items-center gap-2 text-[15px] font-semibold text-emerald-800 transition-colors hover:text-emerald-700"
      >
        Lihat rincian pendidikan
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
