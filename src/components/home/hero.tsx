"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { school } from "@/data/school";
import { waLink } from "@/data/home";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = scope.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduceMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero='card']",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          "[data-hero='badge']",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          "[data-hero='line']",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          "-=0.3"
        )
        .fromTo(
          "[data-hero='sub']",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          "[data-hero='visual']",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          "[data-hero='glass-bar']",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} className="relative px-3 pt-3 pb-12 sm:px-6 sm:pt-4 lg:pt-5">
      <div
        data-hero="card"
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-teal-100/80 p-6 pt-26 sm:p-10 sm:pt-30 lg:p-22 lg:pt-30 shadow-2xl shadow-teal-900/5"
      >
        {/* Background image */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-50"
          style={{
            backgroundImage: "url('/images/lanscape.JPG.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Gradient overlay from bottom with primary color */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to top, var(--primary-3) 0%, color-mix(in srgb, var(--primary-4) 80%, transparent) 20%, transparent 65%)",
          }}
        />

        <div className="relative z-[2] grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Badge
              data-hero="badge"
              className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-white/80 px-4 py-1.5 text-xs font-semibold text-teal-900 shadow-sm backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-3/40 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-3/80" />
              </span>
              PPDB Tahun Ajaran Baru Dibuka
            </Badge>

            <h1 className="font-display mt-6 text-3xl font-extrabold tracking-tight text-muted-foreground sm:text-5xl lg:text-6xl lg:leading-[1.1]">
              <span data-hero="line" className="block">
                Membentuk Generasi
              </span>
              <span data-hero="line" className="block text-primary-2">
                Qur&rsquo;ani
              </span>
              <span data-hero="line" className="block">
                dengan Adab & Ilmu
              </span>
            </h1>

            <p
              data-hero="sub"
              className="font-body mt-5 max-w-xl text-base leading-relaxed text-accent sm:text-lg"
            >
              {school?.description ||
                "Pendidikan tahfidz Al-Qur'an terpadu dengan pembentukan adab dan ilmu dasar yang kokoh."}
            </p>
          </div>

          <div data-hero="visual" className="lg:col-span-5">
            <div className="relative mx-auto max-w-[380px] lg:max-w-none">
              {/* Mobile/tablet: badge di dalam visual */}
              <div className="absolute -top-4 -right-2 flex items-center gap-2 rounded-full border border-white/80 bg-white/90 py-1.5 px-3.5 shadow-md backdrop-blur lg:hidden">
                <MapPin className="h-4 w-4 text-teal-700" />
                <span className="text-xs font-semibold text-slate-700">
                  Sukoharjo — Jawa Tengah
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          data-hero="glass-bar"
          className="relative z-[2] mt-10 rounded-2xl border border-white/80 bg-white p-4 shadow-xl shadow-teal-900/10 backdrop-blur-xl sm:rounded-3xl sm:p-5 "
        >
          <div className="relative">
            {/* Laptop (lg): badge di kanan, 5px di atas grid */}
            <div className="absolute bottom-[calc(100%+40px)] right-0 hidden items-center gap-2 rounded-full border border-white/80 bg-white/90 py-1.5 px-3.5 shadow-md backdrop-blur lg:flex">
              <MapPin className="h-4 w-4 text-teal-700" />
              <span className="text-xs font-semibold text-slate-700">
                Sukoharjo — Jawa Tengah
              </span>
            </div>
            <div className="relative z-[2] grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-center">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200/60 bg-white px-4 py-3 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                  Jenjang
                </p>
                <p className="text-sm font-bold text-slate-800">Tahfidz Setara SD</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200/60 bg-white px-4 py-3 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                  Tahun Ajaran
                </p>
                <p className="text-sm font-bold text-slate-800">2026 / 2027</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200/60 bg-white px-4 py-3 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                  Kuota PPDB
                </p>
                <p className="text-sm font-bold text-slate-800">Tersedia</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                nativeButton={false}
                render={
                  <Link
                    href={
                      waLink
                        ? waLink(
                            "Assalamualaikum, saya ingin mendaftarkan putra/putri saya ke STTD Al-Busyro."
                          )
                        : "/ppdb"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                className="h-12 w-full rounded-2xl px-6 font-semibold text-white shadow-lg shadow-teal-600/25 transition-all flex items-center justify-center gap-2"
              >
                Daftar PPDB
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}