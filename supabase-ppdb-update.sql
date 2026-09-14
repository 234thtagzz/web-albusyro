-- ============================================================
-- STTD Al-Busyro — Skrip Pembaruan Skema & Data PPDB
-- 1. Hapus kolom FAQ
-- 2. Tambah kolom nama_admin & no_hp
-- 3. Masukkan / perbarui 1 data master PPDB
-- ============================================================
-- Cara pakai: Supabase Dashboard > SQL Editor > Paste & Run
-- ============================================================

-- 1. Hapus kolom FAQ dari ppdb_info jika masih ada
alter table if exists ppdb_info drop column if exists faq;

-- 2. Tambahkan kolom nama_admin dan no_hp jika belum ada
alter table if exists ppdb_info add column if not exists nama_admin text;
alter table if exists ppdb_info add column if not exists no_hp text;

-- 3. Hapus data duplikat bila ada lebih dari 1 data master PPDB (menyisakan data terbaru)
delete from ppdb_info
where id not in (
  select id from ppdb_info order by created_at desc limit 1
);

-- 4. Masukkan data baru atau perbarui data master PPDB yang ada
do $$
declare
  existing_id uuid;
begin
  select id into existing_id from ppdb_info order by created_at desc limit 1;

  if existing_id is not null then
    -- Perbarui 1 data master yang sudah ada
    update ppdb_info
    set
      tahun_ajaran = '2026/2027',
      nama_admin   = 'Ust. Mihwar',
      no_hp        = '085726216717',
      kontak       = '085726216717 (Ust. Mihwar)',
      biaya        = 'Biaya formulir pendaftaran: Rp 150.000.' || E'\n' ||
                     'Rincian infaq pengembangan, seragam santri, dan SPP bulanan diinformasikan transparan pada saat wawancara atau dapat dikonsultasikan langsung ke panitia PPDB.',
      jadwal       = 'Gelombang I: 1 Oktober – 31 Desember 2025' || E'\n' ||
                     'Gelombang II: 1 Januari – 31 Maret 2026 (ditutup sewaktu-waktu apabila kuota telah terpenuhi)' || E'\n' ||
                     'Pelayanan kantor: Senin – Sabtu pukul 08.00 – 14.00 WIB di STTD Al-Busyro.',
      persyaratan  = '1. Mengisi formulir pendaftaran (online melalui web atau offline di kantor)' || E'\n' ||
                     '2. Fotokopi Kartu Keluarga (KK) 2 lembar' || E'\n' ||
                     '3. Fotokopi Akta Kelahiran 2 lembar' || E'\n' ||
                     '4. Pas foto santri ukuran 3x4 berwarna (3 lembar)' || E'\n' ||
                     '5. Mengikuti observasi calon santri dan wawancara orang tua (tidak ada syarat hafalan awal)',
      is_active    = true,
      updated_at   = now()
    where id = existing_id;
  else
    -- Masukkan 1 data master baru jika tabel masih kosong
    insert into ppdb_info (
      tahun_ajaran,
      nama_admin,
      no_hp,
      kontak,
      biaya,
      jadwal,
      persyaratan,
      is_active
    ) values (
      '2026/2027',
      'Ust. Mihwar',
      '085726216717',
      '085726216717 (Ust. Mihwar)',
      'Biaya formulir pendaftaran: Rp 150.000.' || E'\n' ||
      'Rincian infaq pengembangan, seragam santri, dan SPP bulanan diinformasikan transparan pada saat wawancara atau dapat dikonsultasikan langsung ke panitia PPDB.',
      'Gelombang I: 1 Oktober – 31 Desember 2025' || E'\n' ||
      'Gelombang II: 1 Januari – 31 Maret 2026 (ditutup sewaktu-waktu apabila kuota telah terpenuhi)' || E'\n' ||
      'Pelayanan kantor: Senin – Sabtu pukul 08.00 – 14.00 WIB di STTD Al-Busyro.',
      '1. Mengisi formulir pendaftaran (online melalui web atau offline di kantor)' || E'\n' ||
      '2. Fotokopi Kartu Keluarga (KK) 2 lembar' || E'\n' ||
      '3. Fotokopi Akta Kelahiran 2 lembar' || E'\n' ||
      '4. Pas foto santri ukuran 3x4 berwarna (3 lembar)' || E'\n' ||
      '5. Mengikuti observasi calon santri dan wawancara orang tua (tidak ada syarat hafalan awal)',
      true
    );
  end if;
end $$;

-- 5. Tambah kolom foto_kk dan foto_akta pada ppdb_registrations
alter table if exists ppdb_registrations add column if not exists foto_kk text;
alter table if exists ppdb_registrations add column if not exists foto_akta text;

-- 6. Buat bucket storage 'pendaftar' untuk menyimpan foto KK & Akta pendaftar
insert into storage.buckets (id, name, public) values ('pendaftar', 'pendaftar', true)
on conflict (id) do nothing;

-- Storage RLS: Public boleh upload dokumen pendaftar
drop policy if exists "public insert pendaftar storage" on storage.objects;
create policy "public insert pendaftar storage" on storage.objects
  for insert with check (bucket_id = 'pendaftar');

-- Storage RLS: Public / Admin boleh melihat file di bucket pendaftar
drop policy if exists "public read pendaftar storage" on storage.objects;
create policy "public read pendaftar storage" on storage.objects
  for select using (bucket_id = 'pendaftar');

-- 7. Cek hasil data master PPDB yang tersimpan
select
  id,
  tahun_ajaran,
  nama_admin,
  no_hp,
  kontak,
  is_active,
  updated_at
from ppdb_info;
