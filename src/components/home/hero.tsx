"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { school } from "@/data/school";
import { heroStats, waLink } from "@/data/home";
import FotoStack from "@/components/components/FotoStats";

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
        "[data-hero='badge']",
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          "[data-hero='line']",
          { autoAlpha: 0, y: 46 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 },
          "-=0.35"
        )
        .fromTo(
          "[data-hero='sub']",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "-=0.55"
        )
        .fromTo(
          "[data-hero='cta']",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          "-=0.45"
        )
        .fromTo(
          "[data-hero='stat']",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08 },
          "-=0.4"
        )
        .fromTo(
          "[data-hero='visual']",
          { autoAlpha: 0, x: 56, rotate: 1.75 },
          { autoAlpha: 1, x: 0, rotate: 0, duration: 1.1 },
          "-=0.85"
        )
        .fromTo(
          "[data-hero='float']",
          { autoAlpha: 0, scale: 0.82, y: 16 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.14,
            ease: "back.out(1.7)",
          },
          "-=0.55"
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={scope}
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 lg:pt-40 lg:pb-24"
    >
      {/* BACKGROUND DECORATION */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden select-none">
        
        {/* 1. Ambient Glow Hangat (Atas Kiri & Kanan Visual) */}
        <div 
          className="absolute -top-28 -left-20 h-120 w-120 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: "var(--secondary-3, #ffb74d)" }}
        />
        <div 
          className="absolute top-1/3 -right-24 h-[450px] w-[450px] rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: "var(--secondary-1, #f57c00)" }}
        />

        {/* 2. Tekstur Titik-titik Bertema Secondary Color */}
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              "radial-gradient(var(--secondary-2, #f08519) 2px, transparent 1.2px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 85% 75% at 50% 40%, black 25%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 85% 75% at 50% 40%, black 25%, transparent 80%)",
          }}
        />

        {/* 3. Aksen Lingkaran Geometris Halus */}
        <div 
          className="absolute -top-12 left-1/2 -translate-x-1/2 h-[650px] w-[650px] rounded-full border border-[var(--secondary-3,#ffb74d)]/20 opacity-60"
        />
        <div 
          className="absolute top-10 left-1/2 -translate-x-1/2 h-[850px] w-[850px] rounded-full border border-[var(--secondary-1,#f57c00)]/15 opacity-40"
        />

        {/* 4. Aksen Sudut Kiri Bawah (Gradient Blob) */}
        <div 
          className="absolute -bottom-20 left-10 h-64 w-64 rounded-full blur-2xl opacity-10"
          style={{ backgroundColor: "var(--secondary-2, #f08519)" }}
        />
      </div>

      <div className="container-custom relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Kolom teks */}
          <div className="lg:col-span-6 xl:col-span-6">
            <span
              data-hero="badge"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-800 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span 
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: "var(--secondary-1, #f57c00)" }}
                />
                <span 
                  className="relative inline-flex h-4 w-4 rounded-full"
                  style={{ backgroundColor: "var(--secondary-1, #f57c00)" }}
                />
              </span>
              PPDB Tahun Ajaran Baru Dibuka
            </span>

            <h1 className="font-display mt-6 text-[clamp(2.5rem,5.6vw,4.25rem)] leading-[1.02] text-slate-900">
              <span data-hero="line" className="block">
                Membentuk Generasi
              </span>
              <span data-hero="line" className="block">
                Qur&rsquo;ani dengan{" "}
                <span className="text-primary-3">Adab</span>
              </span>
              <span data-hero="line" className="block">
                dan <span className="text-primary-3">Ilmu</span>.
              </span>
            </h1>

            <p
              data-hero="sub"
              className="font-body mt-6 max-w-[46ch] text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              {school.description}
            </p>

            <div data-hero="cta" className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href={waLink(
                  "Assalamualaikum, saya ingin mendaftarkan putra/putri saya ke STTD Al-Busyro."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary-2 px-7 text-[15px] font-semibold text-popover-1 shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-3 hover:shadow-lg"
              >
                Daftar PPDB
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/ppdb"
                className="inline-flex h-12 items-center rounded-full border border-slate-300 bg-white/90 px-7 text-[15px] font-medium text-slate-700 backdrop-blur transition-colors hover:border-slate-400 hover:text-slate-900"
              >
                Lihat Brosur
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-3 divide-x divide-slate-200 border-y border-slate-200/80 py-6">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  data-hero="stat"
                  className="px-4 first:pl-0 last:pr-0"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl text-primary-3 sm:text-3xl">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-[11px] leading-snug text-popover-foreground sm:text-xs">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Kolom visual berlapis */}
          <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
            <div className="relative mx-auto max-w-[420px] lg:max-w-none">
              <FotoStack />

              {/* Chip lokasi */}
              <div
                data-hero="float"
                className="absolute -top-5 right-4 flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 py-2 pr-4 pl-3 shadow-md backdrop-blur"
              >
                <MapPin 
                  className="h-4 w-4" 
                  style={{ color: "var(--secondary-1, #f57c00)" }}
                />
                <span className="text-xs font-medium text-slate-700">
                  Gentan, Baki — Solo Raya
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}