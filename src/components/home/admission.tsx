import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { admissionSteps, waLink } from "@/data/home";
import { school } from "@/data/school";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Admission() {
  return (
    <section className="border-t border-slate-200 bg-white">
      <div className="container-custom section-spacing">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <SectionHeading
            badge="Alur PPDB"
            title="Tiga langkah menuju Al-Busyro"
            description="Proses penerimaan peserta didik baru yang jelas dan didampingi panitia di setiap tahapannya."
            className="lg:col-span-8"
          />
        </div>

        <Stagger
          className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8"
          stagger={0.12}
          aria-label="Tahapan pendaftaran"
        >
          {admissionSteps.map((step, index) => (
            <article key={step.no} role="listitem" className="relative">
              {/* Garis penghubung */}
              {index < admissionSteps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-6 left-16 hidden h-px w-[calc(100%-4rem)] border-t border-dashed border-slate-300 md:block"
                />
              )}

              <Badge
                variant="secondary"
                className="font-display flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-[15px] text-emerald-800"
              >
                {step.no}
              </Badge>

              <h3 className="font-display mt-5 text-xl tracking-tight text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
              <Badge
                variant="outline"
                className="mt-4 inline-flex items-center rounded-full border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500"
              >
                {step.meta}
              </Badge>
            </article>
          ))}
        </Stagger>

        {/* CTA band */}
        <Reveal delay={0.1}>
          <div className="mt-20 flex flex-col items-start gap-7 rounded-[28px] border border-slate-200 bg-slate-50 p-8 shadow-sm sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h3 className="font-display text-2xl leading-snug tracking-tight text-slate-900 sm:text-[1.75rem]">
                Setiap langkah kecil hari ini menentukan masa depan mereka.
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                {school.cta.description}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                render={
                  <a
                    href={waLink(
                      "Assalamualaikum, saya ingin bertanya tentang PPDB STTD Al-Busyro."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                className="group h-12 gap-2 rounded-full bg-primary px-6 text-[15px] font-semibold text-primary-foreground shadow-md transition-all hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg"
              >
                <MessageCircle className="h-[18px] w-[18px]" />
                Hubungi Panitia
              </Button>
              <Button
                variant="outline"
                render={<Link href="/ppdb" />}
                className="h-12 gap-2 rounded-full border-slate-300 bg-white px-6 text-[15px] font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
              >
                Info Lengkap PPDB
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
