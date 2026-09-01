import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { admissionSteps, waLink } from "@/data/home";
import { school } from "@/data/school";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UNIFIED_ICON = "bg-primary-1 text-white";
const UNIFIED_BADGE = "border-primary-1/15 bg-primary-1/10 text-primary-1";

export function Admission() {
  return (
    <section className="relative overflow-hidden border-t border-stone-200 bg-white">
      <div className="pointer-events-none absolute -top-20 left-0 h-[400px] w-[500px] rounded-full bg-primary-4/12 blur-[80px]" aria-hidden />
      <div className="container-custom section-spacing relative">
        <div className="mx-auto max-w-xl text-center">
          <Badge variant="outline" className={`mx-auto rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${UNIFIED_BADGE}`}>
            Alur PPDB
          </Badge>
          <h2 className="font-display mt-3 text-[28px] font-bold tracking-tight text-primary-1 sm:text-[32px]">
            Tiga langkah menuju Al-Busyro
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-[13px] leading-relaxed text-stone-500">
            Proses penerimaan peserta didik baru yang jelas dan didampingi panitia di setiap tahapannya.
          </p>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary-1" />
        </div>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.08} aria-label="Tahapan pendaftaran">
          {admissionSteps.map((step, index) => (
            <Card
              key={step.no}
              className="group relative rounded-[20px] border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:border-primary-1/15"
            >
              <CardContent className="p-0">
                {index < admissionSteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-10 top-6 hidden h-px w-[calc(100%-2.5rem)] border-t border-dashed border-stone-200 md:block"
                  />
                )}
                <div className={`relative flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-bold text-white shadow-sm ${UNIFIED_ICON}`}>
                  {step.no}
                </div>
                <h3 className="font-display mt-5 text-[16px] font-bold tracking-tight text-primary-1">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-stone-600">{step.description}</p>
                <Badge variant="outline" className={`mt-4 rounded-full px-3 py-1 text-[11px] font-medium ${UNIFIED_BADGE}`}>
                  {step.meta}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </Stagger>

        <Reveal delay={0.08}>
          <Card className="mt-14 rounded-[24px] border-stone-200 bg-stone-50 shadow-sm">
            <CardContent className="flex flex-col items-start gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <h3 className="font-display text-[20px] font-bold leading-snug tracking-tight text-primary-1 sm:text-[22px]">
                  {school.cta.headline}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-stone-600">{school.cta.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  nativeButton={false}
                  render={
                    <a
                      href={waLink("Assalamualaikum, saya ingin bertanya tentang PPDB STTD Al-Busyro.")}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                  className="h-11 gap-2 rounded-full bg-primary-1 px-6 text-[13px] font-bold text-white shadow-md hover:bg-primary-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  Hubungi Panitia
                </Button>
                <Button
                  nativeButton={false}
                  variant="outline"
                  render={<Link href="/ppdb" />}
                  className="h-11 gap-2 rounded-full border-stone-200 bg-white px-6 text-[13px] font-bold text-primary-1 hover:border-primary-1/20 hover:bg-stone-50"
                >
                  Info Lengkap PPDB
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
