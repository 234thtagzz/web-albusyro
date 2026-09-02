import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Stagger } from "@/components/motion/reveal";
import { PageHero } from "@/components/ui/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { createClient } from "@/lib/supabase/server";
import { achievements as fallback } from "@/data/achievements";
import Image from "next/image";

export const revalidate = 60;

export default async function AchievementsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("prestasi").select("*").order("created_at", { ascending: false });
  const achievements = data && data.length > 0 ? data : fallback;
  const isFallback = !data || data.length === 0;

  return (
    <>
      <Navbar />
      <main className="flex-1" id="main-content">
        <PageHero
          badge="Prestasi"
          title="Prestasi Santri"
          description="Pencapaian yang membanggakan dari para santri STTD Al-Busyro dalam berbagai bidang — tilawah, tahfizh, seni, dan akademik."
          meta={isFallback && !error ? "Menampilkan data sementara — kelola via /admin/prestasi" : undefined}
        />
        <section className="section-spacing relative overflow-hidden border-t border-stone-200 bg-white">
          <div className="pointer-events-none absolute -top-20 left-0 h-[400px] w-[500px] rounded-full bg-primary-4/10 blur-[80px]" aria-hidden />
          <div className="pointer-events-none absolute -bottom-20 right-0 h-[360px] w-[360px] rounded-full bg-secondary-3/10 blur-[70px]" aria-hidden />
          <div className="container-custom relative">
            {achievements.length === 0 ? (
              <EmptyState
                icon={<Trophy className="h-7 w-7 text-primary-1" />}
                title="Belum ada data prestasi yang tersedia."
                description="Informasi akan diperbarui oleh pihak STTD Al-Busyro."
              />
            ) : (
              <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {achievements.map((achievement) => {
                  const img = (achievement as unknown as { image_url?: string | null }).image_url;
                  return (
                    <Card
                      key={achievement.id}
                      className="group overflow-hidden rounded-[20px] border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-primary-1/15 hover:shadow-md"
                    >
                      {img && (
                        <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
                          <Image
                            src={img}
                            alt={achievement.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 33vw"
                            className="object-cover transition-transform group-hover:scale-105"
                            unoptimized={img.includes("supabase.co")}
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-1/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="rounded-full border-primary-1/15 bg-primary-1/10 px-3 py-1 text-[11px] font-bold text-primary-1">
                            {achievement.category}
                          </Badge>
                          <span className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
                            <Trophy className="h-3.5 w-3.5 text-amber-600" />
                            {achievement.year} • {achievement.level}
                          </span>
                        </div>
                        <h3 className="mt-3 font-display text-[16px] font-bold leading-snug tracking-tight text-primary-1">{achievement.title}</h3>
                        <p className="mt-1 text-[13px] leading-relaxed text-stone-600">{achievement.competition}</p>
                        {achievement.participant && (
                          <p className="mt-3 inline-flex rounded-full bg-stone-50 px-3 py-1 text-xs font-medium text-stone-500">{achievement.participant}</p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </Stagger>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
