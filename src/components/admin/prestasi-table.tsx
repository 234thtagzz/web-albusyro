"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Pencil, Filter, X } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";
import { deletePrestasi } from "@/app/admin/prestasi/actions";
import type { Database } from "@/types/database";

type PrestasiRow = Database["public"]["Tables"]["prestasi"]["Row"];

interface AdminPrestasiTableProps {
  initialData: PrestasiRow[];
}

const categories = ["Semua", "Tilawah", "Tahfizh", "Seni", "Adzan", "Akademik", "Lainnya"];
const levels = ["Semua", "Sekolah", "Kota/Kabupaten", "Provinsi", "Nasional", "Internasional"];

export function AdminPrestasiTable({ initialData }: AdminPrestasiTableProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [level, setLevel] = useState("Semua");

  const filteredData = useMemo(() => {
    return initialData.filter((item) => {
      const matchCategory =
        category === "Semua" || item.category === category;
      const matchLevel =
        level === "Semua" || item.level === level;
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        item.title.toLowerCase().includes(q) ||
        item.competition.toLowerCase().includes(q) ||
        (item.participant && item.participant.toLowerCase().includes(q)) ||
        item.year.includes(q);

      return matchCategory && matchLevel && matchSearch;
    });
  }, [initialData, search, category, level]);

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari prestasi, peserta, tahun..."
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

        <div className="flex flex-wrap items-center gap-2">
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

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-primary-1/20 cursor-pointer"
          >
            {levels.map((l) => (
              <option key={l} value={l}>
                {l === "Semua" ? "Semua Tingkat" : l}
              </option>
            ))}
          </select>

          <span className="text-xs text-stone-400 hidden sm:inline">
            ({filteredData.length} data)
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-xs">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-left text-xs uppercase tracking-wider text-stone-500">
            <tr>
              <th className="px-4 py-3">Gambar</th>
              <th className="px-4 py-3">Prestasi</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Tahun</th>
              <th className="px-4 py-3">Tingkat</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredData.map((row) => (
              <tr key={row.id} className="hover:bg-stone-50/60 transition">
                <td className="px-4 py-3">
                  {row.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={row.image_url}
                      alt={row.title}
                      className="h-12 w-16 rounded-lg object-cover border border-stone-200"
                    />
                  ) : (
                    <div className="flex h-12 w-16 items-center justify-center rounded-lg border border-dashed border-stone-200 bg-stone-50 text-xs text-stone-400">
                      No img
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 max-w-[260px]">
                  <p className="font-medium text-stone-900 line-clamp-1">{row.title}</p>
                  <p className="text-xs text-stone-400 line-clamp-1">
                    {row.competition} • {row.participant}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="outline" className="rounded-full text-xs">
                    {row.category}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-xs text-stone-700 font-medium">{row.year}</td>
                <td className="px-4 py-3 text-xs text-stone-600">{row.level}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      render={<Link href={`/admin/prestasi/${row.id}/edit`} />}
                      nativeButton={false}
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <DeleteButton
                      itemTitle={row.title}
                      itemType="Prestasi"
                      onDelete={async () => {
                        return await deletePrestasi(row.id);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-stone-400">
                  {search || category !== "Semua" || level !== "Semua" ? (
                    <div className="space-y-2">
                      <p>Tidak ada prestasi yang cocok dengan kriteria pencarian.</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearch("");
                          setCategory("Semua");
                          setLevel("Semua");
                        }}
                      >
                        Reset Filter
                      </Button>
                    </div>
                  ) : (
                    "Belum ada prestasi"
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
