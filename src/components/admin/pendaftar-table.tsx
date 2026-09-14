"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Search, Filter, MessageCircle, X, FileText, ExternalLink, Eye } from "lucide-react";
import { PendaftarStatusSelect } from "./pendaftar-status-select";
import { DeleteButton } from "./delete-button";
import { deletePendaftar } from "@/app/admin/pendaftar/actions";
import type { Database } from "@/types/database";

type PendaftarRow = Database["public"]["Tables"]["ppdb_registrations"]["Row"];

interface AdminPendaftarTableProps {
  initialData: PendaftarRow[];
}

interface PreviewDoc {
  title: string;
  namaSantri: string;
  docType: "Kartu Keluarga (KK)" | "Akta Kelahiran";
  url: string;
}

const statuses = ["Semua", "pending", "wa_verified", "diterima", "ditolak"];

export function AdminPendaftarTable({ initialData }: AdminPendaftarTableProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Semua");
  const [selectedDoc, setSelectedDoc] = useState<PreviewDoc | null>(null);

  const filteredData = useMemo(() => {
    return initialData.filter((item) => {
      const matchStatus = status === "Semua" || item.status === status;
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        item.nama.toLowerCase().includes(q) ||
        item.nama_wali.toLowerCase().includes(q) ||
        item.wa_wali.includes(q) ||
        (item.asal_sekolah && item.asal_sekolah.toLowerCase().includes(q)) ||
        (item.nisn && item.nisn.includes(q)) ||
        (item.alamat && item.alamat.toLowerCase().includes(q));

      return matchStatus && matchSearch;
    });
  }, [initialData, search, status]);

  const formatWaLink = (wa: string, namaWali: string, namaSantri: string) => {
    let clean = wa.replace(/[^0-9]/g, "");
    if (clean.startsWith("0")) clean = "62" + clean.slice(1);
    const msg = encodeURIComponent(
      `Assalamu'alaikum Warahmatullahi Wabarakatuh, Bapak/Ibu ${namaWali}. Kami dari Panitia PPDB STTD Al-Busyro terkait pendaftaran ananda ${namaSantri}.`
    );
    return `https://wa.me/${clean}?text=${msg}`;
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama santri, wali, WA, asal..."
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
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-primary-1/20 cursor-pointer"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s === "Semua" ? "Semua Status" : s}
              </option>
            ))}
          </select>
          <span className="text-xs text-stone-400 hidden sm:inline">
            ({filteredData.length} pendaftar)
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-xs">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-left text-xs uppercase tracking-wider text-stone-500">
            <tr>
              <th className="px-4 py-3">Nama Santri</th>
              <th className="px-4 py-3">Wali / WhatsApp</th>
              <th className="px-4 py-3">Berkas (KK / Akta)</th>
              <th className="px-4 py-3">Asal Sekolah & Alamat</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Tanggal Daftar</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredData.map((row) => (
              <tr key={row.id} className="hover:bg-stone-50/60 transition">
                <td className="px-4 py-3">
                  <p className="font-semibold text-stone-900">{row.nama}</p>
                  <p className="text-xs text-stone-400 font-mono">NISN: {row.nisn ?? "-"}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-stone-800">{row.nama_wali}</p>
                  {row.wa_wali ? (
                    <a
                      href={formatWaLink(row.wa_wali, row.nama_wali, row.nama)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition"
                      title="Hubungi via WhatsApp"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                      {row.wa_wali}
                    </a>
                  ) : (
                    <p className="text-xs text-stone-400">-</p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1.5 min-w-[130px]">
                    {row.foto_kk ? (
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedDoc({
                            title: `Foto Kartu Keluarga (KK) - ${row.nama}`,
                            namaSantri: row.nama,
                            docType: "Kartu Keluarga (KK)",
                            url: row.foto_kk!,
                          })
                        }
                        className="inline-flex items-center justify-between gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50/80 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition shadow-2xs group cursor-pointer"
                        title="Lihat Foto Kartu Keluarga"
                      >
                        <span className="inline-flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5 text-emerald-600" />
                          Foto KK
                        </span>
                        <Eye className="h-3 w-3 text-emerald-500 opacity-60 group-hover:opacity-100" />
                      </button>
                    ) : (
                      <span className="text-xs text-stone-400 italic">KK: -</span>
                    )}

                    {row.foto_akta ? (
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedDoc({
                            title: `Foto Akta Kelahiran - ${row.nama}`,
                            namaSantri: row.nama,
                            docType: "Akta Kelahiran",
                            url: row.foto_akta!,
                          })
                        }
                        className="inline-flex items-center justify-between gap-1.5 rounded-lg border border-sky-200 bg-sky-50/80 px-2.5 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-100 transition shadow-2xs group cursor-pointer"
                        title="Lihat Foto Akta Kelahiran"
                      >
                        <span className="inline-flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5 text-sky-600" />
                          Foto Akta
                        </span>
                        <Eye className="h-3 w-3 text-sky-500 opacity-60 group-hover:opacity-100" />
                      </button>
                    ) : (
                      <span className="text-xs text-stone-400 italic">Akta: -</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-stone-600 max-w-[220px]">
                  <p className="font-medium text-stone-800">{row.asal_sekolah ?? "-"}</p>
                  {row.alamat && <p className="text-stone-400 truncate">{row.alamat}</p>}
                </td>
                <td className="px-4 py-3">
                  <PendaftarStatusSelect id={row.id} currentStatus={row.status} />
                </td>
                <td className="px-4 py-3 text-xs text-stone-500">
                  {new Date(row.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3 text-right">
                  <DeleteButton
                    itemTitle={row.nama}
                    itemType="Pendaftar"
                    onDelete={async () => {
                      return await deletePendaftar(row.id);
                    }}
                  />
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-stone-400">
                  {search || status !== "Semua" ? (
                    <div className="space-y-2">
                      <p>Tidak ada pendaftar yang cocok dengan kriteria pencarian.</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearch("");
                          setStatus("Semua");
                        }}
                      >
                        Reset Filter
                      </Button>
                    </div>
                  ) : (
                    "Belum ada data pendaftar"
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Document Preview Modal */}
      <Dialog open={!!selectedDoc} onOpenChange={(open) => !open && setSelectedDoc(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col p-6 overflow-hidden">
          {selectedDoc && (
            <>
              <DialogHeader className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-700">
                    {selectedDoc.docType}
                  </span>
                  <DialogTitle className="text-base font-bold text-stone-900">
                    {selectedDoc.namaSantri}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-xs text-stone-500">
                  Berkas resmi yang diunggah saat pendaftaran PPDB.
                </DialogDescription>
              </DialogHeader>

              {/* Preview Body */}
              <div className="my-2 flex-1 overflow-auto rounded-xl border border-stone-200 bg-stone-950/5 flex items-center justify-center p-3 min-h-[280px] max-h-[58vh]">
                {selectedDoc.url.toLowerCase().endsWith(".pdf") ||
                selectedDoc.url.startsWith("data:application/pdf") ? (
                  <iframe
                    src={selectedDoc.url}
                    className="w-full h-[54vh] rounded-lg border-0 shadow-xs bg-white"
                    title={selectedDoc.title}
                  />
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={selectedDoc.url}
                    alt={selectedDoc.title}
                    className="max-h-[54vh] max-w-full rounded-lg object-contain shadow-xs"
                  />
                )}
              </div>

              <DialogFooter className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t pt-3 -mx-0 -mb-0">
                <a
                  href={selectedDoc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-1 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-primary-1/90 transition w-full sm:w-auto"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Buka / Unduh Berkas
                </a>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDoc(null)}
                  className="w-full sm:w-auto"
                >
                  Tutup
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
