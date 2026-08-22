// DATA SUMBER: riset akademik tentang STTD Al-Busyro (jurnal Tarbiyatuna Unimma,
// Journal of Social Research 2024). Field bertanda [DATA RESMI] menunggu konfirmasi sekolah.

export interface Program {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  icon: string;
}

export const programs: Program[] = [
  {
    id: "tahfizh",
    title: "Tahfizhul Qur'an",
    description:
      "Fokus pada pembelajaran dan penghafalan Al-Qur'an dengan Metode Al-Qosimi — bacaan fasih dan hafalan mutqin, target 18-22 juz dalam 6 tahun.",
    highlights: [
      "Metode Al-Qosimi (MMUSBOB, MHL-PA, MMC)",
      "Target 18-22 Juz / 6 Tahun",
      "Hingga 30 Juz via Program Asrama",
    ],
    icon: "BookOpen",
  },
  {
    id: "adab",
    title: "Pendidikan Adab",
    description:
      "Adab sebelum ilmu. Pembiasaan perilaku kepada Allah (ibadah), sesama manusia (saling membantu), dan alam (menjaga lingkungan) melalui tahapan sosialisasi, implementasi, dan evaluasi.",
    highlights: [
      "Menghormati Guru dan Orang Tua",
      "Menghormati Majelis Ilmu",
      "Disiplin Beribadah",
    ],
    icon: "Heart",
  },
  {
    id: "akademik",
    title: "Pendidikan Akademik",
    description:
      "Program sekolah memadukan pelajaran umum dan agama, menyiapkan siswa mengikuti ujian kenegaraan serta melanjutkan ke jenjang berikutnya.",
    highlights: [
      "Ijazah Resmi Kemenag (MI)",
      "Memiliki NISN",
      "Kurikulum Terpadu Sekolah + Asrama",
    ],
    icon: "GraduationCap",
  },
  {
    id: "karakter",
    title: "Pembentukan Karakter",
    description:
      "Membentuk peserta didik yang mandiri, bertanggung jawab, dan memiliki kepedulian terhadap sesama — dikuatkan kegiatan ekstrakurikuler dan life skill.",
    highlights: [
      "Kemandirian Santri",
      "Tanggung Jawab",
      "Kepedulian",
    ],
    icon: "Users",
  },
];
