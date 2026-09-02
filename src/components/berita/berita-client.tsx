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
              <Card className="group rounded-[24px] border-slate-200 bg-white shadow-sm ring-0 transition-all hover:border-slate-300">
                <div className="relative aspect-video overflow-hidden rounded-t-[24px] bg-slate-200">
                  {news.image_url ? (
                    <Image src={news.image_url} alt={news.image_alt ?? news.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center"><Newspaper className="h-10 w-10 text-slate-300" /></div>
                  )}
                </div>
                <CardContent>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Badge variant="secondary" className="bg-primary/15 text-primary">{news.category}</Badge>
                    <span>{new Date(news.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                  </div>
                  <h3 className="mt-2 font-display text-lg tracking-tight text-slate-900 line-clamp-2">{news.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">{news.excerpt ?? ""}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Stagger>
      )}
    </>
  );
}
