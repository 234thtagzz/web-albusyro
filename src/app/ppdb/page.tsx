import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { school } from "@/data/school";
import { ArrowRight, Calendar, FileText, Wallet, GraduationCap, Phone, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PpdbRegistrationForm } from "@/components/ppdb/registration-form";
import { waLink } from "@/data/home";

export const revalidate = 60;

export default async function AdmissionPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("ppdb_info").select("*").eq("is_active", true).order("created_at", { ascending: false }).limit(1).maybeSingle();
  const info = data ?? null;
  type FaqItem = { q: string; a: string };
  const faq: FaqItem[] = Array.isArray(info?.faq) ? (info.faq as FaqItem[]) : [];
  const cards = [
    {
      title: "Jadwal Pendaftaran",
      desc: info?.jadwal ?? "Informasi PPDB akan diperbarui oleh pihak STTD Al-Busyro.",
      icon: Calendar,
      no: "01",
      meta: info ? `TA ${info.tahun_ajaran}` : "Terjadwal",
    },
    {
      title: "Persyaratan",
      desc: info?.persyaratan ?? "Informasi persyaratan akan diperbarui oleh pihak STTD Al-Busyro.",
      icon: FileText,
      no: "02",
      meta: "Dokumen",
    },
    {
      title: "Biaya",
      desc: info?.biaya ?? "Informasi biaya akan diperbarui oleh pihak STTD Al-Busyro.",
      icon: Wallet,
      no: "03",
      meta: "Transparan",
    },
    {
      title: info ? `Tahun Ajaran ${info.tahun_ajaran}` : "FAQ",
      desc: faq.length > 0 ? faq.map((f) => `${f.q}: ${f.a}`).join("  •  ") : "Pertanyaan umum akan segera tersedia. Hubungi panitia untuk info lebih lanjut.",
      icon: GraduationCap,
      no: "04",
      meta: faq.length > 0 ? `${faq.length} FAQ` : "Info",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1" id="main-content">
        <PageHero
          badge="PPDB"
          title="Penerimaan Peserta Didik Baru"
          description={info ? `Tahun Ajaran ${info.tahun_ajaran} • Informasi pendaftaran santri baru STTD Al-Busyro.` : "Informasi pendaftaran santri baru STTD Al-Busyro."}
          meta={info ? `Kontak: ${info.kontak ?? school.phone} • Kelola via /admin/ppdb` : undefined}
        />

        {/* Info cards — mirror Admission steps */}
        <section className="section-spacing relative overflow-hidden border-t border-stone-200 bg-white">
          <div className="pointer-events-none absolute -top-20 left-0 h-[400px] w-[500px] rounded-full bg-primary-4/10 blur-[80px]" aria-hidden />
          <div className="pointer-events-none absolute -bottom-20 right-0 h-[360px] w-[360px] rounded-full bg-secondary-3/10 blur-[70px]" aria-hidden />
          <div className="container-custom relative">
            <Reveal>
              <div className="mx-auto max-w-xl text-center">
                <Badge variant="outline" className="mx-auto rounded-full border-primary-1/15 bg-primary-1/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary-1">
                  Informasi PPDB
                </Badge>
                <h2 className="font-display mt-3 text-[28px] font-bold tracking-tight text-primary-1 sm:text-[32px]">Empat hal yang perlu diketahui</h2>
                <p className="mx-auto mt-2 max-w-lg text-[13px] leading-relaxed text-stone-500">Semua informasi dikelola via Supabase dan dapat diperbarui panitia tanpa redeploy.</p>
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

            <Reveal delay={0.08} className="mx-auto mt-10 max-w-3xl">
              <PpdbRegistrationForm />
              <p className="mt-3 text-center text-xs text-stone-500">
                Setelah mengirim, data langsung tampil di dashboard admin <span className="font-medium text-primary-1">/admin/pendaftar</span> • status awal: pending
              </p>
            </Reveal>
          </div>
        </section>

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
                <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.06] tracking-tight text-white">{school.cta.headline}</h2>
                <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/80">{school.cta.description}</p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  <Button
                    nativeButton={false}
                    render={
                      <a href={waLink("Assalamualaikum, saya ingin bertanya tentang PPDB STTD Al-Busyro.")} target="_blank" rel="noopener noreferrer" />
                    }
                    className="h-11 gap-2 rounded-full bg-white px-6 text-[13px] font-bold text-primary-1 shadow-md hover:bg-stone-50"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Hubungi Panitia
                  </Button>
                  <Button
                    nativeButton={false}
                    variant="outline"
                    render={<Link href="/kontak" />}
                    className="h-11 gap-2 rounded-full border-white/20 bg-white/10 px-6 text-[13px] font-bold text-white backdrop-blur hover:bg-white hover:text-primary-1"
                  >
                    Info Lengkap PPDB
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/70">
                  <Phone className="h-4 w-4" />
                  <Badge variant="outline" className="border-white/20 bg-white/10 text-white/90 backdrop-blur">
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
