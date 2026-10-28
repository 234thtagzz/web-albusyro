"use client";

import Image from "next/image";
import Link from "next/link";
import { Stagger } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper } from "lucide-react";

import type { News } from "@/data/news";
import { newsItems } from "@/data/news";

interface LatestNewsProps {
  limit?: number;
}

export function LatestNews({ limit = 3 }: LatestNewsProps) {
  // Sort by date descending and take the latest
  const sorted = [...newsItems]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-xl font-bold text-stone-900 mb-8 text-center">
          Berita Terbaru
        </h2>

        {sorted.length === 0 ? (
          <p className="text-stone-600 text-center">Belum ada berita tersedia.</p>
        ) : (
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((news) => (
              <Link
                key={news.id}
                href={`/berita/${news.slug}`}
                className="flex flex-col h-100"
              >
                <div
                  className="relative aspect-square overflow-hidden rounded-[24px] bg-stone-100"
                >
                  {news.imageUrl ? (
                    <Image
                      src={news.imageUrl}
                      alt={news.imageAlt ?? news.title}
                      className="object-cover transition-transform group-hover:scale-105"
                      fill
                    />
                  ) : (
                    <div
                      className="flex h-full items-center justify-center bg-primary-1/5"
                    >
                      <Newspaper className="h-6 w-6 text-primary-1/30" />
                    </div>
                  )}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-1/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </div>
                <CardContent className="flex flex-col flex-1 p-4">
                  <div className="flex items-center gap-2 text-xs text-stone-600 mb-3">
                    <Badge
                      variant="outline"
                      className="rounded-full border-primary-1/15 bg-primary-1/10 px-3 py-1 text-[11px] font-bold text-primary-1"
                    >
                      {news.category}
                    </Badge>
                    <span className="text-stone-500">
                      {new Date(news.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="font-display font-medium text-lg tracking-tight text-slate-900 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600 line-clamp-2">
                    {news.excerpt ?? ""}
                  </p>
                </CardContent>
              </Link>
            ))}
          </Stagger>
        )}
      </div>
    </section>
  );
}