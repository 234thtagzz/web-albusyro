"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";

interface DeleteButtonProps {
  itemTitle?: string;
  itemType?: string;
  onDelete: () => Promise<void | { error?: string }>;
}

export function DeleteButton({
  itemTitle = "data ini",
  itemType = "Data",
  onDelete,
}: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    setError(null);
    startTransition(async () => {
      try {
        const res = await onDelete();
        if (res && "error" in res && res.error) {
          setError(res.error);
        } else {
          setOpen(false);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Gagal menghapus data");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="inline-flex size-7 items-center justify-center rounded-[12px] text-red-600 transition hover:bg-red-50 hover:text-red-700"
        aria-label={`Hapus ${itemType}`}
      >
        <Trash2 className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Hapus {itemType}?</DialogTitle>
          <DialogDescription className="mt-2 text-stone-600">
            Apakah Anda yakin ingin menghapus <strong className="font-semibold text-stone-900">{itemTitle}</strong>? Tindakan ini bersifat permanen dan tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            {error}
          </div>
        )}

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <DialogClose
            render={
              <Button variant="outline" disabled={isPending}>
                Batal
              </Button>
            }
          />
          <Button
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menghapus...
              </>
            ) : (
              "Ya, Hapus"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
