import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Stagger } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { createClient } from "@/lib/supabase/server";
import { achievements as fallback } from "@/data/achievements";

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
        <section className="bg-slate-50 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="container-custom">
            <SectionHeading
              badge="Prestasi"
              title="Prestasi Santri"
              description="Pencapaian yang membanggakan dari para santri STTD Al-Busyro dalam berbagai bidang."
            />
            {isFallback && !error && (
              <p className="mt-3 text-xs text-amber-600">Menampilkan data sementara — kelola via /admin/prestasi</p>
            )}
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-custom">
            {achievements.length === 0 ? (
              <EmptyState
                icon={<Trophy className="h-7 w-7 text-slate-600" />}
                title="Belum ada data prestasi yang tersedia."
                description="Informasi akan diperbarui oleh pihak STTD Al-Busyro."
              />
            ) : (
              <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {achievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className="rounded-[24px] border-slate-200 bg-white shadow-sm ring-0 transition-all hover:border-slate-300"
                  >
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Trophy className="h-4 w-4 text-amber-600" />
                        <span>{achievement.year}</span>
                        <span className="text-slate-500">&bull;</span>
                        <span>{achievement.level}</span>
                      </div>
                      <h3 className="mt-2 font-display text-lg tracking-tight text-slate-900">
                        {achievement.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {achievement.competition}
                      </p>
                      {achievement.participant && (
                        <p className="mt-1 text-xs text-slate-400">
                          {achievement.participant}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Stagger>
            )}
          </div>
        </section>
        </main>
        <Footer />
    </>
  );
}
