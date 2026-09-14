"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, HelpCircle } from "lucide-react";

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

interface FaqBuilderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialFaq?: any;
}

export function FaqBuilder({ initialFaq }: FaqBuilderProps) {
  const [items, setItems] = useState<FaqItem[]>(() => {
    let parsed: Array<{ q?: string; a?: string }> = [];
    if (typeof initialFaq === "string") {
      try {
        parsed = JSON.parse(initialFaq);
      } catch {
        parsed = [];
      }
    } else if (Array.isArray(initialFaq)) {
      parsed = initialFaq;
    }

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return [];
    }

    return parsed.map((item, idx) => ({
      id: `${Date.now()}-${idx}`,
      q: item.q ?? "",
      a: item.a ?? "",
    }));
  });

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, q: "", a: "" },
    ]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: "q" | "a", value: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const serialized = JSON.stringify(
    items
      .map((item) => ({ q: item.q.trim(), a: item.a.trim() }))
      .filter((item) => item.q || item.a)
  );

  return (
    <div className="space-y-3 rounded-2xl border border-stone-200 bg-stone-50/70 p-4 sm:p-5">
      {/* Hidden input which passes serialized JSON to the server action */}
      <input type="hidden" name="faq" value={serialized} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-primary-1" />
          <Label className="text-sm font-semibold text-stone-900">
            Pertanyaan yang Sering Diajukan (FAQ)
          </Label>
        </div>
        <Button
          type="button"
          onClick={addItem}
          variant="outline"
          size="sm"
          className="rounded-full bg-white text-xs border-stone-300 text-stone-700 hover:bg-stone-100"
        >
          <Plus className="mr-1 h-3.5 w-3.5" /> Tambah FAQ
        </Button>
      </div>

      <p className="text-xs text-stone-500">
        Tambahkan daftar tanya jawab untuk orang tua calon santri di halaman PPDB.
      </p>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-stone-300 bg-white p-6 text-center">
          <p className="text-sm text-stone-500">Belum ada item FAQ.</p>
          <Button
            type="button"
            onClick={addItem}
            variant="ghost"
            size="sm"
            className="mt-2 text-primary-1 hover:text-primary-2"
          >
            + Klik di sini untuk menambah pertanyaan pertama
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="rounded-xl border border-stone-200 bg-white p-3.5 shadow-xs transition space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-semibold text-stone-700">
                  Pertanyaan #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="rounded-lg p-1 text-stone-400 transition hover:bg-red-50 hover:text-red-600"
                  aria-label="Hapus pertanyaan"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div>
                <Input
                  placeholder="Misal: Apakah ada syarat hafalan awal?"
                  value={item.q}
                  onChange={(e) => updateItem(item.id, "q", e.target.value)}
                  className="text-sm bg-white"
                />
              </div>

              <div>
                <Textarea
                  placeholder="Jawaban: Tidak ada syarat hafalan awal. Santri akan dibimbing dari dasar..."
                  value={item.a}
                  rows={2}
                  onChange={(e) => updateItem(item.id, "a", e.target.value)}
                  className="text-sm bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
