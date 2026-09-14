"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Pencil, Filter, X } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteBerita } from "@/app/admin/berita/actions";
import type { Database } from "@/types/database";

type BeritaRow = Database["public"]["Tables"]["berita"]["Row"];

interface AdminBeritaTableProps {
  initialData: BeritaRow[];
}

const categories = ["Semua", "Berita", "Pengumuman", "Kegiatan", "Prestasi"];

export function AdminBeritaTable({ initialData }: AdminBeritaTableProps) {
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
        (item.excerpt && item.excerpt.toLowerCase().includes(q)) ||
        (item.author && item.author.toLowerCase().includes(q)) ||
        item.slug.toLowerCase().includes(q);

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
            placeholder="Cari judul, author, slug..."
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
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Published</th>
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
                      alt={row.image_alt ?? row.title}
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
                  <p className="text-xs text-stone-400 line-clamp-1">{row.excerpt}</p>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="outline" className="rounded-full text-xs">
                    {row.category}
                  </Badge>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-stone-500">{row.slug}</td>
                <td className="px-4 py-3 text-xs text-stone-500">
                  {new Date(row.published_at).toLocaleDateString("id-ID")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      render={<Link href={`/admin/berita/${row.id}/edit`} />}
                      nativeButton={false}
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <DeleteButton
                      itemTitle={row.title}
                      itemType="Berita"
                      onDelete={async () => {
                        return await deleteBerita(row.id);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-stone-400">
                  {search || category !== "Semua" ? (
                    <div className="space-y-2">
                      <p>Tidak ada berita yang cocok dengan kriteria pencarian.</p>
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
                    "Belum ada berita"
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
