"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { school } from "@/data/school";
import { heroStats, waLink } from "@/data/home";

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
      {/* Tekstur titik halus, bukan glow orb */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 60% 30%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 60% 30%, black 30%, transparent 75%)",
        }}
      />

      <div className="container-custom relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Kolom teks */}
          <div className="lg:col-span-6 xl:col-span-6">
            <span
              data-hero="badge"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-800"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
              </span>
              PPDB Tahun Ajaran Baru Dibuka
            </span>

            <h1 className="font-display mt-6 text-[clamp(2.5rem,5.6vw,4.25rem)] leading-[1.02] text-slate-900">
              <span data-hero="line" className="block">
                Membentuk Generasi
              </span>
              <span data-hero="line" className="block">
                Qur&rsquo;ani dengan{" "}
                <span className="text-emerald-700">Adab</span>
              </span>
              <span data-hero="line" className="block">
                dan <span className="text-emerald-700">Ilmu</span>.
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
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary-2 px-7 text-[15px] font-semibold text-primary-foreground shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-3 hover:shadow-lg"
              >
                Daftar PPDB
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/ppdb"
                className="inline-flex h-12 items-center rounded-full border border-slate-300 bg-white px-7 text-[15px] font-medium text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
              >
                Lihat Brosur
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-3 divide-x divide-slate-200 border-y border-slate-200 py-6">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  data-hero="stat"
                  className="px-4 first:pl-0 last:pr-0"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl text-emerald-900 sm:text-3xl">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-[11px] leading-snug text-slate-500 sm:text-xs">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Kolom visual berlapis */}
          <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
            <div className="relative mx-auto max-w-[420px] lg:max-w-none">
              <div
                aria-hidden="true"
                data-hero="visual"
                className="absolute -inset-2 -rotate-2 rounded-[36px] border border-emerald-100 bg-white sm:-inset-3"
              />
              <div
                data-hero="visual"
                className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-slate-200 shadow-xl"
              >
                <Image
                  src="/images/hero-mihrab.svg"
                  alt={`Ornamen mihrab dan mushaf — identitas ${school.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover"
                />
              </div>

              {/* Kartu metode */}
              <div
                data-hero="float"
                className="absolute -bottom-6 -left-3 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg sm:-left-8"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-800 font-display text-sm text-emerald-50">
                  AQ
                </span>
                <span>
                  <span className="block text-sm font-bold text-slate-900">
                    Metode Al&#8209;Qosimi
                  </span>
                  <span className="block text-xs text-slate-500">
                    Diajukan langsung sang pendiri
                  </span>
                </span>
              </div>

              {/* Chip lokasi */}
              <div
                data-hero="float"
                className="absolute -top-5 right-4 flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 py-2 pr-4 pl-3 shadow-md backdrop-blur"
              >
                <MapPin className="h-4 w-4 text-amber-600" />
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
