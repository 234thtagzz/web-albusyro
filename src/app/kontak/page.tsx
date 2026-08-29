import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { school } from "@/data/school";
import { Phone, Mail, MapPin, MessageCircle, ExternalLink } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" id="main-content">
        <section className="bg-slate-50 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="container-custom">
            <SectionHeading
              badge="Kontak"
              title="Hubungi Kami"
              description="Silakan hubungi kami untuk informasi lebih lanjut mengenai STTD Al-Busyro."
            />
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-custom">
            <Stagger className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
              {school.phone !== "[DATA RESMI BELUM TERSEDIA]" && (
                <a
                  href={`tel:${school.phone.replace(/\s/g, "")}`}
                >
                  <Card className="rounded-[24px] border-slate-200 bg-white shadow-sm ring-0 transition-all hover:border-primary/30">
                    <CardContent>
                      <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-primary/15 text-primary">
                        <Phone className="h-5 w-5" />
                      </div>
                      <h3 className="mt-3 text-sm font-medium text-slate-900">Telepon / WhatsApp</h3>
                      <p className="mt-1 text-sm text-slate-600">{school.phone}</p>
                      {school.phoneContact && (
                        <p className="text-xs text-slate-400">({school.phoneContact})</p>
                      )}
                    </CardContent>
                  </Card>
                </a>
              )}

              {school.social.whatsapp !== "[DATA RESMI BELUM TERSEDIA]" && (
                <a
                  href={school.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card className="rounded-[24px] border-slate-200 bg-white shadow-sm ring-0 transition-all hover:border-primary/30">
                    <CardContent>
                      <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-primary/15 text-primary">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <h3 className="mt-3 text-sm font-medium text-slate-900">WhatsApp</h3>
                      <p className="mt-1 text-sm text-slate-600">{school.social.whatsapp}</p>
                    </CardContent>
                  </Card>
                </a>
              )}

              {school.email !== "[DATA RESMI BELUM TERSEDIA]" && (
                <a
                  href={`mailto:${school.email}`}
                >
                  <Card className="rounded-[24px] border-slate-200 bg-white shadow-sm ring-0 transition-all hover:border-primary/30">
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
                <Card className="rounded-[24px] border-slate-200 bg-white shadow-sm ring-0">
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
              <Card className="rounded-[24px] border-slate-200 bg-white shadow-sm ring-0">
                <CardContent className="sm:p-8">
                  <h3 className="font-display text-lg tracking-tight text-slate-900">Lokasi</h3>
                  <p className="mt-2 text-sm text-slate-600">{school.address}</p>
                  <div className="mt-4 aspect-video overflow-hidden rounded-[16px] bg-slate-200">
                    <div className="flex h-full items-center justify-center text-sm text-slate-600">
                      Peta lokasi akan tersedia setelah alamat resmi diperbarui.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            </Reveal>
          </div>
        </section>
        </main>
        <Footer />
    </>
  );
}
