import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { school } from "@/data/school";
import { HeaderStrip } from "@/components/ui/header-strip";

const UNIFIED_ICON = "bg-primary-1 text-white";
const UNIFIED_BADGE = "border-primary-1/15 bg-primary-1/10 text-primary-1";

export function DepartmentsSection() {
  return (
    <section className="relative overflow-hidden bg-[#FDF9F3]">
      <div className="absolute -top-24 left-1/2 h-[600px] w-[700px] -translate-x-1/2 rounded-full bg-primary-4/10 blur-[90px]" aria-hidden />
      <HeaderStrip
        badge="Kenapa Kami Hadir"
        title={school.whyChooseUs.headline}
        description={school.whyChooseUs.description}
      />

      <div className="container-custom relative py-12 sm:py-16">
        <div className="mx-auto max-w-xl text-center">
          <Badge variant="outline" className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${UNIFIED_BADGE}`}>
            Tiga Hal yang Kami Usahakan
          </Badge>
          <h3 className="font-display mt-3 text-[24px] font-bold tracking-tight text-primary-1 sm:text-[28px]">
            Pilar Kehadiran STTD Al-Busyro
          </h3>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-primary-1" />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {school.whyChooseUs.threeMainPoints.map((point, i) => (
            <Card
              key={point.title}
              className="group relative overflow-hidden rounded-[20px] border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:border-primary-1/15"
            >
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary-1/5 blur-xl transition group-hover:bg-primary-1/10" />
              <CardContent className="p-0">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-sm ${UNIFIED_ICON}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-4 text-[16px] font-bold text-primary-1">{point.title}</h3>
                <p className="mt-1 text-[11px] font-medium text-stone-500">{point.subtitle}</p>
                <ul className="mt-4 space-y-2">
                  {point.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary-1" />
                      <span className="text-[12.5px] leading-[1.65] text-stone-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
