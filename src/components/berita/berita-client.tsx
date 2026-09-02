"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Stagger } from "@/components/motion/reveal";
import { EmptyState } from "@/components/ui/empty-state";
import { CategoryFilter } from "@/components/ui/category-filter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper } from "lucide-react";
import type { Database } from "@/types/database";

type Row = Database["public"]["Tables"]["berita"]["Row"];
const cats = ["Semua","Berita","Pengumuman","Kegiatan","Prestasi"] as const;

export function BeritaClient({ items, fallback = false }: { items: Row[]; fallback?: boolean }) {
  const [active, setActive] = useState("Semua");
  const filtered = active === "Semua" ? items : items.filter((n) => n.category === active);

  return (
    <>
      <CategoryFilter categories={[...cats]} active={active} onChange={(c) => setActive(c)} />
      {fallback && <p className="mt-3 text-xs text-amber-600">Menampilkan data sementara — kelola via /admin/berita</p>}
      {filtered.length === 0 ? (
        <EmptyState icon={<Newspaper className="h-7 w-7 text-slate-600" />} title="Belum ada berita yang tersedia." description="Berita akan diperbarui oleh pihak STTD Al-Busyro." />
      ) : (
        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((news) => (
            <Link key={news.id} href={`/berita/${news.slug}`}>
              <Card className="group overflow-hidden rounded-[24px] border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-primary-1/15 hover:shadow-md">
                <div className="relative aspect-video overflow-hidden bg-stone-100">
                  {news.image_url ? (
                    <Image
                      src={news.image_url}
                      alt={news.image_alt ?? news.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform group-hover:scale-105"
                      unoptimized={news.image_url.includes("supabase.co")}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-primary-1/5"><Newspaper className="h-10 w-10 text-primary-1/30" /></div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-1/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <CardContent>
                  <div className="flex items-center gap-2 text-xs text-stone-600">
                    <Badge variant="outline" className="rounded-full border-primary-1/15 bg-primary-1/10 px-3 py-1 text-[11px] font-bold text-primary-1">{news.category}</Badge>
                    <span className="text-stone-500">{new Date(news.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                  </div>
                  <h3 className="mt-2 font-display text-lg tracking-tight text-slate-900 line-clamp-2">{news.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600 line-clamp-2">{news.excerpt ?? ""}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Stagger>
      )}
    </>
  );
}
