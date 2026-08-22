import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { school } from "@/data/school";
import { programs } from "@/data/programs";
import { iconMap, type IconName } from "@/lib/icons";

const gradients = [
  "from-emerald-50 to-white",
  "from-amber-50 to-white",
  "from-blue-50 to-white",
  "from-violet-50 to-white",
];

export default function EducationPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" id="main-content">
        <section className="bg-slate-50 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="container-custom">
            <SectionHeading
              badge="Pendidikan"
              title="Program Pendidikan"
              description="Program pendidikan terpadu yang menggabungkan tahfizhul Qur'an, adab, ilmu, dan karakter."
            />
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-custom">
            <div className="space-y-6">
              {programs.map((program, index) => {
                const Icon = iconMap[program.icon as IconName];
                return (
                  <div
                    key={program.id}
                    id={program.id}
                    className={`scroll-mt-20 rounded-[24px] border border-slate-200 bg-gradient-to-br ${gradients[index]} p-6 sm:p-8 lg:p-10`}
                  >
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
                      <div>
                        <div className="flex h-14 w-14 items-center justify-center rounded-[12px] bg-primary text-white">
                          {Icon && <Icon className="h-7 w-7" />}
                        </div>
                        <h2 className="mt-4 font-display text-2xl tracking-tight text-slate-900 sm:text-3xl">
                          {program.title}
                        </h2>
                        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                          {program.description}
                        </p>
                      </div>
                      <div>
                        <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-slate-400">
                          Highlight
                        </h3>
                        <ul className="space-y-3">
                          {program.highlights.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 text-[15px] text-slate-700"
                            >
                              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-spacing bg-white">
          <div className="container-custom">
            <SectionHeading
              badge="Kegiatan Nonakademik"
              title="Pengembangan Potensi Diri"
              description="Setiap anak memiliki potensi yang unik. Melalui beragam kegiatan, kami membantu santri mengembangkan bakat dan karakter."
            />
            <div className="flex flex-wrap justify-center gap-3">
              {school.activities.map((activity) => (
                <div
                  key={activity}
                  className="rounded-full border border-slate-200 bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-600 transition-all hover:border-primary/30 hover:bg-emerald-50 hover:text-primary"
                >
                  {activity}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
