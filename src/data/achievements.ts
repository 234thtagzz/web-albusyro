// TEMPORARY DATA
// Replace with official STTD Al-Busyro achievement data.

export interface Achievement {
  id: string;
  title: string;
  competition: string;
  category: string;
  year: string;
  participant: string;
  level: string;
}

export const achievements: Achievement[] = [
  // [DATA DUMMY] Ganti dengan data resmi STTD Al-Busyro.
  {
    id: "1",
    title: "Juara 1 Tartil — MTQ Tingkat Provinsi Jawa Tengah",
    competition:
      "Musabaqah Tilawatil Qur'an (MTQ) Pelajar Tingkat Provinsi Jawa Tengah",
    category: "Tilawah",
    year: "2026",
    participant: "Ahmad Fauzan (Kelas VI)",
    level: "Provinsi",
  },
  {
    id: "2",
    title: "Juara 1 Lomba Hafalan Juz 30",
    competition:
      "Lomba Hafalan Qur'an Antar SD/MI Se-Surakarta Raya",
    category: "Tahfizh",
    year: "2026",
    participant: "Zaid Abdullah (Kelas V)",
    level: "Kota/Kabupaten",
  },
  {
    id: "3",
    title: "Juara 2 Kaligrafi Islami Anak",
    competition:
      "Lomba Kaligrafi dan Seni Rupa Islam Tingkat Kota Surakarta",
    category: "Seni",
    year: "2025",
    participant: "Aisyah Nur Hidayah (Kelas IV)",
    level: "Kota/Kabupaten",
  },
  {
    id: "4",
    title: "Juara 3 Adzan Cilik Se-Jawa Tengah",
    competition:
      "Festival Adzan dan Tilawah Cilik Tingkat Provinsi Jawa Tengah",
    category: "Adzan",
    year: "2025",
    participant: "Ibrahim Yusuf (Kelas III)",
    level: "Provinsi",
  },
  {
    id: "5",
    title: "Juara 1 Olimpiade IPA Madrasah Ibtidaiyah",
    competition:
      "Olimpiade Sains Madrasah Ibtidaiyah (OSMI) Tingkat Kabupaten Sukoharjo",
    category: "Akademik",
    year: "2025",
    participant: "Salma Rahmawati (Kelas VI)",
    level: "Kota/Kabupaten",
  },
  {
    id: "6",
    title: "Harapan 1 Lomba Cepat Hafal Short Surah",
    competition:
      "Musabaqah Hafalan Surah Pendek (MHSP) Nasional Santri Daya",
    category: "Tahfizh",
    year: "2024",
    participant: "Umar Sayyid (Kelas VI)",
    level: "Nasional",
  },
];
