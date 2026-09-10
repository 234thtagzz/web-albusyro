"use client";

import { useTransition } from "react";
import { updateStatus } from "@/app/admin/pendaftar/actions";

interface PendaftarStatusSelectProps {
  id: string;
  currentStatus: string;
}

export function PendaftarStatusSelect({ id, currentStatus }: PendaftarStatusSelectProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      name="status"
      defaultValue={currentStatus}
      disabled={isPending}
      className={`rounded-full border border-stone-200 bg-white px-2 py-1 text-xs transition ${
        isPending ? "opacity-50 cursor-wait" : ""
      }`}
      onChange={(e) => {
        const val = e.target.value;
        startTransition(async () => {
          await updateStatus(id, val);
        });
      }}
    >
      <option value="pending">pending</option>
      <option value="wa_verified">wa_verified</option>
      <option value="diterima">diterima</option>
      <option value="ditolak">ditolak</option>
    </select>
  );
}
