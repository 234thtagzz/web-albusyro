"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Pencil, Filter, X } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteGaleri } from "@/app/admin/galeri/actions";
import type { Database } from "@/types/database";

type GaleriRow = Database["public"]["Tables"]["galeri"]["Row"];

interface AdminGaleriTableProps {
  initialData: GaleriRow[];
}

const categories = ["Semua", "Pembelajaran", "Tahfiz", "Kegiatan", "Prestasi", "Lingkungan"];

export function AdminGaleriTable({ initialData }: AdminGaleriTableProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  const filteredData = useMemo(() => {
    return initialData.filter((item) => {
      const matchCategory =
        category === "Semua" || item.category === category;
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.alt && item.alt.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });
  }, [initialData, search, category]);

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul atau deskripsi foto..."
            className="pl-9 bg-white"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-stone-400" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-primary-1/20 cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "Semua" ? "Semua Kategori" : c}
              </option>
            ))}
          </select>
          <span className="text-xs text-stone-400 hidden sm:inline">
            ({filteredData.length} foto)
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredData.map((row) => (
          <Card key={row.id} className="overflow-hidden rounded-2xl border-stone-200 bg-white shadow-xs hover:shadow-md transition">
            <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={row.image_url}
                alt={row.alt ?? row.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <Badge
                variant="outline"
                className="absolute left-2.5 top-2.5 rounded-full bg-white/95 text-xs font-medium shadow-xs"
              >
                {row.category}
              </Badge>
            </div>
            <CardContent className="p-4">
              <p className="font-semibold text-stone-900 line-clamp-1">{row.title}</p>
              <p className="text-xs text-stone-500 line-clamp-2 mt-1 min-h-[32px]">
                {row.description || <span className="italic text-stone-400">Tidak ada deskripsi</span>}
              </p>
              <div className="mt-3 flex justify-end gap-1 border-t border-stone-100 pt-2.5">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  render={<Link href={`/admin/galeri/${row.id}/edit`} />}
                  nativeButton={false}
                  aria-label="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <DeleteButton
                  itemTitle={row.title}
                  itemType="Galeri"
                  onDelete={async () => {
                    return await deleteGaleri(row.id);
                  }}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredData.length === 0 && (
          <Card className="col-span-full rounded-2xl border-dashed bg-white p-12 text-center text-stone-400">
            {search || category !== "Semua" ? (
              <div className="space-y-2">
                <p>Tidak ada foto yang cocok dengan kriteria pencarian.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearch("");
                    setCategory("Semua");
                  }}
                >
                  Reset Filter
                </Button>
              </div>
            ) : (
              "Belum ada galeri"
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
