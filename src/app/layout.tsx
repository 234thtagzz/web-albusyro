import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "STTD Al-Busyro — Pendidikan Qur'ani, Adab, dan Ilmu",
    template: "%s | STTD Al-Busyro",
  },
  description:
    "Website profil STTD Al-Busyro, lembaga pendidikan yang berfokus pada pembentukan generasi Qur'ani melalui tahfizhul Qur'an, adab, ilmu, dan karakter.",
  keywords: [
    "STTD Al-Busyro",
    "sekolah tahfizh",
    "pendidikan Islam",
    "tahfizhul Qur'an",
    "Surakarta",
    "pendidikan adab",
  ],
  authors: [{ name: "STTD Al-Busyro" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "STTD Al-Busyro",
    title: "STTD Al-Busyro — Pendidikan Qur'ani, Adab, dan Ilmu",
    description:
      "Lembaga pendidikan yang berfokus pada pembentukan generasi Qur'ani melalui tahfizhul Qur'an, adab, ilmu, dan karakter.",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${jakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
