import { activities } from "@/data/activities";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  BookText,
  Clock3,
  Compass,
  HeartHandshake,
  Sparkles,
  Star,
  Trophy,
  Users,
  GraduationCap,
} from "lucide-react";

function Blob({
  className,
  delay = "",
}: {
  className: string;
  delay?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-40 ${className} ${
        delay ? delay : "animate-blob"
      }`}
    />
  );
}

// palette clean: satu kombinasi emerald untuk badge + kotak icon
const UNIFIED_ICON = "bg-primary-1 text-white";
const UNIFIED_BADGE =
  "border-primary-1/15 bg-primary-1/10 text-primary-1 hover:bg-primary-1/15";
const UNIFIED_DOT = "bg-primary-1";

const activityIconMap: Record<string, typeof BookOpen> = {
  Tahfiz: BookOpen,
  Keagamaan: HeartHandshake,
  Olahraga: Trophy,
  "Kegiatan Sekolah": GraduationCap,
  default: Sparkles,
};

export function AktivitasSection() {
  return (
    <section id="aktivitas" className="relative overflow-hidden bg-[#FDF9F3]">
      <Blob className="h-[700px] w-[700px] -top-40 left-1/2 -translate-x-1/2 bg-primary-4/12 blur-[90px]" />

      {/* header strip — sama seperti Sejarah di profil */}
      <div className="relative overflow-hidden border-b border-stone-100 bg-gradient-to-r from-primary-1 via-primary-2 to-secondary-1/70">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[repeating-linear-gradient(135deg,transparent_0_12px,white_12px_13px)]" />
        </div>
        <Blob className="h-40 w-64 -top-10 right-10 bg-white/15 blur-2xl opacity-40" />
        <div className="container-custom relative py-7 sm:py-9">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 backdrop-blur">
            <Star className="h-3.5 w-3.5 text-secondary-3 fill-secondary-3" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">Kurikulum & Aktivitas</span>
          </div>
          <h2 className="font-display mt-3 text-[26px] font-bold tracking-tight text-white sm:text-[32px] lg:text-[38px]">
            Aktivitas Santri
          </h2>
          <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-white/80">
            Dari halaqah tahfizh hingga berkuda dan memanah — setiap kegiatan menanamkan adab, disiplin, dan keberanian.
          </p>
        </div>
      </div>

      <div className="container-custom relative py-12 sm:py-16 lg:py-20 space-y-14">
        {/* highlight strip — 3 kartu ringkas, sekarang satu palet clean */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Keagamaan",
              desc: "Mabit, tartil & tilawah — memperkuat ruhiyah dan cinta Al-Qur'an.",
              icon: HeartHandshake,
            },
            {
              title: "Keterampilan",
              desc: "Public speaking, jurnalistik, life skill — bekal percaya diri.",
              icon: Users,
            },
            {
              title: "Keberanian & Fisik",
              desc: "Berkuda, memanah, renang, outbond, beladiri — melatih fokus & ketangguhan.",
              icon: Compass,
            },
          ].map((item) => (
            <Card
              key={item.title}
              className="group relative overflow-hidden rounded-[20px] border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary-1/5 blur-xl transition group-hover:bg-primary-1/10" />
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-sm transition group-hover:scale-105 ${UNIFIED_ICON}`}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-[15px] font-bold text-primary-1">{item.title}</h3>
                <p className="mt-1 text-[12.5px] leading-[1.7] text-stone-600">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* grid detail aktivitas — Card + Badge shadcn, satu palet */}
        <div>
          <div className="mx-auto max-w-xl text-center">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-secondary-1">
              Daftar Kegiatan
            </p>
            <h3 className="font-display mt-1 text-[24px] font-bold tracking-tight text-primary-1 sm:text-[28px]">
              Agenda Pembinaan Santri
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-[13px] leading-relaxed text-stone-500">
              Kurikulum terpadu sekolah dan asrama — seimbang antara hafalan, ilmu, dan pengembangan diri.
            </p>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-primary-1" />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity, idx) => {
              const Icon = activityIconMap[activity.category] ?? activityIconMap.default;
              return (
                <Card
                  key={activity.id}
                  className="group flex flex-col rounded-[20px] border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:border-primary-1/20"
                >
                  <CardContent className="flex flex-1 flex-col gap-4 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl shadow-sm transition group-hover:scale-105 ${UNIFIED_ICON}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${UNIFIED_BADGE}`}>
                        {activity.category}
                      </Badge>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-[11px] font-bold text-stone-300">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <h4 className="font-display text-[14px] font-bold text-primary-1">{activity.title}</h4>
                      </div>
                      <p className="mt-1.5 text-[12.5px] leading-[1.7] text-stone-600">{activity.description}</p>
                    </div>
                    <div className="mt-auto flex items-center gap-2 pt-1">
                      <span className={`h-1.5 w-1.5 rounded-full ${UNIFIED_DOT}`} />
                      <span className="text-[11px] font-semibold tracking-wide text-stone-400">STTD Al-Busyro</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Jadwal Harian — Card shadcn + Badge/Badge-dot satu palet */}
        <Card className="relative overflow-hidden rounded-[24px] border-stone-200 bg-white shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <Blob className="h-40 w-40 -top-10 -right-10 bg-secondary-3/10 blur-2xl" />
            <Blob className="h-32 w-32 -bottom-6 -left-6 bg-primary-4/15 blur-xl animate-blob-delay" />
            <div className="relative">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="lg:w-[300px] flex-shrink-0">
                  <Badge variant="outline" className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${UNIFIED_BADGE}`}>
                    <Clock3 className="h-3.5 w-3.5" />
                    Jadwal Harian
                  </Badge>
                  <h3 className="font-display mt-3 text-[20px] font-bold tracking-tight text-primary-1 leading-tight">
                    Jadwal Pembelajaran
                    <br />
                    Santri dalam Sehari
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-[1.7] text-stone-500">
                    Ritme harian yang seimbang — tahfizh, pelajaran madrasah, dan pembinaan karakter dari sebelum
                    subuh hingga istirahat malam.
                  </p>
                  <div className="mt-4 hidden items-center gap-2 lg:flex">
                    <span className="flex h-2 w-2 rounded-full bg-primary-1 animate-pulse" />
                    <span className="text-[11px] font-semibold tracking-wide text-stone-400">
                      04:00 — 21:00 WIB · Full Day
                    </span>
                  </div>
                  <Separator className="mt-5 hidden lg:block bg-stone-100" />
                  <div className="mt-5 hidden flex-wrap gap-2 lg:flex">
                    <Badge variant="outline" className={`rounded-full ${UNIFIED_BADGE}`}>
                      <span className={`h-2 w-2 rounded-full ${UNIFIED_DOT}`} /> Tahfizh
                    </Badge>
                    <Badge variant="outline" className={`rounded-full ${UNIFIED_BADGE}`}>
                      <span className={`h-2 w-2 rounded-full ${UNIFIED_DOT}`} /> Madrasah
                    </Badge>
                    <Badge variant="outline" className={`rounded-full ${UNIFIED_BADGE}`}>
                      <span className={`h-2 w-2 rounded-full ${UNIFIED_DOT}`} /> Pembinaan
                    </Badge>
                  </div>
                </div>

                {/* timeline */}
                <div className="flex-1 lg:pl-8">
                  <div className="relative">
                    <div className="absolute left-[18px] top-2 bottom-2 hidden w-px bg-primary-1/15 sm:block" />
                    <div className="space-y-3">
                      {[
                        {
                          time: "07.25–07.45",
                          title: "Halaqoh Tahfidz — Pertama",
                          desc: "Ziyadah & murojaah pagi bersama musyrif halaqah.",
                          icon: BookOpen,
                        },
                        {
                          time: "07.45–08.40",
                          title: "Halaqoh Tahfidz — Kedua",
                          desc: "Lanjutan setoran hafalan dengan Metode Al-Qosimi.",
                          icon: BookOpen,
                        },
                        {
                          time: "08.40–09.30",
                          title: "Pembelajaran Diniyyah I",
                          desc: "Pelajaran umum + diniyah terpadu — sesi pertama.",
                          icon: BookText,
                        },
                        {
                          time: "09.30–09.45",
                          title: "Istirahat",
                          desc: "Jeda sejenak — snack & persiapan kelas berikutnya.",
                          icon: Sparkles,
                        },
                        {
                          time: "09.45–10.45",
                          title: "Halaqoh Tahfidz — Ketiga",
                          desc: "Murojaah mutqin dan penguatan hafalan.",
                          icon: BookOpen,
                        },
                        {
                          time: "10.45–12.00",
                          title: "Pembelajaran Diniyyah II",
                          desc: "Pelajaran umum + diniyah terpadu — sesi kedua.",
                          icon: BookText,
                        },
                        {
                          time: "12.00–12.35",
                          title: "Dzuhur + Makan Siang",
                          desc: "Shalat berjamaah dan makan siang bersama.",
                          icon: HeartHandshake,
                        },
                        {
                          time: "12.35–13.35",
                          title: "Halaqoh Tahfidz — Keempat",
                          desc: "Halaqah siang — setoran & tasmi’ berkala.",
                          icon: BookOpen,
                        },
                        {
                          time: "13.35–14.35",
                          title: "Tidur Siang",
                          desc: "Qailulah — istirahat untuk menjaga stamina.",
                          icon: Sparkles,
                        },
                        {
                          time: "14.35–15.00",
                          title: "Ashar + Persiapan Pulang",
                          desc: "Shalat Ashar berjamaah dan persiapan pulang.",
                          icon: HeartHandshake,
                        },
                      ].map((item, idx) => (
                        <Card
                          key={`${item.title}-${idx}`}
                          className="group relative rounded-2xl border-stone-100 bg-stone-50/60 shadow-none transition hover:border-stone-200 hover:bg-white hover:shadow-sm hover:-translate-y-[1px]"
                        >
                          <CardContent className="flex gap-3 p-3 sm:gap-4 sm:p-4">
                            <div className="relative hidden flex-shrink-0 sm:flex sm:flex-col sm:items-center">
                              <div className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-sm transition group-hover:scale-105 ${UNIFIED_ICON}`}>
                                <item.icon className="h-4 w-4" />
                              </div>
                              <span className={`mt-2 hidden h-2 w-2 rounded-full sm:block ${UNIFIED_DOT} ring-4 ring-white shadow-sm`} />
                            </div>
                            <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl shadow-sm sm:hidden ${UNIFIED_ICON}`}>
                              <item.icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="outline" className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${UNIFIED_BADGE}`}>
                                  <Clock3 className="h-3 w-3" />
                                  {item.time} WIB
                                </Badge>
                                <span className="hidden text-[11px] font-bold text-stone-300 sm:inline">
                                  #{String(idx + 1).padStart(2, "0")}
                                </span>
                              </div>
                              <h4 className="mt-2 font-display text-[13px] font-bold leading-tight text-primary-1 sm:text-[14px]">
                                {item.title}
                              </h4>
                              <p className="mt-1 text-[12px] leading-[1.6] text-stone-600">{item.desc}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <p className="mt-4 flex items-center gap-2 text-[11px] font-medium text-stone-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-stone-300" />
                      Jadwal dapat menyesuaikan kegiatan asrama & hari Jumat — merujuk pengasuh halaqah.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
