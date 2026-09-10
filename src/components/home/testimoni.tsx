"use client";

import { Star, Quote } from "lucide-react";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const UNIFIED_ICON = "bg-primary-1 text-white";
const UNIFIED_BADGE = "border-primary-1/15 bg-primary-1/10 text-primary-1";

const testimoniData = [
  {
    id: 1,
    nama: "Ahmad Fauzi",
    jabatan: "Wali Santri Kelas 4",
    rating: 5,
    pesan:
      "Alhamdulillah, hafalan ananda terjaga mutqin dengan bimbingan asatidzah yang sabar. Yang paling membahagiakan adalah perubahan adab dan baktinya kepada orang tua di rumah.",
    inisial: "AF",
  },
  {
    id: 2,
    nama: "Siti Rohmah",
    jabatan: "Wali Santri Kelas 2",
    rating: 5,
    pesan:
      "Metode talaqqi di STTD Al-Busyro sangat teliti dalam makharijul huruf dan tajwid. Anak kami belajar dengan ceria tanpa rasa tertekan, dan bacaannya semakin fasih.",
    inisial: "SR",
  },
  {
    id: 3,
    nama: "dr. Muhammad Ridwan",
    jabatan: "Wali Santri Kelas 5",
    rating: 5,
    pesan:
      "Integrasi kurikulum Kemenag dan target tahfizh 10-15 juz mutqin sangat terstruktur. Ananda tidak hanya hafal Al-Qur'an, tapi juga menguasai pelajaran umum dengan baik.",
    inisial: "MR",
  },
  {
    id: 4,
    nama: "Fatimah Azzahra",
    jabatan: "Wali Santri Kelas 3",
    rating: 5,
    pesan:
      "Komunikasi sekolah dengan orang tua sangat terbuka melalui buku mutaba'ah dan laporan berkala. Lingkungan belajarnya kondusif menanamkan sunnah sejak dini.",
    inisial: "FA",
  },
];

export default function Testimoni() {
  return (
    <section className="relative overflow-hidden border-t border-stone-200 bg-[#FDF9F3]" id="testimoni">
      <div className="pointer-events-none absolute -top-28 right-0 h-[420px] w-[460px] rounded-full bg-primary-4/15 blur-[70px]" aria-hidden />
      <div className="container-custom section-spacing relative">
        <Reveal className="mx-auto max-w-xl text-center">
          <Badge variant="outline" className={`mx-auto rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${UNIFIED_BADGE}`}>
            Kata Orang Tua
          </Badge>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-primary-1 sm:text-4xl lg:text-[40px]">
            Apa Kata Mereka?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-stone-500">
            Pengalaman nyata para wali santri yang mempercayakan pendidikan ananda di STTD Al-Busyro.
          </p>
          <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-primary-1" />
        </Reveal>

        <Stagger
          className="mt-10 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          stagger={0.06}
          y={16}
        >
          {testimoniData.map((item) => (
            <Card
              key={item.id}
              className="group relative flex flex-shrink-0 snap-start flex-col gap-4 rounded-[20px] border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:border-primary-1/15 w-[85vw] sm:w-[360px]"
            >
              <CardContent className="flex flex-1 flex-col gap-4 p-0">
                <div className="absolute right-5 top-5 opacity-10">
                  <Quote size={44} className="text-primary-1" fill="currentColor" />
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-primary-1 text-primary-1" />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-stone-700">&ldquo;{item.pesan}&rdquo;</p>
                <div className="h-px bg-stone-100" />
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm ${UNIFIED_ICON}`}>
                    {item.inisial}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary-1">{item.nama}</p>
                    <p className="text-xs text-stone-500">{item.jabatan}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
