import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
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
                  className="rounded-[24px] border border-slate-200 bg-white shadow-sm p-6 transition-all hover:border-primary/30"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-primary/15 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-medium text-slate-900">Telepon / WhatsApp</h3>
                  <p className="mt-1 text-sm text-slate-600">{school.phone}</p>
                  {school.phoneContact && (
                    <p className="text-xs text-slate-400">({school.phoneContact})</p>
                  )}
                </a>
              )}

              {school.social.whatsapp !== "[DATA RESMI BELUM TERSEDIA]" && (
                <a
                  href={school.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[24px] border border-slate-200 bg-white shadow-sm p-6 transition-all hover:border-primary/30"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-primary/15 text-primary">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-medium text-slate-900">WhatsApp</h3>
                  <p className="mt-1 text-sm text-slate-600">{school.social.whatsapp}</p>
                </a>
              )}

              {school.email !== "[DATA RESMI BELUM TERSEDIA]" && (
                <a
                  href={`mailto:${school.email}`}
                  className="rounded-[24px] border border-slate-200 bg-white shadow-sm p-6 transition-all hover:border-primary/30"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-primary/15 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-medium text-slate-900">Email</h3>
                  <p className="mt-1 text-sm text-slate-600">{school.email}</p>
                </a>
              )}

              {school.address !== "[DATA RESMI BELUM TERSEDIA]" && (
                <div className="rounded-[24px] border border-slate-200 bg-white shadow-sm p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-primary/15 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-medium text-slate-900">Alamat</h3>
                  <p className="mt-1 text-sm text-slate-600">{school.address}</p>
                </div>
              )}
            </Stagger>

            <Reveal>
            <div className="mx-auto mt-8 max-w-3xl">
              <div className="rounded-[24px] border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
                <h3 className="font-display text-lg tracking-tight text-slate-900">Media Sosial</h3>
                <p className="mt-2 text-sm text-slate-600">Ikuti media sosial kami untuk informasi terkini.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {school.social.instagram !== "[DATA RESMI BELUM TERSEDIA]" && (
                    <a
                      href={school.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-[12px] border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200/70 hover:text-slate-900"
                    >
                      Instagram
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {school.social.facebook !== "[DATA RESMI BELUM TERSEDIA]" && (
                    <a
                      href={school.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-[12px] border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200/70 hover:text-slate-900"
                    >
                      Facebook
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {school.social.youtube !== "[DATA RESMI BELUM TERSEDIA]" && (
                    <a
                      href={school.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-[12px] border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200/70 hover:text-slate-900"
                    >
                      YouTube
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            </Reveal>

            <Reveal>
            <div className="mx-auto mt-8 max-w-3xl">
              <div className="rounded-[24px] border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
                <h3 className="font-display text-lg tracking-tight text-slate-900">Lokasi</h3>
                <p className="mt-2 text-sm text-slate-600">{school.address}</p>
                <div className="mt-4 aspect-video overflow-hidden rounded-[16px] bg-slate-200">
                  <div className="flex h-full items-center justify-center text-sm text-slate-600">
                    Peta lokasi akan tersedia setelah alamat resmi diperbarui.
                  </div>
                </div>
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
