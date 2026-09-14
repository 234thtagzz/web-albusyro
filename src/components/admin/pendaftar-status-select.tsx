"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { updateStatus } from "@/app/admin/pendaftar/actions";

interface PendaftarStatusSelectProps {
  id: string;
  currentStatus: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  wa_verified: "bg-blue-50 text-blue-700 border-blue-200",
  diterima: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ditolak: "bg-red-50 text-red-700 border-red-200",
};

export function PendaftarStatusSelect({ id, currentStatus }: PendaftarStatusSelectProps) {
  const [status, setStatus] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    startTransition(async () => {
      const res = await updateStatus(id, newStatus);
      if (res?.error) {
        alert(`Gagal mengubah status: ${res.error}`);
        setStatus(currentStatus);
      }
    });
  };

  return (
    <div className="relative inline-flex items-center">
      <select
        value={status}
        disabled={isPending}
        onChange={handleChange}
        className={`appearance-none rounded-full border px-2.5 py-1 pr-6 text-xs font-medium cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-primary-1/20 ${
          statusColors[status] ?? "bg-stone-50 text-stone-700 border-stone-200"
        } ${isPending ? "opacity-60 cursor-wait" : ""}`}
      >
        <option value="pending">pending</option>
        <option value="wa_verified">wa_verified</option>
        <option value="diterima">diterima</option>
        <option value="ditolak">ditolak</option>
      </select>
      {isPending ? (
        <Loader2 className="pointer-events-none absolute right-2 h-3 w-3 animate-spin text-stone-500" />
      ) : (
        <span className="pointer-events-none absolute right-2 text-[10px] text-stone-400">▼</span>
      )}
    </div>
  );
}
