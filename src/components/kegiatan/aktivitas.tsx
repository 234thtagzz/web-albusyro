import { activities } from "@/data/activities";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
import { HeaderStrip } from "@/components/ui/header-strip";

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

type ScheduleKind = "Tahfizh" | "Diniyyah" | "Jeda" | "Ibadah";

const scheduleKindStyle: Record<ScheduleKind, string> = {
  Tahfizh: "border-primary-1/15 bg-primary-1/10 text-primary-1",
  Diniyyah: "border-secondary-1/20 bg-secondary-1/10 text-secondary-1",
  Jeda: "border-stone-200 bg-stone-100 text-stone-500",
  Ibadah: "border-stone-200 bg-stone-100 text-stone-500",
};

const dailySchedule: {
  start: string;
  end: string;
  title: string;
  desc: string;
  kind: ScheduleKind;
}[] = [
  {
    start: "07.25",
    end: "07.45",
    title: "Halaqoh Tahfidz — Pertama",
    desc: "Ziyadah & murojaah pagi bersama musyrif halaqah.",
    kind: "Tahfizh",
  },
  {
    start: "07.45",
    end: "08.40",
    title: "Halaqoh Tahfidz — Kedua",
    desc: "Lanjutan setoran hafalan dengan Metode Al-Qosimi.",
    kind: "Tahfizh",
  },
  {
    start: "08.40",
    end: "09.30",
    title: "Pembelajaran Diniyyah I",
    desc: "Pelajaran umum + diniyah terpadu — sesi pertama.",
    kind: "Diniyyah",
  },
  {
    start: "09.30",
    end: "09.45",
    title: "Istirahat",
    desc: "Jeda sejenak — snack & persiapan kelas berikutnya.",
    kind: "Jeda",
  },
  {
    start: "09.45",
    end: "10.45",
    title: "Halaqoh Tahfidz — Ketiga",
    desc: "Murojaah mutqin dan penguatan hafalan.",
    kind: "Tahfizh",
  },
  {
    start: "10.45",
    end: "12.00",
    title: "Pembelajaran Diniyyah II",
    desc: "Pelajaran umum + diniyah terpadu — sesi kedua.",
    kind: "Diniyyah",
  },
  {
    start: "12.00",
    end: "12.35",
    title: "Dzuhur + Makan Siang",
    desc: "Shalat berjamaah dan makan siang bersama.",
    kind: "Ibadah",
  },
  {
    start: "12.35",
    end: "13.35",
    title: "Halaqoh Tahfidz — Keempat",
    desc: "Halaqah siang — setoran & tasmi’ berkala.",
    kind: "Tahfizh",
  },
  {
    start: "13.35",
    end: "14.35",
    title: "Tidur Siang",
    desc: "Qailulah — istirahat untuk menjaga stamina.",
    kind: "Jeda",
  },
  {
    start: "14.35",
    end: "15.00",
    title: "Ashar + Persiapan Pulang",
    desc: "Shalat Ashar berjamaah dan persiapan pulang.",
    kind: "Ibadah",
  },
];

const scheduleSummary = [
  { label: "Sesi tahfizh", count: "4 sesi", icon: BookOpen },
  { label: "Sesi diniyyah", count: "2 sesi", icon: BookText },
  { label: "Jeda & ibadah", count: "4 sesi", icon: HeartHandshake },
];

const dayNotes = [
  "Setiap hari Senin ada apel pagi dan halaqah tahsin.",
  "Khusus hari Sabtu pengembangan softskill dan kepulangan jam 10.00 WIB.",
];

