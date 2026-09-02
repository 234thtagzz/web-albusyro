import Link from "next/link";
import { Phone, MapPin, MessageCircle, Heart, ArrowRight } from "lucide-react";
import { school } from "@/data/school";
import { footerNavigation } from "@/data/navigation";
import { waLink } from "@/data/home";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-primary-1 text-popover-1">
      <div className="container-custom pt-20 pb-14">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <Logo />
              <span className="leading-tight">
                <span className="block font-display text-lg tracking-tight text-white">
                  STTD Al&#8209;Busyro
                </span>
                <span className="block text-xs font-medium uppercase tracking-[0.16em] text-primary-4">
                  Sekolah Tahfizhul Qur&rsquo;an
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-[15px] leading-relaxed">
              {school.description}
            </p>

            <p className="mt-6 border-l-2 border-amber-500/70 pl-4 text-sm italic leading-relaxed text-primary-4">
              &ldquo;{school.motto}&rdquo;
            </p>
          </div>

          {/* Navigasi */}
          <nav className="lg:col-span-2" aria-label="Navigasi footer">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-4">
              Navigasi
            </h3>
            <ul className="mt-5 space-y-2.5">
              {[...footerNavigation.main, ...footerNavigation.more].map(
                (item) => (
                  <li key={item.href} className="group">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-[15px] transition-colors hover:text-white"
                    >
                      {item.label}
                      <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Kegiatan — menggantikan Program */}
          <nav className="lg:col-span-2" aria-label="Kegiatan footer">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-4">
              Kegiatan
            </h3>
            <ul className="mt-5 space-y-2.5">
              {(footerNavigation.kegiatan ?? footerNavigation.programs).map((item) => (
                <li key={item.label} className="group">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-[15px] transition-colors hover:text-white"
                  >
                    {item.label}
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontak + WA */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-4">
              Kontak &amp; Lokasi
            </h3>
            <ul className="mt-5 space-y-3.5 text-[15px]">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-4" />
                <span>
                  {school.address}
                  <span className="block text-sm text-primary-4">
                    {school.city}
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-4" />
                  <span>
                    {school.phone}
                    <span className="block text-sm text-primary-4">
                      ({school.phoneContact})
                    </span>
                  </span>

              </li>
            </ul>

            <Button
              nativeButton={false}
              variant="secondary"
              className="mt-7 gap-2.5 rounded-full bg-white px-5 py-3 text-[15px] font-semibold text-primary-1 shadow-md transition-all hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-lg"
              render={
                <a
                  href={waLink(
                    "Assalamualaikum, saya ingin bertanya tentang PPDB STTD Al-Busyro."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <MessageCircle className="h-[18px] w-[18px]" />
              Tanya PPDB via WhatsApp
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-4">
        <div className="container-custom flex flex-col items-center justify-between gap-2 py-6 text-[13px] text-primary-4 sm:flex-row">
          <p>{school.copyright}</p>
          <p className="flex items-center gap-1.5">
            Dibangun dengan
            <Heart
              className="h-3.5 w-3.5 fill-amber-500 text-amber-500"
              aria-hidden="true"
            />
            untuk generasi Qur&rsquo;ani
          </p>
        </div>
      </div>
    </footer>
  );
}
