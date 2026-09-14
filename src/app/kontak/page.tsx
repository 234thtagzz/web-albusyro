import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { school } from "@/data/school";
import { Phone, Mail, MapPin, MessageCircle, ExternalLink, GraduationCap, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { getPpdbInfo } from "@/lib/supabase/ppdb";
import { createPpdbWaLink } from "@/lib/ppdb-utils";

export const revalidate = 60;

export default async function ContactPage() {
  const ppdb = await getPpdbInfo();

  return (
    <>
      <Navbar />
      <main className="flex-1" id="main-content">
        <section className="bg-slate-50 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="container-custom">
            <SectionHeading
              badge="Kontak"
              title="Hubungi Kami"
              description="Silakan hubungi kami untuk informasi lebih lanjut mengenai STTD Al-Busyro dan pendaftaran santri baru."
            />
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-custom">
            <Stagger className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
              {/* KARTU DINAMIS: Panitia PPDB (Data dari input admin) */}
              <Card className="rounded-[24px] border-primary-1/20 bg-primary-1/5 shadow-sm ring-0 transition-all hover:border-primary-1/40 sm:col-span-2">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-primary-1 text-white shadow-sm">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-base font-bold text-primary-1">
                            Panitia PPDB — TA {ppdb.tahun_ajaran}
                          </h3>
                          {ppdb.is_active ? (
                            <Badge className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-semibold text-white">
                              <CheckCircle2 className="mr-1 h-3 w-3" /> Pendaftaran Dibuka
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="rounded-full bg-stone-200 px-2.5 py-0.5 text-[10px] font-semibold text-stone-700">
                              <AlertCircle className="mr-1 h-3 w-3" /> Pendaftaran Ditutup
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1 text-sm font-medium text-stone-800">
                          {ppdb.no_hp} <span className="font-normal text-stone-500">({ppdb.nama_admin})</span>
                        </p>
                        <p className="mt-0.5 text-xs text-stone-500">
                          Narahubung resmi penerimaan santri baru, jadwal pendaftaran, rincian biaya, dan observasi santri.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
                      <Button
                        nativeButton={false}
                        render={
                          <a
                            href={createPpdbWaLink(
                              ppdb,
                              `Assalamualaikum ${ppdb.nama_admin}, saya ingin berkonsultasi mengenai pendaftaran santri baru STTD Al-Busyro Tahun Ajaran ${ppdb.tahun_ajaran}.`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        }
                        className="gap-2 rounded-full bg-primary-1 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-primary-2"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Chat Panitia PPDB
                      </Button>
                      <Button
                        nativeButton={false}
                        variant="outline"
                        render={<Link href="/ppdb" />}
                        className="gap-1.5 rounded-full border-primary-1/20 text-xs font-semibold text-primary-1 hover:bg-white"
                      >
                        Info PPDB
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Kontak Kantor Sekolah (Dinamis sesuai data no hp & nama admin PPDB) */}
              <a
                href={`tel:${ppdb.no_hp.replace(/\D/g, "")}`}
              >
                <Card className="h-full rounded-[24px] border-slate-200 bg-white shadow-sm ring-0 transition-all hover:border-primary/30">
                  <CardContent>
                    <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-primary/15 text-primary">
                      <Phone className="h-5 w-5" />
                    </div>
                    <h3 className="mt-3 text-sm font-medium text-slate-900">Telepon Kantor Sekolah</h3>
                    <p className="mt-1 text-sm text-slate-600">{ppdb.no_hp}</p>
                    <p className="text-xs text-slate-400">({ppdb.nama_admin})</p>
                  </CardContent>
                </Card>
              </a>

              {/* WhatsApp Resmi (Dinamis sesuai data no hp & nama admin PPDB) */}
              <a
                href={createPpdbWaLink(
                  ppdb,
                  `Assalamualaikum ${ppdb.nama_admin}, saya ingin menghubungi pihak sekolah STTD Al-Busyro.`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="h-full rounded-[24px] border-slate-200 bg-white shadow-sm ring-0 transition-all hover:border-primary/30">
                  <CardContent>
                    <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-primary/15 text-primary">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <h3 className="mt-3 text-sm font-medium text-slate-900">WhatsApp Resmi</h3>
                    <p className="mt-1 text-sm text-slate-600">{ppdb.no_hp}</p>
                    <p className="text-xs text-slate-400">({ppdb.nama_admin})</p>
                  </CardContent>
                </Card>
              </a>

              {school.email !== "[DATA RESMI BELUM TERSEDIA]" && (
                <a
                  href={`mailto:${school.email}`}
                >
                  <Card className="h-full rounded-[24px] border-slate-200 bg-white shadow-sm ring-0 transition-all hover:border-primary/30">
                    <CardContent>
                      <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-primary/15 text-primary">
                        <Mail className="h-5 w-5" />
                      </div>
                      <h3 className="mt-3 text-sm font-medium text-slate-900">Email</h3>
                      <p className="mt-1 text-sm text-slate-600">{school.email}</p>
                    </CardContent>
                  </Card>
                </a>
              )}

              {school.address !== "[DATA RESMI BELUM TERSEDIA]" && (
                <Card className="h-full rounded-[24px] border-slate-200 bg-white shadow-sm ring-0">
                  <CardContent>
                    <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-primary/15 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <h3 className="mt-3 text-sm font-medium text-slate-900">Alamat</h3>
                    <p className="mt-1 text-sm text-slate-600">{school.address}</p>
                  </CardContent>
                </Card>
              )}
            </Stagger>

            <Reveal>
            <div className="mx-auto mt-8 max-w-3xl">
              <Card className="rounded-[24px] border-slate-200 bg-white shadow-sm ring-0">
                <CardContent className="sm:p-8">
                  <h3 className="font-display text-lg tracking-tight text-slate-900">Media Sosial</h3>
                  <p className="mt-2 text-sm text-slate-600">Ikuti media sosial kami untuk informasi terkini.</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {school.social.instagram !== "[DATA RESMI BELUM TERSEDIA]" && (
                      <Button
                        nativeButton={false}
                        variant="outline"
                        render={<a href={school.social.instagram} target="_blank" rel="noopener noreferrer" />}
                        className="rounded-[12px]"
                      >
                        Instagram
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    {school.social.facebook !== "[DATA RESMI BELUM TERSEDIA]" && (
                      <Button
                        nativeButton={false}
                        variant="outline"
                        render={<a href={school.social.facebook} target="_blank" rel="noopener noreferrer" />}
                        className="rounded-[12px]"
                      >
                        Facebook
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    {school.social.youtube !== "[DATA RESMI BELUM TERSEDIA]" && (
                      <Button
                        nativeButton={false}
                        variant="outline"
                        render={<a href={school.social.youtube} target="_blank" rel="noopener noreferrer" />}
                        className="rounded-[12px]"
                      >
                        YouTube
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            </Reveal>

            <Reveal>
            <div className="mx-auto mt-8 max-w-3xl">
              <Card className="overflow-hidden rounded-[24px] border-slate-200 bg-white shadow-sm ring-0">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-primary/15 text-primary">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <h3 className="font-display text-lg tracking-tight text-slate-900">Lokasi Sekolah</h3>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">{school.address}</p>
                    </div>
                    <Button
                      nativeButton={false}
                      variant="outline"
                      render={
                        <a
                          href="https://maps.google.com/?q=STTD+Al-Busyro+Kuncen+Waru+Baki+Sukoharjo"
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                      className="gap-2 rounded-full border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 sm:shrink-0"
                    >
                      Buka di Google Maps
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="mt-5 aspect-video w-full overflow-hidden rounded-[16px] border border-slate-200 shadow-inner">
                    <iframe
                      src="https://maps.google.com/maps?q=STTD+Al-Busyro+Kuncen+Waru+Baki+Sukoharjo&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Maps STTD Al-Busyro"
                      className="h-full w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer ppdbInfo={ppdb} />
    </>
  );
}
