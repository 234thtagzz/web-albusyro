import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { school } from "@/data/school";
import { Calendar, FileText, Wallet, GraduationCap, ArrowRight, MessageCircle, Phone, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { PpdbRegistrationForm } from "@/components/ppdb/registration-form";
import { getPpdbInfo } from "@/lib/supabase/ppdb";
import { createPpdbWaLink } from "@/lib/ppdb-utils";

export const revalidate = 60;

export default async function AdmissionPage() {
  const ppdb = await getPpdbInfo();

  const cards = [
    {
      title: "Jadwal Pendaftaran",
      desc: ppdb.jadwal,
      icon: Calendar,
      no: "01",
      meta: `TA ${ppdb.tahun_ajaran}`,
    },
    {
      title: "Persyaratan Berkas",
      desc: ppdb.persyaratan,
      icon: FileText,
      no: "02",
      meta: "Dokumen",
    },
    {
      title: "Rincian Biaya",
      desc: ppdb.biaya,
      icon: Wallet,
      no: "03",
      meta: "Transparan",
    },
    {
      title: `Tahun Ajaran ${ppdb.tahun_ajaran}`,
      desc: `Pendaftaran santri baru untuk Tahun Ajaran ${ppdb.tahun_ajaran}. Untuk konsultasi, informasi pendaftaran, atau bantuan pengisian berkas, hubungi panitia: ${ppdb.nama_admin} (${ppdb.no_hp}).`,
      icon: GraduationCap,
      no: "04",
      meta: `Panitia: ${ppdb.nama_admin}`,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1" id="main-content">
        <PageHero
          badge="PPDB"
          title="Penerimaan Peserta Didik Baru"
          description={`Tahun Ajaran ${ppdb.tahun_ajaran} • Informasi resmi pendaftaran santri baru STTD Al-Busyro.`}
          meta={`Panitia: ${ppdb.nama_admin} (${ppdb.no_hp}) • Status: ${ppdb.is_active ? "Pendaftaran Dibuka" : "Pendaftaran Ditutup"}`}
        />

        {/* Info cards — 4 poin informasi PPDB terpadu */}
        <section className="section-spacing relative overflow-hidden border-t border-stone-200 bg-white">
          <div className="pointer-events-none absolute -top-20 left-0 h-[400px] w-[500px] rounded-full bg-primary-4/10 blur-[80px]" aria-hidden />
          <div className="pointer-events-none absolute -bottom-20 right-0 h-[360px] w-[360px] rounded-full bg-secondary-3/10 blur-[70px]" aria-hidden />
          <div className="container-custom relative">
            <Reveal>
              <div className="mx-auto max-w-xl text-center">
                <div className="inline-flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full border-primary-1/15 bg-primary-1/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary-1">
                    Informasi PPDB
                  </Badge>
                  {ppdb.is_active ? (
                    <Badge className="rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-semibold text-white">
                      <CheckCircle2 className="mr-1 h-3 w-3" /> Pendaftaran Dibuka
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="rounded-full bg-stone-200 text-stone-700 px-3 py-1 text-[10px] font-semibold">
                      <AlertCircle className="mr-1 h-3 w-3 text-stone-500" /> Pendaftaran Ditutup
                    </Badge>
                  )}
                </div>
                <h2 className="font-display mt-3 text-[28px] font-bold tracking-tight text-primary-1 sm:text-[32px]">
                  Empat hal yang perlu diketahui
                </h2>
                <p className="mx-auto mt-2 max-w-lg text-[13px] leading-relaxed text-stone-500">
                  Informasi resmi Tahun Ajaran {ppdb.tahun_ajaran} yang dikelola panitia STTD Al-Busyro.
                </p>
                <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary-1" />
              </div>
            </Reveal>

            <Stagger className="mt-12 grid gap-6 md:grid-cols-2" stagger={0.08}>
              {cards.map((item, index) => (
                <Card
                  key={item.title}
                  className="group relative rounded-[20px] border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary-1/15 hover:shadow-md"
                >
                  <CardContent className="p-0">
                    {index < cards.length - 1 && (
                      <span aria-hidden="true" className="absolute left-10 top-6 hidden h-px w-[calc(100%-2.5rem)] border-t border-dashed border-stone-200 md:block lg:hidden" />
                    )}
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary-1 text-[13px] font-bold text-white shadow-sm">
                      {item.no}
                    </div>
                    <div className="mt-5 flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-primary-1" />
                      <h3 className="font-display text-[16px] font-bold tracking-tight text-primary-1">{item.title}</h3>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-stone-600 whitespace-pre-wrap">{item.desc}</p>
                    <Badge variant="outline" className="mt-4 rounded-full border-primary-1/15 bg-primary-1/10 px-3 py-1 text-[11px] font-medium text-primary-1">
                      {item.meta}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </Stagger>

            {/* FORM PENDAFTARAN ATAU PEMBERITAHUAN DITUTUP */}
            <Reveal delay={0.08} className="mx-auto mt-12 max-w-3xl">
              {ppdb.is_active ? (
                <div>
                  <PpdbRegistrationForm />
                  <p className="mt-3 text-center text-xs text-stone-500">
                    Setelah mengirim, data pendaftaran santri baru langsung tercatat di sistem panitia PPDB STTD Al-Busyro.
                  </p>
                </div>
              ) : (
                <Card className="rounded-[24px] border-stone-300 bg-stone-50 p-8 text-center shadow-sm">
                  <AlertCircle className="mx-auto h-12 w-12 text-stone-400" />
                  <h3 className="font-display mt-3 text-xl font-bold text-stone-800">
                    Pendaftaran PPDB Tahun Ajaran {ppdb.tahun_ajaran} Saat Ini Ditutup
                  </h3>
                  <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-stone-600">
                    Formulir pendaftaran santri baru saat ini sedang tidak menerima data pendaftar baru atau kuota telah terpenuhi. Silakan hubungi panitia PPDB untuk konsultasi atau informasi pembukaan gelombang berikutnya.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <Button
                      nativeButton={false}
                      render={
                        <a
                          href={createPpdbWaLink(
                            ppdb,
                            `Assalamualaikum ${ppdb.nama_admin}, saya ingin menanyakan informasi pembukaan pendaftaran PPDB STTD Al-Busyro.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                      className="gap-2 rounded-full bg-primary-1 px-6 text-sm font-bold text-white hover:bg-primary-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Hubungi Panitia ({ppdb.nama_admin})
                    </Button>
                    <Button
                      nativeButton={false}
                      variant="outline"
                      render={<Link href="/kontak" />}
                      className="rounded-full border-stone-300 text-stone-700 hover:bg-white"
                    >
                      Halaman Kontak Sekolah
                    </Button>
                  </div>
                </Card>
              )}
            </Reveal>
          </div>
        </section>

        {/* CTA Bawah — Terhubung ke Admin WhatsApp PPDB */}
        <section className="relative overflow-hidden bg-primary-1">
          <div className="pointer-events-none absolute -top-20 left-0 h-[400px] w-[500px] rounded-full bg-white/10 blur-[80px]" aria-hidden />
          <div className="pointer-events-none absolute -bottom-20 right-0 h-[360px] w-[360px] rounded-full bg-secondary-3/20 blur-[70px]" aria-hidden />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "22px 22px",
            }}
          />
          <div className="container-custom relative py-16 sm:py-20">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.06] tracking-tight text-white">
                  {school.cta.headline}
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/80">
                  Konsultasikan pendaftaran calon santri baru Tahun Ajaran {ppdb.tahun_ajaran} bersama panitia resmi STTD Al-Busyro.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <Button
                    nativeButton={false}
                    render={
                      <a
                        href={createPpdbWaLink(
                          ppdb,
                          `Assalamualaikum ${ppdb.nama_admin}, saya ingin bertanya tentang pendaftaran PPDB STTD Al-Busyro Tahun Ajaran ${ppdb.tahun_ajaran}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                    className="h-11 gap-2 rounded-full bg-white px-6 text-[13px] font-bold text-primary-1 shadow-md hover:bg-stone-50"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Hubungi Panitia ({ppdb.nama_admin})
                  </Button>
                  <Button
                    nativeButton={false}
                    variant="outline"
                    render={<Link href="/kontak" />}
                    className="h-11 gap-2 rounded-full border-white/20 bg-white/10 px-6 text-[13px] font-bold text-white backdrop-blur hover:bg-white hover:text-primary-1"
                  >
                    Info Lengkap Kontak
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/70">
                  <Phone className="h-4 w-4" />
                  <Badge variant="outline" className="border-white/20 bg-white/10 text-white/90 backdrop-blur">
                    {ppdb.no_hp} ({ppdb.nama_admin})
                  </Badge>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer ppdbInfo={ppdb} />
    </>
  );
}
