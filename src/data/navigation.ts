export interface NavItem {
  label: string;
  href: string;
}

export const mainNavigation: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil" },
  { label: "Pendidikan", href: "/pendidikan" },
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
    { label: "Pendidikan", href: "/pendidikan" },
    { label: "Kegiatan", href: "/kegiatan" },
  ],
  more: [
    { label: "Prestasi", href: "/prestasi" },
    { label: "Galeri", href: "/galeri" },
    { label: "Berita", href: "/berita" },
    { label: "PPDB", href: "/ppdb" },
  ],
  programs: [
    { label: "Tahfizhul Qur'an", href: "/pendidikan#tahfizh" },
    { label: "Pendidikan Adab", href: "/pendidikan#adab" },
    { label: "Pendidikan Akademik", href: "/pendidikan#akademik" },
    { label: "Pembentukan Karakter", href: "/pendidikan#karakter" },
  ],
};
