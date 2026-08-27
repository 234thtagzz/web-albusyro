import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { school } from "@/data/school";
import { Card, CardContent } from "@/components/ui/card";

const pillars = [
  {
    no: "01",
    title: "Al-Qur'an",
    description:
      "bukan sekadar mengejar banyaknya hafalan tetapi juga	bacaan benar (Fasih), Hafalan Lancar ( Target 10-15 Juz mutqin), dan Metode Dibawah Bimbingan Ust Abu Hurri Alqosimi",
  },
  {
    no: "02",
    title: "Adab",
    description:
      "Menumbuhkan karakter Islami melalui pembiasaan adab kepada Allah, orang tua, guru, dan sesama.",
  },
  {
    no: "03",
    title: "Akademik",
    description:
      "Ijazah resmi Kemenag (MI), Terdaftar NISN, dan Menggunakan Kurikuum Terpadu",
  },
];

export function Identity() {
  return (
    <section className="border-t border-slate-200 bg-white">
      <div className="container-custom section-spacing">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Narasi */}
          <div className="lg:col-span-6">
            <Reveal>
              <span className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                <span className="h-px w-8 bg-amber-500" aria-hidden="true" />
                Tentang Sekolah
              </span>
              <h2 className="font-display mt-5 text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.12] text-slate-900">
                Integrasi hafalan Al-Qur&rsquo;an, pendidikan adab, dan ilmu
                dalam Satu Madrasah.
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="font-body mt-7 leading-relaxed text-slate-600">
                {school.longDescription}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <dl className="mt-10 border-t border-slate-200">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.no}
                    className="group grid grid-cols-[3rem_1fr] items-baseline gap-x-4 border-b border-slate-200 py-5 transition-colors hover:bg-emerald-50/40 sm:grid-cols-[4rem_10rem_1fr]"
                  >
                    <dt className="font-display text-sm text-amber-600">
                      {pillar.no}
                    </dt>
                    <dt className="font-display text-lg tracking-tight text-slate-900">
                      {pillar.title}
                    </dt>
                    <dd className="col-span-2 mt-1.5 text-sm leading-relaxed text-slate-600 sm:col-span-1 sm:mt-0">
                      {pillar.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Visual + visi */}
          <div className="lg:col-span-6 lg:pl-8">
            <Reveal delay={0.1} className="relative">
              <div className="overflow-hidden rounded-[28px] border border-slate-200 shadow-md">
                <Image
                  src="/images/halaqoh quran.png"
                  alt="Potret Halagoh"
                  width={900}
                  height={900}
                  sizes="(max-width: 1024px) 90vw, 520px"
                  className="h-auto w-full"
                />
              </div>

              <Card className="relative z-10 -mt-14 ml-4 rounded-[20px] border border-emerald-800/10 bg-emerald-50 shadow-lg sm:ml-8">
                <CardContent className="p-6 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                    Visi Kami
                  </p>
                  <p className="font-body mt-3 text-[15px] leading-relaxed text-emerald-950">
                    {school.vision}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