export function AktivitasSection() {
  return (
    <section id="aktivitas" className="section-spacing relative overflow-hidden border-t border-stone-200 bg-white">
      <div className="pointer-events-none absolute -top-20 left-0 h-[400px] w-[500px] rounded-full bg-primary-4/10 blur-[80px]" aria-hidden />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-[360px] w-[360px] rounded-full bg-secondary-3/10 blur-[70px]" aria-hidden />

      <HeaderStrip
        badge={<><Star className="mr-1.5" />Kurikulum &amp; Aktivitas</>}
        title="Aktivitas Santri"
        description="Setiap kegiatan mengandung nilai yang bermanfaat untuk diri, sekitar, dan agama."
      />

      <div className="container-custom relative py-12 sm:py-16 lg:py-20 space-y-14">
        {/* highlight strip — 3 kartu ringkas, sekarang satu palet clean */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Tarbiyyah",
              desc: "tartil & tilawah — memperkuat ruhiyah dan cinta Al-Qur'an.",
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
                  className={`flex h-11 w-11 items-center justify-center rounded-sm shadow-sm transition group-hover:scale-105 ${UNIFIED_ICON}`}
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
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm shadow-sm transition group-hover:scale-105 ${UNIFIED_ICON}`}
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
      </div>

      <HeaderStrip
        badge={<><Star className="mr-1.5" />Keseharian Santri</>}
        title="Jadwal Harian"
        description="Dari berangkat hingga pulang kami pastikan setiap kegiatan yang santri lakukan bermanfaat dan berdampak pada masa depan mereka."
      />

      <div className="container-custom relative py-12 sm:py-16 lg:py-20">
        {/* Jadwal Harian — panel institusional + timeline editorial */}
        <Card className="overflow-hidden rounded-[24px] border-stone-200 bg-white shadow-sm [--card-spacing:0px]">
          <div className="grid lg:grid-cols-[320px_minmax(0,1fr)]">
            {/* Panel kiri — warna solid primary-1, tanpa gradien */}
            <div className="relative flex flex-col bg-primary-1 p-6 text-white sm:p-8 lg:p-9">
              <span aria-hidden className="absolute left-0 top-0 h-[3px] w-20 bg-secondary-1" />

              <Badge className="w-fit rounded-lg bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-1 shadow-sm">
                <Clock3 className="mr-1 h-3.5 w-3.5" />
                Full Day · 07.25 — 15.00 WIB
              </Badge>

              <h3 className="font-display mt-5 text-[22px] leading-[1.15] tracking-tight text-white sm:text-[24px]">
                Ritme Sehari Santri
              </h3>
              <p className="mt-3 text-[12.5px] leading-[1.75] text-white/75">
                Tahfizh, diniyyah, dan pembinaan karakter berjalan dalam satu alur yang seimbang — dari
                halaqah pagi hingga persiapan pulang.
              </p>

              <ul className="mt-6 space-y-3 border-t border-white/15 pt-5">
                {scheduleSummary.map((item) => (
                  <li key={item.label} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm bg-white/10 text-white/85">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1 text-[12.5px] text-white/75">{item.label}</span>
                    <span className="font-display text-[12px] tabular-nums text-white">{item.count}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-auto pt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Senin — Sabtu · Full Day
              </p>
            </div>

            {/* Panel kanan — timeline tanpa kartu bersarang */}
            <div className="flex flex-col p-6 sm:p-8 lg:p-9">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-stone-100 pb-5">
                <div>
                  <p className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-secondary-1">
                    Rangkaian Kegiatan
                  </p>
                  <h4 className="font-display mt-1 text-[18px] tracking-tight text-primary-1">
                    Sepuluh agenda harian
                  </h4>
                </div>
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-stone-400">
                  <Clock3 className="h-3.5 w-3.5" />
                  ± 7 jam 35 menit
                </span>
              </div>

              <ol className="mt-6">
                {dailySchedule.map((item, idx) => {
                  const isBreak = item.kind === "Jeda" || item.kind === "Ibadah";
                  const isLast = idx === dailySchedule.length - 1;

                  return (
                    <li
                      key={`${item.start}-${item.title}`}
                      className="grid grid-cols-[56px_minmax(0,1fr)] gap-4 sm:grid-cols-[72px_minmax(0,1fr)]"
                    >
                      <div className="pt-0.5 text-right">
                        <span className="font-display block text-[12.5px] font-bold tabular-nums text-primary-1 sm:text-[13px]">
                          {item.start}
                        </span>
                        <span className="mt-0.5 block text-[10px] tabular-nums text-stone-400">
                          {item.end}
                        </span>
                      </div>

                      <div
                        className={`relative pl-5 sm:pl-6 ${
                          isLast ? "pb-0" : "border-l border-stone-200 pb-5"
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`absolute -left-[5px] top-[5px] h-2.5 w-2.5 rounded-full border-2 shadow-sm ${
                            isBreak
                              ? "border-stone-300 bg-white"
                              : "border-white bg-primary-1"
                          }`}
                        />
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                          <h5
                            className={`font-display text-[13.5px] font-bold leading-snug tracking-tight sm:text-[14px] ${
                              isBreak ? "text-stone-600" : "text-primary-1"
                            }`}
                          >
                            {item.title}
                          </h5>
                          <span
                            className={`rounded-full border px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.12em] ${scheduleKindStyle[item.kind]}`}
                          >
                            {item.kind}
                          </span>
                        </div>
                        <p className="mt-1 text-[12px] leading-[1.65] text-stone-500">{item.desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <ul className="mt-6 grid gap-2.5 border-t border-stone-100 pt-5 sm:grid-cols-2">
                {dayNotes.map((note) => (
                  <li key={note} className="flex items-start gap-2 text-[11px] leading-[1.6] text-stone-500">
                    <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-secondary-1" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
