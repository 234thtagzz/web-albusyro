// TEMPORARY DATA
// Replace with official STTD Al-Busyro news data.

export interface News {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  imageUrl: string;
  imageAlt: string;
}

export const newsCategories = [
  "Semua",
  "Berita",
  "Pengumuman",
  "Kegiatan",
  "Prestasi",
] as const;

export type NewsCategory = (typeof newsCategories)[number];

export const newsItems: News[] = [
  // [DATA DUMMY] Ganti dengan data resmi STTD Al-Busyro.
  // Gambar placeholder ada di public/images/dummy/.
  {
    id: "1",
    slug: "pembukaan-ppdb-tahun-ajaran-2026-2027",
    title: "Pembukaan PPDB Tahun Ajaran 2026/2027",
    excerpt:
      "Pendaftaran peserta didik baru STTD Al-Busyro tahun ajaran 2026/2027 resmi dibuka. Kuota terbatas untuk generasi Qur'ani berakhlakul karimah.",
    content:
      "STTD Al-Busyro membuka pendaftaran peserta didik baru tahun ajaran 2026/2027. Pendaftaran dapat dilakukan langsung di kantor sekolah pada hari kerja dengan membawa fotokopi kartu keluarga, akta kelahiran, dan pas foto terbaru. Calon santri akan mengikuti tes baca Al-Qur'an dan wawancara bersama orang tua. Tidak ada syarat hafalan awal, seluruh proses seleksi difokuskan pada kesamaan visi pendidikan antara sekolah dan keluarga.",
    category: "Pengumuman",
    date: "10 Agustus 2026",
    author: "Panitia PPDB",
    imageUrl: "/images/dummy/news-1.png",
    imageAlt: "Suasana gedung STTD Al-Busyro",
  },
  {
    id: "2",
    slug: "wisuda-tahfizh-angkatan-keempat",
    title: "Wisuda Tahfizh Angkatan ke-4, 12 Santri Capai Target Juz",
    excerpt:
      "Dua belas santri menuntaskan target hafalan 18 juz dan digelar dalam acara wisuda tahfizh angkatan keempat yang disaksikan para orang tua.",
    content:
      "Sebanyak dua belas santri STTD Al-Busyro resmi diwisudakan setelah menuntaskan target hafalan Al-Qur'an melalui Metode Al-Qosimi. Acara wisuda tahfizh angkatan keempat ini dihadiri oleh seluruh orang tua santri, dewan asatidz, serta tokoh masyarakat sekitar. Dalam sambutannya, kepala sekolah menyampaikan bahwa capaian ini merupakan buah dari konsistensi program tahfizh harian, muraja'ah pekanan, dan pendampingan halaqah kecil yang berjalan sepanjang tahun.",
    category: "Kegiatan",
    date: "28 Juni 2026",
    author: "Tim Humas",
    imageUrl: "/images/dummy/news-2.png",
    imageAlt: "Prosesi wisuda tahfizh santri",
  },
  {
    id: "3",
    slug: "juara-mtq-kota-surakarta",
    title: "Santri Al-Busyro Juara MTQ Tingkat Kota Surakarta",
    excerpt:
      "Perwakilan STTD Al-Busyro berhasil meraih juara pertama kategori tartil pada Musabaqah Tilawatil Qur'an tingkat Kota Surakarta.",
    content:
      "Alhamdulillah, perwakilan STTD Al-Busyro berhasil meraih juara pertama kategori tartil pada ajang Musabaqah Tilawatil Qur'an (MTQ) tingkat Kota Surakarta. Prestasi ini merupakan hasil pembinaan intensif bidang tilawah yang menjadi bagian dari kurikulum Tartil dan Tilawah di sekolah. Selanjutnya, sang juara akan mewakili Kota Surakarta pada MTQ tingkat Provinsi Jawa Tengah.",
    category: "Prestasi",
    date: "15 Mei 2026",
    author: "Tim Humas",
    imageUrl: "/images/dummy/news-3.png",
    imageAlt: "Penyerahan piala juara MTQ",
  },
  {
    id: "4",
    slug: "mabit-bulan-ramadhan-santri",
    title: "Mabit Ramadhan: Tadarus dan Kajian Serba Ada Santri",
    excerpt:
      "Kegiatan bermalam di masjid (mabit) serentak diikuti seluruh santri dengan rangkaian tadarus, kajian, dan latihan kepemimpinan.",
    content:
      "Seluruh santri STTD Al-Busyro mengikuti kegiatan bermalam masjid (mabit) dengan rangkaian tadarus berjamaah, kajian tema Ramadhan, simulasi imam dan muadzin, serta lomba kreasi adzan. Kegiatan ini melatih kemandirian, kepedulian, dan keberanian santri tampil di depan umum. Panitia menyatakan kegiatan berlangsung lancar dan akan dijadikan agenda rutin setiap bulan Ramadhan.",
    category: "Kegiatan",
    date: "20 Maret 2026",
    author: "Waka Kesiswaan",
    imageUrl: "/images/dummy/news-4.png",
    imageAlt: "Santri mengikuti kegiatan mabit di masjid",
  },
  {
    id: "5",
    slug: "pelatihan-metode-al-qosimi-asatidz",
    title: "Pelatihan Metode Al-Qosimi bagi Asatidz dan Ustadzah",
    excerpt:
      "Seluruh asatidz mengikuti peningkatan kompetensi metode Al-Qosimi beserta varian MMUSBOB, MHL-PA, dan MMC agar pembelajaran tahfizh makin mutqin.",
    content:
      "Dalam rangka menjaga mutu pembelajaran, STTD Al-Busyro menyelenggarakan pelatihan peningkatan kompetensi Metode Al-Qosimi bagi seluruh asatidz dan ustadzah. Materi yang dibahas mencakup varian MMUSBOB untuk muraja'ah sabuk, MHL-PA untuk hafalan permulaan, serta MMC untuk perbaikan makhraj dan sifat huruf. Pelatihan dipandu langsung oleh praktisi Metode Al-Qosimi dan ditutup dengan simulasi mengajar.",
    category: "Berita",
    date: "8 Februari 2026",
    author: "Yayasan",
    imageUrl: "/images/dummy/news-5.png",
    imageAlt: "Pelatihan guru metode Al-Qosimi",
  },
  {
    id: "6",
    slug: "kalender-pendidikan-dan-agenda-semester-ganjil",
    title: "Kalender Pendidikan Semester Ganjil 2026/2027 Dirilis",
    excerpt:
      "Sekolah merilis kalender pendidikan semester ganjil. Orang tua diminta mencatat agenda penting seperti mabit rutin, evaluasi hafalan, dan libur awal semester.",
    content:
      "Sekolah resmi merilis kalender pendidikan semester ganjil tahun ajaran 2026/2027. Beberapa agenda penting di antaranya mabit rutin bulanan, evaluasi capaian hafalan setiap akhir bulan, pekan adab, serta pentas seni Islami akhir semester. Orang tua diminta memantau perkembangan hafalan anak melalui buku mutaba'ah yang dibawa pulang setiap akhir pekan.",
    category: "Pengumuman",
    date: "12 Januari 2026",
    author: "Tata Usaha",
    imageUrl: "/images/dummy/news-6.png",
    imageAlt: "Kalender pendidikan semester ganjil",
  },
];
