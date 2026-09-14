"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Image as ImageIcon, AlertCircle } from "lucide-react";

type Props = {
  imageUrl?: string | null;
  urlName?: string; // FormData key for URL
  fileName?: string; // FormData key for file
  labelUrl?: string;
  labelFile?: string;
  required?: boolean;
};

export function ImageField({
  imageUrl,
  urlName = "image_url",
  fileName = "file",
  labelUrl = "Image URL (atau isi link)",
  labelFile = "Upload gambar (prioritas jika diisi)",
  required,
}: Props) {
  const [preview, setPreview] = useState<string | null>(imageUrl ?? null);
  const [fileSizeWarning, setFileSizeWarning] = useState<string | null>(null);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFileSizeWarning("Peringatan: Ukuran file melebihi batas 5MB! Silakan pilih file yang lebih kecil.");
      } else {
        setFileSizeWarning(null);
      }
      setFileDetails({
        name: file.name,
        size: formatSize(file.size),
      });
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setFileDetails(null);
      setFileSizeWarning(null);
      if (imageUrl) {
        setPreview(imageUrl);
      } else {
        setPreview(null);
      }
    }
  }

  function handleReset() {
    setPreview(null);
    setFileDetails(null);
    setFileSizeWarning(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (urlInputRef.current) urlInputRef.current.value = "";
  }

  return (
    <div className="space-y-3.5 rounded-2xl border border-stone-200 bg-stone-50/70 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-primary-1" />
          <span className="text-sm font-semibold text-stone-900">
            Gambar & Media
          </span>
        </div>
        {preview && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white px-2.5 py-1 text-xs text-stone-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            <X className="h-3 w-3" /> Hapus / Reset Gambar
          </button>
        )}
      </div>

      {preview && (
        <div className="relative overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview"
            className="h-52 w-full object-cover"
          />
          <div className="flex items-center justify-between border-t border-stone-100 bg-stone-50/90 px-3.5 py-2 text-xs text-stone-600 backdrop-blur-xs">
            <span className="truncate max-w-[280px] sm:max-w-md">
              {fileDetails ? (
                <>
                  <span className="font-semibold text-stone-900">{fileDetails.name}</span>{" "}
                  <span className="text-stone-400 font-mono">({fileDetails.size})</span>
                </>
              ) : preview.startsWith("blob:") ? (
                "File baru"
              ) : (
                preview
              )}
            </span>
            <span className="shrink-0 rounded-full bg-stone-200/70 px-2 py-0.5 text-[10px] font-medium text-stone-700">
              {preview.startsWith("blob:") ? "Upload Baru" : "Tersimpan"}
            </span>
          </div>
        </div>
      )}

      {fileSizeWarning && (
        <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
          <span>{fileSizeWarning}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor={urlName}>
          {labelUrl} {!required && <span className="text-stone-400 font-normal">(opsional)</span>}
        </Label>
        <Input
          ref={urlInputRef}
          id={urlName}
          name={urlName}
          placeholder="https://... atau /images/..."
          defaultValue={imageUrl ?? ""}
          onChange={(e) => {
            const val = e.target.value.trim();
            if (val && !preview?.startsWith("blob:")) setPreview(val);
            if (!val && !fileInputRef.current?.files?.length) setPreview(null);
          }}
          className="bg-white"
        />
        <p className="text-xs text-stone-500">
          Bisa gunakan link gambar luar atau URL yang sudah ada.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={fileName}>{labelFile}</Label>
        <Input
          ref={fileInputRef}
          id={fileName}
          name={fileName}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="bg-white file:mr-3 file:rounded-md file:border-0 file:bg-stone-100 file:px-2.5 file:py-1 file:text-xs file:font-medium file:text-stone-700 hover:file:bg-stone-200 cursor-pointer"
        />
        <p className="text-xs text-stone-500">
          Maksimal 5MB • Format: JPG, PNG, WebP • Otomatis tersimpan ke Supabase Storage.
        </p>
      </div>
    </div>
  );
}
