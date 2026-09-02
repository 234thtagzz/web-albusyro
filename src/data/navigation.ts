export interface NavItem {
  label: string;
  href: string;
}

export const mainNavigation: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil" },
  { label: "Kegiatan", href: "/kegiatan" },
  { label: "Prestasi", href: "/prestasi" },
  { label: "Galeri", href: "/galeri" },
  { label: "Berita", href: "/berita" },
];

export const ctaNavigation: NavItem = {
  label: "PPDB",
  href: "/ppdb",
};

export const footerNavigation = {
  main: [
    { label: "Beranda", href: "/" },
    { label: "Profil", href: "/profil" },
    { label: "Kegiatan", href: "/kegiatan" },
  ],
  more: [
    { label: "Prestasi", href: "/prestasi" },
    { label: "Galeri", href: "/galeri" },
    { label: "Berita", href: "/berita" },
    { label: "PPDB", href: "/ppdb" },
  ],
  // footer kolom "Kegiatan" — poin-poin kegiatan santri (sinkron dengan school.activities)
  kegiatan: [
    { label: "Mabit & Tartil-Tilawah", href: "/kegiatan" },
    { label: "Berkuda & Memanah", href: "/kegiatan" },
    { label: "Renang & Beladiri", href: "/kegiatan" },
    { label: "Outbond & PBB", href: "/kegiatan" },
    { label: "Public Speaking & Jurnalistik", href: "/kegiatan" },
    { label: "Life Skill", href: "/kegiatan" },
  ],
  // legacy: tetap diekspor agar tidak breaking jika ada import lama
  programs: [
    { label: "Tahfizhul Qur'an", href: "/kegiatan" },
    { label: "Pendidikan Adab", href: "/kegiatan" },
    { label: "Pendidikan Akademik", href: "/kegiatan" },
    { label: "Pembentukan Karakter", href: "/kegiatan" },
  ],
};
