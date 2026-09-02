-- ============================================================
-- STTD Al-Busyro — Supabase SQL (SATU FILE)
-- Prestasi / Galeri / Berita / PPDB
-- Cara pakai: Supabase Dashboard > SQL Editor > paste seluruh
-- file ini > Run
-- ============================================================
-- Idempotent: aman di-Run ulang (IF NOT EXISTS / DROP IF EXISTS)

-- 0. EXTENSION
create extension if not exists "pgcrypto";

-- ============================================================
-- 1. TABLE: prestasi
-- RPD #18: Nama Prestasi / Nama Kegiatan / Tahun / Tingkat / Peserta
-- ============================================================
create table if not exists prestasi (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  competition text not null,
  category text not null check (category in ('Tilawah','Tahfizh','Seni','Adzan','Akademik','Lainnya')),
  year text not null, -- contoh: '2026'
  level text not null check (level in ('Sekolah','Kota/Kabupaten','Provinsi','Nasional','Internasional')),
  participant text, -- contoh: 'Ahmad Fauzan (Kelas VI)'
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_prestasi_year on prestasi(year desc);
create index if not exists idx_prestasi_category on prestasi(category);
create index if not exists idx_prestasi_created on prestasi(created_at desc);

-- ============================================================
-- 2. TABLE: galeri
-- RPD #19: Semua / Pembelajaran / Tahfiz / Kegiatan / Prestasi / Lingkungan
-- ============================================================
create table if not exists galeri (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('Pembelajaran','Tahfiz','Kegiatan','Prestasi','Lingkungan')),
  description text,
  image_url text not null,
  alt text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_galeri_category on galeri(category);
create index if not exists idx_galeri_created on galeri(created_at desc);

-- ============================================================
-- 3. TABLE: berita
-- RPD #20: Thumbnail / Category / Title / Excerpt / Date / Author / Content
-- slug unique untuk /berita/[slug]
-- ============================================================
create table if not exists berita (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null check (slug ~ '^[a-z0-9-]+$'),
  title text not null,
  excerpt text,
  content text not null,
  category text not null check (category in ('Berita','Pengumuman','Kegiatan','Prestasi')),
  author text,
  image_url text,
  image_alt text,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_berita_slug on berita(slug);
create index if not exists idx_berita_category on berita(category);
create index if not exists idx_berita_published on berita(published_at desc);

-- ============================================================
-- 4. TABLE: ppdb_info
-- RPD #21: jangan hardcode biaya/jadwal/kuota tanpa sumber resmi -> nullable
-- faq = jsonb [{q: "Apa syarat?", a: "..."}]
-- ============================================================
create table if not exists ppdb_info (
  id uuid primary key default gen_random_uuid(),
  tahun_ajaran text not null, -- contoh: '2026/2027'
  jadwal text,       -- markdown, nullable = [DATA BELUM TERSEDIA]
  persyaratan text,  -- markdown
  biaya text,        -- markdown
  faq jsonb not null default '[]'::jsonb,
  kontak text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_ppdb_active on ppdb_info(is_active, created_at desc);

-- ============================================================
-- 5. TABLE: ppdb_registrations (opsional, untuk form PPDB)
-- anonim boleh INSERT, SELECT hanya authenticated
-- ============================================================
create table if not exists ppdb_registrations (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  nisn text,
  asal_sekolah text,
  nama_wali text not null,
  wa_wali text not null check (wa_wali ~ '^08[0-9]{8,12}$' or wa_wali ~ '^628[0-9]{8,12}$'),
  alamat text,
  status text not null default 'pending' check (status in ('pending','diterima','ditolak','wa_verified')),
  created_at timestamptz not null default now()
);
create index if not exists idx_ppdb_reg_created on ppdb_registrations(created_at desc);

-- ============================================================
-- 6. TRIGGER: updated_at otomatis
-- ============================================================
create or replace function set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

drop trigger if exists trg_prestasi_updated on prestasi;
create trigger trg_prestasi_updated before update on prestasi for each row execute function set_updated_at();
drop trigger if exists trg_galeri_updated on galeri;
create trigger trg_galeri_updated before update on galeri for each row execute function set_updated_at();
drop trigger if exists trg_berita_updated on berita;
create trigger trg_berita_updated before update on berita for each row execute function set_updated_at();
drop trigger if exists trg_ppdb_updated on ppdb_info;
create trigger trg_ppdb_updated before update on ppdb_info for each row execute function set_updated_at();

-- ============================================================
-- 7. RLS (Row Level Security)
-- public: boleh SELECT | write: hanya authenticated (admin)
-- ppdb_registrations: public boleh INSERT, SELECT hanya admin
-- ============================================================
alter table prestasi enable row level security;
alter table galeri enable row level security;
alter table berita enable row level security;
alter table ppdb_info enable row level security;
alter table ppdb_registrations enable row level security;

drop policy if exists "public read prestasi" on prestasi;
drop policy if exists "admin write prestasi" on prestasi;
drop policy if exists "public read galeri" on galeri;
drop policy if exists "admin write galeri" on galeri;
drop policy if exists "public read berita" on berita;
drop policy if exists "admin write berita" on berita;
drop policy if exists "public read ppdb_info" on ppdb_info;
drop policy if exists "admin write ppdb_info" on ppdb_info;
drop policy if exists "public insert ppdb_registrations" on ppdb_registrations;
drop policy if exists "admin select ppdb_registrations" on ppdb_registrations;
drop policy if exists "admin write ppdb_registrations" on ppdb_registrations;

create policy "public read prestasi" on prestasi for select using (true);
create policy "admin write prestasi" on prestasi for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read galeri" on galeri for select using (true);
create policy "admin write galeri" on galeri for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read berita" on berita for select using (true);
create policy "admin write berita" on berita for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public read ppdb_info" on ppdb_info for select using (true);
create policy "admin write ppdb_info" on ppdb_info for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public insert ppdb_registrations" on ppdb_registrations for insert with check (true);
create policy "admin select ppdb_registrations" on ppdb_registrations for select using (auth.role() = 'authenticated');
create policy "admin write ppdb_registrations" on ppdb_registrations for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ============================================================
-- 8. STORAGE BUCKETS (public read)
-- Buat bucket via SQL; alternatif bisa via Dashboard > Storage
-- ============================================================
insert into storage.buckets (id, name, public) values ('galeri','galeri', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('berita','berita', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('prestasi','prestasi', true) on conflict (id) do nothing;

-- Storage RLS
drop policy if exists "public read storage" on storage.objects;
drop policy if exists "admin write storage" on storage.objects;

create policy "public read storage" on storage.objects for select using (bucket_id in ('galeri','berita','prestasi'));
create policy "admin write storage" on storage.objects for all using (auth.role() = 'authenticated') with check (bucket_id in ('galeri','berita','prestasi'));

-- ============================================================
-- 9. SEED DUMMY (opsional, biar tidak EmptyState)
-- Ganti dengan data resmi STTD Al-Busyro
-- ============================================================
-- Prestasi (6)
insert into prestasi (title, competition, category, year, level, participant) values
('Juara 1 Tartil — MTQ Tingkat Provinsi Jawa Tengah','Musabaqah Tilawatil Qur''an (MTQ) Pelajar Tingkat Provinsi Jawa Tengah','Tilawah','2026','Provinsi','Ahmad Fauzan (Kelas VI)'),
('Juara 1 Lomba Hafalan Juz 30','Lomba Hafalan Qur''an Antar SD/MI Se-Surakarta Raya','Tahfizh','2026','Kota/Kabupaten','Zaid Abdullah (Kelas V)'),
('Juara 2 Kaligrafi Islami Anak','Lomba Kaligrafi dan Seni Rupa Islam Tingkat Kota Surakarta','Seni','2025','Kota/Kabupaten','Aisyah Nur Hidayah (Kelas IV)'),
('Juara 3 Adzan Cilik Se-Jawa Tengah','Festival Adzan dan Tilawah Cilik Tingkat Provinsi Jawa Tengah','Adzan','2025','Provinsi','Ibrahim Yusuf (Kelas III)'),
('Juara 1 Olimpiade IPA Madrasah Ibtidaiyah','Olimpiade Sains Madrasah Ibtidaiyah (OSMI) Tingkat Kabupaten Sukoharjo','Akademik','2025','Kota/Kabupaten','Salma Rahmawati (Kelas VI)'),
('Harapan 1 Lomba Cepat Hafal Short Surah','Musabaqah Hafalan Surah Pendek (MHSP) Nasional Santri Daya','Tahfizh','2024','Nasional','Umar Sayyid (Kelas VI)')
on conflict do nothing;

-- Galeri (8)
insert into galeri (title, category, description, image_url, alt) values
('Halaqah Tahfizh Pagi','Tahfiz','Setoran hafalan santri di depan ustadz pembimbing sebelum pembelajaran dimulai.','/images/dummy/gallery-1.png','Santri mengikuti halaqah tahfizh pagi'),
('Pembelajaran Kelas MI','Pembelajaran','Suasana kelas pelajaran umum dengan kurikulum terpadu sekolah dan asrama.','/images/dummy/gallery-2.png','Suasana pembelajaran di kelas'),
('Latihan Berkuda Santri','Kegiatan','Ekstrakurikuler berkuda sebagai sarana pengembangan keberanian dan potensi diri.','/images/dummy/gallery-3.png','Santri mengikuti latihan berkuda'),
('Penyerahan Piagam Juara MTQ','Prestasi','Perwakilan sekolah menerima piagam juara pada MTQ tingkat Kota Surakarta.','/images/dummy/gallery-4.png','Penyerahan piagam juara MTQ'),
('Taman dan Masjid Sekolah','Lingkungan','Lingkungan hijau di area masjid yang menjadi ruang tadarus santri.','/images/dummy/gallery-5.png','Taman hijau di lingkungan sekolah'),
('Praktik Perbaikan Bacaan MMC','Tahfiz','Perbaikan makhraj dan sifat huruf melalui program Metode Al-Qosimi MMC.','/images/dummy/gallery-6.png','Praktik perbaikan bacaan Al-Qur''an'),
('Memanah di Lapangan Sekolah','Kegiatan','Ekstrakurikuler memanah untuk melatih fokus dan kesabaran santri.','/images/dummy/gallery-7.png','Santri berlatih memanah'),
('Belajar di Taman Literasi','Lingkungan','Momen belajar santai santri di taman literasi halaman belakang sekolah.','/images/dummy/gallery-8.png','Santri membaca buku di taman literasi')
on conflict do nothing;

-- Berita (6)
insert into berita (slug, title, excerpt, content, category, author, image_url, image_alt, published_at) values
('pembukaan-ppdb-tahun-ajaran-2026-2027','Pembukaan PPDB Tahun Ajaran 2026/2027','Pendaftaran peserta didik baru STTD Al-Busyro tahun ajaran 2026/2027 resmi dibuka. Kuota terbatas untuk generasi Qur''ani berakhlakul karimah.','STTD Al-Busyro membuka pendaftaran peserta didik baru tahun ajaran 2026/2027. Pendaftaran dapat dilakukan langsung di kantor sekolah pada hari kerja dengan membawa fotokopi kartu keluarga, akta kelahiran, dan pas foto terbaru. Calon santri akan mengikuti tes baca Al-Qur''an dan wawancara bersama orang tua. Tidak ada syarat hafalan awal.','Pengumuman','Panitia PPDB','/images/dummy/news-1.png','Suasana gedung STTD Al-Busyro','2026-08-10'),
('wisuda-tahfizh-angkatan-keempat','Wisuda Tahfizh Angkatan ke-4, 12 Santri Capai Target Juz','Dua belas santri menuntaskan target hafalan 18 juz dan digelar dalam acara wisuda tahfizh angkatan keempat.','Sebanyak dua belas santri STTD Al-Busyro resmi diwisudakan setelah menuntaskan target hafalan Al-Qur''an melalui Metode Al-Qosimi. Acara dihadiri orang tua santri, dewan asatidz, serta tokoh masyarakat.','Kegiatan','Tim Humas','/images/dummy/news-2.png','Prosesi wisuda tahfizh santri','2026-06-28'),
('juara-mtq-kota-surakarta','Santri Al-Busyro Juara MTQ Tingkat Kota Surakarta','Perwakilan STTD Al-Busyro berhasil meraih juara pertama kategori tartil pada MTQ tingkat Kota Surakarta.','Alhamdulillah, perwakilan STTD Al-Busyro berhasil meraih juara pertama kategori tartil pada MTQ tingkat Kota Surakarta. Selanjutnya akan mewakili Kota Surakarta pada MTQ tingkat Provinsi.','Prestasi','Tim Humas','/images/dummy/news-3.png','Penyerahan piala juara MTQ','2026-05-15'),
('mabit-bulan-ramadhan-santri','Mabit Ramadhan: Tadarus dan Kajian Serba Ada Santri','Kegiatan bermalam di masjid (mabit) serentak diikuti seluruh santri dengan rangkaian tadarus dan kajian.','Seluruh santri STTD Al-Busyro mengikuti kegiatan bermalam masjid (mabit) dengan rangkaian tadarus berjamaah, kajian tema Ramadhan, simulasi imam dan muadzin, serta lomba kreasi adzan.','Kegiatan','Waka Kesiswaan','/images/dummy/news-4.png','Santri mengikuti kegiatan mabit di masjid','2026-03-20'),
('pelatihan-metode-al-qosimi-asatidz','Pelatihan Metode Al-Qosimi bagi Asatidz dan Ustadzah','Seluruh asatidz mengikuti peningkatan kompetensi metode Al-Qosimi beserta varian MMUSBOB, MHL-PA, dan MMC.','Dalam rangka menjaga mutu pembelajaran, STTD Al-Busyro menyelenggarakan pelatihan Metode Al-Qosimi bagi seluruh asatidz dan ustadzah. Materi mencakup MMUSBOB, MHL-PA, serta MMC.','Berita','Yayasan','/images/dummy/news-5.png','Pelatihan guru metode Al-Qosimi','2026-02-08'),
('kalender-pendidikan-dan-agenda-semester-ganjil','Kalender Pendidikan Semester Ganjil 2026/2027 Dirilis','Sekolah merilis kalender pendidikan semester ganjil. Orang tua diminta mencatat agenda penting seperti mabit rutin dan evaluasi hafalan.','Sekolah resmi merilis kalender pendidikan semester ganjil tahun ajaran 2026/2027. Beberapa agenda penting di antaranya mabit rutin bulanan, evaluasi capaian hafalan setiap akhir bulan, pekan adab, serta pentas seni Islami akhir semester.','Pengumuman','Tata Usaha','/images/dummy/news-6.png','Kalender pendidikan semester ganjil','2026-01-12')
on conflict (slug) do nothing;

-- PPDB Info (1 aktif)
insert into ppdb_info (tahun_ajaran, jadwal, persyaratan, biaya, faq, kontak, is_active) values
('2026/2027','Informasi PPDB akan diperbarui oleh pihak STTD Al-Busyro.','Informasi persyaratan akan diperbarui oleh pihak STTD Al-Busyro.','Informasi biaya akan diperbarui oleh pihak STTD Al-Busyro.','[]','085 726216717 (Ust Mihwar)', true)
on conflict do nothing;

-- Selesai. Jalankan: SELECT * FROM prestasi; SELECT * FROM galeri; SELECT * FROM berita; SELECT * FROM ppdb_info;
