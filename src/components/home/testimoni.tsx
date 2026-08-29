"use client";

import { Star, Quote } from "lucide-react";
import { Reveal, Stagger } from "@/components/motion/reveal";

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

const avatarColors = [
  "bg-primary-1",
  "bg-secondary-1",
  "bg-primary-2",
  "bg-secondary-2",
  "bg-primary-3",
  "bg-primary-1",
];

export default function Testimoni() {
  return (
    <section
      className="section-spacing bg-[var(--muted)]"
      id="testimoni"
    >
      <div className="container-custom">
        {/* Header */}
        <Reveal className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-[var(--primary-4)]/30 text-[var(--primary-foreground)] mb-4 tracking-wide uppercase">
            Testimoni
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--foreground)] mb-4">
            Apa Kata Mereka?
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-xl mx-auto text-base sm:text-lg">
            Cerita nyata dari wali santri dan alumni yang telah merasakan
            manfaat belajar di Pesantren Al-Busyro.
          </p>
        </Reveal>

        {/* Grid Cards — horizontal scroll carousel */}
        <Stagger
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          stagger={0.1}
          y={24}
        >
          {testimoniData.map((item, index) => (
            <div
              key={item.id}
              className="relative bg-[var(--card)] rounded-[var(--radius-xl)] p-6 shadow-sm border border-[var(--border)] flex flex-col gap-4 hover:shadow-md transition-shadow duration-300 flex-shrink-0 w-[85vw] sm:w-[360px] snap-start"
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-5 opacity-10">
                <Quote
                  size={48}
                  className="text-[var(--primary-1)]"
                  fill="currentColor"
                />
              </div>

              {/* Rating */}
              <div className="flex gap-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-[var(--secondary-1)] fill-[var(--secondary-1)]"
                  />
                ))}
              </div>

              {/* Pesan */}
              <p className="text-[var(--card-foreground)] text-sm sm:text-base leading-relaxed flex-1">
                &ldquo;{item.pesan}&rdquo;
              </p>

              {/* Divider */}
              <div className="h-px bg-[var(--border)]" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${avatarColors[index % avatarColors.length]}`}
                >
                  {item.inisial}
                </div>
                <div>
                  <p className="font-semibold text-[var(--foreground)] text-sm">
                    {item.nama}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    {item.jabatan}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
