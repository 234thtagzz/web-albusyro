// Auto-generated shape dari supabase.sql
// Jalankan `supabase gen types typescript` untuk regenerate setelah migrasi

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      prestasi: {
        Row: {
          id: string;
          title: string;
          competition: string;
          category: "Tilawah" | "Tahfizh" | "Seni" | "Adzan" | "Akademik" | "Lainnya";
          year: string;
          level: "Sekolah" | "Kota/Kabupaten" | "Provinsi" | "Nasional" | "Internasional";
          participant: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          competition: string;
          category: "Tilawah" | "Tahfizh" | "Seni" | "Adzan" | "Akademik" | "Lainnya";
          year: string;
          level: "Sekolah" | "Kota/Kabupaten" | "Provinsi" | "Nasional" | "Internasional";
          participant?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          competition?: string;
          category?: "Tilawah" | "Tahfizh" | "Seni" | "Adzan" | "Akademik" | "Lainnya";
          year?: string;
          level?: "Sekolah" | "Kota/Kabupaten" | "Provinsi" | "Nasional" | "Internasional";
          participant?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      galeri: {
        Row: {
          id: string;
          title: string;
          category: "Pembelajaran" | "Tahfiz" | "Kegiatan" | "Prestasi" | "Lingkungan";
          description: string | null;
          image_url: string;
          alt: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          category: "Pembelajaran" | "Tahfiz" | "Kegiatan" | "Prestasi" | "Lingkungan";
          description?: string | null;
          image_url: string;
          alt?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          category?: "Pembelajaran" | "Tahfiz" | "Kegiatan" | "Prestasi" | "Lingkungan";
          description?: string | null;
          image_url?: string;
          alt?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      berita: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string | null;
          content: string;
          category: "Berita" | "Pengumuman" | "Kegiatan" | "Prestasi";
          author: string | null;
          image_url: string | null;
          image_alt: string | null;
          published_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt?: string | null;
          content: string;
          category: "Berita" | "Pengumuman" | "Kegiatan" | "Prestasi";
          author?: string | null;
          image_url?: string | null;
          image_alt?: string | null;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string | null;
          content?: string;
          category?: "Berita" | "Pengumuman" | "Kegiatan" | "Prestasi";
          author?: string | null;
          image_url?: string | null;
          image_alt?: string | null;
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      ppdb_info: {
        Row: {
          id: string;
          tahun_ajaran: string;
          jadwal: string | null;
          persyaratan: string | null;
          biaya: string | null;
          faq: Json;
          kontak: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tahun_ajaran: string;
          jadwal?: string | null;
          persyaratan?: string | null;
          biaya?: string | null;
          faq?: Json;
          kontak?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tahun_ajaran?: string;
          jadwal?: string | null;
          persyaratan?: string | null;
          biaya?: string | null;
          faq?: Json;
          kontak?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      ppdb_registrations: {
        Row: {
          id: string;
          nama: string;
          nisn: string | null;
          asal_sekolah: string | null;
          nama_wali: string;
          wa_wali: string;
          alamat: string | null;
          status: "pending" | "diterima" | "ditolak" | "wa_verified";
          created_at: string;
        };
        Insert: {
          id?: string;
          nama: string;
          nisn?: string | null;
          asal_sekolah?: string | null;
          nama_wali: string;
          wa_wali: string;
          alamat?: string | null;
          status?: "pending" | "diterima" | "ditolak" | "wa_verified";
          created_at?: string;
        };
        Update: {
          id?: string;
          nama?: string;
          nisn?: string | null;
          asal_sekolah?: string | null;
          nama_wali?: string;
          wa_wali?: string;
          alamat?: string | null;
          status?: "pending" | "diterima" | "ditolak" | "wa_verified";
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
}
