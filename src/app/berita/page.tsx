"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyState } from "@/components/ui/empty-state";
import { CategoryFilter } from "@/components/ui/category-filter";
import { newsItems, newsCategories, type NewsCategory } from "@/data/news";
import { Newspaper } from "lucide-react";

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>("Semua");

  const filteredNews =
    activeCategory === "Semua"
      ? newsItems
      : newsItems.filter((n) => n.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="flex-1" id="main-content">
        <section className="bg-slate-50 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="container-custom">
            <SectionHeading
              badge="Berita"
              title="Berita & Pengumuman"
              description="Informasi terkini dari STTD Al-Busyro."
            />
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-custom">
            <CategoryFilter
              categories={newsCategories}
              active={activeCategory}
              onChange={(c) => setActiveCategory(c as NewsCategory)}
            />

            {filteredNews.length === 0 ? (
              <EmptyState
                icon={<Newspaper className="h-7 w-7 text-slate-600" />}
                title="Belum ada berita yang tersedia."
                description="Berita akan diperbarui oleh pihak STTD Al-Busyro."
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredNews.map((news) => (
                  <Link
                    key={news.id}
                    href={`/berita/${news.slug}`}
                    className="group rounded-[24px] border border-slate-200 bg-white shadow-sm transition-all hover:border-slate-300"
                  >
                    <div className="aspect-video overflow-hidden rounded-t-[24px] bg-slate-200">
                      {news.imageUrl ? (
                        <Image
                          src={news.imageUrl}
                          alt={news.imageAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Newspaper className="h-10 w-10 text-slate-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="rounded-full bg-primary/15 px-2.5 py-0.5 font-medium text-primary">
                          {news.category}
                        </span>
                        <span>{news.date}</span>
                      </div>
                      <h3 className="mt-2 font-display text-lg tracking-tight text-slate-900 line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                        {news.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
