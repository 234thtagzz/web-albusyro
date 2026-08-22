import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Dokumentasi kegiatan dan momen penting di STTD Al-Busyro.",
};

export default function GaleriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
