import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { school } from "@/data/school";
import { iconMap, type IconName } from "@/lib/icons";

export default function ProfilePage() {
  const whyData = school.whyChooseUs;
  const values = school.educationValues;

  return (
    <>
      <Navbar />
      <main className="flex-1" id="main-content">
        <section className="bg-slate-50 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="container-custom">
            <SectionHeading
              badge="Profil"
              title="Tentang STTD Al-Busyro"
              description={school.longDescription}
            />
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl">
              <Reveal>
              <h2 className="font-display text-2xl tracking-tight text-slate-900 sm:text-3xl">
                {whyData.headline}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600 sm:text-base">
                {whyData.description}
              </p>
              </Reveal>

              <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {whyData.threeMainPoints.map((point) => (
                  <div
                    key={point.title}
                    className="rounded-[24px] border border-slate-200 bg-white shadow-sm p-6"
                  >
                    <h3 className="font-display text-lg tracking-tight text-slate-900">
                      {point.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-emerald-700">
                      {point.subtitle}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {point.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Stagger>
            </div>
          </div>
        </section>

        <section className="section-spacing bg-white">
          <div className="container-custom">
            <SectionHeading
              badge="Visi & Misi"
              title="Visi dan Misi"
              description="Arah dan tujuan pendidikan STTD Al-Busyro."
            />
            <Reveal>
            <div className="mx-auto max-w-3xl space-y-4 mt-5">
              <div className="rounded-[24px] border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
                <h3 className="font-display text-lg tracking-tight text-slate-900">Visi</h3>
                <p className="mt-2 text-slate-600">{school.vision}</p>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-white shadow-sm p-6 sm:p-8">
                <h3 className="font-display text-lg tracking-tight text-slate-900">Misi</h3>
                <ul className="mt-3 space-y-2">
                  {school.mission.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </Reveal>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-custom">
            <SectionHeading
              badge="Nilai Pendidikan"
              title="Nilai-Nilai yang Kami Tanamkan"
              description="Tiga pilar hubungan yang menjadi fondasi pendidikan di STTD Al-Busyro."
            />
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-5">
              <div className="rounded-[24px] border border-slate-200 bg-white shadow-sm p-6">
                <h3 className="font-display text-lg tracking-tight text-slate-900">
                  {values.relationWithAllah.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {values.relationWithAllah.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-white shadow-sm p-6">
                <h3 className="font-display text-lg tracking-tight text-slate-900">
                  {values.relationWithHumans.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {values.relationWithHumans.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-white shadow-sm p-6">
                <h3 className="font-display text-lg tracking-tight text-slate-900">
                  {values.relationWithNature.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {values.relationWithNature.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Stagger>
          </div>
        </section>

        <section className="section-spacing bg-white">
          <div className="container-custom">
            <SectionHeading
              badge="Filosofi"
              title="Filosofi Pendidikan"
              description="Enam pilar yang membentuk fondasi pendidikan di STTD Al-Busyro."
            />
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-5">
              {school.values.map((value) => {
                const Icon = iconMap[value.icon as IconName];
                return (
                  <div
                    key={value.title}
                    className="rounded-[24px] border border-slate-200 bg-white shadow-sm p-6"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[12px] bg-primary/15 text-primary">
                      {Icon && <Icon className="h-6 w-6" />}
                    </div>
                    <h3 className="font-display text-lg tracking-tight text-slate-900">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </Stagger>
          </div>
        </section>
        </main>
        <Footer />
    </>
  );
}
