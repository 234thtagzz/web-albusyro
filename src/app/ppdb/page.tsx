import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { school } from "@/data/school";
import { ArrowRight, Phone } from "lucide-react";

export default function AdmissionPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" id="main-content">
        <section className="bg-slate-50 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="container-custom">
            <SectionHeading
              badge="PPDB"
              title="Penerimaan Peserta Didik Baru"
              description="Informasi pendaftaran santri baru STTD Al-Busyro."
            />
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-custom">
            <Stagger className="mx-auto max-w-3xl space-y-4">
              {[
                { title: "Jadwal Pendaftaran", desc: "Informasi PPDB akan diperbarui oleh pihak STTD Al-Busyro." },
                { title: "Persyaratan", desc: "Informasi persyaratan akan diperbarui oleh pihak STTD Al-Busyro." },
                { title: "Biaya", desc: "Informasi biaya akan diperbarui oleh pihak STTD Al-Busyro." },
                { title: "FAQ", desc: "Pertanyaan umum akan segera tersedia." },
              ].map((item) => (
                <Card
                  key={item.title}
                  className="rounded-[24px] border-slate-200 bg-white shadow-sm ring-0"
                >
                  <CardContent className="sm:p-8">
                    <h2 className="font-display text-lg tracking-tight text-slate-900">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="section-spacing bg-primary">
          <div className="container-custom">
            <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.06] tracking-tight text-white">
                {school.cta.headline}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-emerald-100/85">
                {school.cta.description}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Button
                  nativeButton={false}
                  render={<Link href="/kontak" />}
                  className="h-[52px] rounded-full bg-white px-8 text-[15px] font-semibold text-emerald-900 shadow-md transition-all hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-lg sm:w-auto"
                >
                  Hubungi Kami
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center gap-2 text-sm text-emerald-200/90">
                <Phone className="h-4 w-4" />
                <Badge variant="outline" className="border-emerald-300/30 text-emerald-100/90">
                  {school.phone} ({school.phoneContact})
                </Badge>
              </div>
            </div>
            </Reveal>
          </div>
        </section>
        </main>
        <Footer />
    </>
  );
}
