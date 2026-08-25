import Link from "next/link";
import { Phone, MapPin, MessageCircle, Heart } from "lucide-react";
import { school } from "@/data/school";
import { footerNavigation } from "@/data/navigation";
import { waLink } from "@/data/home";
import { Logo } from "./logo";

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
                <span className="block text-xs font-medium uppercase tracking-[0.16em] text-emerald-300/80">
                  Sekolah Tahfizhul Qur&rsquo;an
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-[15px] leading-relaxed">
              {school.description}
            </p>

            <p className="mt-6 border-l-2 border-amber-500/70 pl-4 text-sm italic leading-relaxed text-emerald-200/90">
              &ldquo;{school.motto}&rdquo;
            </p>
          </div>

          {/* Navigasi */}
          <nav className="lg:col-span-2" aria-label="Navigasi footer">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300/90">
              Navigasi
            </h3>
            <ul className="mt-5 space-y-2.5">
              {[...footerNavigation.main, ...footerNavigation.more].map(
                (item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[15px] transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Program */}
          <nav className="lg:col-span-2" aria-label="Program footer">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300/90">
              Program
            </h3>
            <ul className="mt-5 space-y-2.5">
              {footerNavigation.programs.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[15px] transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontak + WA */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300/90">
              Kontak &amp; Lokasi
            </h3>
            <ul className="mt-5 space-y-3.5 text-[15px]">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>
                  {school.address}
                  <span className="block text-sm text-emerald-300/70">
                    {school.city}
                  </span>
                </span>
              </li>
              <li>
                <a
                  href={`tel:${school.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-2.5 transition-colors hover:text-white"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>
                    {school.phone}
                    <span className="block text-sm text-emerald-300/70">
                      ({school.phoneContact})
                    </span>
                  </span>
                </a>
              </li>
            </ul>

            <a
              href={waLink(
                "Assalamualaikum, saya ingin bertanya tentang PPDB STTD Al-Busyro."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-3 text-[15px] font-semibold text-emerald-900 shadow-md transition-all hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-lg"
            >
              <MessageCircle className="h-[18px] w-[18px]" />
              Tanya PPDB via WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-emerald-900/80">
        <div className="container-custom flex flex-col items-center justify-between gap-2 py-6 text-[13px] text-emerald-300/60 sm:flex-row">
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
