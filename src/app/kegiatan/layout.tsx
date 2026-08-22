import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kegiatan",
  description:
    "Beragam kegiatan santri STTD Al-Busyro dalam pengembangan bakat dan karakter.",
};

export default function KegiatanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
