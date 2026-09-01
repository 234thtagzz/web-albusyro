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
    jabatan: "Wali Santri",
    rating: 5,
    pesan:
      "Alhamdulillah, putra saya berkembang pesat sejak mondok di Al-Busyro. Akhlaknya membaik, hafalannya bertambah, dan semangatnya dalam belajar luar biasa.",
    inisial: "AF",
  },
  {
    id: 2,
    nama: "Siti Rohmah",
    jabatan: "Wali Santri",
    rating: 5,
    pesan:
      "Pesantren Al-Busyro luar biasa. Ustadz dan ustadzahnya sabar, metode pengajarannya modern namun tetap berpegang pada nilai-nilai salafiyah.",
    inisial: "SR",
  },
  {
    id: 3,
    nama: "Muhammad Ridwan",
    jabatan: "Alumni",
    rating: 5,
    pesan:
      "Mondok di sini mengubah hidup saya. Ilmu yang saya dapatkan menjadi bekal berharga dalam kehidupan sehari-hari dan karier saya sekarang.",
    inisial: "MR",
  },
  {
    id: 4,
    nama: "Fatimah Azzahra",
    jabatan: "Wali Santri",
    rating: 5,
    pesan:
      "Lingkungan yang kondusif, bersih, dan islami. Anak saya betah dan bahagia di sini. Terima kasih Al-Busyro atas dedikasi luar biasa.",
    inisial: "FA",
  },
  {
    id: 5,
    nama: "Hasan Basri",
    jabatan: "Alumni",
    rating: 5,
    pesan:
      "Program tahfidz di Al-Busyro sangat terstruktur. Alhamdulillah saya berhasil khatam 30 juz selama mondok di sini dengan bimbingan ustadz yang berpengalaman.",
    inisial: "HB",
  },
  {
    id: 6,
    nama: "Nuraini Putri",
    jabatan: "Wali Santri",
    rating: 5,
    pesan:
      "Komunikasi antara pesantren dan orang tua sangat baik. Saya selalu mendapat update perkembangan anak. Sangat merekomendasikan pesantren ini!",
    inisial: "NP",
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
            Cerita nyata dari wali santri dan alumni yang telah merasakan manfaat belajar di STTD Al-Busyro.
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
