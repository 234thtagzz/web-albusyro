import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Berita",
  description:
    "Berita dan pengumuman terbaru dari STTD Al-Busyro.",
};

export default function BeritaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
