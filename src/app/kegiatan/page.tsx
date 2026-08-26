"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Stagger } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { CategoryFilter } from "@/components/ui/category-filter";
import {
  activities,
  activityCategories,
  type ActivityCategory,
} from "@/data/activities";

export default function ActivitiesPage() {
  const [activeCategory, setActiveCategory] =
    useState<ActivityCategory>("Semua");

  const filteredActivities =
    activeCategory === "Semua"
      ? activities
      : activities.filter((a) => a.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="flex-1" id="main-content">
        <section className="bg-slate-50 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="container-custom">
            <SectionHeading
              badge="Kegiatan"
              title="Kegiatan Santri"
              description="Beragam kegiatan yang membantu santri mengembangkan bakat, membangun kepercayaan diri, dan melatih kepemimpinan."
            />
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-custom">
            <CategoryFilter
              categories={activityCategories}
              active={activeCategory}
              onChange={(c) => setActiveCategory(c as ActivityCategory)}
            />

            {filteredActivities.length === 0 ? (
              <EmptyState title="Belum ada kegiatan dalam kategori ini." />
            ) : (
              <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="rounded-[24px] border border-slate-200 bg-white shadow-sm p-6 transition-all hover:border-slate-300"
                  >
                    <span className="mb-3 inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                      {activity.category}
                    </span>
                    <h3 className="font-display text-lg tracking-tight text-slate-900">
                      {activity.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                      {activity.description}
                    </p>
                  </div>
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
