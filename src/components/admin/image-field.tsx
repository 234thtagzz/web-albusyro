"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else if (imageUrl) {
      setPreview(imageUrl);
    } else {
      setPreview(null);
    }
  }

  return (
    <div className="space-y-3 rounded-xl border border-stone-200 bg-stone-50 p-4">
      {preview && (
        <div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Preview" className="h-48 w-full object-cover" />
          <p className="px-3 py-2 text-xs text-stone-500 truncate">{preview.startsWith("blob:") ? "Preview file baru" : preview}</p>
        </div>
      )}
      <div className="space-y-1.5">
        <Label htmlFor={urlName}>{labelUrl} {!required && <span className="text-stone-400 font-normal">(opsional)</span>}</Label>
        <Input
          id={urlName}
          name={urlName}
          placeholder="https://... atau /images/..."
          defaultValue={imageUrl ?? ""}
          onChange={(e) => {
            const val = e.target.value.trim();
            if (val && !preview?.startsWith("blob:")) setPreview(val);
            if (!val && !document.getElementById(fileName)) setPreview(null);
          }}
        />
        <p className="text-xs text-stone-500">Jika upload file, file akan diupload ke Supabase Storage dan menggantikan URL.</p>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={fileName}>{labelFile}</Label>
        <Input id={fileName} name={fileName} type="file" accept="image/*" onChange={onFileChange} />
        <p className="text-xs text-stone-500">Maks 5MB • JPG, PNG, WebP • akan tersimpan di bucket sesuai jenis data</p>
      </div>
    </div>
  );
}
